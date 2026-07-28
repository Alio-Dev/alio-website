create or replace function alio_debug_grants(tbl text)
returns jsonb as $$
  select jsonb_agg(jsonb_build_object('grantee', grantee, 'privilege', privilege_type))
  from information_schema.role_table_grants
  where table_name = tbl;
$$ language sql stable security definer set search_path = public;

grant execute on function alio_debug_grants(text) to anon, authenticated;
