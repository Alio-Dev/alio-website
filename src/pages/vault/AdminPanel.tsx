import { useEffect, useRef, useState } from 'react';
import { Trash2, UploadCloud, UserPlus, Mail } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Field } from '../../components/ui/Field';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';
import { Table, THead, TBody, TR, TH, TD } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import { useToast } from '../../components/ui/Toast';
import {
  uploadDocument,
  updateDocument,
  deleteDocument,
  listAuthorizedViewers,
  addAuthorizedViewer,
  removeAuthorizedViewer,
} from './api';
import type { VaultDocument, DocumentCategory, AuthorizedViewer } from './types';

const CATEGORY_LABEL: Record<DocumentCategory, string> = {
  empresa: 'Empresa',
  pessoal: 'Pessoal',
  contabilidade: 'Contabilidade',
};

const PAGE_SIZE = 10;

export function AdminPanel({
  documents,
  onChanged,
}: {
  documents: VaultDocument[];
  onChanged: () => void;
}) {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<DocumentCategory>('empresa');
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(documents.length / PAGE_SIZE));
  const pageDocuments = documents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast({ title: 'Escolhe um ficheiro', variant: 'warning' });
      return;
    }
    setUploading(true);
    try {
      await uploadDocument({
        file,
        title: title || file.name,
        description,
        category,
        visibility: 'protected',
      });
      toast({ title: 'Documento carregado', description: title || file.name, variant: 'success' });
      setTitle('');
      setDescription('');
      if (fileRef.current) fileRef.current.value = '';
      onChanged();
    } catch (err) {
      toast({
        title: 'Falha ao carregar',
        description: err instanceof Error ? err.message : String(err),
        variant: 'danger',
      });
    } finally {
      setUploading(false);
    }
  };

  const toggleVisibility = async (doc: VaultDocument) => {
    const next = doc.visibility === 'public' ? 'protected' : 'public';
    try {
      await updateDocument(doc.id, { visibility: next });
      toast({
        title: next === 'public' ? 'Documento tornado público' : 'Documento tornado protegido',
        description: doc.title,
        variant: 'success',
      });
      onChanged();
    } catch (err) {
      toast({
        title: 'Falha ao actualizar',
        description: err instanceof Error ? err.message : String(err),
        variant: 'danger',
      });
    }
  };

  const remove = async (doc: VaultDocument) => {
    if (!window.confirm(`Apagar "${doc.title}"? Esta acção não pode ser desfeita.`)) return;
    try {
      await deleteDocument(doc);
      toast({ title: 'Documento apagado', description: doc.title, variant: 'success' });
      onChanged();
    } catch (err) {
      toast({
        title: 'Falha ao apagar',
        description: err instanceof Error ? err.message : String(err),
        variant: 'danger',
      });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <h3 className="text-h6 text-primary">Carregar novo documento</h3>
        <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Título" className="sm:col-span-2">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Alvará Comercial" />
          </Field>
          <Field label="Categoria">
            <Select value={category} onChange={(e) => setCategory(e.target.value as DocumentCategory)}>
              <option value="empresa">Empresa</option>
              <option value="contabilidade">Contabilidade</option>
              <option value="pessoal">Pessoal</option>
            </Select>
          </Field>
          <Field label="Ficheiro">
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf,image/*"
              className="block w-full text-body-s text-secondary file:mr-3 file:rounded-md file:border-0 file:bg-brand-subtle file:px-3 file:py-2 file:text-body-s file:font-semibold file:text-brand"
            />
          </Field>
          <Field label="Descrição (opcional)" className="sm:col-span-2">
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          </Field>
          <div className="sm:col-span-2">
            <Button type="submit" loading={uploading} leftIcon={<UploadCloud size={16} />}>
              Carregar (entra como Protegido)
            </Button>
          </div>
        </form>
      </Card>

      <Card padding="none">
        <div className="p-5 pb-0">
          <h3 className="text-h6 text-primary">Gerir documentos</h3>
        </div>
        <Table className="mt-4">
          <THead>
            <TR>
              <TH>Título</TH>
              <TH>Categoria</TH>
              <TH>Visibilidade</TH>
              <TH>Acções</TH>
            </TR>
          </THead>
          <TBody>
            {pageDocuments.map((doc) => (
              <TR key={doc.id}>
                <TD className="font-medium text-primary">{doc.title}</TD>
                <TD>
                  <Badge variant="neutral" size="sm">
                    {CATEGORY_LABEL[doc.category]}
                  </Badge>
                </TD>
                <TD>
                  <Switch
                    checked={doc.visibility === 'public'}
                    onChange={() => toggleVisibility(doc)}
                    label={doc.visibility === 'public' ? 'Público' : 'Protegido'}
                  />
                </TD>
                <TD>
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={<Trash2 size={14} />}
                    onClick={() => remove(doc)}
                    aria-label={`Apagar ${doc.title}`}
                  >
                    Apagar
                  </Button>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
        {pageCount > 1 && (
          <div className="flex items-center justify-between p-5 pt-4">
            <p className="text-body-s text-tertiary">
              {documents.length} documento{documents.length === 1 ? '' : 's'} — página {page} de {pageCount}
            </p>
            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
          </div>
        )}
      </Card>

      <AccessPanel />
    </div>
  );
}

function AccessPanel() {
  const { toast } = useToast();
  const [viewers, setViewers] = useState<AuthorizedViewer[] | null>(null);
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [adding, setAdding] = useState(false);

  const refresh = () => {
    listAuthorizedViewers()
      .then(setViewers)
      .catch(() => setViewers([]));
  };

  useEffect(() => {
    refresh();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await addAuthorizedViewer(email, note);
      toast({ title: 'Acesso concedido', description: email, variant: 'success' });
      setEmail('');
      setNote('');
      refresh();
    } catch (err) {
      toast({
        title: 'Falha ao conceder acesso',
        description: err instanceof Error ? err.message : String(err),
        variant: 'danger',
      });
    } finally {
      setAdding(false);
    }
  };

  const remove = async (viewer: AuthorizedViewer) => {
    if (!window.confirm(`Remover o acesso de "${viewer.email}"?`)) return;
    try {
      await removeAuthorizedViewer(viewer.id);
      toast({ title: 'Acesso removido', description: viewer.email, variant: 'success' });
      refresh();
    } catch (err) {
      toast({
        title: 'Falha ao remover',
        description: err instanceof Error ? err.message : String(err),
        variant: 'danger',
      });
    }
  };

  return (
    <Card>
      <h3 className="text-h6 text-primary">Acessos</h3>
      <p className="mt-1 text-body-s text-tertiary">
        Qualquer email <strong>@alio.ao</strong> já tem acesso a documentos protegidos
        automaticamente. Usa isto só para dar acesso a alguém sem email corporativo — ex: um
        contabilista ou colaborador externo.
      </p>

      <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <Field label="Email">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="pessoa@exemplo.com"
            leftIcon={<Mail size={16} />}
          />
        </Field>
        <Field label="Nota (opcional)">
          <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ex: Contabilista" />
        </Field>
        <Button type="submit" loading={adding} leftIcon={<UserPlus size={15} />}>
          Adicionar
        </Button>
      </form>

      {viewers && viewers.length > 0 && (
        <Table className="mt-5">
          <THead>
            <TR>
              <TH>Email</TH>
              <TH>Nota</TH>
              <TH>Acções</TH>
            </TR>
          </THead>
          <TBody>
            {viewers.map((v) => (
              <TR key={v.id}>
                <TD className="font-medium text-primary">{v.email}</TD>
                <TD>{v.note ?? '—'}</TD>
                <TD>
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={<Trash2 size={14} />}
                    onClick={() => remove(v)}
                    aria-label={`Remover acesso de ${v.email}`}
                  >
                    Remover
                  </Button>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </Card>
  );
}
