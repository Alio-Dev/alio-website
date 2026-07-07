import { Check } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface Step {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: Step[];
  current: number; // 0-indexed active step
  className?: string;
}

/** Horizontal progress stepper. Steps before `current` are complete. */
export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <ol className={cn('flex w-full items-start', className)}>
      {steps.map((step, i) => {
        const complete = i < current;
        const active = i === current;
        const last = i === steps.length - 1;
        return (
          <li key={i} className={cn('flex flex-1 items-start', last && 'flex-none')}>
            <div className="flex flex-col items-center text-center">
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-body-s font-semibold transition-colors',
                  complete && 'border-primary-700 bg-primary-700 text-white dark:border-primary-400 dark:bg-primary-400 dark:text-neutral-950',
                  active && 'border-primary-700 text-brand dark:border-primary-400',
                  !complete && !active && 'border-border text-tertiary',
                )}
                aria-current={active ? 'step' : undefined}
              >
                {complete ? <Check size={16} strokeWidth={3} /> : i + 1}
              </span>
              <span className="mt-2 max-w-[8rem]">
                <span
                  className={cn(
                    'block text-body-s font-medium',
                    active || complete ? 'text-primary' : 'text-tertiary',
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="block text-caption text-tertiary">{step.description}</span>
                )}
              </span>
            </div>
            {!last && (
              <span
                className={cn(
                  'mt-4 h-0.5 flex-1 rounded-full',
                  complete ? 'bg-primary-700 dark:bg-primary-400' : 'bg-border',
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
