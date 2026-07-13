import { useEffect } from 'react';

export interface SeoProps {
  title: string;
  description?: string;
  /** Path only, e.g. "/about" — used for canonical + og:url. */
  path?: string;
  image?: string;
  /** Set for error/utility pages that should never be indexed or canonicalized. */
  noindex?: boolean;
}

const SITE = 'Alio Analytics';
const ORIGIN = 'https://www.alio.ao';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertRobots(content: string) {
  let el = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', 'robots');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Per-route SEO for the marketing SPA — sets a unique <title>, meta
 * description, canonical URL and Open Graph tags on navigation.
 */
export function Seo({ title, description, path, image = `${ORIGIN}/og-image.png`, noindex }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} · ${SITE}`;
    document.title = fullTitle;

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:description', description);
    }
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('property', 'og:image', image);
    upsertMeta('name', 'twitter:image', image);

    if (noindex) {
      upsertRobots('noindex, nofollow');
    } else {
      upsertRobots('index, follow');
      if (path) {
        const url = `${ORIGIN}${path}`;
        upsertMeta('property', 'og:url', url);
        upsertCanonical(url);
      }
    }
  }, [title, description, path, image, noindex]);

  return null;
}
