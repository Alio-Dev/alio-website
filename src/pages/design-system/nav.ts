export interface NavLink {
  label: string;
  to: string;
  keywords?: string[];
}
export interface NavGroup {
  title: string;
  links: NavLink[];
}

export const BASE = '/design-system';

export const NAV: NavGroup[] = [
  {
    title: 'Overview',
    links: [
      { label: 'Introduction', to: BASE, keywords: ['home', 'start', 'brand', 'hero'] },
      { label: 'Tokens', to: `${BASE}/tokens`, keywords: ['css', 'json', 'tailwind', 'variables', 'ts'] },
    ],
  },
  {
    title: 'Brand',
    links: [
      { label: 'Brand overview', to: `${BASE}/brand`, keywords: ['logo', 'voice', 'tone', 'iconography'] },
      { label: 'Colors', to: `${BASE}/brand#colors`, keywords: ['palette', 'hex', 'indigo', 'cyan'] },
      { label: 'Typography', to: `${BASE}/brand#typography`, keywords: ['sora', 'instrument', 'jetbrains', 'type'] },
      { label: 'Logo', to: `${BASE}/brand#logo`, keywords: ['mark', 'wordmark', 'download', 'svg'] },
    ],
  },
  {
    title: 'Foundations',
    links: [
      { label: 'Overview', to: `${BASE}/foundations`, keywords: ['spacing', 'grid', 'radius', 'shadow'] },
      { label: 'Spacing & grid', to: `${BASE}/foundations#spacing`, keywords: ['8pt', 'layout'] },
      { label: 'Radius & shadows', to: `${BASE}/foundations#radius`, keywords: ['elevation', 'corner'] },
      { label: 'Motion', to: `${BASE}/foundations#motion`, keywords: ['animation', 'easing', 'duration'] },
      { label: 'Accessibility', to: `${BASE}/foundations#accessibility`, keywords: ['wcag', 'a11y', 'contrast', 'focus'] },
    ],
  },
  {
    title: 'Components',
    links: [
      { label: 'Overview', to: `${BASE}/components`, keywords: ['library', 'index'] },
      { label: 'Buttons', to: `${BASE}/components/buttons`, keywords: ['cta', 'action'] },
      { label: 'Forms', to: `${BASE}/components/forms`, keywords: ['input', 'select', 'checkbox', 'radio', 'switch', 'textarea', 'field'] },
      { label: 'Cards', to: `${BASE}/components/cards`, keywords: ['panel', 'surface', 'kpi'] },
      { label: 'Navigation', to: `${BASE}/components/navigation`, keywords: ['tabs', 'breadcrumb', 'pagination', 'stepper', 'sidebar'] },
      { label: 'Feedback', to: `${BASE}/components/feedback`, keywords: ['alert', 'toast', 'progress', 'spinner', 'skeleton'] },
      { label: 'Overlays', to: `${BASE}/components/overlays`, keywords: ['modal', 'drawer', 'tooltip', 'dialog'] },
      { label: 'Display', to: `${BASE}/components/display`, keywords: ['badge', 'avatar', 'empty', 'table'] },
      { label: 'Tables', to: `${BASE}/components/tables`, keywords: ['data', 'grid', 'rows'] },
      { label: 'Charts', to: `${BASE}/components/charts`, keywords: ['bar', 'line', 'donut', 'sparkline', 'data viz'] },
      { label: 'GIS / Maps', to: `${BASE}/components/maps`, keywords: ['map', 'geo', 'location', 'gis'] },
    ],
  },
  {
    title: 'Patterns',
    links: [
      { label: 'Overview', to: `${BASE}/patterns`, keywords: ['templates', 'dashboard', 'empty', 'error'] },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Brand kit', to: `${BASE}/brand-kit`, keywords: ['download', 'assets', 'letterhead', 'invoice', 'social'] },
    ],
  },
];

/** Flattened link list for search. */
export const ALL_LINKS: NavLink[] = NAV.flatMap((g) => g.links);
