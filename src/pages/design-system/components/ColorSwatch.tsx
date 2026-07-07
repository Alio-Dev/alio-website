import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { useCopy } from '../lib/useCopy';
import { hslString, isLight, rgbString } from '../lib/color';

export interface ColorSwatchProps {
  name: string;
  hex: string;
  token: string; // e.g. --primary-700
}

type Format = 'hex' | 'rgb' | 'hsl' | 'token';

/** Click any format to copy it. Contrast-aware label overlaid on the chip. */
export function ColorSwatch({ name, hex, token }: ColorSwatchProps) {
  const { copied, copy } = useCopy();
  const [copiedFmt, setCopiedFmt] = useState<Format | null>(null);
  const light = isLight(hex);

  const values: Record<Format, string> = {
    hex: hex.toUpperCase(),
    rgb: rgbString(hex),
    hsl: hslString(hex),
    token: `var(${token})`,
  };

  const handleCopy = (fmt: Format) => {
    copy(values[fmt]);
    setCopiedFmt(fmt);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle bg-surface">
      <button
        type="button"
        onClick={() => handleCopy('hex')}
        className="relative flex h-20 w-full items-end p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset"
        style={{ background: hex }}
        aria-label={`Copy ${name} hex ${values.hex}`}
      >
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-caption font-mono font-medium opacity-0 transition-opacity',
            'group-hover:opacity-100',
            light ? 'text-neutral-900' : 'text-white',
          )}
        >
          {copied && copiedFmt === 'hex' ? <Check size={12} /> : <Copy size={12} />}
        </span>
      </button>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-body-s font-semibold text-primary">{name}</span>
        </div>
        <code className="mt-0.5 block font-mono text-caption text-tertiary">{token}</code>
        <div className="mt-2 flex flex-wrap gap-1">
          {(['hex', 'rgb', 'hsl', 'token'] as Format[]).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => handleCopy(fmt)}
              title={`Copy ${values[fmt]}`}
              className={cn(
                'rounded px-1.5 py-0.5 font-mono text-[11px] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
                copied && copiedFmt === fmt
                  ? 'bg-success-100 text-success-700 dark:bg-success-950 dark:text-success-300'
                  : 'bg-bg-subtle text-tertiary hover:text-primary',
              )}
            >
              {copied && copiedFmt === fmt ? 'copied' : fmt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
