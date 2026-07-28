import { supabase } from '../supabaseClient';
import type {
  ServicePage,
  BlogPost,
  CaseStudy,
  JobOpening,
  LegalDocRow,
  SiteSettings,
  MediaAsset,
} from './types';

const BUCKET = 'alio';

// ---------------------------------------------------------------------
// Service pages
// ---------------------------------------------------------------------

export async function listServicePages(): Promise<ServicePage[]> {
  const { data, error } = await supabase
    .from('alio_service_pages')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data as ServicePage[];
}

export async function getServicePageBySlug(slug: string): Promise<ServicePage | null> {
  const { data, error } = await supabase
    .from('alio_service_pages')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as ServicePage | null;
}

export async function upsertServicePage(
  page: Partial<ServicePage> & { slug: string },
): Promise<ServicePage> {
  const { data, error } = await supabase
    .from('alio_service_pages')
    .upsert(page, { onConflict: 'slug' })
    .select()
    .single();
  if (error) throw error;
  return data as ServicePage;
}

// ---------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------

export async function listBlogPosts(opts: { onlyPublished?: boolean } = {}): Promise<BlogPost[]> {
  let query = supabase.from('alio_blog_posts').select('*').order('published_at', { ascending: false });
  if (opts.onlyPublished) query = query.eq('published', true);
  const { data, error } = await query;
  if (error) throw error;
  return data as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('alio_blog_posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as BlogPost | null;
}

export async function upsertBlogPost(post: Partial<BlogPost> & { slug: string }): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('alio_blog_posts')
    .upsert(post, { onConflict: 'slug' })
    .select()
    .single();
  if (error) throw error;
  return data as BlogPost;
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from('alio_blog_posts').delete().eq('id', id);
  if (error) throw error;
}

// ---------------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------------

export async function listCaseStudies(opts: { onlyPublished?: boolean } = {}): Promise<CaseStudy[]> {
  let query = supabase.from('alio_case_studies').select('*').order('display_order', { ascending: true });
  if (opts.onlyPublished) query = query.eq('published', true);
  const { data, error } = await query;
  if (error) throw error;
  return data as CaseStudy[];
}

export async function upsertCaseStudy(cs: Partial<CaseStudy> & { slug: string }): Promise<CaseStudy> {
  const { data, error } = await supabase
    .from('alio_case_studies')
    .upsert(cs, { onConflict: 'slug' })
    .select()
    .single();
  if (error) throw error;
  return data as CaseStudy;
}

export async function deleteCaseStudy(id: string) {
  const { error } = await supabase.from('alio_case_studies').delete().eq('id', id);
  if (error) throw error;
}

// ---------------------------------------------------------------------
// Careers
// ---------------------------------------------------------------------

export async function listJobOpenings(opts: { onlyPublished?: boolean } = {}): Promise<JobOpening[]> {
  let query = supabase.from('alio_job_openings').select('*').order('created_at', { ascending: false });
  if (opts.onlyPublished) query = query.eq('published', true);
  const { data, error } = await query;
  if (error) throw error;
  return data as JobOpening[];
}

export async function upsertJobOpening(job: Partial<JobOpening> & { slug: string }): Promise<JobOpening> {
  const { data, error } = await supabase
    .from('alio_job_openings')
    .upsert(job, { onConflict: 'slug' })
    .select()
    .single();
  if (error) throw error;
  return data as JobOpening;
}

export async function deleteJobOpening(id: string) {
  const { error } = await supabase.from('alio_job_openings').delete().eq('id', id);
  if (error) throw error;
}

// ---------------------------------------------------------------------
// Legal
// ---------------------------------------------------------------------

export async function getLegalDoc(kind: 'privacy' | 'terms'): Promise<LegalDocRow | null> {
  const { data, error } = await supabase
    .from('alio_legal_docs')
    .select('*')
    .eq('kind', kind)
    .maybeSingle();
  if (error) throw error;
  return data as LegalDocRow | null;
}

export async function upsertLegalDoc(doc: LegalDocRow): Promise<LegalDocRow> {
  const { data, error } = await supabase
    .from('alio_legal_docs')
    .upsert(doc, { onConflict: 'kind' })
    .select()
    .single();
  if (error) throw error;
  return data as LegalDocRow;
}

// ---------------------------------------------------------------------
// Site settings (singleton row)
// ---------------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase.from('alio_site_settings').select('*').maybeSingle();
  if (error) throw error;
  return data as SiteSettings | null;
}

export async function upsertSiteSettings(
  settings: Partial<SiteSettings>,
): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('alio_site_settings')
    .upsert({ id: true, ...settings }, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data as SiteSettings;
}

// ---------------------------------------------------------------------
// Media library
// ---------------------------------------------------------------------

export async function listMedia(): Promise<MediaAsset[]> {
  const { data, error } = await supabase
    .from('alio_media')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as MediaAsset[];
}

export function getMediaPublicUrl(storagePath: string): string {
  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

export async function uploadMedia(file: File, altText?: { pt: string; en: string }): Promise<MediaAsset> {
  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
  const storagePath = `media/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, { contentType: file.type || 'application/octet-stream' });
  if (uploadError) throw uploadError;

  const dims = await readImageDimensions(file).catch(() => null);

  const { data, error: insertError } = await supabase
    .from('alio_media')
    .insert({
      storage_path: storagePath,
      alt_text: altText ?? null,
      width: dims?.width ?? null,
      height: dims?.height ?? null,
    })
    .select()
    .single();

  if (insertError) {
    await supabase.storage.from(BUCKET).remove([storagePath]);
    throw insertError;
  }
  return data as MediaAsset;
}

export async function deleteMedia(asset: MediaAsset) {
  await supabase.storage.from(BUCKET).remove([asset.storage_path]);
  const { error } = await supabase.from('alio_media').delete().eq('id', asset.id);
  if (error) throw error;
}

function readImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('not an image'));
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      reject(new Error('failed to read image'));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}
