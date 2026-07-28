create or replace function alio_debug_policies(tbl text)
returns jsonb as $$
  select jsonb_agg(jsonb_build_object(
    'name', polname,
    'cmd', polcmd,
    'roles', (select array_agg(rolname) from pg_roles where oid = any(polroles)),
    'permissive', polpermissive,
    'qual', pg_get_expr(polqual, polrelid),
    'check', pg_get_expr(polwithcheck, polrelid)
  ))
  from pg_policy
  where polrelid = tbl::regclass;
$$ language sql stable security definer set search_path = public;

grant execute on function alio_debug_policies(text) to anon, authenticated;
