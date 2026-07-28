import { supabase } from '../supabaseClient';
import type {
  ServicePage,
  BlogPost,
  CaseStudy,
  JobOpening,
  LegalDocRow,
  SiteSettings,
  MediaAsset,
  Staff,
  StaffRole,
  AuditLogEntry,
  ContactSubmission,
  ContactSubmissionStatus,
  ContentRevision,
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

export async function updateMediaAltText(id: string, altText: { pt: string; en: string }) {
  const { error } = await supabase.from('alio_media').update({ alt_text: altText }).eq('id', id);
  if (error) throw error;
}

// ---------------------------------------------------------------------
// Contact form submissions (public insert, staff-only read/manage)
// ---------------------------------------------------------------------

/**
 * Public, unauthenticated insert — deliberately does NOT chain .select()
 * back. Anon can insert (RLS check(true)) but cannot SELECT rows (that
 * requires alio_is_authorized_viewer()), and Postgres evaluates an
 * implicit RETURNING against the SELECT policy too — requesting the row
 * back here would make a valid anonymous insert fail with a misleading
 * "violates row-level security policy" error.
 */
export async function submitContactForm(input: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}) {
  const { error } = await supabase.from('alio_contact_submissions').insert(input);
  if (error) throw error;
}

export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  const { data, error } = await supabase
    .from('alio_contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as ContactSubmission[];
}

export async function updateSubmissionStatus(id: string, status: ContactSubmissionStatus) {
  const { error } = await supabase.from('alio_contact_submissions').update({ status }).eq('id', id);
  if (error) throw error;
}

export async function deleteContactSubmission(id: string) {
  const { error } = await supabase.from('alio_contact_submissions').delete().eq('id', id);
  if (error) throw error;
}

// ---------------------------------------------------------------------
// Staff (roles) — gates Settings / Legal / Access / Audit to 'admin'
// ---------------------------------------------------------------------

export async function listStaff(): Promise<Staff[]> {
  const { data, error } = await supabase.from('alio_staff').select('*').order('created_at');
  if (error) throw error;
  return data as Staff[];
}

export async function upsertStaff(email: string, name: string, role: StaffRole): Promise<Staff> {
  const { data, error } = await supabase
    .from('alio_staff')
    .upsert({ email: email.trim().toLowerCase(), name, role }, { onConflict: 'email' })
    .select()
    .single();
  if (error) throw error;
  return data as Staff;
}

export async function removeStaff(email: string) {
  const { error } = await supabase.from('alio_staff').delete().eq('email', email);
  if (error) throw error;
}

// ---------------------------------------------------------------------
// Audit log (read-only from the client — writes happen via DB triggers)
// ---------------------------------------------------------------------

export async function listAuditLog(limit = 50): Promise<AuditLogEntry[]> {
  const { data, error } = await supabase
    .from('alio_audit_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data as AuditLogEntry[];
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

// ---------------------------------------------------------------------
// Content revisions (undo) — snapshots are captured by a DB trigger
// (BEFORE UPDATE/DELETE) on every CMS table; this is read + restore only.
// ---------------------------------------------------------------------

export async function listRevisions(tableName: string, recordId: string): Promise<ContentRevision[]> {
  const { data, error } = await supabase
    .from('alio_content_revisions')
    .select('*')
    .eq('table_name', tableName)
    .eq('record_id', recordId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as ContentRevision[];
}

export async function restoreRevision(revision: ContentRevision): Promise<void> {
  const data = revision.data;
  let keyCol: string;
  let keyVal: unknown;
  if ('id' in data && data.id !== undefined) { keyCol = 'id'; keyVal = data.id; }
  else if ('slug' in data) { keyCol = 'slug'; keyVal = data.slug; }
  else if ('kind' in data) { keyCol = 'kind'; keyVal = data.kind; }
  else { keyCol = 'id'; keyVal = true; }

  const { data: updated, error } = await supabase
    .from(revision.table_name)
    .update(data)
    .eq(keyCol, keyVal as string | boolean)
    .select();
  if (error) throw error;
  if (!updated || updated.length === 0) {
    throw new Error('Nenhum registo correspondente foi encontrado — pode ter sido apagado entretanto.');
  }
}

// ---------------------------------------------------------------------
// Slug uniqueness — RLS already scopes results to what the caller can
// see, which is exactly what "is this slug free" needs to check against.
// ---------------------------------------------------------------------

export async function isSlugTaken(tableName: string, slug: string, excludeId?: string): Promise<boolean> {
  if (!slug) return false;
  let query = supabase.from(tableName).select('id').eq('slug', slug).limit(1);
  if (excludeId) query = query.neq('id', excludeId);
  const { data, error } = await query;
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

// ---------------------------------------------------------------------
// Bulk actions — Blog / Case Studies / Careers list views
// ---------------------------------------------------------------------

export async function bulkSetPublished(tableName: string, ids: string[], published: boolean) {
  const { error } = await supabase.from(tableName).update({ published }).in('id', ids);
  if (error) throw error;
}

export async function bulkDelete(tableName: string, ids: string[]) {
  const { error } = await supabase.from(tableName).delete().in('id', ids);
  if (error) throw error;
}
