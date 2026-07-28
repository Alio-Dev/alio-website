import { useEffect, useState } from 'react';
import { History, RotateCcw } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useToast } from '../../../components/ui/Toast';
import { listRevisions, restoreRevision } from '../../../lib/cms/api';
import type { ContentRevision } from '../../../lib/cms/types';

const ACTION_LABEL: Record<string, string> = { update: 'editado', delete: 'apagado' };

export function RevisionHistory({
  tableName,
  recordId,
  onRestored,
}: {
  tableName: string;
  recordId: string | null;
  onRestored: () => void;
}) {
  const { toast } = useToast();
  const [revisions, setRevisions] = useState<ContentRevision[] | null>(null);
  const [restoring, setRestoring] = useState<number | null>(null);

  useEffect(() => {
    if (!recordId) { setRevisions([]); return; }
    listRevisions(tableName, recordId).then(setRevisions).catch(() => setRevisions([]));
  }, [tableName, recordId]);

  const restore = async (rev: ContentRevision) => {
    if (!window.confirm('Restaurar esta versão? Substitui o conteúdo actual.')) return;
    setRestoring(rev.id);
    try {
      await restoreRevision(rev);
      toast({ title: 'Versão restaurada', variant: 'success' });
      onRestored();
    } catch (err) {
      toast({ title: 'Falha ao restaurar', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    } finally {
      setRestoring(null);
    }
  };

  if (!recordId) return null;

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <History size={16} className="text-tertiary" />
        <h3 className="text-h6 text-primary">Histórico de versões</h3>
      </div>
      {revisions === null ? (
        <Skeleton className="h-16 w-full" />
      ) : revisions.length === 0 ? (
        <p className="text-body-s text-tertiary">Ainda sem alterações anteriores guardadas.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border-subtle">
          {revisions.map((rev) => (
            <li key={rev.id} className="flex items-center justify-between py-2">
              <span className="text-body-s text-secondary">
                {ACTION_LABEL[rev.action] ?? rev.action} por{' '}
                <span className="font-medium text-primary">{rev.actor_email ?? 'alguém'}</span>{' '}
                — {new Date(rev.created_at).toLocaleString('pt-PT')}
              </span>
              <Button
                size="sm"
                variant="outline"
                loading={restoring === rev.id}
                leftIcon={<RotateCcw size={13} />}
                onClick={() => restore(rev)}
              >
                Restaurar
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
