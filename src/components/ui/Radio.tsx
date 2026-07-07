import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, label, description, id, disabled, ...props },
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
          type="radio"
          disabled={disabled}
          className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border border-border bg-surface transition-colors checked:border-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed dark:checked:border-primary-400"
          {...props}
        />
        <span className="pointer-events-none absolute h-2 w-2 rounded-full bg-primary-700 opacity-0 peer-checked:opacity-100 dark:bg-primary-400" />
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
