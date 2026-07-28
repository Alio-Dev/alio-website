import { supabase } from '../../lib/supabaseClient';
import type { VaultDocument, DocumentCategory, DocumentVisibility, AuthorizedViewer } from './types';

const BUCKET = 'alio';
const SIGNED_URL_TTL_SECONDS = 300;

export async function listDocuments(): Promise<VaultDocument[]> {
  const { data, error } = await supabase
    .from('alio_documents')
    .select('*')
    .order('category', { ascending: true })
    .order('title', { ascending: true });
  if (error) throw error;
  return data as VaultDocument[];
}

/**
 * RLS on storage.objects is the real gate — signed URLs simply expire on
 * top of that. storage_path is a random UUID (deliberately, so a leaked
 * URL doesn't reveal what a protected document is), so downloads pass a
 * real filename via Storage's `download` option — the browser ignores the
 * `download` attribute on cross-origin anchors, so this is the only way
 * the saved file ends up named after the document instead of the UUID.
 */
export async function getDocumentUrl(
  storagePath: string,
  downloadFilename?: string,
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(
      storagePath,
      SIGNED_URL_TTL_SECONDS,
      downloadFilename ? { download: downloadFilename } : undefined,
    );
  if (error) throw error;
  return data.signedUrl;
}

export function filenameForDocument(doc: Pick<VaultDocument, 'title' | 'storage_path'>): string {
  const ext = doc.storage_path.includes('.') ? doc.storage_path.split('.').pop() : undefined;
  const safeTitle = doc.title.trim().replace(/[\\/:*?"<>|]/g, '-');
  return ext ? `${safeTitle}.${ext}` : safeTitle;
}

export async function logAccess(documentId: string) {
  const { data: session } = await supabase.auth.getSession();
  await supabase.from('alio_document_access_log').insert({
    document_id: documentId,
    accessed_by: session.session?.user.id ?? null,
  });
}

export async function updateDocument(
  id: string,
  patch: Partial<Pick<VaultDocument, 'title' | 'description' | 'category' | 'visibility'>>,
) {
  const { error } = await supabase.from('alio_documents').update(patch).eq('id', id);
  if (error) throw error;
}

export async function deleteDocument(doc: VaultDocument) {
  const { error: storageError } = await supabase.storage.from(BUCKET).remove([doc.storage_path]);
  if (storageError) throw storageError;
  const { error: dbError } = await supabase.from('alio_documents').delete().eq('id', doc.id);
  if (dbError) throw dbError;
}

export async function uploadDocument(params: {
  file: File;
  title: string;
  description: string;
  category: DocumentCategory;
  visibility: DocumentVisibility;
}): Promise<VaultDocument> {
  const { file, title, description, category, visibility } = params;
  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
  const subfolder =
    category === 'pessoal' ? 'pessoal/aristoteles_bernardo' :
    category === 'contabilidade' ? 'contabilidade' : 'empresa';
  const storagePath = `documents/${subfolder}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, { contentType: file.type || 'application/octet-stream' });
  if (uploadError) throw uploadError;

  const { data: session } = await supabase.auth.getSession();
  const { data, error: insertError } = await supabase
    .from('alio_documents')
    .insert({
      title,
      description: description || null,
      category,
      visibility,
      storage_path: storagePath,
      mime_type: file.type || 'application/octet-stream',
      size_bytes: file.size,
      uploaded_by: session.session?.user.id ?? null,
    })
    .select()
    .single();

  if (insertError) {
    // Roll back the orphaned object so a failed insert doesn't leave an
    // unlisted file sitting in storage with no metadata row.
    await supabase.storage.from(BUCKET).remove([storagePath]);
    throw insertError;
  }
  return data as VaultDocument;
}

/**
 * Exceptions to the "@alio.ao gets protected access" rule — external
 * collaborators (e.g. an accountant) who need access without a corporate
 * address. Managed here in the admin panel instead of raw SQL.
 */
export async function listAuthorizedViewers(): Promise<AuthorizedViewer[]> {
  const { data, error } = await supabase
    .from('alio_authorized_viewers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as AuthorizedViewer[];
}

export async function addAuthorizedViewer(email: string, note: string): Promise<AuthorizedViewer> {
  const { data, error } = await supabase
    .from('alio_authorized_viewers')
    .insert({ email: email.trim().toLowerCase(), note: note || null })
    .select()
    .single();
  if (error) throw error;
  return data as AuthorizedViewer;
}

export async function removeAuthorizedViewer(id: string) {
  const { error } = await supabase.from('alio_authorized_viewers').delete().eq('id', id);
  if (error) throw error;
}
