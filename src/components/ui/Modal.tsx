import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };

/** Accessible modal dialog: portal, Escape to close, focus trap, scroll lock. */
export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevActive = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    // focus first focusable inside the panel
    requestAnimationFrame(() => {
      const focusable = panelRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]),a[href],input,textarea,select,[tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    });

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevActive?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="ds-root fixed inset-0 z-modal flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        className={cn(
          'relative z-10 w-full rounded-xl border border-border bg-surface shadow-float animate-scale-in',
          sizes[size],
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 p-6 pb-0">
          <div>
            {title && <h2 className="text-h4 text-primary">{title}</h2>}
            {description && <p className="mt-1 text-body-s text-tertiary">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-tertiary transition-colors hover:bg-bg-subtle hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <X size={20} />
          </button>
        </div>
        {children && <div className="p-6 text-body-m text-secondary">{children}</div>}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-border-subtle p-6 pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
