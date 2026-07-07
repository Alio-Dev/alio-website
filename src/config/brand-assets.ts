/**
 * Registry of official third-party brand assets used on the site.
 *
 * These are trademarked vendor logos (LinkedIn, AWS, Microsoft). They must be
 * the vendor's OWN official SVG files — do not hand-author or trace them.
 * Download each from the vendor's brand/press page and place it at the path
 * below (relative to /public). Until a file exists, the UI renders an
 * accessible fallback (see OfficialLogo), so the layout never breaks.
 */
export interface OfficialAsset {
  /** Path under /public where the vendor's official SVG must be placed. */
  path: string;
  /** Human label / alt text. */
  label: string;
  /** Where to obtain the official asset. */
  source: string;
}

export const OFFICIAL_ASSETS: OfficialAsset[] = [
  {
    path: '/brand/social/linkedin.svg',
    label: 'LinkedIn',
    source: 'https://brand.linkedin.com/ (Downloads → logos)',
  },
  {
    path: '/brand/partners/aws.svg',
    label: 'Amazon Web Services',
    source: 'https://aws.amazon.com/architecture/icons/ or AWS co-marketing kit',
  },
  {
    path: '/brand/partners/microsoft.svg',
    label: 'Microsoft',
    source: 'https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks (brand assets)',
  },
];
