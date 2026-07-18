import Hero from "./components/landing/Hero";
import ProductPreview from "./components/landing/ProductPreview";
import BeforeAfter from "./components/landing/BeforeAfter";
import HowItWorks from "./components/landing/HowItWorks";
import BrowserExtension from "./components/landing/BrowserExtension";
import Metrics from "./components/landing/Metrics";
import Testimonials from "./components/landing/Testimonials";
import { redirect } from "next/navigation";
import { getSession } from "./lib/session";
import { getClaudeDirs } from "../../src/core/usage/claude.js";
import { getCodexSessionsDir } from "../../src/core/usage/codex.js";
import { getCursorProjectsDir } from "../../src/core/usage/cursor.js";
import LogoMark from "./components/LogoMark";

// The auto-open check below reads cookies + the local filesystem per request.
export const dynamic = "force-dynamic";

const RELEASES_URL = "https://github.com/khushcoding123/TokenTrackStuff/releases";
// Direct one-click download of the latest release's Windows asset. GitHub's
// /releases/latest/download/<name> URL always resolves to the newest release's
// asset with that exact filename — so publish the build named "Metriq-Windows.zip".
const WIN_DOWNLOAD =
  "https://github.com/khushcoding123/TokenTrackStuff/releases/latest/download/Metriq-Windows.zip";
// Same one-click pattern for the macOS installer — publish the build named
// "Metriq.dmg" and this always resolves to the newest release's copy.
const MAC_DOWNLOAD =
  "https://github.com/khushcoding123/TokenTrackStuff/releases/latest/download/Metriq.dmg";

export const metadata = { title: "Metriq focuses your prompts before you send them" };

export default async function LandingPage({ searchParams }) {
  const params = await searchParams;

  // Opening the app should land you straight on the dashboard: anyone who is
  // signed in, or running this locally where agent logs exist, is a user of
  // the product — not a visitor who needs the marketing pitch. ?landing=1
  // (the sidebar's "Landing page" link) always shows this page.
  if (params?.landing !== "1") {
    let isUser = false;
    try {
      isUser = Boolean(await getSession());
    } catch {
      /* auth backend unreachable — fall through to the local-logs check */
    }
    if (!isUser) {
      try {
        isUser =
          getClaudeDirs().length > 0 ||
          Boolean(getCodexSessionsDir()) ||
          Boolean(getCursorProjectsDir());
      } catch {
        /* filesystem unavailable (deployed edge) — show the landing page */
      }
    }
    if (isUser) redirect("/usage");
  }
  return (
    <div className="min-h-screen flex flex-col bg-mesh relative overflow-hidden">
      <div className="absolute top-[-16%] right-[-8%] w-[640px] h-[640px] bg-on-background/[0.035] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[8%] left-[-8%] w-[520px] h-[520px] bg-on-background/[0.025] rounded-full blur-[120px] pointer-events-none" />

      <header className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-7 flex items-center justify-between relative z-10 border-b border-border-subtle/60">
        <div className="flex items-center gap-3">
          <LogoMark className="w-8 h-8 rounded-lg" priority />
          <span className="font-headline-md text-headline-md font-semibold text-on-background leading-none tracking-[-0.03em]">Metriq</span>
        </div>
        <span className="premium-eyebrow hidden sm:inline-flex">Local intelligence</span>
      </header>

      <main className="flex-1 relative z-10">
        <Hero winDownloadUrl={WIN_DOWNLOAD} macDownloadUrl={MAC_DOWNLOAD} releasesUrl={RELEASES_URL} />
        <ProductPreview />
        <BeforeAfter />
        <HowItWorks />
        <BrowserExtension />
        <Metrics />
        <Testimonials />
      </main>

      <footer className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-subtle relative z-10">
        <span className="font-body-sm text-body-sm text-on-surface-variant">© {new Date().getFullYear()} Metriq</span>
        <div className="flex items-center gap-6">
          <a
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
            href="https://github.com/khushcoding123/TokenTrackStuff#readme"
            rel="noreferrer noopener"
            target="_blank"
          >
            Docs
          </a>
          <a
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
            href="https://github.com/khushcoding123/TokenTrackStuff"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
