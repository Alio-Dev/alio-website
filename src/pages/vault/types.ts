export type DocumentCategory = 'empresa' | 'pessoal';
export type DocumentVisibility = 'public' | 'protected';

export interface VaultDocument {
  id: string;
  title: string;
  description: string | null;
  category: DocumentCategory;
  visibility: DocumentVisibility;
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthorizedViewer {
  id: string;
  email: string;
  note: string | null;
  created_at: string;
}
