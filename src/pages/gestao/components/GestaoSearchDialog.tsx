import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search } from 'lucide-react';
import { listServicePages, listBlogPosts, listCaseStudies, listJobOpenings } from '../../../lib/cms/api';

export type GestaoSection =
  | 'overview' | 'services' | 'blog' | 'case-studies' | 'careers'
  | 'messages' | 'media' | 'legal' | 'settings' | 'audit';

interface SearchItem {
  label: string;
  group: string;
  section: GestaoSection;
  keywords: string;
}

const STATIC_ITEMS: SearchItem[] = [
  { label: 'Visão Geral', group: 'Navegação', section: 'overview', keywords: 'dashboard início' },
  { label: 'Serviços', group: 'Navegação', section: 'services', keywords: 'páginas de serviço' },
  { label: 'Blog', group: 'Navegação', section: 'blog', keywords: 'artigos insights' },
  { label: 'Casos de Estudo', group: 'Navegação', section: 'case-studies', keywords: 'clientes portfólio' },
  { label: 'Carreiras', group: 'Navegação', section: 'careers', keywords: 'vagas emprego' },
  { label: 'Mensagens', group: 'Navegação', section: 'messages', keywords: 'contacto formulário' },
  { label: 'Média', group: 'Navegação', section: 'media', keywords: 'imagens biblioteca' },
  { label: 'Legal', group: 'Navegação', section: 'legal', keywords: 'privacidade termos' },
  { label: 'Definições', group: 'Navegação', section: 'settings', keywords: 'equipa contacto redes sociais' },
  { label: 'Auditoria', group: 'Navegação', section: 'audit', keywords: 'actividade histórico' },
];

const ADMIN_ONLY_SECTIONS: GestaoSection[] = ['legal', 'settings', 'audit'];

export function GestaoSearchDialog({
  isAdmin,
  onClose,
  onNavigate,
}: {
  isAdmin: boolean;
  onClose: () => void;
  onNavigate: (s: GestaoSection) => void;
}) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [contentItems, setContentItems] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([listServicePages(), listBlogPosts(), listCaseStudies(), listJobOpenings()])
      .then(([services, blog, cases, jobs]) => {
        setContentItems([
          ...services.map((s) => ({ label: s.title.pt, group: 'Serviços', section: 'services' as const, keywords: s.slug })),
          ...blog.map((b) => ({ label: b.title.pt || b.slug, group: 'Blog', section: 'blog' as const, keywords: b.slug })),
          ...cases.map((c) => ({ label: c.title.pt || c.slug, group: 'Casos de Estudo', section: 'case-studies' as const, keywords: c.slug })),
          ...jobs.map((j) => ({ label: j.title.pt || j.slug, group: 'Carreiras', section: 'careers' as const, keywords: j.slug })),
        ]);
      })
      .catch(() => setContentItems([]));
  }, []);

  const results = useMemo(() => {
    const all = [...STATIC_ITEMS, ...contentItems].filter(
      (i) => isAdmin || !ADMIN_ONLY_SECTIONS.includes(i.section),
    );
    const q = query.trim().toLowerCase();
    if (!q) return all.slice(0, 8);
    return all.filter((i) => `${i.label} ${i.keywords} ${i.group}`.toLowerCase().includes(q)).slice(0, 10);
  }, [query, contentItems, isAdmin]);

  useEffect(() => {
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      if (e.key === 'Enter' && results[active]) {
        e.preventDefault();
        onNavigate(results[active].section);
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [results, active, onNavigate, onClose]);

  return createPortal(
    <div className="fixed inset-0 z-modal flex items-start justify-center p-4 pt-[10vh]">
      <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div
        role="dialog"
        aria-label="Pesquisar no painel de gestão"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-float animate-scale-in"
      >
        <div className="flex items-center gap-3 border-b border-border-subtle px-4">
          <Search size={18} className="text-tertiary" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            placeholder="Pesquisar secções, artigos, serviços…"
            className="h-12 flex-1 bg-transparent text-body-m text-primary outline-none placeholder:text-tertiary"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-caption text-tertiary sm:block">Esc</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="p-4 text-center text-body-s text-tertiary">Sem resultados.</p>
          ) : (
            results.map((item, i) => (
              <button
                key={`${item.section}-${item.label}-${i}`}
                onClick={() => { onNavigate(item.section); onClose(); }}
                onMouseEnter={() => setActive(i)}
                className={
                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-body-s transition-colors ' +
                  (i === active ? 'bg-brand-subtle text-brand' : 'text-secondary hover:bg-bg-subtle')
                }
              >
                <span>{item.label}</span>
                <span className="text-caption text-tertiary">{item.group}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
