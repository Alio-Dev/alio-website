export interface Localized {
  pt: string;
  en: string;
}

export interface ServiceFeature {
  title: Localized;
  description: Localized;
}

export interface ServicePage {
  id: string;
  slug: string;
  icon: string;
  gradient: string;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  features: ServiceFeature[];
  technologies: string[];
  features_title: Localized;
  service_type: string;
  display_order: number;
  published: boolean;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: Localized;
  excerpt: Localized;
  body: Localized;
  category: string | null;
  cover_path: string | null;
  author: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: Localized;
  summary: Localized;
  client: string | null;
  industry: string | null;
  challenge: Localized | null;
  solution: Localized | null;
  results: Localized | null;
  cover_path: string | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobOpening {
  id: string;
  slug: string;
  title: Localized;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  description: Localized;
  requirements: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LegalDocRow {
  kind: 'privacy' | 'terms';
  intro: Localized;
  sections: { heading: Localized; body: Localized }[];
  updated_at: string;
}

export interface SiteSettings {
  id: true;
  phone: string | null;
  email: string | null;
  address: string | null;
  social_links: { label: string; href: string }[];
  tagline: Localized | null;
  updated_at: string;
}

export interface MediaAsset {
  id: string;
  storage_path: string;
  alt_text: Localized | null;
  width: number | null;
  height: number | null;
  created_at: string;
}
