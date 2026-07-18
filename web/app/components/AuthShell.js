import LogoMark from "./LogoMark";

// Shared two-panel layout for /login and /signup: a brand panel on the left
// (hidden on mobile), the form on the right. Plain Server Component — no
// client state needed here.
export default function AuthShell({ title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden md:flex md:w-[46%] relative overflow-hidden bg-mesh items-center justify-center p-12 border-r border-border-subtle">
        <a
          className="absolute top-7 left-7 w-10 h-10 rounded-lg bg-surface-glass border border-border-subtle flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-outline-variant transition-colors"
          href="/"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </a>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-on-background/[0.035] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[450px] h-[450px] bg-on-background/[0.025] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-sm text-center flex flex-col items-center gap-stack-lg">
          <LogoMark className="w-14 h-14 rounded-xl" priority />
          <h2 className="font-display text-headline-lg text-on-background leading-tight">
            Stop burning tokens on <span className="gradient-text">vague prompts.</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Metriq checks your prompt against your real codebase before it ever reaches Claude, ChatGPT, Cursor, or
            VS Code.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-margin-mobile md:px-margin-desktop py-stack-xl relative overflow-hidden bg-surface-container-low/20">
        <div className="md:hidden absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-on-background/[0.025] rounded-full blur-[120px] pointer-events-none" />
        <div className="glass-card w-full max-w-md relative z-10 p-6 sm:p-8 md:p-10">
          <div className="md:hidden flex items-center gap-3 justify-center mb-stack-xl">
            <LogoMark className="w-8 h-8 rounded-lg" priority />
            <span className="font-headline-md text-headline-md font-semibold text-on-background leading-none">Metriq</span>
          </div>

          <h1 className="font-headline-lg text-headline-lg text-on-background mb-1">{title}</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-lg">{subtitle}</p>

          {children}

          {footer && <div className="mt-stack-lg text-center">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
