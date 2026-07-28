import { useEffect, useRef } from 'react';

/**
 * Tracks a "pristine" snapshot (set whenever editing starts/loads) and
 * compares it to the live value to decide if there are unsaved changes.
 * Warns on tab close/refresh via beforeunload while dirty, and exposes
 * confirmDiscard() for in-app navigation (back button, switching
 * sections) where beforeunload doesn't fire.
 */
export function useDirtyGuard<T>(current: T | null) {
  const originalRef = useRef<T | null>(null);

  const markPristine = (value: T | null) => {
    originalRef.current = value ? JSON.parse(JSON.stringify(value)) : null;
  };

  const isDirty =
    originalRef.current !== null &&
    current !== null &&
    JSON.stringify(current) !== JSON.stringify(originalRef.current);

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const confirmDiscard = () => !isDirty || window.confirm('Tens alterações não guardadas. Sair sem guardar?');

  return { markPristine, confirmDiscard, isDirty };
}
