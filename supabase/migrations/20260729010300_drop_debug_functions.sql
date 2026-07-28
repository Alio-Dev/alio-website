-- Remove the ad-hoc diagnostic functions used to debug the anon-insert +
-- return=representation RLS interaction on alio_contact_submissions.
drop function if exists alio_debug_policies(text);
drop function if exists alio_debug_grants(text);
