import OptimizeClient from "./OptimizeClient";
import LogoMark from "../components/LogoMark";

export const metadata = { title: "Optimize" };

// Self-contained page: after the "web is marketing-only" refactor the shared
// dashboard chrome (Sidebar/TopBar) no longer exists, so this page carries its
// own minimal header instead of depending on deleted components.
export default function OptimizePage() {
  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <header className="border-b border-border-subtle bg-surface-container-low/80 backdrop-blur-xl px-margin-mobile md:px-margin-desktop py-5 flex items-center gap-3">
        <a className="flex items-center gap-2" href="/">
          <LogoMark className="w-8 h-8 rounded-lg" priority />
          <span className="font-headline-md text-headline-md font-semibold text-on-background leading-none tracking-[-0.03em]">
            Metriq
          </span>
        </a>
        <span className="h-4 w-px bg-border-subtle" />
        <span className="font-label-md text-label-md text-on-surface-variant">Optimize</span>
      </header>
      <OptimizeClient />
    </div>
  );
}
