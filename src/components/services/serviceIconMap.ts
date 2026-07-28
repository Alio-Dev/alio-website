import { Code, Smartphone, Shield, BarChart3, Palette, Map, type LucideIcon } from 'lucide-react';

// Service pages store the icon as a string (alio_service_pages.icon) so
// it's editable from /gestao without a code change — this maps that
// string back to the actual Lucide component ServiceHero renders.
export const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Smartphone,
  Shield,
  BarChart3,
  Palette,
  Map,
};

export function resolveServiceIcon(name: string): LucideIcon {
  return SERVICE_ICON_MAP[name] ?? Code;
}
