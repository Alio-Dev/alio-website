import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import { useField } from './Field';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const inputBase =
  'w-full h-10 rounded-md bg-surface text-primary text-body-m font-sans ' +
  'border border-border placeholder:text-tertiary transition-shadow duration-150 ' +
  'focus:outline-none focus:border-accent-500 focus:ring-[3px] focus:ring-accent-500/20 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

export const inputInvalid =
  'border-danger-500 bg-danger-50 dark:bg-danger-950/30 focus:border-danger-500 focus:ring-danger-500/20';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, leftIcon, rightIcon, id, ...props },
  ref,
) {
  const field = useField();
  const resolvedInvalid = invalid ?? field?.invalid ?? false;
  const describedBy =
    [field?.descriptionId, field?.errorId].filter(Boolean).join(' ') || undefined;

  if (leftIcon || rightIcon) {
    return (
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 text-tertiary">{leftIcon}</span>
        )}
        <input
          ref={ref}
          id={id ?? field?.id}
          aria-invalid={resolvedInvalid || undefined}
          aria-describedby={describedBy}
          className={cn(
            inputBase,
            Boolean(leftIcon) && 'pl-10',
            Boolean(rightIcon) && 'pr-10',
            !leftIcon && !rightIcon && 'px-3',
            Boolean(leftIcon) && !rightIcon && 'pr-3',
            !leftIcon && Boolean(rightIcon) && 'pl-3',
            resolvedInvalid && inputInvalid,
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span className="pointer-events-none absolute right-3 text-tertiary">{rightIcon}</span>
        )}
      </div>
    );
  }

  return (
    <input
      ref={ref}
      id={id ?? field?.id}
      aria-invalid={resolvedInvalid || undefined}
      aria-describedby={describedBy}
      className={cn(inputBase, 'px-3', resolvedInvalid && inputInvalid, className)}
      {...props}
    />
  );
});
