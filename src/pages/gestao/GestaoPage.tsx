import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Briefcase as ServicesIcon, Newspaper, FolderOpen, Users, Scale, Settings,
  LogOut, ExternalLink, FileLock2, Mail, Image, History, Search, Menu, X,
} from 'lucide-react';
import { AppShell } from '../../components/ui/AppShell';
import { ToastProvider } from '../../components/ui/Toast';
import { Badge } from '../../components/ui/Badge';
import { useProposalMeta } from '../proposals/useProposalMeta';
import { useVaultSession } from '../vault/useVaultSession';
import { LoginPanel } from '../vault/LoginPanel';
import { useIsAdmin } from '../../lib/cms/useIsAdmin';
import { listContactSubmissions } from '../../lib/cms/api';
import { GestaoSearchDialog } from './components/GestaoSearchDialog';
import { DashboardSection } from './sections/DashboardSection';
import { ServicesSection } from './sections/ServicesSection';
import { BlogSection } from './sections/BlogSection';
import { CaseStudiesSection } from './sections/CaseStudiesSection';
import { CareersSection } from './sections/CareersSection';
import { LegalSection } from './sections/LegalSection';
import { SettingsSection } from './sections/SettingsSection';
import { MessagesSection } from './sections/MessagesSection';
import { MediaSection } from './sections/MediaSection';
import { AuditSection } from './sections/AuditSection';

type Section =
  | 'overview' | 'services' | 'blog' | 'case-studies' | 'careers'
  | 'messages' | 'media' | 'legal' | 'settings' | 'audit';

const SECTION_TITLES: Record<Section, string> = {
  overview: 'Visão Geral',
  services: 'Serviços',
  blog: 'Blog',
  'case-studies': 'Casos de Estudo',
  careers: 'Carreiras',
  messages: 'Mensagens',
  media: 'Média',
  legal: 'Legal',
  settings: 'Definições do Site',
  audit: 'Auditoria',
};

