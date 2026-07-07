import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Moon, Search, Sun, X, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import { ThemeProvider, useTheme } from '../../design-system/ThemeProvider';
import { ToastProvider } from '../../components/ui/Toast';
import { NAV, BASE } from './nav';
import { SearchDialog } from './components/SearchDialog';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-secondary transition-colors hover:bg-bg-subtle hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname, hash } = useLocation();
  const current = pathname + (hash || '');
  return (
    <nav className="flex flex-col gap-6 p-4">
      {NAV.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-3 font-mono text-caption uppercase tracking-[0.08em] text-tertiary">
            {group.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.links.map((link) => {
              const active = current === link.to || pathname === link.to;
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={onNavigate}
                    className={cn(
                      'block rounded-md px-3 py-1.5 text-body-s transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
                      active
                        ? 'bg-brand-subtle font-medium text-brand'
                        : 'text-secondary hover:bg-bg-subtle hover:text-primary',
                    )}
                  >
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function LayoutInner({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile nav on route change; scroll to top.
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Cmd/Ctrl+K opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="ds-root min-h-screen bg-bg">
      {/* Topbar */}
      <header className="sticky top-0 z-sticky flex h-14 items-center gap-3 border-b border-border bg-bg/90 px-4 backdrop-blur-md">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-secondary hover:bg-bg-subtle lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <Link to={BASE} className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-md">
          <img src="/Alio.svg" alt="Alio" className="h-7 w-auto" />
          <span className="font-display text-h6 text-primary">Design System</span>
        </Link>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-surface px-2.5 text-body-s text-tertiary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Search"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-border px-1 font-mono text-[11px] sm:inline">⌘K</kbd>
          </button>
          <ThemeToggle />
          <a
            href="https://www.alio.ao"
            className="hidden items-center gap-1 rounded-md px-2.5 py-1.5 text-body-s font-medium text-secondary hover:text-primary sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            alio.ao <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      <div className="mx-auto flex max-w-container">
        {/* Desktop sidebar */}
        <aside className="ds-scroll sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border lg:block">
          <SidebarNav />
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-drawer lg:hidden">
            <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="ds-scroll absolute left-0 top-0 h-full w-72 overflow-y-auto border-r border-border bg-bg animate-slide-in-right">
              <div className="flex h-14 items-center justify-between border-b border-border px-4">
                <span className="font-display text-h6 text-primary">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation"
                  className="rounded-md p-1 text-secondary hover:bg-bg-subtle"
                >
                  <X size={20} />
                </button>
              </div>
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Content */}
        <main className="min-w-0 flex-1 px-5 py-10 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <LayoutInner>{children}</LayoutInner>
      </ToastProvider>
    </ThemeProvider>
  );
}
