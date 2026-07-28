import { useState } from 'react';
import {
  LayoutDashboard, Briefcase as ServicesIcon, Newspaper, FolderOpen, Users, Scale, Settings, LogOut, ExternalLink, FileLock2,
} from 'lucide-react';
import { AppShell } from '../../components/ui/AppShell';
import { ToastProvider } from '../../components/ui/Toast';
import { useProposalMeta } from '../proposals/useProposalMeta';
import { useVaultSession } from '../vault/useVaultSession';
import { LoginPanel } from '../vault/LoginPanel';
import { ServicesSection } from './sections/ServicesSection';
import { BlogSection } from './sections/BlogSection';
import { CaseStudiesSection } from './sections/CaseStudiesSection';
import { CareersSection } from './sections/CareersSection';
import { LegalSection } from './sections/LegalSection';
import { SettingsSection } from './sections/SettingsSection';

type Section = 'overview' | 'services' | 'blog' | 'case-studies' | 'careers' | 'legal' | 'settings';

const SECTION_TITLES: Record<Section, string> = {
  overview: 'Visão Geral',
  services: 'Serviços',
  blog: 'Blog',
  'case-studies': 'Casos de Estudo',
  careers: 'Carreiras',
  legal: 'Legal',
  settings: 'Definições do Site',
};

function Overview({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const cards: { section: Section; label: string; desc: string }[] = [
    { section: 'services', label: 'Serviços', desc: 'Editar as 6 páginas de serviço' },
    { section: 'blog', label: 'Blog', desc: 'Artigos e insights' },
    { section: 'case-studies', label: 'Casos de Estudo', desc: 'Trabalho com clientes' },
    { section: 'careers', label: 'Carreiras', desc: 'Vagas abertas' },
    { section: 'legal', label: 'Legal', desc: 'Privacidade e Termos' },
    { section: 'settings', label: 'Definições', desc: 'Contacto e redes sociais' },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <button
          key={c.section}
          onClick={() => onNavigate(c.section)}
          className="rounded-lg border border-border-subtle bg-surface p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <h3 className="font-display text-h6 text-primary">{c.label}</h3>
          <p className="mt-1 text-body-s text-tertiary">{c.desc}</p>
        </button>
      ))}
    </div>
  );
}

function GestaoInner() {
  useProposalMeta('Gestão de Conteúdo — Alio Analytics');
  const { loading, email, isCorporate, signOut } = useVaultSession();
  const [section, setSection] = useState<Section>('overview');

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
        className="mx-auto min-h-[calc(100vh-2rem)] max-w-[1400px] rounded-2xl"
        brand="alio · gestão"
        nav={[
          navItem('overview', <LayoutDashboard size={16} />, 'Visão Geral'),
          navItem('services', <ServicesIcon size={16} />, 'Serviços'),
          navItem('blog', <Newspaper size={16} />, 'Blog'),
          navItem('case-studies', <FolderOpen size={16} />, 'Casos de Estudo'),
          navItem('careers', <Users size={16} />, 'Carreiras'),
          navItem('legal', <Scale size={16} />, 'Legal'),
          navItem('settings', <Settings size={16} />, 'Definições'),
        ]}
        topbar={
          <div className="flex w-full items-center justify-between">
            <h1 className="text-h6 font-display text-primary">{SECTION_TITLES[section]}</h1>
            <div className="flex items-center gap-2">
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
        {section === 'overview' && <Overview onNavigate={setSection} />}
        {section === 'services' && <ServicesSection />}
        {section === 'blog' && <BlogSection />}
        {section === 'case-studies' && <CaseStudiesSection />}
        {section === 'careers' && <CareersSection />}
        {section === 'legal' && <LegalSection />}
        {section === 'settings' && <SettingsSection />}
      </AppShell>
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
