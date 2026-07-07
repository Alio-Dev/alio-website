import { useEffect } from 'react';

export interface SeoProps {
  title: string;
  description?: string;
  path?: string;
}

const SITE = 'Alio Analytics Design System';

/** Lightweight document head manager (title + meta) for the SPA docs. */
export function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} · ${SITE}`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    if (description) {
      setMeta('meta[name="ds-description"]', 'name', 'ds-description', description);
      setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    }
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    if (path) {
      setMeta('meta[property="og:url"]', 'property', 'og:url', `https://alio.ao${path}`);
    }
  }, [title, description, path]);

  return null;
}
