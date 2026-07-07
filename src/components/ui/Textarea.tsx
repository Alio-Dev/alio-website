import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import { useField } from './Field';
import { inputBase, inputInvalid } from './Input';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, id, rows = 4, ...props },
  ref,
) {
  const field = useField();
  const resolvedInvalid = invalid ?? field?.invalid ?? false;
  const describedBy =
    [field?.descriptionId, field?.errorId].filter(Boolean).join(' ') || undefined;

  return (
    <textarea
      ref={ref}
      id={id ?? field?.id}
      rows={rows}
      aria-invalid={resolvedInvalid || undefined}
      aria-describedby={describedBy}
      className={cn(
        inputBase,
        'h-auto min-h-[80px] px-3 py-2 resize-y leading-6',
        resolvedInvalid && inputInvalid,
        className,
      )}
      {...props}
    />
  );
});
