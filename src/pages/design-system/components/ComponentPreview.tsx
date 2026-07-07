import { useState } from 'react';
import { Code2, Eye } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { CodeBlock } from './CodeBlock';

export interface ComponentPreviewProps {
  code?: string;
  children: React.ReactNode;
  className?: string;
  /** Alignment of the preview stage content. */
  align?: 'center' | 'start';
  /** Give the stage a subtle checkerboard-free padded surface. */
  padded?: boolean;
}

/**
 * ComponentPreview — live rendered example with a toggle to reveal the
 * source. The rendered children ARE the real components (single source of
 * truth), so the preview can never drift from the code.
 */
export function ComponentPreview({
  code,
  children,
  className,
  align = 'center',
  padded = true,
}: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className={cn('overflow-hidden rounded-lg border border-border', className)}>
      <div className="flex items-center justify-end gap-1 border-b border-border-subtle bg-bg-subtle px-2 py-1.5">
        <button
          type="button"
          onClick={() => setShowCode(false)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-caption font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
            !showCode ? 'bg-surface text-primary shadow-xs' : 'text-tertiary hover:text-primary',
          )}
        >
          <Eye size={14} /> Preview
        </button>
        {code && (
          <button
            type="button"
            onClick={() => setShowCode(true)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-caption font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
              showCode ? 'bg-surface text-primary shadow-xs' : 'text-tertiary hover:text-primary',
            )}
          >
            <Code2 size={14} /> Code
          </button>
        )}
      </div>

      {showCode && code ? (
        <CodeBlock code={code} className="rounded-none border-0" />
      ) : (
        <div
          className={cn(
            'flex flex-wrap gap-4 bg-surface',
            padded && 'p-8',
            align === 'center' ? 'items-center justify-center' : 'items-start justify-start',
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
