import { useEffect, useState } from 'react';
import { Save, UserPlus, Trash2 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Field } from '../../../components/ui/Field';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Badge } from '../../../components/ui/Badge';
import { Table, THead, TBody, TR, TH, TD } from '../../../components/ui/Table';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useToast } from '../../../components/ui/Toast';
import { RevisionHistory } from '../components/RevisionHistory';
import { useDirtyGuard } from '../components/useDirtyGuard';
import { getSiteSettings, upsertSiteSettings, listStaff, upsertStaff, removeStaff } from '../../../lib/cms/api';
import type { SiteSettings, Staff, StaffRole } from '../../../lib/cms/types';

function StaffManager() {
  const { toast } = useToast();
  const [staff, setStaff] = useState<Staff[] | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<StaffRole>('editor');
  const [saving, setSaving] = useState(false);

  const refresh = () => listStaff().then(setStaff).catch(() => setStaff([]));
  useEffect(() => { refresh(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await upsertStaff(email, name, role);
      toast({ title: 'Membro guardado', description: email, variant: 'success' });
      setEmail(''); setName(''); setRole('editor');
      refresh();
    } catch (err) {
      toast({ title: 'Falha ao guardar', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (member: Staff) => {
    if (!window.confirm(`Remover ${member.email} da equipa de gestão?`)) return;
    try {
      await removeStaff(member.email);
      toast({ title: 'Membro removido', variant: 'success' });
      refresh();
    } catch (err) {
      toast({ title: 'Falha ao remover', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    }
  };

  return (
    <Card className="flex flex-col gap-4">
      <h3 className="text-h6 text-primary">Equipa & Permissões</h3>
      <p className="text-body-s text-tertiary">
        <strong>Admin</strong> acede a tudo, incluindo Definições, Legal e esta lista. <strong>Editor</strong> gere
        conteúdo (Serviços, Blog, Casos, Carreiras, Mensagens, Média) mas não estas áreas sensíveis.
      </p>
      <form onSubmit={add} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
        <Field label="Email"><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="pessoa@alio.ao" /></Field>
        <Field label="Nome"><Input value={name} onChange={(e) => setName(e.target.value)} /></Field>
        <Field label="Papel">
          <Select value={role} onChange={(e) => setRole(e.target.value as StaffRole)}>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </Select>
        </Field>
        <Button type="submit" loading={saving} leftIcon={<UserPlus size={15} />}>Adicionar</Button>
      </form>

      {staff === null ? <Skeleton className="h-24 w-full" /> : staff.length > 0 && (
        <Table>
          <THead><TR><TH>Email</TH><TH>Nome</TH><TH>Papel</TH><TH>Acções</TH></TR></THead>
          <TBody>
            {staff.map((s) => (
              <TR key={s.email}>
                <TD className="font-medium text-primary">{s.email}</TD>
                <TD>{s.name ?? '—'}</TD>
                <TD><Badge variant={s.role === 'admin' ? 'brand' : 'neutral'} size="sm">{s.role}</Badge></TD>
                <TD>
                  <Button size="sm" variant="ghost" leftIcon={<Trash2 size={14} />} onClick={() => remove(s)} aria-label={`Remover ${s.email}`} />
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </Card>
  );
}

const SOCIAL_LABELS = ['LinkedIn', 'Facebook', 'X', 'YouTube'];

export function SettingsSection() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const { markPristine } = useDirtyGuard(settings ?? null);

  const refreshSettings = () => getSiteSettings().then((s) => { setSettings(s); markPristine(s); }).catch(() => setSettings(null));
  useEffect(() => { refreshSettings(); }, []);

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await upsertSiteSettings(settings);
      markPristine(settings);
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

      <RevisionHistory tableName="alio_site_settings" recordId="true" onRestored={refreshSettings} />

      <StaffManager />
    </div>
  );
}
