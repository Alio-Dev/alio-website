import { cn } from '../../lib/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
}

/** Loading placeholder with brand shimmer. */
export function Skeleton({ variant = 'rect', className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-shimmer bg-[length:800px_100%] bg-no-repeat',
        'bg-[linear-gradient(90deg,var(--border-subtle)_0px,var(--border)_200px,var(--border-subtle)_400px)]',
        variant === 'text' && 'h-4 rounded-sm',
        variant === 'rect' && 'rounded-md',
        variant === 'circle' && 'rounded-full',
        className,
      )}
      {...props}
    />
  );
}
