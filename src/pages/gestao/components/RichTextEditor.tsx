import { useRef, useState } from 'react';
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Link2, ImagePlus } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Textarea } from '../../../components/ui/Textarea';
import { uploadMedia, getMediaPublicUrl } from '../../../lib/cms/api';

interface RichTextEditorProps {
  value: string;
  onChange: (next: string) => void;
  rows?: number;
}

interface Selection {
  start: number;
  end: number;
}

/**
 * Minimal markdown toolbar over a plain textarea — no rich-text dependency.
 * Stored value stays a plain string (a constrained markdown subset); rendering
 * happens in BlogArticlePage via a hand-rolled safe parser (no raw HTML).
 */
export function RichTextEditor({ value, onChange, rows = 10 }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const getSelection = (): Selection => {
    const el = textareaRef.current;
    if (!el) return { start: value.length, end: value.length };
    return { start: el.selectionStart, end: el.selectionEnd };
  };

  const applyChange = (next: string, caretStart: number, caretEnd: number) => {
    onChange(next);
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(caretStart, caretEnd);
    });
  };

  const wrapSelection = (before: string, after: string, placeholder: string) => {
    const { start, end } = getSelection();
    const selected = value.slice(start, end) || placeholder;
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    const caretStart = start + before.length;
    applyChange(next, caretStart, caretStart + selected.length);
  };

  const prefixLines = (prefix: string, ordered = false) => {
    const { start, end } = getSelection();
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const lineEndIdx = value.indexOf('\n', end);
    const lineEnd = lineEndIdx === -1 ? value.length : lineEndIdx;
    const block = value.slice(lineStart, lineEnd);
    const lines = block.split('\n');
    const transformed = lines
      .map((line, i) => `${ordered ? `${i + 1}. ` : prefix}${line}`)
      .join('\n');
    const next = value.slice(0, lineStart) + transformed + value.slice(lineEnd);
    applyChange(next, lineStart, lineStart + transformed.length);
  };

  const insertHeading = (level: 2 | 3) => {
    const prefix = level === 2 ? '## ' : '### ';
    const { start } = getSelection();
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const alreadyPrefixed = /^#{2,3}\s/.test(value.slice(lineStart));
    if (alreadyPrefixed) {
      const stripped = value.slice(lineStart).replace(/^#{2,3}\s/, '');
      const next = value.slice(0, lineStart) + prefix + stripped;
      applyChange(next, lineStart + prefix.length, lineStart + prefix.length);
    } else {
      const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
      applyChange(next, lineStart + prefix.length, lineStart + prefix.length);
    }
  };

  const insertLink = () => {
    const url = window.prompt('URL do link:');
    if (!url) return;
    const { start, end } = getSelection();
    const selected = value.slice(start, end) || 'texto do link';
    const snippet = `[${selected}](${url})`;
    const next = value.slice(0, start) + snippet + value.slice(end);
    applyChange(next, start, start + snippet.length);
  };

  const insertImage = async (file: File) => {
    setUploadingImage(true);
    try {
      const media = await uploadMedia(file);
      const url = getMediaPublicUrl(media.storage_path);
      const alt = file.name.replace(/\.[^.]+$/, '');
      const { start, end } = getSelection();
      const snippet = `![${alt}](${url})`;
      const next = value.slice(0, start) + snippet + value.slice(end);
      applyChange(next, start + snippet.length, start + snippet.length);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1 rounded-md border border-border bg-bg-subtle p-1">
        <Button type="button" variant="ghost" size="sm" aria-label="Negrito" onClick={() => wrapSelection('**', '**', 'texto')}>
          <Bold size={15} />
        </Button>
        <Button type="button" variant="ghost" size="sm" aria-label="Itálico" onClick={() => wrapSelection('*', '*', 'texto')}>
          <Italic size={15} />
        </Button>
        <Button type="button" variant="ghost" size="sm" aria-label="Título 2" onClick={() => insertHeading(2)}>
          <Heading2 size={15} />
        </Button>
        <Button type="button" variant="ghost" size="sm" aria-label="Título 3" onClick={() => insertHeading(3)}>
          <Heading3 size={15} />
        </Button>
        <Button type="button" variant="ghost" size="sm" aria-label="Lista" onClick={() => prefixLines('- ')}>
          <List size={15} />
        </Button>
        <Button type="button" variant="ghost" size="sm" aria-label="Lista numerada" onClick={() => prefixLines('', true)}>
          <ListOrdered size={15} />
        </Button>
        <Button type="button" variant="ghost" size="sm" aria-label="Link" onClick={insertLink}>
          <Link2 size={15} />
        </Button>
        <label className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-md px-3 text-body-s font-medium text-secondary hover:bg-bg hover:text-brand">
          <ImagePlus size={15} />
          {uploadingImage ? 'A carregar…' : 'Imagem'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && insertImage(e.target.files[0])}
          />
        </label>
      </div>
      <Textarea ref={textareaRef} value={value} onChange={(e) => onChange(e.target.value)} rows={rows} />
    </div>
  );
}
