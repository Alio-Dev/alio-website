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
import { listBlogPosts, upsertBlogPost, deleteBlogPost, uploadMedia, getMediaPublicUrl } from '../../../lib/cms/api';
import type { BlogPost } from '../../../lib/cms/types';

const BLANK: BlogPost = {
  id: '', slug: '', title: { pt: '', en: '' }, excerpt: { pt: '', en: '' }, body: { pt: '', en: '' },
  category: '', cover_path: null, author: 'Alio Analytics', published: false, published_at: null,
  created_at: '', updated_at: '',
};

export function BlogSection() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const refresh = () => listBlogPosts().then(setPosts).catch(() => setPosts([]));
  useEffect(() => { refresh(); }, []);

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
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={15} />} onClick={() => setEditing(null)}>Voltar</Button>
          <Button size="sm" loading={saving} leftIcon={<Save size={15} />} onClick={save}>Guardar</Button>
        </div>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-h6 text-primary">{editing.id ? editing.slug : 'Novo artigo'}</h3>
            <Switch
              checked={editing.published}
              onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
              label={editing.published ? 'Publicado' : 'Rascunho'}
            />
          </div>
          <Field label="Slug (URL)" description="ex: como-medir-roi-em-analytics">
            <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
          </Field>
          <BilingualField label="Título" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
          <BilingualField label="Resumo" value={editing.excerpt} onChange={(v) => setEditing({ ...editing, excerpt: v })} multiline rows={2} />
          <BilingualField label="Conteúdo" value={editing.body} onChange={(v) => setEditing({ ...editing, body: v })} multiline rows={10} />
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
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button size="sm" leftIcon={<Plus size={15} />} onClick={() => setEditing({ ...BLANK })}>Novo artigo</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.id} interactive className="flex items-start justify-between gap-3">
            <div className="min-w-0 cursor-pointer" onClick={() => setEditing(post)}>
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
