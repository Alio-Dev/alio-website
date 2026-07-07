import { cn } from '../../lib/cn';

export interface AppShellNavItem {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface AppShellProps {
  brand?: React.ReactNode;
  nav: AppShellNavItem[];
  topbar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * AppShell — canonical dashboard chrome from BRAND.md §6:
 * 264px navy sidebar (#131840), 56px topbar, neutral content well.
 * Self-contained; used as the base for dashboard patterns.
 */
export function AppShell({ brand, nav, topbar, children, className }: AppShellProps) {
  return (
    <div className={cn('flex min-h-[420px] overflow-hidden rounded-xl border border-border', className)}>
      {/* Sidebar */}
      <aside className="hidden w-[264px] shrink-0 flex-col bg-primary-950 text-white md:flex">
        <div className="flex h-14 items-center px-5 text-h6 font-display">{brand ?? 'alio'}</div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-body-s font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400',
                item.active
                  ? 'bg-[rgba(47,203,226,0.16)] text-white'
                  : 'text-primary-200 hover:bg-white/5 hover:text-white',
              )}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col bg-bg-subtle">
        <header className="flex h-14 items-center gap-4 border-b border-border bg-surface px-5">
          {topbar}
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
