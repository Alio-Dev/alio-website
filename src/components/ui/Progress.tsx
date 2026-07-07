import { cn } from '../../lib/cn';

export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'brand' | 'accent' | 'success' | 'warning' | 'danger';
  className?: string;
}

const fills = {
  brand: 'bg-primary-700 dark:bg-primary-400',
  accent: 'bg-accent-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
};

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  variant = 'brand',
  className,
}: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {(label || showValue) && (
        <div className="flex justify-between text-body-s">
          {label && <span className="text-secondary">{label}</span>}
          {showValue && <span className="font-mono text-tertiary">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"
      >
        <div
          className={cn('h-full rounded-full transition-[width] duration-500 ease-standard', fills[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
