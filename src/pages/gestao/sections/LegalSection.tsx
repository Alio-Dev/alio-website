import { useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useToast } from '../../../components/ui/Toast';
import { BilingualField } from '../components/BilingualField';
import { RevisionHistory } from '../components/RevisionHistory';
import { useDirtyGuard } from '../components/useDirtyGuard';
import { getLegalDoc, upsertLegalDoc } from '../../../lib/cms/api';
import type { LegalDocRow } from '../../../lib/cms/types';

function DocEditor({ kind }: { kind: 'privacy' | 'terms' }) {
  const { toast } = useToast();
  const [doc, setDoc] = useState<LegalDocRow | null | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const { markPristine } = useDirtyGuard(doc ?? null);

  const refresh = () => getLegalDoc(kind).then((d) => { setDoc(d); markPristine(d); }).catch(() => setDoc(null));
  useEffect(() => { refresh(); }, [kind]);

  const save = async () => {
    if (!doc) return;
    setSaving(true);
    try {
      await upsertLegalDoc(doc);
      markPristine(doc);
      toast({ title: 'Documento legal guardado', variant: 'success' });
    } catch (err) {
      toast({ title: 'Falha ao guardar', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  if (doc === undefined) return <Skeleton className="h-64 w-full" />;
  if (!doc) return <p className="text-body-s text-danger-600">Não foi possível carregar este documento.</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Button size="sm" loading={saving} leftIcon={<Save size={15} />} onClick={save}>Guardar</Button>
      </div>

      <Card className="flex flex-col gap-4">
        <BilingualField label="Introdução" value={doc.intro} onChange={(v) => setDoc({ ...doc, intro: v })} multiline rows={4} />
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-h6 text-primary">Secções</h3>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Plus size={14} />}
            onClick={() => setDoc({ ...doc, sections: [...doc.sections, { heading: { pt: '', en: '' }, body: { pt: '', en: '' } }] })}
          >
            Adicionar secção
          </Button>
        </div>
        {doc.sections.map((section, i) => (
          <div key={i} className="rounded-lg border border-border-subtle p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-caption font-semibold uppercase tracking-wide text-tertiary">{i + 1}.</span>
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<Trash2 size={14} />}
                onClick={() => setDoc({ ...doc, sections: doc.sections.filter((_, si) => si !== i) })}
              >
                Remover
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <BilingualField
                label="Título"
                value={section.heading}
                onChange={(v) => {
                  const sections = [...doc.sections];
                  sections[i] = { ...section, heading: v };
                  setDoc({ ...doc, sections });
                }}
              />
              <BilingualField
                label="Texto"
                value={section.body}
                onChange={(v) => {
                  const sections = [...doc.sections];
                  sections[i] = { ...section, body: v };
                  setDoc({ ...doc, sections });
                }}
                multiline
              />
            </div>
          </div>
        ))}
      </Card>

      <RevisionHistory tableName="alio_legal_docs" recordId={kind} onRestored={refresh} />
    </div>
  );
}

export function LegalSection() {
  return (
    <Tabs defaultValue="privacy">
      <TabsList>
        <TabsTrigger value="privacy">Política de Privacidade</TabsTrigger>
        <TabsTrigger value="terms">Termos e Condições</TabsTrigger>
      </TabsList>
      <TabsContent value="privacy"><DocEditor kind="privacy" /></TabsContent>
      <TabsContent value="terms"><DocEditor kind="terms" /></TabsContent>
    </Tabs>
  );
}
