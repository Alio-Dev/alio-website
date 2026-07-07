import { cn } from '../../lib/cn';

export interface SpinnerProps {
  size?: number;
  className?: string;
  label?: string;
}

/** Indeterminate loading spinner (brand cyan by default). */
export function Spinner({ size = 20, className, label = 'Loading' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn('inline-block animate-spin-fast', className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size} aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
