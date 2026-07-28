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
import { RichTextEditor } from '../components/RichTextEditor';
import { RevisionHistory } from '../components/RevisionHistory';
import { SlugField } from '../components/SlugField';
import { PreviewModal } from '../components/PreviewModal';
import { useDirtyGuard } from '../components/useDirtyGuard';
import { BulkActionsBar } from '../components/BulkActionsBar';
import { renderBody } from '../../../lib/cms/markdown';
import { listBlogPosts, upsertBlogPost, deleteBlogPost, uploadMedia, getMediaPublicUrl, bulkSetPublished, bulkDelete } from '../../../lib/cms/api';
import type { BlogPost } from '../../../lib/cms/types';

const BLANK: BlogPost = {
  id: '', slug: '', title: { pt: '', en: '' }, excerpt: { pt: '', en: '' }, body: { pt: '', en: '' },
  category: '', cover_path: null, author: 'Alio Analytics', published: false, published_at: null,
  created_at: '', updated_at: '',
};

export function BlogSection({
  focusSlug,
  onFocusConsumed,
}: { focusSlug?: string | null; onFocusConsumed?: () => void } = {}) {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { markPristine, confirmDiscard } = useDirtyGuard(editing);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const refresh = () => listBlogPosts().then(setPosts).catch(() => setPosts([]));
  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    if (!focusSlug || !posts) return;
    const match = posts.find((p) => p.slug === focusSlug);
    if (match) { setEditing(match); markPristine(match); onFocusConsumed?.(); }
  }, [focusSlug, posts, onFocusConsumed]);

  const save = async () => {
    if (!editing) return;
    if (!editing.slug.trim()) {
      toast({ title: 'Slug obrigatório', variant: 'warning' });
      return;
    }
    setSaving(true);
    try {
      const patch = { ...editing, published_at: editing.published && !editing.published_at ? new Date().toISOString() : editing.published_at };
      await upsertBlogPost(patch);
      toast({ title: 'Artigo guardado', description: editing.slug, variant: 'success' });
      setEditing(null);
      refresh();
    } catch (err) {
      toast({ title: 'Falha ao guardar', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (post: BlogPost) => {
    if (!window.confirm(`Apagar "${post.title.pt || post.slug}"?`)) return;
    try {
      await deleteBlogPost(post.id);
      toast({ title: 'Artigo apagado', variant: 'success' });
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

  if (posts === null) {
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
          <article className="mx-auto max-w-prose px-4 py-12 sm:px-6">
            {editing.category && <Badge variant="accent" size="sm" className="mb-3">{editing.category}</Badge>}
            <h1 className="font-display text-h1 text-primary">{editing.title.pt || '(sem título)'}</h1>
            <p className="mt-3 text-body-s text-tertiary">{editing.author ?? 'Alio Analytics'}</p>
            <div className="mt-8 flex flex-col gap-4 text-body-l text-secondary">{renderBody(editing.body.pt)}</div>
          </article>
        </PreviewModal>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-h6 text-primary">{editing.id ? editing.slug : 'Novo artigo'}</h3>
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
            tableName="alio_blog_posts"
            currentId={editing.id || undefined}
          />
          <BilingualField label="Resumo" value={editing.excerpt} onChange={(v) => setEditing({ ...editing, excerpt: v })} multiline rows={2} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Conteúdo (PT)">
              <RichTextEditor
                value={editing.body.pt}
                onChange={(v) => setEditing({ ...editing, body: { ...editing.body, pt: v } })}
              />
            </Field>
            <Field label="Conteúdo (EN)">
              <RichTextEditor
                value={editing.body.en}
                onChange={(v) => setEditing({ ...editing, body: { ...editing.body, en: v } })}
              />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Categoria">
              <Input value={editing.category ?? ''} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
            </Field>
            <Field label="Autor">
              <Input value={editing.author ?? ''} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
            </Field>
          </div>
          <Field label="Imagem de capa">
            <div className="flex items-center gap-3">
              {editing.cover_path && (
                <img src={getMediaPublicUrl(editing.cover_path)} alt="" className="h-16 w-24 rounded-md object-cover" />
              )}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-body-s font-medium text-secondary hover:border-brand hover:text-brand">
                <ImagePlus size={15} />
                {uploadingCover ? 'A carregar…' : 'Escolher imagem'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])}
                />
              </label>
            </div>
          </Field>
        </Card>

        <RevisionHistory
          tableName="alio_blog_posts"
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
      await bulkSetPublished('alio_blog_posts', [...selected], published);
      toast({ title: published ? 'Artigos publicados' : 'Artigos despublicados', variant: 'success' });
      setSelected(new Set());
      refresh();
    } catch (err) {
      toast({ title: 'Falha', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    }
  };

  const bulkRemove = async () => {
    if (!window.confirm(`Apagar ${selected.size} artigo(s)?`)) return;
    try {
      await bulkDelete('alio_blog_posts', [...selected]);
      toast({ title: 'Artigos apagados', variant: 'success' });
      setSelected(new Set());
      refresh();
    } catch (err) {
      toast({ title: 'Falha', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button size="sm" leftIcon={<Plus size={15} />} onClick={() => { setEditing({ ...BLANK }); markPristine({ ...BLANK }); }}>Novo artigo</Button>
      </div>
      <BulkActionsBar
        count={selected.size}
        onPublish={() => bulkPublish(true)}
        onUnpublish={() => bulkPublish(false)}
        onDelete={bulkRemove}
        onClear={() => setSelected(new Set())}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.id} interactive className="flex items-start justify-between gap-3">
            <input
              type="checkbox"
              checked={selected.has(post.id)}
              onChange={() => toggleSelect(post.id)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-border"
              aria-label={`Seleccionar ${post.title.pt || post.slug}`}
            />
            <div className="min-w-0 flex-1 cursor-pointer" onClick={() => { setEditing(post); markPristine(post); }}>
              <h3 className="font-display text-h6 text-primary">{post.title.pt || '(sem título)'}</h3>
              <p className="mt-1 text-body-s text-tertiary">/{post.slug}</p>
              <Badge variant={post.published ? 'success' : 'neutral'} size="sm" className="mt-2">
                {post.published ? 'Publicado' : 'Rascunho'}
              </Badge>
            </div>
            <Button size="sm" variant="ghost" leftIcon={<Trash2 size={14} />} onClick={() => remove(post)} aria-label={`Apagar ${post.slug}`} />
          </Card>
        ))}
        {posts.length === 0 && <p className="text-body-s text-tertiary">Ainda sem artigos.</p>}
      </div>
    </div>
  );
}
