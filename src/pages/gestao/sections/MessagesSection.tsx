import { useEffect, useState } from 'react';
import { Mail, Archive, Trash2, ArrowLeft } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useToast } from '../../../components/ui/Toast';
import {
  listContactSubmissions, updateSubmissionStatus, deleteContactSubmission,
} from '../../../lib/cms/api';
import type { ContactSubmission } from '../../../lib/cms/types';

const STATUS_VARIANT = { new: 'brand', read: 'neutral', archived: 'neutral' } as const;
const STATUS_LABEL = { new: 'Nova', read: 'Lida', archived: 'Arquivada' };

export function MessagesSection() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactSubmission[] | null>(null);
  const [open, setOpen] = useState<ContactSubmission | null>(null);

  const refresh = () => listContactSubmissions().then(setMessages).catch(() => setMessages([]));
  useEffect(() => { refresh(); }, []);

  const openMessage = async (m: ContactSubmission) => {
    setOpen(m);
    if (m.status === 'new') {
      await updateSubmissionStatus(m.id, 'read').catch(() => {});
      refresh();
    }
  };

  const archive = async (m: ContactSubmission) => {
    try {
      await updateSubmissionStatus(m.id, 'archived');
      toast({ title: 'Mensagem arquivada', variant: 'success' });
      setOpen(null);
      refresh();
    } catch (err) {
      toast({ title: 'Falha', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    }
  };

  const remove = async (m: ContactSubmission) => {
    if (!window.confirm(`Apagar a mensagem de "${m.name}"?`)) return;
    try {
      await deleteContactSubmission(m.id);
      toast({ title: 'Mensagem apagada', variant: 'success' });
      setOpen(null);
      refresh();
    } catch (err) {
      toast({ title: 'Falha', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    }
  };

  if (messages === null) {
    return <div className="flex flex-col gap-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>;
  }

  if (open) {
    return (
      <div className="flex flex-col gap-6">
        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={15} />} onClick={() => setOpen(null)}>Voltar</Button>
        <Card className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-h6 text-primary">{open.name}</h3>
              <p className="text-body-s text-tertiary">{open.email}{open.phone ? ` · ${open.phone}` : ''}{open.company ? ` · ${open.company}` : ''}</p>
            </div>
            <Badge variant={STATUS_VARIANT[open.status]} size="sm">{STATUS_LABEL[open.status]}</Badge>
          </div>
          {open.service && <Badge variant="accent" size="sm" className="w-fit">{open.service}</Badge>}
          <p className="whitespace-pre-wrap text-body-m text-secondary">{open.message}</p>
          <p className="text-caption text-tertiary">{new Date(open.created_at).toLocaleString('pt-PT')}</p>
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" leftIcon={<Archive size={14} />} onClick={() => archive(open)}>Arquivar</Button>
            <Button size="sm" variant="ghost" leftIcon={<Trash2 size={14} />} onClick={() => remove(open)}>Apagar</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (messages.length === 0) {
    return <EmptyState icon={<Mail size={22} />} title="Sem mensagens" description="As submissões do formulário de contacto aparecem aqui." />;
  }

  return (
    <div className="flex flex-col gap-2">
      {messages.map((m) => (
        <Card
          key={m.id}
          interactive
          padding="sm"
          className="flex cursor-pointer items-center justify-between gap-3"
          onClick={() => openMessage(m)}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">{m.name}</span>
              {m.status === 'new' && <Badge variant="brand" size="sm">Nova</Badge>}
            </div>
            <p className="truncate text-body-s text-tertiary">{m.message}</p>
          </div>
          <span className="shrink-0 text-caption text-tertiary">{new Date(m.created_at).toLocaleDateString('pt-PT')}</span>
        </Card>
      ))}
    </div>
  );
}
