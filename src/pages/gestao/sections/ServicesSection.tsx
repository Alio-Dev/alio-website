import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, ArrowLeft, Eye } from 'lucide-react';
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
import { PreviewModal } from '../components/PreviewModal';
import { ServiceStylePicker } from '../components/ServiceStylePicker';
import { useDirtyGuard } from '../components/useDirtyGuard';
import ServiceHero from '../../../components/ServiceHero';
import ServiceFeatures from '../../../components/ServiceFeatures';
import { resolveServiceIcon } from '../../../components/services/serviceIconMap';
import { listServicePages, upsertServicePage } from '../../../lib/cms/api';
import type { ServicePage } from '../../../lib/cms/types';

export function ServicesSection({
  focusSlug,
  onFocusConsumed,
}: { focusSlug?: string | null; onFocusConsumed?: () => void } = {}) {
  const { toast } = useToast();
  const [pages, setPages] = useState<ServicePage[] | null>(null);
  const [editing, setEditing] = useState<ServicePage | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { markPristine, confirmDiscard } = useDirtyGuard(editing);

  const refresh = () => listServicePages().then(setPages).catch(() => setPages([]));
  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    if (!focusSlug || !pages) return;
    const match = pages.find((p) => p.slug === focusSlug);
    if (match) { setEditing(match); markPristine(match); onFocusConsumed?.(); }
  }, [focusSlug, pages, onFocusConsumed]);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const saved = await upsertServicePage(editing);
      toast({ title: 'Página de serviço guardada', description: saved.slug, variant: 'success' });
      setEditing(null);
      refresh();
    } catch (err) {
      toast({ title: 'Falha ao guardar', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  if (pages === null) {
    return <div className="grid gap-4 sm:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />)}</div>;
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
          <ServiceHero
            icon={resolveServiceIcon(editing.icon)}
            title={editing.title.pt}
            subtitle={editing.subtitle.pt}
            description={editing.description.pt}
            gradient={editing.gradient}
          />
          <ServiceFeatures
            title={editing.features_title.pt}
            features={editing.features.map((f) => ({ title: f.title.pt, description: f.description.pt }))}
            technologies={editing.technologies}
            serviceType={editing.service_type}
          />
        </PreviewModal>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-h6 text-primary">{editing.slug}</h3>
            <Switch
              checked={editing.published}
              onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
              label={editing.published ? 'Publicado' : 'Rascunho'}
            />
          </div>
          <BilingualField label="Título" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
          <BilingualField label="Subtítulo" value={editing.subtitle} onChange={(v) => setEditing({ ...editing, subtitle: v })} />
          <BilingualField label="Descrição" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} multiline />
          <BilingualField label="Título da secção de funcionalidades" value={editing.features_title} onChange={(v) => setEditing({ ...editing, features_title: v })} />
          <ServiceStylePicker
            icon={editing.icon}
            gradient={editing.gradient}
            onIconChange={(icon) => setEditing({ ...editing, icon })}
            onGradientChange={(gradient) => setEditing({ ...editing, gradient })}
          />
          <Field label="Tecnologias (separadas por vírgula)">
            <Input
              value={editing.technologies.join(', ')}
              onChange={(e) => setEditing({ ...editing, technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
            />
          </Field>
        </Card>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-h6 text-primary">Funcionalidades</h3>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Plus size={14} />}
              onClick={() => setEditing({
                ...editing,
                features: [...editing.features, { title: { pt: '', en: '' }, description: { pt: '', en: '' } }],
              })}
            >
              Adicionar
            </Button>
          </div>
          {editing.features.map((feature, i) => (
            <div key={i} className="rounded-lg border border-border-subtle p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-caption font-semibold uppercase tracking-wide text-tertiary">#{i + 1}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  leftIcon={<Trash2 size={14} />}
                  onClick={() => setEditing({ ...editing, features: editing.features.filter((_, fi) => fi !== i) })}
                >
                  Remover
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <BilingualField
                  label="Título"
                  value={feature.title}
                  onChange={(v) => {
                    const features = [...editing.features];
                    features[i] = { ...feature, title: v };
                    setEditing({ ...editing, features });
                  }}
                />
                <BilingualField
                  label="Descrição"
                  value={feature.description}
                  onChange={(v) => {
                    const features = [...editing.features];
                    features[i] = { ...feature, description: v };
                    setEditing({ ...editing, features });
                  }}
                  multiline
                />
              </div>
            </div>
          ))}
        </Card>

        <RevisionHistory
          tableName="alio_service_pages"
          recordId={editing.id || null}
          onRestored={() => { setEditing(null); refresh(); }}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {pages.map((page) => (
        <Card key={page.slug} interactive className="cursor-pointer" onClick={() => { setEditing(page); markPristine(page); }}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-h6 text-primary">{page.title.pt}</h3>
            <Badge variant={page.published ? 'success' : 'neutral'} size="sm">
              {page.published ? 'Publicado' : 'Rascunho'}
            </Badge>
          </div>
          <p className="mt-1 text-body-s text-tertiary">/{page.slug}</p>
        </Card>
      ))}
    </div>
  );
}
