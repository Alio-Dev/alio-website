import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Briefcase as ServicesIcon, Newspaper, FolderOpen, Users, Scale, Settings,
  LogOut, ExternalLink, FileLock2, Mail, Image, History, Search,
} from 'lucide-react';
import { AppShell } from '../../components/ui/AppShell';
import { ToastProvider } from '../../components/ui/Toast';
import { Badge } from '../../components/ui/Badge';
import { useProposalMeta } from '../proposals/useProposalMeta';
import { useVaultSession } from '../vault/useVaultSession';
import { LoginPanel } from '../vault/LoginPanel';
import { useIsAdmin } from '../../lib/cms/useIsAdmin';
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

  const navItem = (id: Section, icon: React.ReactNode, label: string) => ({
    label,
    icon,
    active: section === id,
    onClick: () => setSection(id),
  });

  return (
    <div className="min-h-screen bg-bg-subtle p-4">
      <AppShell
        className="mx-auto min-h-[calc(100vh-2rem)] max-w-[1400px] !rounded-2xl"
        brand="alio · gestão"
        nav={[
          navItem('overview', <LayoutDashboard size={16} />, 'Visão Geral'),
          navItem('services', <ServicesIcon size={16} />, 'Serviços'),
          navItem('blog', <Newspaper size={16} />, 'Blog'),
          navItem('case-studies', <FolderOpen size={16} />, 'Casos de Estudo'),
          navItem('careers', <Users size={16} />, 'Carreiras'),
          navItem('messages', <Mail size={16} />, 'Mensagens'),
          navItem('media', <Image size={16} />, 'Média'),
          ...(isAdmin
            ? [
                navItem('legal', <Scale size={16} />, 'Legal'),
                navItem('settings', <Settings size={16} />, 'Definições'),
                navItem('audit', <History size={16} />, 'Auditoria'),
              ]
            : []),
        ]}
        topbar={
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-h6 font-display text-primary">{SECTION_TITLES[section]}</h1>
              {isAdmin && <Badge variant="brand" size="sm">Admin</Badge>}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-body-s font-medium text-tertiary hover:border-brand hover:text-brand"
              >
                <Search size={14} /> Pesquisar
                <kbd className="hidden rounded border border-border px-1 font-mono text-caption sm:inline">⌘K</kbd>
              </button>
              <a
                href="/documentos"
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-body-s font-medium text-secondary hover:bg-bg-subtle hover:text-primary"
              >
                <FileLock2 size={14} /> Documentos
              </a>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-body-s font-medium text-secondary hover:bg-bg-subtle hover:text-primary"
              >
                <ExternalLink size={14} /> Ver site
              </a>
              <span className="text-body-s text-tertiary">{email}</span>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-body-s font-medium text-secondary hover:bg-bg-subtle hover:text-primary"
              >
                <LogOut size={14} /> Sair
              </button>
            </div>
          </div>
        }
      >
        {section === 'overview' && <DashboardSection onNavigate={setSection} />}
        {section === 'services' && <ServicesSection />}
        {section === 'blog' && <BlogSection />}
        {section === 'case-studies' && <CaseStudiesSection />}
        {section === 'careers' && <CareersSection />}
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
          onNavigate={setSection}
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
