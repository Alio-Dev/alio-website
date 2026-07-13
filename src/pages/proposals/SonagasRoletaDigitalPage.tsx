import { useEffect } from 'react';

const ASSET_SRC = '/propostas/sonagas/roleta-digital.html';

/**
 * Client proposal — Sonagás "Roleta Digital". This embeds a self-contained
 * exported presentation (its own fonts/images/runtime bundled inside the
 * file) untouched, via iframe, so its internal asset-unpacking script is
 * never at risk of breaking. No site chrome (Layout/Nav/Footer): the
 * presentation is full-screen and carries its own branding.
 *
 * Unlisted by design — direct-link only for the client, not indexed or in
 * the sitemap (see the noindex meta tag below).
 */
export default function SonagasRoletaDigitalPage() {
  useEffect(() => {
    document.title = 'Roleta Digital — Proposta Sonagás · Alio Analytics';

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
  }, []);

  return (
    <iframe
      src={ASSET_SRC}
      title="Roleta Digital — Proposta Sonagás"
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', border: 0 }}
      allow="clipboard-write"
    />
  );
}
