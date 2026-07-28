import type { ReactNode } from 'react';

function isSafeUrl(url: string): boolean {
  // "/"-prefixed must be site-relative, not protocol-relative ("//host/…"
  // resolves cross-origin in browsers, which a bare startsWith('/') would
  // wrongly allow).
  return /^https?:\/\//i.test(url) || (url.startsWith('/') && !url.startsWith('//')) || url.startsWith('#');
}

/** Inline markdown subset (bold, italic, links, images) → React nodes, no HTML parsing. */
function parseInline(text: string): ReactNode[] {
  const pattern = /!\[([^\]]*)\]\(([^)\s]+)\)|\[([^\]]*)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [whole, imgAlt, imgSrc, linkText, linkHref, boldText, italicText] = match;
    if (imgSrc !== undefined) {
      nodes.push(isSafeUrl(imgSrc) ? <img key={key++} src={imgSrc} alt={imgAlt} className="my-2 w-full rounded-lg" /> : whole);
    } else if (linkHref !== undefined) {
      nodes.push(
        isSafeUrl(linkHref) ? (
          <a key={key++} href={linkHref} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-4">
            {linkText}
          </a>
        ) : (
          whole
        ),
      );
    } else if (boldText !== undefined) {
      nodes.push(<strong key={key++}>{boldText}</strong>);
    } else if (italicText !== undefined) {
      nodes.push(<em key={key++}>{italicText}</em>);
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/** Constrained markdown subset (headings, lists, bold/italic/link/image) → React, no dangerouslySetInnerHTML. */
export function renderBody(body: string): ReactNode[] {
  const blocks = body.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  return blocks.map((block, i) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);

    if (lines.length > 0 && lines.every((l) => /^[-*]\s+/.test(l))) {
      return (
        <ul key={i} className="list-disc space-y-1 pl-6">
          {lines.map((l, j) => <li key={j}>{parseInline(l.replace(/^[-*]\s+/, ''))}</li>)}
        </ul>
      );
    }
    if (lines.length > 0 && lines.every((l) => /^\d+\.\s+/.test(l))) {
      return (
        <ol key={i} className="list-decimal space-y-1 pl-6">
          {lines.map((l, j) => <li key={j}>{parseInline(l.replace(/^\d+\.\s+/, ''))}</li>)}
        </ol>
      );
    }
    if (block.startsWith('### ')) {
      return <h3 key={i} className="font-display text-h4 text-primary">{parseInline(block.slice(4))}</h3>;
    }
    if (block.startsWith('## ')) {
      return <h2 key={i} className="font-display text-h3 text-primary">{parseInline(block.slice(3))}</h2>;
    }
    const imageOnly = block.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (imageOnly && isSafeUrl(imageOnly[2])) {
      return <img key={i} src={imageOnly[2]} alt={imageOnly[1]} className="w-full rounded-lg" />;
    }
    return <p key={i}>{parseInline(block)}</p>;
  });
}
