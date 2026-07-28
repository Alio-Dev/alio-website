import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Field } from '../../../components/ui/Field';
import { Input } from '../../../components/ui/Input';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useToast } from '../../../components/ui/Toast';
import { getSiteSettings, upsertSiteSettings } from '../../../lib/cms/api';
import type { SiteSettings } from '../../../lib/cms/types';

const SOCIAL_LABELS = ['LinkedIn', 'Facebook', 'X', 'YouTube'];

export function SettingsSection() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null | undefined>(undefined);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => setSettings(null));
  }, []);

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await upsertSiteSettings(settings);
      toast({ title: 'Definições guardadas', variant: 'success' });
    } catch (err) {
      toast({ title: 'Falha ao guardar', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  if (settings === undefined) return <Skeleton className="h-64 w-full" />;
  if (!settings) return <p className="text-body-s text-danger-600">Não foi possível carregar as definições.</p>;

  const setSocialHref = (label: string, href: string) => {
    const existing = settings.social_links.find((l) => l.label === label);
    const rest = settings.social_links.filter((l) => l.label !== label);
    setSettings({ ...settings, social_links: href ? [...rest, { label, href }] : rest });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Button size="sm" loading={saving} leftIcon={<Save size={15} />} onClick={save}>Guardar</Button>
      </div>

      <Card className="flex flex-col gap-4">
        <h3 className="text-h6 text-primary">Contacto</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Telefone">
            <Input value={settings.phone ?? ''} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
          </Field>
          <Field label="Email">
            <Input value={settings.email ?? ''} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
          </Field>
        </div>
        <Field label="Morada">
          <Input value={settings.address ?? ''} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
        </Field>
      </Card>

      <Card className="flex flex-col gap-4">
        <h3 className="text-h6 text-primary">Redes sociais</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {SOCIAL_LABELS.map((label) => (
            <Field key={label} label={label}>
              <Input
                value={settings.social_links.find((l) => l.label === label)?.href ?? ''}
                onChange={(e) => setSocialHref(label, e.target.value)}
                placeholder="https://…"
              />
            </Field>
          ))}
        </div>
      </Card>
    </div>
  );
}
