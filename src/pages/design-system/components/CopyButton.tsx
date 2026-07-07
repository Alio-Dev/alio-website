import { Check, Copy } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { useCopy } from '../lib/useCopy';

export function CopyButton({
  value,
  label,
  className,
  size = 16,
}: {
  value: string;
  label?: string;
  className?: string;
  size?: number;
}) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={copied ? 'Copied' : label ?? 'Copy to clipboard'}
      title={copied ? 'Copied!' : 'Copy'}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-caption font-medium text-tertiary transition-colors hover:bg-bg-subtle hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
        className,
      )}
    >
      {copied ? (
        <Check size={size} className="text-success-500" />
      ) : (
        <Copy size={size} />
      )}
      {label && <span>{copied ? 'Copied' : label}</span>}
    </button>
  );
}
