import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/** Slide-over panel: portal, Escape to close, scroll lock. */
export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  footer,
  className,
}: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(() =>
      ref.current?.querySelector<HTMLElement>('button,a,input,[tabindex]')?.focus(),
    );
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="ds-root fixed inset-0 z-drawer">
      <div
        className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : 'Panel'}
        className={cn(
          'absolute top-0 bottom-0 flex w-full max-w-md flex-col border-border bg-surface shadow-float',
          side === 'right'
            ? 'right-0 border-l animate-slide-in-right'
            : 'left-0 border-r animate-slide-in-right',
          className,
        )}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border-subtle p-6">
          {title && <h2 className="text-h5 text-primary">{title}</h2>}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-auto rounded-md p-1 text-tertiary hover:bg-bg-subtle hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <X size={20} />
          </button>
        </div>
        <div className="ds-scroll flex-1 overflow-y-auto p-6 text-body-m text-secondary">
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-border-subtle p-6">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
