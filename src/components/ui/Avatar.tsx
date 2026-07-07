import { useState } from 'react';
import { cn } from '../../lib/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizes: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-caption',
  sm: 'h-8 w-8 text-body-s',
  md: 'h-10 w-10 text-body-s',
  lg: 'h-12 w-12 text-body-m',
  xl: 'h-16 w-16 text-h5',
};

function initials(name?: string) {
  if (!name) return '';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

export function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-sans font-semibold',
        'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200',
        sizes[size],
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? ''}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden={!name}>{initials(name) || '·'}</span>
      )}
    </span>
  );
}

export function AvatarGroup({
  children,
  max = 4,
  className,
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const items = Array.isArray(children) ? children : [children];
  const shown = items.slice(0, max);
  const overflow = items.length - shown.length;
  return (
    <div className={cn('flex -space-x-2', className)}>
      {shown.map((child, i) => (
        <span key={i} className="ring-2 ring-[var(--bg)] rounded-full">
          {child}
        </span>
      ))}
      {overflow > 0 && (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-body-s font-semibold text-neutral-600 ring-2 ring-[var(--bg)] dark:bg-neutral-700 dark:text-neutral-200">
          +{overflow}
        </span>
      )}
    </div>
  );
}
