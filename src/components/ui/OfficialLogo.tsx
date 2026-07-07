import { useState } from 'react';
import { cn } from '../../lib/cn';

export interface OfficialLogoProps {
  /** Path under /public to the official vendor asset, e.g. /brand/partners/aws.svg */
  src: string;
  alt: string;
  /** Rendered if the official asset is missing (404) — keeps the UI intact. */
  fallback: React.ReactNode;
  className?: string;
  height?: number;
}

/**
 * OfficialLogo — renders a vendor's official (trademarked) logo asset that
 * lives in /public/brand. Trademarked marks (LinkedIn, AWS, Microsoft, …)
 * must be the vendor's own files, not hand-authored paths. Until the file is
 * added, `fallback` renders instead, so the layout never breaks.
 */
export function OfficialLogo({ src, alt, fallback, className, height = 24 }: OfficialLogoProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ height }}
      className={cn('w-auto object-contain', className)}
    />
  );
}
