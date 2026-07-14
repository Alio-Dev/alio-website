import { useEffect } from 'react';

export interface ProposalIframePageProps {
  /** Path under /public to the self-contained exported bundle. */
  assetSrc: string;
  /** Browser tab title and iframe accessible title. */
  title: string;
}

/**
 * Shared shell for client proposal/prototype pages. Each embeds a
 * self-contained exported bundle (its own fonts/images/runtime baked in)
 * untouched, via iframe, so the bundle's internal asset-unpacking script is
 * never at risk of breaking. No site chrome (Layout/Nav/Footer): the
 * prototype is full-screen and carries its own branding.
 *
 * Unlisted by design — direct-link only for the client, not indexed or in
 * the sitemap (sets a noindex meta tag for the lifetime of the page).
 */
export default function ProposalIframePage({ assetSrc, title }: ProposalIframePageProps) {
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
      // Restore whatever the rest of the site had set, so navigating away
      // (client-side) doesn't leave other pages marked noindex.
      if (!meta) return;
      if (previousContent === null && !hadMeta) {
        meta.remove();
      } else if (previousContent !== null) {
        meta.setAttribute('content', previousContent);
      }
    };
  }, [title]);

  return (
    <iframe
      src={assetSrc}
      title={title}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', border: 0 }}
      allow="clipboard-write"
    />
  );
}
