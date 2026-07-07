import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '../../lib/cn';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const styles: Record<AlertVariant, { wrap: string; icon: string; Icon: typeof Info }> = {
  info: {
    wrap: 'bg-info-50 border-info-200 text-info-900 dark:bg-info-950/40 dark:border-info-900 dark:text-info-200',
    icon: 'text-info-500',
    Icon: Info,
  },
  success: {
    wrap: 'bg-success-50 border-success-200 text-success-900 dark:bg-success-950/40 dark:border-success-900 dark:text-success-200',
    icon: 'text-success-500',
    Icon: CheckCircle2,
  },
  warning: {
    wrap: 'bg-warning-50 border-warning-200 text-warning-900 dark:bg-warning-950/40 dark:border-warning-900 dark:text-warning-200',
    icon: 'text-warning-500',
    Icon: AlertTriangle,
  },
  danger: {
    wrap: 'bg-danger-50 border-danger-200 text-danger-900 dark:bg-danger-950/40 dark:border-danger-900 dark:text-danger-200',
    icon: 'text-danger-500',
    Icon: XCircle,
  },
};

export function Alert({
  variant = 'info',
  title,
  icon,
  onClose,
  className,
  children,
  ...props
}: AlertProps) {
  const s = styles[variant];
  const Icon = s.Icon;
  return (
    <div
      role="alert"
      className={cn('flex gap-3 rounded-lg border p-4', s.wrap, className)}
      {...props}
    >
      <span className={cn('shrink-0 mt-0.5', s.icon)}>
        {icon ?? <Icon size={18} />}
      </span>
      <div className="flex-1 min-w-0">
        {title && <p className="text-body-s font-semibold mb-0.5">{title}</p>}
        {children && <div className="text-body-s opacity-90">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 rounded-sm opacity-60 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
