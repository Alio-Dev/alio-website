create or replace function alio_debug_constraints(tbl text)
returns jsonb as $$
  select jsonb_agg(jsonb_build_object('name', conname, 'def', pg_get_constraintdef(oid)))
  from pg_constraint
  where conrelid = tbl::regclass and contype = 'c';
$$ language sql stable security definer set search_path = public;
grant execute on function alio_debug_constraints(text) to anon, authenticated;
