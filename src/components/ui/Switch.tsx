import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
}

/** Toggle switch (checkbox under the hood for native form + a11y semantics). */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, label, id, disabled, ...props },
  ref,
) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-3 cursor-pointer select-none',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <span className="relative inline-block">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span className="block h-6 w-11 rounded-full bg-neutral-300 transition-colors duration-200 ease-standard peer-checked:bg-primary-700 dark:bg-neutral-700 dark:peer-checked:bg-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--bg)]" />
        <span className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-standard peer-checked:translate-x-5" />
      </span>
      {label && <span className="text-body-s font-medium text-primary">{label}</span>}
    </label>
  );
});
