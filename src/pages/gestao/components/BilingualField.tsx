import { Field } from '../../../components/ui/Field';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import type { Localized } from '../../../lib/cms/types';

interface BilingualFieldProps {
  label: string;
  value: Localized;
  onChange: (next: Localized) => void;
  multiline?: boolean;
  rows?: number;
}

/** Side-by-side PT/EN inputs for one bilingual field — the CMS's core repeated UI unit. */
export function BilingualField({ label, value, onChange, multiline, rows = 3 }: BilingualFieldProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label={`${label} (PT)`}>
        {multiline ? (
          <Textarea value={value.pt} onChange={(e) => onChange({ ...value, pt: e.target.value })} rows={rows} />
        ) : (
          <Input value={value.pt} onChange={(e) => onChange({ ...value, pt: e.target.value })} />
        )}
      </Field>
      <Field label={`${label} (EN)`}>
        {multiline ? (
          <Textarea value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} rows={rows} />
        ) : (
          <Input value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        )}
      </Field>
    </div>
  );
}
