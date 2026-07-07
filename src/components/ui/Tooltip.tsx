import { useId, useState } from 'react';
import { cn } from '../../lib/cn';

export interface TooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactElement;
  className?: string;
}

const sideClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

/** Lightweight hover/focus tooltip (CSS-positioned, no external deps). */
export function Tooltip({ content, side = 'top', children, className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined}>{children}</span>
      {open && (
        <span
          role="tooltip"
          id={id}
          className={cn(
            'pointer-events-none absolute z-tooltip w-max max-w-xs animate-fade-in rounded-md bg-neutral-900 px-2.5 py-1.5 text-caption font-medium text-white shadow-lg dark:bg-neutral-700',
            sideClasses[side],
            className,
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
