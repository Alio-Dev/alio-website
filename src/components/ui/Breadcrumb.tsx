import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-body-s">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <a
                  href={item.href}
                  className="text-tertiary transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                >
                  {item.label}
                </a>
              ) : (
                <span className={cn(last ? 'font-medium text-primary' : 'text-tertiary')} aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight size={14} className="text-neutral-400" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
