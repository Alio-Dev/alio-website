import { cn } from '../../../lib/cn';
import { CopyButton } from './CopyButton';

export interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  title?: string;
}

/** Monospace code surface with a copy button and optional language label. */
export function CodeBlock({ code, language = 'tsx', className, title }: CodeBlockProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border border-border bg-neutral-950 dark:bg-[#0B0D14]',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-caption uppercase tracking-wide text-neutral-400">
          {title ?? language}
        </span>
        <CopyButton
          value={code}
          className="text-neutral-400 hover:bg-white/10 hover:text-white"
        />
      </div>
      <pre className="ds-scroll overflow-x-auto p-4 text-body-s leading-6">
        <code className="font-mono text-neutral-100">{code}</code>
      </pre>
    </div>
  );
}
