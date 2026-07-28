import { useEffect, useState } from 'react';
import { Plus, Save, ArrowLeft, Trash2 } from 'lucide-react';
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
import { listJobOpenings, upsertJobOpening, deleteJobOpening } from '../../../lib/cms/api';
import type { JobOpening } from '../../../lib/cms/types';

const BLANK: JobOpening = {
  id: '', slug: '', title: { pt: '', en: '' }, department: '', location: 'Luanda / Remoto',
  employment_type: 'Full-time', description: { pt: '', en: '' }, requirements: [], published: false,
  created_at: '', updated_at: '',
};

export function CareersSection() {
  const { toast } = useToast();
  const [roles, setRoles] = useState<JobOpening[] | null>(null);
  const [editing, setEditing] = useState<JobOpening | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = () => listJobOpenings().then(setRoles).catch(() => setRoles([]));
  useEffect(() => { refresh(); }, []);

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
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={15} />} onClick={() => setEditing(null)}>Voltar</Button>
          <Button size="sm" loading={saving} leftIcon={<Save size={15} />} onClick={save}>Guardar</Button>
        </div>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-h6 text-primary">{editing.id ? editing.slug : 'Nova vaga'}</h3>
            <Switch
              checked={editing.published}
              onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
              label={editing.published ? 'Publicado' : 'Rascunho'}
            />
          </div>
          <Field label="Slug (URL)">
            <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
          </Field>
          <BilingualField label="Título" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
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
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button size="sm" leftIcon={<Plus size={15} />} onClick={() => setEditing({ ...BLANK })}>Nova vaga</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {roles.map((role) => (
          <Card key={role.id} interactive className="flex items-start justify-between gap-3">
            <div className="min-w-0 cursor-pointer" onClick={() => setEditing(role)}>
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
