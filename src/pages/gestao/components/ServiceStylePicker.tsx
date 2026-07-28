import { Field } from '../../../components/ui/Field';
import { cn } from '../../../lib/cn';
import { SERVICE_ICON_MAP } from '../../../components/services/serviceIconMap';

const GRADIENT_OPTIONS = [
  'bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800',
  'bg-gradient-to-br from-teal-900 via-teal-800 to-blue-800',
  'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900',
  'bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800',
  'bg-gradient-to-br from-pink-900 via-rose-800 to-orange-800',
  'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-800',
  'bg-gradient-to-br from-indigo-900 via-indigo-800 to-cyan-800',
  'bg-gradient-to-br from-amber-900 via-orange-800 to-red-800',
];

export function ServiceStylePicker({
  icon,
  gradient,
  onIconChange,
  onGradientChange,
}: {
  icon: string;
  gradient: string;
  onIconChange: (icon: string) => void;
  onGradientChange: (gradient: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Ícone">
        <div className="flex flex-wrap gap-2">
          {Object.entries(SERVICE_ICON_MAP).map(([name, Icon]) => (
            <button
              key={name}
              type="button"
              onClick={() => onIconChange(name)}
              aria-label={name}
              aria-pressed={icon === name}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg border transition-colors',
                icon === name
                  ? 'border-brand bg-brand-subtle text-brand'
                  : 'border-border bg-surface text-tertiary hover:border-brand hover:text-brand',
              )}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </Field>
      <Field label="Gradiente">
        <div className="flex flex-wrap gap-2">
          {GRADIENT_OPTIONS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onGradientChange(g)}
              aria-label={g}
              aria-pressed={gradient === g}
              className={cn(
                'h-10 w-10 rounded-lg border-2 transition-transform',
                g,
                gradient === g ? 'border-primary-700 scale-105' : 'border-transparent hover:scale-105',
              )}
            />
          ))}
        </div>
      </Field>
    </div>
  );
}
