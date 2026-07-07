import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useField } from './Field';
import { inputBase, inputInvalid } from './Input';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

/** Native select styled to the brand token system (accessible, keyboard-native). */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid, id, children, ...props },
  ref,
) {
  const field = useField();
  const resolvedInvalid = invalid ?? field?.invalid ?? false;
  const describedBy =
    [field?.descriptionId, field?.errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="relative">
      <select
        ref={ref}
        id={id ?? field?.id}
        aria-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          inputBase,
          'appearance-none px-3 pr-10 cursor-pointer',
          resolvedInvalid && inputInvalid,
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-tertiary"
      />
    </div>
  );
});
