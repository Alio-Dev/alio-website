import { cn } from '../../lib/cn';

export type BadgeVariant =
  | 'neutral'
  | 'brand'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  brand: 'bg-primary-50 text-primary-700 dark:bg-[var(--brand-subtle)] dark:text-primary-300',
  accent: 'bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-300',
  success: 'bg-success-50 text-success-700 dark:bg-success-950 dark:text-success-300',
  warning: 'bg-warning-50 text-warning-700 dark:bg-warning-950 dark:text-warning-300',
  danger: 'bg-danger-50 text-danger-700 dark:bg-danger-950 dark:text-danger-300',
  info: 'bg-info-50 text-info-700 dark:bg-info-950 dark:text-info-300',
};

const dotColors: Record<BadgeVariant, string> = {
  neutral: 'bg-neutral-400',
  brand: 'bg-primary-500',
  accent: 'bg-accent-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
  info: 'bg-info-500',
};

export function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium font-sans',
        size === 'sm' ? 'px-2 py-0.5 text-caption' : 'px-2.5 py-1 text-body-s',
        variants[variant],
        className,
      )}
      {...props}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
