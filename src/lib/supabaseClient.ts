import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY env vars.');
}

// Anon key only — every access decision here is enforced by Postgres RLS
// and Storage policies server-side, never by client-side branching.
export const supabase = createClient(url, anonKey);
