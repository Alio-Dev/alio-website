import { useEffect, useRef, useState } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { Field } from '../../../components/ui/Field';
import { Input } from '../../../components/ui/Input';
import { slugify } from '../../../lib/cms/slug';
import { isSlugTaken } from '../../../lib/cms/api';

interface SlugFieldProps {
  value: string;
  onChange: (v: string) => void;
  sourceTitle: string;
  tableName: string;
  currentId?: string;
}

/**
 * Auto-fills from sourceTitle (the PT title) until the admin edits the
 * slug directly, then stops auto-syncing. Debounced uniqueness check
 * against the same table, excluding the record being edited.
 */
export function SlugField({ value, onChange, sourceTitle, tableName, currentId }: SlugFieldProps) {
  // A non-empty value on first mount means this is an existing record —
  // never auto-overwrite an already-saved slug just because its title
  // changed. Only genuinely new/blank slugs auto-sync from the title.
  const touchedRef = useRef(value !== '');
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  useEffect(() => {
    if (touchedRef.current) return;
    onChange(slugify(sourceTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceTitle]);

  useEffect(() => {
    if (!value) { setStatus('idle'); return; }
    setStatus('checking');
    const timer = setTimeout(() => {
      isSlugTaken(tableName, value, currentId)
        .then((taken) => setStatus(taken ? 'taken' : 'available'))
        .catch(() => setStatus('idle'));
    }, 400);
    return () => clearTimeout(timer);
  }, [value, tableName, currentId]);

  return (
    <Field
      label="Slug (URL)"
      error={status === 'taken' ? 'Já existe outro registo com este slug.' : undefined}
    >
      <Input
        value={value}
        onChange={(e) => { touchedRef.current = true; onChange(slugify(e.target.value)); }}
        rightIcon={
          status === 'checking' ? <Loader2 size={14} className="animate-spin" /> :
          status === 'available' ? <Check size={14} className="text-success-500" /> :
          status === 'taken' ? <X size={14} className="text-danger-500" /> : undefined
        }
      />
    </Field>
  );
}
