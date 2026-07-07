import { forwardRef } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, description, indeterminate, id, disabled, ...props },
  ref,
) {
  return (
    <label
      className={cn(
        'group inline-flex items-start gap-2.5 cursor-pointer select-none',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center mt-0.5">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          disabled={disabled}
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[5px] border border-border bg-surface transition-colors checked:border-primary-700 checked:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed dark:checked:border-primary-400 dark:checked:bg-primary-400"
          {...props}
        />
        <span className="pointer-events-none text-white opacity-0 peer-checked:opacity-100 dark:text-neutral-950">
          {indeterminate ? <Minus size={13} strokeWidth={3} /> : <Check size={13} strokeWidth={3} />}
        </span>
      </span>
      {(label || description) && (
        <span className="flex flex-col">
          {label && <span className="text-body-s font-medium text-primary">{label}</span>}
          {description && <span className="text-caption text-tertiary">{description}</span>}
        </span>
      )}
    </label>
  );
});
