import { useEffect, useState } from 'react';
import { Plus, Save, ArrowLeft, Trash2, Eye, Briefcase } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Field } from '../../../components/ui/Field';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Switch } from '../../../components/ui/Switch';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useToast } from '../../../components/ui/Toast';
import { BilingualField } from '../components/BilingualField';
import { RevisionHistory } from '../components/RevisionHistory';
import { SlugField } from '../components/SlugField';
import { PreviewModal } from '../components/PreviewModal';
import { useDirtyGuard } from '../components/useDirtyGuard';
import { BulkActionsBar } from '../components/BulkActionsBar';
import { listJobOpenings, upsertJobOpening, deleteJobOpening, bulkSetPublished, bulkDelete } from '../../../lib/cms/api';
import type { JobOpening } from '../../../lib/cms/types';

const BLANK: JobOpening = {
  id: '', slug: '', title: { pt: '', en: '' }, department: '', location: 'Luanda / Remoto',
  employment_type: 'Full-time', description: { pt: '', en: '' }, requirements: [], published: false,
  created_at: '', updated_at: '',
};

export function CareersSection({
  focusSlug,
  onFocusConsumed,
}: { focusSlug?: string | null; onFocusConsumed?: () => void } = {}) {
  const { toast } = useToast();
  const [roles, setRoles] = useState<JobOpening[] | null>(null);
  const [editing, setEditing] = useState<JobOpening | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { markPristine, confirmDiscard } = useDirtyGuard(editing);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const refresh = () => listJobOpenings().then(setRoles).catch(() => setRoles([]));
  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    if (!focusSlug || !roles) return;
    const match = roles.find((r) => r.slug === focusSlug);
    if (match) { setEditing(match); markPristine(match); onFocusConsumed?.(); }
  }, [focusSlug, roles, onFocusConsumed]);

  const save = async () => {
    if (!editing) return;
    if (!editing.slug.trim()) {
      toast({ title: 'Slug obrigatório', variant: 'warning' });
      return;
    }
    setSaving(true);
    try {
      await upsertJobOpening(editing);
      toast({ title: 'Vaga guardada', description: editing.slug, variant: 'success' });
      setEditing(null);
      refresh();
    } catch (err) {
      toast({ title: 'Falha ao guardar', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (role: JobOpening) => {
    if (!window.confirm(`Apagar "${role.title.pt || role.slug}"?`)) return;
    try {
      await deleteJobOpening(role.id);
      toast({ title: 'Vaga apagada', variant: 'success' });
      refresh();
    } catch (err) {
      toast({ title: 'Falha ao apagar', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    }
  };

  if (roles === null) {
    return <div className="grid gap-4 sm:grid-cols-2">{Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-24" />)}</div>;
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={15} />} onClick={() => confirmDiscard() && setEditing(null)}>Voltar</Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<Eye size={15} />} onClick={() => setPreviewOpen(true)}>Pré-visualizar</Button>
            <Button size="sm" loading={saving} leftIcon={<Save size={15} />} onClick={save}>Guardar</Button>
          </div>
        </div>

        <PreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)}>
          <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
            <Card className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
                <Briefcase size={18} />
              </div>
              <div>
                <h1 className="font-display text-h5 text-primary">{editing.title.pt || '(sem título)'}</h1>
                <p className="text-body-s text-tertiary">
                  {[editing.department, editing.location, editing.employment_type].filter(Boolean).join(' · ')}
                </p>
                <p className="mt-3 text-body-m text-secondary">{editing.description.pt}</p>
                {editing.requirements.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-body-s text-secondary">
                    {editing.requirements.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                )}
              </div>
            </Card>
          </div>
        </PreviewModal>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-h6 text-primary">{editing.id ? editing.slug : 'Nova vaga'}</h3>
            <Switch
              checked={editing.published}
              onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
              label={editing.published ? 'Publicado' : 'Rascunho'}
            />
          </div>
          <BilingualField label="Título" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
          <SlugField
            value={editing.slug}
            onChange={(slug) => setEditing({ ...editing, slug })}
            sourceTitle={editing.title.pt}
            tableName="alio_job_openings"
            currentId={editing.id || undefined}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Departamento">
              <Input value={editing.department ?? ''} onChange={(e) => setEditing({ ...editing, department: e.target.value })} />
            </Field>
            <Field label="Localização">
              <Input value={editing.location ?? ''} onChange={(e) => setEditing({ ...editing, location: e.target.value })} />
            </Field>
            <Field label="Tipo">
              <Input value={editing.employment_type ?? ''} onChange={(e) => setEditing({ ...editing, employment_type: e.target.value })} />
            </Field>
          </div>
          <BilingualField label="Descrição" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} multiline rows={5} />
          <Field label="Requisitos (um por linha)">
            <Textarea
              rows={4}
              value={editing.requirements.join('\n')}
              onChange={(e) => setEditing({ ...editing, requirements: e.target.value.split('\n').map((r) => r.trim()).filter(Boolean) })}
            />
          </Field>
        </Card>

        <RevisionHistory
          tableName="alio_job_openings"
          recordId={editing.id || null}
          onRestored={() => { setEditing(null); refresh(); }}
        />
      </div>
    );
  }

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const bulkPublish = async (published: boolean) => {
    try {
      await bulkSetPublished('alio_job_openings', [...selected], published);
      toast({ title: published ? 'Vagas publicadas' : 'Vagas despublicadas', variant: 'success' });
      setSelected(new Set());
      refresh();
    } catch (err) {
      toast({ title: 'Falha', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    }
  };

  const bulkRemove = async () => {
    if (!window.confirm(`Apagar ${selected.size} vaga(s)?`)) return;
    try {
      await bulkDelete('alio_job_openings', [...selected]);
      toast({ title: 'Vagas apagadas', variant: 'success' });
      setSelected(new Set());
      refresh();
    } catch (err) {
      toast({ title: 'Falha', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button size="sm" leftIcon={<Plus size={15} />} onClick={() => { setEditing({ ...BLANK }); markPristine({ ...BLANK }); }}>Nova vaga</Button>
      </div>
      <BulkActionsBar
        count={selected.size}
        onPublish={() => bulkPublish(true)}
        onUnpublish={() => bulkPublish(false)}
        onDelete={bulkRemove}
        onClear={() => setSelected(new Set())}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {roles.map((role) => (
          <Card key={role.id} interactive className="flex items-start justify-between gap-3">
            <input
              type="checkbox"
              checked={selected.has(role.id)}
              onChange={() => toggleSelect(role.id)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-border"
              aria-label={`Seleccionar ${role.title.pt || role.slug}`}
            />
            <div className="min-w-0 flex-1 cursor-pointer" onClick={() => { setEditing(role); markPristine(role); }}>
              <h3 className="font-display text-h6 text-primary">{role.title.pt || '(sem título)'}</h3>
              <p className="mt-1 text-body-s text-tertiary">/{role.slug}</p>
              <Badge variant={role.published ? 'success' : 'neutral'} size="sm" className="mt-2">
                {role.published ? 'Publicado' : 'Rascunho'}
              </Badge>
            </div>
            <Button size="sm" variant="ghost" leftIcon={<Trash2 size={14} />} onClick={() => remove(role)} aria-label={`Apagar ${role.slug}`} />
          </Card>
        ))}
        {roles.length === 0 && <p className="text-body-s text-tertiary">Ainda sem vagas.</p>}
      </div>
    </div>
  );
}
