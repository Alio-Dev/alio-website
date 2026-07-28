import { useEffect, useState } from 'react';
import { History } from 'lucide-react';
import { Table, THead, TBody, TR, TH, TD } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';
import { listAuditLog } from '../../../lib/cms/api';
import type { AuditLogEntry } from '../../../lib/cms/types';

const ACTION_VARIANT = { insert: 'success', update: 'brand', delete: 'danger' } as const;
const TABLE_LABELS: Record<string, string> = {
  alio_service_pages: 'Serviços', alio_blog_posts: 'Blog', alio_case_studies: 'Casos de Estudo',
  alio_job_openings: 'Carreiras', alio_legal_docs: 'Legal', alio_site_settings: 'Definições',
};

export function AuditSection() {
  const [log, setLog] = useState<AuditLogEntry[] | null>(null);

  useEffect(() => { listAuditLog(200).then(setLog).catch(() => setLog([])); }, []);

  if (log === null) return <Skeleton className="h-96 w-full" />;
  if (log.length === 0) {
    return <EmptyState icon={<History size={22} />} title="Sem actividade" description="Cada alteração a conteúdo (criar, editar, apagar) fica registada aqui." />;
  }

  return (
    <Table>
      <THead>
        <TR><TH>Quando</TH><TH>Quem</TH><TH>Acção</TH><TH>Onde</TH><TH>O quê</TH></TR>
      </THead>
      <TBody>
        {log.map((entry) => (
          <TR key={entry.id}>
            <TD className="whitespace-nowrap text-caption text-tertiary">{new Date(entry.created_at).toLocaleString('pt-PT')}</TD>
            <TD className="font-medium text-primary">{entry.actor_email ?? '—'}</TD>
            <TD>
              <Badge variant={ACTION_VARIANT[entry.action as keyof typeof ACTION_VARIANT] ?? 'neutral'} size="sm">
                {entry.action}
              </Badge>
            </TD>
            <TD>{TABLE_LABELS[entry.table_name] ?? entry.table_name}</TD>
            <TD className="text-secondary">{entry.summary ?? '—'}</TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
