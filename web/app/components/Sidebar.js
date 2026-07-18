import LogoMark from "./LogoMark";

const NAV_ITEMS = [
  { key: "usage", label: "Dashboard", href: "/usage", icon: "space_dashboard" },
  { key: "optimize", label: "Optimize", href: "/optimize", icon: "auto_fix_high" },
  { key: "prompt-studio", label: "Prompt Studio", href: "/prompt-studio", icon: "bolt" },
  { key: "sessions", label: "Sessions", href: "/sessions", icon: "history" },
  { key: "sustainability", label: "Sustainability", href: "/sustainability", icon: "eco" },
  // ?landing=1 bypasses the auto-redirect to /usage for local users.
  { key: "overview", label: "Landing page", href: "/?landing=1", icon: "home" },
];

const FOOTER_ITEMS = [
  {
    key: "docs",
    label: "Docs",
    href: "https://github.com/khushcoding123/TokenTrackStuff#readme",
    icon: "description",
    external: true,
  },
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/khushcoding123/TokenTrackStuff",
    icon: "code",
    external: true,
  },
];

function NavLink({ item, isActive }) {
  return (
    <a
      className={
        isActive
          ? "flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface font-medium border border-border-subtle bg-on-background/[0.055] transition-colors duration-200"
          : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant font-medium border border-transparent hover:border-border-subtle hover:bg-on-background/[0.035] hover:text-on-surface transition-colors duration-200"
      }
      href={item.href}
      rel={item.external ? "noreferrer noopener" : undefined}
      target={item.external ? "_blank" : undefined}
    >
      <span
        className="material-symbols-outlined text-[20px]"
        style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
      >
        {item.icon}
      </span>
      {item.label}
    </a>
  );
}

export default function Sidebar({ active }) {
  return (
    <nav className="hidden md:flex flex-col h-full py-stack-lg fixed w-64 left-0 top-0 bg-surface-container-low/95 backdrop-blur-xl border-r border-border-subtle z-40">
      <div className="px-5 mb-10 flex items-center gap-3">
        <LogoMark className="w-8 h-8 rounded-lg" priority />
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold text-on-background leading-none tracking-[-0.03em]">
            Metriq
          </h1>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            v0.1.0
          </span>
        </div>
      </div>

      <ul className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.key}>
            <NavLink item={item} isActive={active === item.key} />
          </li>
        ))}
      </ul>

      <div className="px-3 space-y-1 pt-stack-md border-t border-border-subtle">
        {FOOTER_ITEMS.map((item) => (
          <NavLink key={item.key} item={item} isActive={active === item.key} />
        ))}
      </div>
    </nav>
  );
}
