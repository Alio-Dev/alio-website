import { useCallback, useRef, useState } from 'react';

/** Copy-to-clipboard with a transient "copied" flag (2s). */
export function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Fallback for older browsers / insecure contexts
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
        } catch {
          /* ignore */
        }
        document.body.removeChild(ta);
      }
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), timeout);
    },
    [timeout],
  );

  return { copied, copy };
}
