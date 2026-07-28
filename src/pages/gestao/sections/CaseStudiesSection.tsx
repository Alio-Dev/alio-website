import { useEffect, useState } from 'react';
import { Plus, Save, ArrowLeft, Trash2, ImagePlus, Eye } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Field } from '../../../components/ui/Field';
import { Input } from '../../../components/ui/Input';
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
import { listCaseStudies, upsertCaseStudy, deleteCaseStudy, uploadMedia, getMediaPublicUrl, bulkSetPublished, bulkDelete } from '../../../lib/cms/api';
import type { CaseStudy } from '../../../lib/cms/types';

const BLANK: CaseStudy = {
  id: '', slug: '', title: { pt: '', en: '' }, summary: { pt: '', en: '' },
  client: '', industry: '', challenge: { pt: '', en: '' }, solution: { pt: '', en: '' }, results: { pt: '', en: '' },
  cover_path: null, display_order: 0, published: false, created_at: '', updated_at: '',
};

export function CaseStudiesSection({
  focusSlug,
  onFocusConsumed,
}: { focusSlug?: string | null; onFocusConsumed?: () => void } = {}) {
  const { toast } = useToast();
  const [cases, setCases] = useState<CaseStudy[] | null>(null);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { markPristine, confirmDiscard } = useDirtyGuard(editing);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const refresh = () => listCaseStudies().then(setCases).catch(() => setCases([]));
  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    if (!focusSlug || !cases) return;
    const match = cases.find((c) => c.slug === focusSlug);
    if (match) { setEditing(match); markPristine(match); onFocusConsumed?.(); }
  }, [focusSlug, cases, onFocusConsumed]);

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
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={15} />} onClick={() => confirmDiscard() && setEditing(null)}>Voltar</Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<Eye size={15} />} onClick={() => setPreviewOpen(true)}>Pré-visualizar</Button>
            <Button size="sm" loading={saving} leftIcon={<Save size={15} />} onClick={save}>Guardar</Button>
          </div>
        </div>

        <PreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)}>
          <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
            <Card padding="none" className="overflow-hidden">
              <div className="flex h-48 items-center justify-center bg-gradient-brand-135">
                {editing.cover_path ? (
                  <img src={getMediaPublicUrl(editing.cover_path)} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="font-mono text-caption uppercase tracking-widest text-white/70">Cover image</span>
                )}
              </div>
              <div className="p-6">
                {editing.industry && <Badge variant="brand" size="sm" className="mb-3">{editing.industry}</Badge>}
                <h1 className="font-display text-h3 text-primary">{editing.title.pt || '(sem título)'}</h1>
                {editing.client && <p className="mt-1 text-body-s text-tertiary">{editing.client}</p>}
                <p className="mt-3 text-body-m text-secondary">{editing.summary.pt}</p>
                {editing.challenge?.pt && (
                  <div className="mt-6">
                    <h2 className="font-display text-h5 text-primary">Desafio</h2>
                    <p className="mt-1 text-body-m text-secondary">{editing.challenge.pt}</p>
                  </div>
                )}
                {editing.solution?.pt && (
                  <div className="mt-6">
                    <h2 className="font-display text-h5 text-primary">Solução</h2>
                    <p className="mt-1 text-body-m text-secondary">{editing.solution.pt}</p>
                  </div>
                )}
                {editing.results?.pt && (
                  <div className="mt-6">
                    <h2 className="font-display text-h5 text-primary">Resultados</h2>
                    <p className="mt-1 text-body-m text-secondary">{editing.results.pt}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </PreviewModal>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-h6 text-primary">{editing.id ? editing.slug : 'Novo caso de estudo'}</h3>
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
            tableName="alio_case_studies"
            currentId={editing.id || undefined}
          />
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

        <RevisionHistory
          tableName="alio_case_studies"
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
      await bulkSetPublished('alio_case_studies', [...selected], published);
      toast({ title: published ? 'Casos publicados' : 'Casos despublicados', variant: 'success' });
      setSelected(new Set());
      refresh();
    } catch (err) {
      toast({ title: 'Falha', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    }
  };

  const bulkRemove = async () => {
    if (!window.confirm(`Apagar ${selected.size} caso(s) de estudo?`)) return;
    try {
      await bulkDelete('alio_case_studies', [...selected]);
      toast({ title: 'Casos apagados', variant: 'success' });
      setSelected(new Set());
      refresh();
    } catch (err) {
      toast({ title: 'Falha', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button size="sm" leftIcon={<Plus size={15} />} onClick={() => { setEditing({ ...BLANK }); markPristine({ ...BLANK }); }}>Novo caso de estudo</Button>
      </div>
      <BulkActionsBar
        count={selected.size}
        onPublish={() => bulkPublish(true)}
        onUnpublish={() => bulkPublish(false)}
        onDelete={bulkRemove}
        onClear={() => setSelected(new Set())}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {cases.map((cs) => (
          <Card key={cs.id} interactive className="flex items-start justify-between gap-3">
            <input
              type="checkbox"
              checked={selected.has(cs.id)}
              onChange={() => toggleSelect(cs.id)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-border"
              aria-label={`Seleccionar ${cs.title.pt || cs.slug}`}
            />
            <div className="min-w-0 flex-1 cursor-pointer" onClick={() => { setEditing(cs); markPristine(cs); }}>
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
