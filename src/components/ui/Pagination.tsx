import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function range(page: number, count: number): (number | 'ellipsis')[] {
  const delta = 1;
  const pages: (number | 'ellipsis')[] = [];
  const left = Math.max(2, page - delta);
  const right = Math.min(count - 1, page + delta);
  pages.push(1);
  if (left > 2) pages.push('ellipsis');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < count - 1) pages.push('ellipsis');
  if (count > 1) pages.push(count);
  return pages;
}

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;
  const pages = range(page, pageCount);
  const btn =
    'inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-body-s font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:opacity-40 disabled:pointer-events-none';

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button
        type="button"
        className={cn(btn, 'text-secondary hover:bg-bg-subtle')}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e${i}`} className="px-2 text-tertiary">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onPageChange(p)}
            className={cn(
              btn,
              p === page
                ? 'bg-primary-700 text-white dark:bg-primary-400 dark:text-neutral-950'
                : 'text-secondary hover:bg-bg-subtle',
            )}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        className={cn(btn, 'text-secondary hover:bg-bg-subtle')}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
