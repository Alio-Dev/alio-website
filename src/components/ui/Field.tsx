import { createContext, useContext, useId } from 'react';
import { cn } from '../../lib/cn';

interface FieldContextValue {
  id: string;
  descriptionId?: string;
  errorId?: string;
  invalid: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

export function useField() {
  return useContext(FieldContext);
}

export interface FieldProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Field — accessible wrapper that wires a visible label, description and
 * error text to a control via aria-describedby / aria-invalid. Labels are
 * always visible (13px / 600) per BRAND.md §6.
 */
export function Field({
  label,
  description,
  error,
  required,
  className,
  children,
}: FieldProps) {
  const id = useId();
  const descriptionId = description ? `${id}-desc` : undefined;
  const errorId = error ? `${id}-err` : undefined;
  const invalid = Boolean(error);

  return (
    <FieldContext.Provider value={{ id, descriptionId, errorId, invalid }}>
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label
            htmlFor={id}
            className="text-[13px] font-semibold font-sans text-primary leading-5"
          >
            {label}
            {required && <span className="text-danger-500 ml-0.5">*</span>}
          </label>
        )}
        {children}
        {description && !error && (
          <p id={descriptionId} className="text-body-s text-tertiary">
            {description}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-body-s text-danger-600 dark:text-danger-400">
            {error}
          </p>
        )}
      </div>
    </FieldContext.Provider>
  );
}
