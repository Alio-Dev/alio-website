import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabaseClient';

export function useVaultSession() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => sub.subscription.unsubscribe();
  }, []);

  const email = session?.user.email ?? null;
  return {
    loading: session === undefined,
    session: session ?? null,
    email,
    // Client-side hint only, for showing/hiding admin UI — the real gate is
    // the alio_is_authorized_viewer() check enforced by RLS on every query.
    isCorporate: Boolean(email && email.toLowerCase().endsWith('@alio.ao')),
    signOut: () => supabase.auth.signOut(),
  };
}
