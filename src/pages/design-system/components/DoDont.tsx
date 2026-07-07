import { Check, X } from 'lucide-react';
import { cn } from '../../../lib/cn';

interface Item {
  text: string;
  children?: React.ReactNode;
}

function Panel({
  kind,
  items,
}: {
  kind: 'do' | 'dont';
  items: Item[];
}) {
  const isDo = kind === 'do';
  return (
    <div
      className={cn(
        'rounded-lg border p-5',
        isDo
          ? 'border-success-200 bg-success-50 dark:border-success-900 dark:bg-success-950/30'
          : 'border-danger-200 bg-danger-50 dark:border-danger-900 dark:bg-danger-950/30',
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full text-white',
            isDo ? 'bg-success-500' : 'bg-danger-500',
          )}
        >
          {isDo ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
        </span>
        <span
          className={cn(
            'text-body-s font-semibold uppercase tracking-wide',
            isDo ? 'text-success-700 dark:text-success-300' : 'text-danger-700 dark:text-danger-300',
          )}
        >
          {isDo ? 'Do' : "Don't"}
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="text-body-s text-secondary">
            {item.children ?? item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DoDont({ dos, donts }: { dos: Item[]; donts: Item[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Panel kind="do" items={dos} />
      <Panel kind="dont" items={donts} />
    </div>
  );
}
