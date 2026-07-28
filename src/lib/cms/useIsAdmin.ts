import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

/**
 * Client-side hint only — the real gate is alio_is_admin() enforced by RLS
 * on alio_site_settings / alio_legal_docs / alio_authorized_viewers writes.
 * This just decides whether to show the Settings/Legal/Acessos/Auditoria
 * nav items at all.
 */
export function useIsAdmin(email: string | null) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!email) { setIsAdmin(false); return; }
    let cancelled = false;
    supabase
      .from('alio_staff')
      .select('role')
      .eq('email', email.toLowerCase())
      .maybeSingle()
      .then(({ data }) => { if (!cancelled) setIsAdmin(data?.role === 'admin'); })
      .catch(() => { if (!cancelled) setIsAdmin(false); });
    return () => { cancelled = true; };
  }, [email]);

  return isAdmin;
}
