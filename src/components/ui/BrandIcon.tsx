import { cn } from '../../lib/cn';

export interface SimpleIcon {
  title: string;
  slug?: string;
  hex: string;
  path: string;
}

export interface BrandIconProps {
  /** A simple-icons icon object, e.g. `import { siGithub } from 'simple-icons'`. */
  icon: SimpleIcon;
  size?: number;
  /** Use the brand's official hex instead of currentColor. */
  brandColor?: boolean;
  title?: string;
  className?: string;
}

/**
 * BrandIcon — renders a simple-icons glyph as inline SVG. Defaults to
 * currentColor so it inherits text colour; pass `brandColor` for the official
 * hue. Use for social / brand glyphs across the site.
 *
 *   import { siGithub } from 'simple-icons';
 *   <BrandIcon icon={siGithub} />
 */
export function BrandIcon({
  icon,
  size = 24,
  brandColor = false,
  title,
  className,
}: BrandIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={brandColor ? `#${icon.hex}` : 'currentColor'}
      className={cn('inline-block', className)}
      aria-label={title ?? icon.title}
    >
      <title>{title ?? icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
