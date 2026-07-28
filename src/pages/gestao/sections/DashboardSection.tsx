import { useEffect, useState } from 'react';
import { Newspaper, FolderOpen, Users, Mail, Clock } from 'lucide-react';
import { KpiCard } from '../../../components/ui/KpiCard';
import { Card } from '../../../components/ui/Card';
import { Skeleton } from '../../../components/ui/Skeleton';
import {
  listServicePages, listBlogPosts, listCaseStudies, listJobOpenings,
  listContactSubmissions, listAuditLog,
} from '../../../lib/cms/api';
import type { AuditLogEntry } from '../../../lib/cms/types';

type Section = 'overview' | 'services' | 'blog' | 'case-studies' | 'careers' | 'legal' | 'settings' | 'messages' | 'media' | 'audit';

const ACTION_LABELS: Record<string, string> = { insert: 'criou', update: 'editou', delete: 'apagou' };
const TABLE_LABELS: Record<string, string> = {
  alio_service_pages: 'um serviço', alio_blog_posts: 'um artigo', alio_case_studies: 'um caso de estudo',
  alio_job_openings: 'uma vaga', alio_legal_docs: 'um documento legal', alio_site_settings: 'as definições',
};

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'agora';
  if (mins < 60) return `há ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `há ${hours}h`;
  return `há ${Math.floor(hours / 24)}d`;
}

export function DashboardSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [counts, setCounts] = useState<{
    services: { published: number; total: number };
    blog: { published: number; total: number };
    cases: { published: number; total: number };
    jobs: { published: number; total: number };
    newMessages: number;
  } | null>(null);
  const [activity, setActivity] = useState<AuditLogEntry[] | null>(null);

  useEffect(() => {
    Promise.all([listServicePages(), listBlogPosts(), listCaseStudies(), listJobOpenings(), listContactSubmissions()])
      .then(([services, blog, cases, jobs, messages]) => {
        setCounts({
          services: { published: services.filter((s) => s.published).length, total: services.length },
          blog: { published: blog.filter((b) => b.published).length, total: blog.length },
          cases: { published: cases.filter((c) => c.published).length, total: cases.length },
          jobs: { published: jobs.filter((j) => j.published).length, total: jobs.length },
          newMessages: messages.filter((m) => m.status === 'new').length,
        });
      })
      .catch(() => setCounts({
        services: { published: 0, total: 0 }, blog: { published: 0, total: 0 },
        cases: { published: 0, total: 0 }, jobs: { published: 0, total: 0 }, newMessages: 0,
      }));

    listAuditLog(8).then(setActivity).catch(() => setActivity([]));
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {counts === null ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button onClick={() => onNavigate('services')} className="text-left">
            <KpiCard label="Serviços" value={`${counts.services.published}/${counts.services.total}`} icon={<Users size={16} />} />
          </button>
          <button onClick={() => onNavigate('blog')} className="text-left">
            <KpiCard label="Artigos publicados" value={String(counts.blog.published)} icon={<Newspaper size={16} />} />
          </button>
          <button onClick={() => onNavigate('case-studies')} className="text-left">
            <KpiCard label="Casos publicados" value={String(counts.cases.published)} icon={<FolderOpen size={16} />} />
          </button>
          <button onClick={() => onNavigate('messages')} className="text-left">
            <KpiCard label="Mensagens novas" value={String(counts.newMessages)} icon={<Mail size={16} />} />
          </button>
        </div>
      )}

      <Card>
        <div className="mb-4 flex items-center gap-2">
          <Clock size={16} className="text-tertiary" />
          <h3 className="text-h6 text-primary">Actividade recente</h3>
        </div>
        {activity === null ? (
          <Skeleton className="h-32 w-full" />
        ) : activity.length === 0 ? (
          <p className="text-body-s text-tertiary">Ainda sem actividade registada.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-border-subtle">
            {activity.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between py-2.5 text-body-s">
                <span className="text-secondary">
                  <span className="font-medium text-primary">{entry.actor_email ?? 'alguém'}</span>{' '}
                  {ACTION_LABELS[entry.action] ?? entry.action}{' '}
                  {TABLE_LABELS[entry.table_name] ?? entry.table_name}
                  {entry.summary ? <> — <span className="text-tertiary">{entry.summary}</span></> : null}
                </span>
                <span className="shrink-0 text-caption text-tertiary">{timeAgo(entry.created_at)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
