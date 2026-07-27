import { supabase } from '../../lib/supabaseClient';
import type { VaultDocument, DocumentCategory, DocumentVisibility } from './types';

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

/** RLS on storage.objects is the real gate — signed URLs simply expire on top of that. */
export async function getDocumentUrl(storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, SIGNED_URL_TTL_SECONDS);
  if (error) throw error;
  return data.signedUrl;
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
  const subfolder = category === 'pessoal' ? 'pessoal/aristoteles_bernardo' : 'empresa';
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
