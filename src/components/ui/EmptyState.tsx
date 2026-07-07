import { cn } from '../../lib/cn';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/** Empty / zero-data state. Voice: say what's missing, offer the next step. */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-6 py-12 text-center',
        className,
      )}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-subtle text-tertiary">
          {icon}
        </div>
      )}
      <div className="max-w-sm">
        <h3 className="text-h6 text-primary">{title}</h3>
        {description && <p className="mt-1 text-body-s text-tertiary">{description}</p>}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
