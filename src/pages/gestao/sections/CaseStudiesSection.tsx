import { useEffect, useState } from 'react';
import { Plus, Save, ArrowLeft, Trash2, ImagePlus } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Field } from '../../../components/ui/Field';
import { Input } from '../../../components/ui/Input';
import { Switch } from '../../../components/ui/Switch';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useToast } from '../../../components/ui/Toast';
import { BilingualField } from '../components/BilingualField';
import { listCaseStudies, upsertCaseStudy, deleteCaseStudy, uploadMedia, getMediaPublicUrl } from '../../../lib/cms/api';
import type { CaseStudy } from '../../../lib/cms/types';

const BLANK: CaseStudy = {
  id: '', slug: '', title: { pt: '', en: '' }, summary: { pt: '', en: '' },
  client: '', industry: '', challenge: { pt: '', en: '' }, solution: { pt: '', en: '' }, results: { pt: '', en: '' },
  cover_path: null, display_order: 0, published: false, created_at: '', updated_at: '',
};

export function CaseStudiesSection() {
  const { toast } = useToast();
  const [cases, setCases] = useState<CaseStudy[] | null>(null);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const refresh = () => listCaseStudies().then(setCases).catch(() => setCases([]));
  useEffect(() => { refresh(); }, []);

  const save = async () => {
    if (!editing) return;
    if (!editing.slug.trim()) {
      toast({ title: 'Slug obrigatório', variant: 'warning' });
      return;
    }
    setSaving(true);
    try {
      await upsertCaseStudy(editing);
      toast({ title: 'Caso de estudo guardado', description: editing.slug, variant: 'success' });
      setEditing(null);
      refresh();
    } catch (err) {
      toast({ title: 'Falha ao guardar', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (cs: CaseStudy) => {
    if (!window.confirm(`Apagar "${cs.title.pt || cs.slug}"?`)) return;
    try {
      await deleteCaseStudy(cs.id);
      toast({ title: 'Caso de estudo apagado', variant: 'success' });
      refresh();
    } catch (err) {
      toast({ title: 'Falha ao apagar', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    }
  };

  const uploadCover = async (file: File) => {
    setUploadingCover(true);
    try {
      const media = await uploadMedia(file);
      setEditing((e) => e && { ...e, cover_path: media.storage_path });
    } catch (err) {
      toast({ title: 'Falha no upload', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    } finally {
      setUploadingCover(false);
    }
  };

  if (cases === null) {
    return <div className="grid gap-4 sm:grid-cols-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24" />)}</div>;
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
            <h3 className="text-h6 text-primary">{editing.id ? editing.slug : 'Novo caso de estudo'}</h3>
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
          <BilingualField label="Resumo" value={editing.summary} onChange={(v) => setEditing({ ...editing, summary: v })} multiline rows={2} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Cliente">
              <Input value={editing.client ?? ''} onChange={(e) => setEditing({ ...editing, client: e.target.value })} />
            </Field>
            <Field label="Sector">
              <Input value={editing.industry ?? ''} onChange={(e) => setEditing({ ...editing, industry: e.target.value })} />
            </Field>
          </div>
          <BilingualField label="Desafio" value={editing.challenge ?? { pt: '', en: '' }} onChange={(v) => setEditing({ ...editing, challenge: v })} multiline />
          <BilingualField label="Solução" value={editing.solution ?? { pt: '', en: '' }} onChange={(v) => setEditing({ ...editing, solution: v })} multiline />
          <BilingualField label="Resultados" value={editing.results ?? { pt: '', en: '' }} onChange={(v) => setEditing({ ...editing, results: v })} multiline />
          <Field label="Imagem de capa">
            <div className="flex items-center gap-3">
              {editing.cover_path && (
                <img src={getMediaPublicUrl(editing.cover_path)} alt="" className="h-16 w-24 rounded-md object-cover" />
              )}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-body-s font-medium text-secondary hover:border-brand hover:text-brand">
                <ImagePlus size={15} />
                {uploadingCover ? 'A carregar…' : 'Escolher imagem'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} />
              </label>
            </div>
          </Field>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button size="sm" leftIcon={<Plus size={15} />} onClick={() => setEditing({ ...BLANK })}>Novo caso de estudo</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {cases.map((cs) => (
          <Card key={cs.id} interactive className="flex items-start justify-between gap-3">
            <div className="min-w-0 cursor-pointer" onClick={() => setEditing(cs)}>
              <h3 className="font-display text-h6 text-primary">{cs.title.pt || '(sem título)'}</h3>
              <p className="mt-1 text-body-s text-tertiary">/{cs.slug}</p>
              <Badge variant={cs.published ? 'success' : 'neutral'} size="sm" className="mt-2">
                {cs.published ? 'Publicado' : 'Rascunho'}
              </Badge>
            </div>
            <Button size="sm" variant="ghost" leftIcon={<Trash2 size={14} />} onClick={() => remove(cs)} aria-label={`Apagar ${cs.slug}`} />
          </Card>
        ))}
        {cases.length === 0 && <p className="text-body-s text-tertiary">Ainda sem casos de estudo.</p>}
      </div>
    </div>
  );
}
