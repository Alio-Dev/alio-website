import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Card } from './Card';

export interface KpiCardProps {
  label: string;
  value: string;
  delta?: number; // percentage change, positive = up
  deltaLabel?: string;
  icon?: React.ReactNode;
  invertColors?: boolean; // when down is good (e.g. cost, churn)
  className?: string;
}

/** Dashboard metric tile — big number, label, directional delta. */
export function KpiCard({
  label,
  value,
  delta,
  deltaLabel,
  icon,
  invertColors = false,
  className,
}: KpiCardProps) {
  const up = (delta ?? 0) >= 0;
  const good = invertColors ? !up : up;
  return (
    <Card padding="md" className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-overline uppercase tracking-[0.08em] font-mono text-tertiary">
          {label}
        </span>
        {icon && <span className="text-tertiary">{icon}</span>}
      </div>
      <span className="font-display text-h2 leading-none text-primary tabular-nums">{value}</span>
      {delta !== undefined && (
        <div className="flex items-center gap-1.5 text-body-s">
          <span
            className={cn(
              'inline-flex items-center gap-1 font-medium',
              good
                ? 'text-success-600 dark:text-success-400'
                : 'text-danger-600 dark:text-danger-400',
            )}
          >
            {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {up ? '+' : ''}
            {delta}%
          </span>
          {deltaLabel && <span className="text-tertiary">{deltaLabel}</span>}
        </div>
      )}
    </Card>
  );
}