function GestaoInner() {
  useProposalMeta('Gestão de Conteúdo — Alio Analytics');
  const { loading, email, isCorporate, signOut } = useVaultSession();
  const isAdmin = useIsAdmin(email);
  const [section, setSection] = useState<Section>('overview');
  const [searchOpen, setSearchOpen] = useState(false);
  const [focusSlug, setFocusSlug] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  useEffect(() => {
    listContactSubmissions()
      .then((msgs) => setNewMessagesCount(msgs.filter((m) => m.status === 'new').length))
      .catch(() => {});
  }, [section]);

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

  if (loading) return null;

  if (!email || !isCorporate) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-subtle px-4">
        <LoginPanel />
      </div>
    );
  }

  const navItem = (id: Section, icon: React.ReactNode, label: React.ReactNode) => ({
    label,
    icon,
    active: section === id,
    onClick: () => { setSection(id); setMobileNavOpen(false); },
  });

  const navItems = [
    navItem('overview', <LayoutDashboard size={16} />, 'Visão Geral'),
    navItem('services', <ServicesIcon size={16} />, 'Serviços'),
    navItem('blog', <Newspaper size={16} />, 'Blog'),
    navItem('case-studies', <FolderOpen size={16} />, 'Casos de Estudo'),
    navItem('careers', <Users size={16} />, 'Carreiras'),
    navItem(
      'messages',
      <Mail size={16} />,
      newMessagesCount > 0 ? (
        <span className="flex items-center gap-2">
          Mensagens
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger-500 px-1.5 text-caption font-semibold text-white">
            {newMessagesCount}
          </span>
        </span>
      ) : (
        'Mensagens'
      ),
    ),
    navItem('media', <Image size={16} />, 'Média'),
    ...(isAdmin
      ? [
          navItem('legal', <Scale size={16} />, 'Legal'),
          navItem('settings', <Settings size={16} />, 'Definições'),
          navItem('audit', <History size={16} />, 'Auditoria'),
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-bg-subtle p-4">
      {mobileNavOpen && (
        <div className="fixed inset-0 z-modal md:hidden">
          <div className="absolute inset-0 bg-neutral-950/50" onClick={() => setMobileNavOpen(false)} />
          <nav className="absolute inset-y-0 left-0 flex w-72 flex-col gap-1 overflow-y-auto bg-primary-950 p-3 text-white">
            <div className="mb-2 flex items-center justify-between px-2 py-2">
              <span className="font-display text-h6">alio · gestão</span>
              <button onClick={() => setMobileNavOpen(false)} aria-label="Fechar menu" className="text-primary-200">
                <X size={20} />
              </button>
            </div>
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={item.onClick}
                className={
                  'flex items-center gap-3 rounded-md px-3 py-2 text-body-s font-medium transition-colors ' +
                  (item.active ? 'bg-[rgba(47,203,226,0.16)] text-white' : 'text-primary-200 hover:bg-white/5 hover:text-white')
                }
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <AppShell
        className="mx-auto min-h-[calc(100vh-2rem)] max-w-[1400px] !rounded-2xl"
        brand="alio · gestão"
        nav={navItems}
        topbar={
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileNavOpen(true)}
                aria-label="Abrir menu"
                className="-ml-1 rounded-md p-1.5 text-secondary hover:bg-bg-subtle md:hidden"
              >
                <Menu size={18} />
              </button>
              <h1 className="text-h6 font-display text-primary">{SECTION_TITLES[section]}</h1>
              {isAdmin && <Badge variant="brand" size="sm">Admin</Badge>}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-body-s font-medium text-tertiary hover:border-brand hover:text-brand sm:inline-flex"
              >
                <Search size={14} /> Pesquisar
                <kbd className="hidden rounded border border-border px-1 font-mono text-caption sm:inline">⌘K</kbd>
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Pesquisar"
                className="rounded-md p-1.5 text-tertiary hover:bg-bg-subtle sm:hidden"
              >
                <Search size={16} />
              </button>
              <a
                href="/documentos"
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-body-s font-medium text-secondary hover:bg-bg-subtle hover:text-primary sm:px-3"
              >
                <FileLock2 size={14} /> <span className="hidden sm:inline">Documentos</span>
              </a>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-body-s font-medium text-secondary hover:bg-bg-subtle hover:text-primary sm:px-3"
              >
                <ExternalLink size={14} /> <span className="hidden sm:inline">Ver site</span>
              </a>
              <span className="hidden text-body-s text-tertiary lg:inline">{email}</span>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-body-s font-medium text-secondary hover:bg-bg-subtle hover:text-primary sm:px-3"
              >
                <LogOut size={14} /> <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        }
      >
        {section === 'overview' && <DashboardSection onNavigate={setSection} />}
        {section === 'services' && <ServicesSection focusSlug={focusSlug} onFocusConsumed={() => setFocusSlug(null)} />}
        {section === 'blog' && <BlogSection focusSlug={focusSlug} onFocusConsumed={() => setFocusSlug(null)} />}
        {section === 'case-studies' && <CaseStudiesSection focusSlug={focusSlug} onFocusConsumed={() => setFocusSlug(null)} />}
        {section === 'careers' && <CareersSection focusSlug={focusSlug} onFocusConsumed={() => setFocusSlug(null)} />}
        {section === 'messages' && <MessagesSection />}
        {section === 'media' && <MediaSection />}
        {section === 'legal' && isAdmin && <LegalSection />}
        {section === 'settings' && isAdmin && <SettingsSection />}
        {section === 'audit' && isAdmin && <AuditSection />}
      </AppShell>

      {searchOpen && (
        <GestaoSearchDialog
          isAdmin={isAdmin}
          onClose={() => setSearchOpen(false)}
          onNavigate={(s, slug) => { setSection(s); setFocusSlug(slug ?? null); }}
        />
      )}
    </div>
  );
}

export default function GestaoPage() {
  return (
    <ToastProvider>
      <GestaoInner />
    </ToastProvider>
  );
}
