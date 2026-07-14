import { useEffect } from 'react';

/**
 * Sets the browser tab title and a noindex/nofollow robots meta tag for the
 * lifetime of the calling page, restoring whatever was there before on
 * unmount. Shared by every client-proposal page (ProposalIframePage and the
 * combined Sonagás toggle app) — these are unlisted, direct-link-only pages
 * that must never be indexed or canonicalized.
 */
export function useProposalMeta(title: string) {
  useEffect(() => {
    document.title = title;

    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const hadMeta = Boolean(meta);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    const previousContent = meta.getAttribute('content');
    meta.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (!meta) return;
      if (previousContent === null && !hadMeta) {
        meta.remove();
      } else if (previousContent !== null) {
        meta.setAttribute('content', previousContent);
      }
    };
  }, [title]);
}
