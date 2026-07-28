import { useEffect } from 'react';

/**
 * These are formal/official documents (IDs, certificates, bank details) —
 * always render this page in light mode regardless of the visitor's
 * stored theme preference or OS setting, restoring whatever theme was
 * active before on unmount so the rest of the site is unaffected.
 */
export function useForceLightTheme() {
  useEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains('dark');
    root.classList.remove('dark');
    return () => {
      if (wasDark) root.classList.add('dark');
    };
  }, []);
}
