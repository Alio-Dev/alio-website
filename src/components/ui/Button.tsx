import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import { Spinner } from './Spinner';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold whitespace-nowrap select-none ' +
  'rounded-md transition-colors duration-150 ease-standard ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-[var(--bg)] disabled:opacity-45 disabled:pointer-events-none';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900 ' +
    'dark:bg-primary-400 dark:text-neutral-950 dark:hover:bg-primary-300',
  secondary:
    'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200 ' +
    'dark:bg-[var(--brand-subtle)] dark:text-primary-300 dark:hover:bg-primary-900/60',
  outline:
    'bg-surface text-primary border border-border hover:bg-bg-subtle active:bg-neutral-100 ' +
    'dark:hover:bg-surface-raised',
  ghost:
    'bg-transparent text-secondary hover:bg-bg-subtle hover:text-primary active:bg-neutral-100 ' +
    'dark:hover:bg-surface-raised',
  danger: 'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800',
  success: 'bg-success-600 text-white hover:bg-success-700 active:bg-success-800',
  link: 'bg-transparent text-brand hover:underline underline-offset-4 px-0 h-auto',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-body-s',
  md: 'h-10 px-4 text-body-s',
  lg: 'h-12 px-6 text-body-m',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth,
    className,
    children,
    disabled,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        base,
        variants[variant],
        variant !== 'link' && sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner size={size === 'lg' ? 18 : 16} className="text-current" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
});
