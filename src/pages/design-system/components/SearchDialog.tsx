import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { ALL_LINKS, NAV, type NavLink } from '../nav';

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const groupOf = useMemo(() => {
    const map = new Map<string, string>();
    NAV.forEach((g) => g.links.forEach((l) => map.set(l.to, g.title)));
    return map;
  }, []);

  const results = useMemo<NavLink[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_LINKS.slice(0, 8);
    return ALL_LINKS.filter((l) => {
      const hay = `${l.label} ${(l.keywords ?? []).join(' ')} ${groupOf.get(l.to) ?? ''}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 10);
  }, [query, groupOf]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === 'Enter' && results[active]) {
        e.preventDefault();
        navigate(results[active].to);
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, results, active, navigate, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="ds-root fixed inset-0 z-modal flex items-start justify-center p-4 pt-[10vh]">
      <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div
        role="dialog"
        aria-label="Search the design system"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-float animate-scale-in"
      >
        <div className="flex items-center gap-3 border-b border-border-subtle px-4">
          <Search size={18} className="text-tertiary" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components, tokens, guidelines…"
            className="h-12 flex-1 bg-transparent text-body-m text-primary outline-none placeholder:text-tertiary"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-caption text-tertiary sm:block">
            Esc
          </kbd>
        </div>
        <ul className="ds-scroll max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-body-s text-tertiary">No results for “{query}”.</li>
          )}
          {results.map((r, i) => (
            <li key={r.to}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  navigate(r.to);
                  onClose();
                }}
                className={cn(
                  'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left',
                  i === active ? 'bg-brand-subtle text-brand' : 'text-secondary hover:bg-bg-subtle',
                )}
              >
                <span className="flex flex-col">
                  <span className="text-body-s font-medium text-primary">{r.label}</span>
                  <span className="text-caption text-tertiary">{groupOf.get(r.to)}</span>
                </span>
                {i === active && <CornerDownLeft size={14} className="text-tertiary" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
