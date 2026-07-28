import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Field } from '../../../components/ui/Field';
import { Input } from '../../../components/ui/Input';
import { Switch } from '../../../components/ui/Switch';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useToast } from '../../../components/ui/Toast';
import { BilingualField } from '../components/BilingualField';
import { listServicePages, upsertServicePage } from '../../../lib/cms/api';
import type { ServicePage } from '../../../lib/cms/types';

export function ServicesSection() {
  const { toast } = useToast();
  const [pages, setPages] = useState<ServicePage[] | null>(null);
  const [editing, setEditing] = useState<ServicePage | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = () => listServicePages().then(setPages).catch(() => setPages([]));
  useEffect(() => { refresh(); }, []);

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
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={15} />} onClick={() => setEditing(null)}>Voltar</Button>
          <Button size="sm" loading={saving} leftIcon={<Save size={15} />} onClick={save}>Guardar</Button>
        </div>

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
          <Field label="Gradiente (classes Tailwind)">
            <Input value={editing.gradient} onChange={(e) => setEditing({ ...editing, gradient: e.target.value })} />
          </Field>
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
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {pages.map((page) => (
        <Card key={page.slug} interactive className="cursor-pointer" onClick={() => setEditing(page)}>
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
