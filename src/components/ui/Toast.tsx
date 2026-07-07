import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '../../lib/cn';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toast: (opts: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
};

const accents: Record<ToastVariant, string> = {
  info: 'text-info-500',
  success: 'text-success-500',
  warning: 'text-warning-500',
  danger: 'text-danger-500',
};

let counter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((opts: ToastOptions) => {
    const id = ++counter;
    setItems((list) => [...list, { id, variant: 'info', duration: 4000, ...opts }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className="ds-root pointer-events-none fixed bottom-4 right-4 z-toast flex w-full max-w-sm flex-col gap-2">
            {items.map((t) => (
              <ToastCard key={t.id} item={t} onClose={() => remove(t.id)} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

function ToastCard({ item, onClose }: { item: ToastItem; onClose: () => void }) {
  const Icon = icons[item.variant ?? 'info'];
  useEffect(() => {
    if (!item.duration) return;
    const timer = setTimeout(onClose, item.duration);
    return () => clearTimeout(timer);
  }, [item.duration, onClose]);

  return (
    <div
      role="status"
      className="pointer-events-auto flex gap-3 rounded-lg border border-border bg-surface-raised p-4 shadow-lg animate-slide-in-right"
    >
      <Icon size={18} className={cn('mt-0.5 shrink-0', accents[item.variant ?? 'info'])} />
      <div className="flex-1 min-w-0">
        <p className="text-body-s font-semibold text-primary">{item.title}</p>
        {item.description && <p className="mt-0.5 text-body-s text-tertiary">{item.description}</p>}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="shrink-0 rounded-sm text-tertiary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
