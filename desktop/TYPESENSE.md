# Typesense (Project Intelligence)

Optional search layer for the Metriq desktop app. Improves file discovery for
prompt rewrites, powers “Similar previous tasks,” usage session discovery, and
Cmd/Ctrl+K global search. The offline scanner in `packages/core` remains the
fallback whenever Typesense is off or unreachable.

## Recommended: local Typesense

```bash
# Docker (Windows Git Bash may need MSYS_NO_PATHCONV=1)
docker run -d --name metriq-typesense \
  -p 8108:8108 -v metriq-ts-data:/data \
  typesense/typesense:27.1 --data-dir=/data --api-key=metriq-local
```

Confirm the server is reachable before launching Metriq:

```bash
curl http://localhost:8108/health
# Expected: {"ok":true}
```

The container stores its index in the `metriq-ts-data` Docker volume, so
restarting the container does not require a full reindex. Stop and restart it
with `docker stop metriq-typesense` and `docker start metriq-typesense`.

Defaults (env or Settings → Project Intelligence):

| Variable | Default |
| --- | --- |
| `TYPESENSE_MODE` | `local` (`off` \| `local` \| `cloud`) |
| `TYPESENSE_HOST` | `localhost` |
| `TYPESENSE_PORT` | `8108` |
| `TYPESENSE_PROTOCOL` | `http` |
| `TYPESENSE_API_KEY` | `metriq-local` |
| `TYPESENSE_HYBRID` | unset / off — set `true` for conceptual query expansion |

The API key is resolved in the Electron **main** process only (env or
`safeStorage`-encrypted prefs). It is never exposed through `preload.js`.

## Privacy

- **Local mode:** full source chunks indexed on your machine (recommended).
- **Cloud mode:** metadata-only (paths, symbols, prompt/usage metrics) unless
  you explicitly check the cloud source-code consent box in Settings.
- Cloud indexing of source code is never silent.
- Usage session docs include project names, models, token metrics, and short
  prompt snippets from local logs — never uploaded unless Typesense itself is
  a cloud host you configured.

## Collections

| Collection | Phase | Purpose |
| --- | --- | --- |
| `metriq_code_chunks` | 2–3, 7 | Project source chunks + hybrid expansion |
| `metriq_prompt_runs` | 4 | Completed analyses / similar tasks |
| `metriq_usage_sessions` | 5 | Searchable usage sessions (discovery only) |

## Features

1. **Prompt Studio + capture window** — Typesense → scanner → rewrite.
2. **Similar previous tasks** — Prompt Studio.
3. **Usage search** — natural language (“expensive auth”, “low cache”) ranks sessions via Typesense, with local substring fallback.
4. **Cmd/Ctrl+K** — federated search across Code / Previous prompts / Usage.
5. **Conceptual search (Phase 7)** — Settings toggle expands vague prompts with synonyms. Not vector embeddings; keyword search remains primary.

## Verification

There are three useful levels of verification. A green health response alone
only proves that the server is running; it does not prove that Metriq can index
or search application data.

### 1. Unit tests

```bash
cd desktop
npm test
```

These tests cover configuration, query/filter construction, result mapping,
indexing decisions, the preload security boundary, prompt memory, usage search,
and global-search behavior. The live tests automatically skip when no server is
reachable, so always inspect the `skipped` count.

### 2. Live server integration tests

Start Typesense, then run:

```bash
cd desktop
node --test test/typesense-live.test.js
```

A complete pass reports three passing tests and **zero skipped tests**:

1. Collection creation, document import, search, user isolation, and deletion.
2. Initial and incremental project indexing, including deleted-file cleanup.
3. Federated `multi_search` across collections.

If all three tests say `SKIP no Typesense server reachable`, the server was not
tested. Check the health endpoint, port, protocol, and API key before retrying.

### 3. End-to-end application smoke test

```bash
cd desktop
node scripts/smoke-typesense.js
```

This is the strongest automated check. It creates temporary smoke-test data and
verifies:

- server health and all Metriq collections;
- real project-file indexing and relevant-file retrieval;
- prompt rewriting with Typesense project context;
- similar previous prompts;
- usage-session indexing and natural-language search;
- Cmd/Ctrl+K federated search;
- conceptual query expansion; and
- the offline-scanner fallback when Typesense is disabled.

Success ends with `All smoke checks passed.` The script removes its smoke-test
documents after a successful run.

### Current end-to-end blocker

The live server tests pass, but the smoke test currently stops while loading
`desktop/src/context-search.js` because it calls CommonJS `require()` on the ES
module `packages/core/scanner.js`. Node reports `ERR_REQUIRE_ESM`. Until that
module boundary is fixed, the database/index layer is verified, but the full
Project Intelligence path must not be described as end-to-end passing.

## Manual app check

Automated tests prove the data layer. This check confirms the Electron UI and
IPC wiring use it correctly:

1. Start Typesense and confirm `{"ok":true}` from `/health`.
2. Run `cd desktop && npm start`.
3. Open Settings → Project Intelligence and confirm **Connected**.
4. Link a project or click **Reindex** and confirm non-zero file/chunk counts.
5. In Prompt Studio, try: `Fix the screen that shows how many tokens were consumed`.
6. Confirm the suggested project files are relevant to usage or dashboard code.
7. Save a prompt run, enter a similar prompt, and confirm it appears under
   Similar previous tasks.
8. Open Usage and search for `expensive auth` or `low cache`.
9. Press Cmd/Ctrl+K and confirm results appear across Code, Previous prompts,
   and Usage.
10. Enable Conceptual search and repeat the vague usage-screen prompt.

## Fallback check

Typesense is optional and must never break prompt analysis. After completing the
manual check:

```bash
docker stop metriq-typesense
```

Run the same Prompt Studio analysis again. It should still complete using the
offline scanner, although search quality may be less specific. Restart the
server afterward with `docker start metriq-typesense`.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| `/health` cannot connect | Typesense is not running, port `8108` is unavailable, or the configured host/protocol is wrong. |
| Health works but live tests skip | Run the test where `localhost:8108` is reachable and confirm the test process is not network-sandboxed. |
| `401` or `403` responses | The app/test key must match the server key (`metriq-local` by default). |
| Settings says Connected but chunk count is zero | Link a project, click Reindex, and inspect the indexing progress/error message. |
| Search returns another user's/project's data | Treat as a failure; the live isolation test must pass before release. |
| `ERR_REQUIRE_ESM` from `context-search.js` | The CommonJS-to-ES-module scanner import is the known smoke-test blocker described above. |
| Analysis fails when Typesense is stopped | The scanner fallback is broken; Typesense failures should return `null` and allow local analysis to continue. |
