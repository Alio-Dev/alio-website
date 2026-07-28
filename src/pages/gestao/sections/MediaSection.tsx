import { useEffect, useRef, useState } from 'react';
import { UploadCloud, Trash2, Copy } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useToast } from '../../../components/ui/Toast';
import { listMedia, uploadMedia, deleteMedia, getMediaPublicUrl } from '../../../lib/cms/api';
import type { MediaAsset } from '../../../lib/cms/types';

function formatBytes(a?: number | null) {
  return a ? `${a}px` : '';
}

export function MediaSection() {
  const { toast } = useToast();
  const [media, setMedia] = useState<MediaAsset[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const refresh = () => listMedia().then(setMedia).catch(() => setMedia([]));
  useEffect(() => { refresh(); }, []);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      await uploadMedia(file);
      toast({ title: 'Imagem carregada', variant: 'success' });
      refresh();
    } catch (err) {
      toast({ title: 'Falha no upload', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const remove = async (asset: MediaAsset) => {
    if (!window.confirm('Apagar esta imagem? Páginas que já a usam ficam com uma ligação quebrada.')) return;
    try {
      await deleteMedia(asset);
      toast({ title: 'Imagem apagada', variant: 'success' });
      refresh();
    } catch (err) {
      toast({ title: 'Falha ao apagar', description: err instanceof Error ? err.message : String(err), variant: 'danger' });
    }
  };

  const copyUrl = (asset: MediaAsset) => {
    navigator.clipboard.writeText(getMediaPublicUrl(asset.storage_path));
    toast({ title: 'Ligação copiada', variant: 'success' });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary-700 px-4 py-2 text-body-s font-semibold text-white hover:bg-primary-800">
          <UploadCloud size={15} />
          {uploading ? 'A carregar…' : 'Carregar imagem'}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        </label>
      </div>

      {media === null ? (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-32" />)}
        </div>
      ) : media.length === 0 ? (
        <EmptyState icon={<UploadCloud size={22} />} title="Biblioteca vazia" description="As imagens carregadas aqui ou nos formulários de blog/casos de estudo aparecem nesta lista." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((asset) => (
            <Card key={asset.id} padding="none" className="overflow-hidden">
              <img src={getMediaPublicUrl(asset.storage_path)} alt="" className="h-32 w-full object-cover" />
              <div className="flex items-center justify-between p-2">
                <span className="text-caption text-tertiary">{formatBytes(asset.width)}{asset.width && asset.height ? ` × ${asset.height}px` : ''}</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => copyUrl(asset)} aria-label="Copiar ligação" leftIcon={<Copy size={13} />} />
                  <Button size="sm" variant="ghost" onClick={() => remove(asset)} aria-label="Apagar" leftIcon={<Trash2 size={13} />} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
