import { useState } from 'react';
import { FileText, Eye, Download, Lock, Globe } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { getDocumentUrl, logAccess, filenameForDocument } from './api';
import type { VaultDocument } from './types';

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentCard({
  doc,
  onView,
}: {
  doc: VaultDocument;
  onView: (doc: VaultDocument, url: string) => void;
}) {
  const [busy, setBusy] = useState<'view' | 'download' | null>(null);

  const open = async (mode: 'view' | 'download') => {
    setBusy(mode);
    try {
      const filename = filenameForDocument(doc);
      const url = await getDocumentUrl(doc.storage_path, mode === 'download' ? filename : undefined);
      void logAccess(doc.id);
      if (mode === 'view') {
        onView(doc, url);
      } else {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
      }
    } finally {
      setBusy(null);
    }
  };

  return (
    <Card interactive className="flex h-full flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
          <FileText size={20} />
        </span>
        <Badge variant={doc.visibility === 'public' ? 'success' : 'neutral'} size="sm">
          {doc.visibility === 'public' ? (
            <span className="flex items-center gap-1">
              <Globe size={11} /> Público
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Lock size={11} /> Protegido
            </span>
          )}
        </Badge>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-body-m font-semibold text-primary">{doc.title}</h3>
        {doc.description && (
          <p className="mt-0.5 line-clamp-2 text-body-s text-tertiary">{doc.description}</p>
        )}
        <p className="mt-1 text-caption text-tertiary">{formatSize(doc.size_bytes)}</p>
      </div>
      <div className="mt-auto flex gap-2 pt-1">
        <Button
          size="sm"
          variant="outline"
          fullWidth
          loading={busy === 'view'}
          leftIcon={<Eye size={14} />}
          onClick={() => open('view')}
        >
          Ver
        </Button>
        <Button
          size="sm"
          variant="ghost"
          loading={busy === 'download'}
          leftIcon={<Download size={14} />}
          onClick={() => open('download')}
          aria-label={`Descarregar ${doc.title}`}
        />
      </div>
    </Card>
  );
}
