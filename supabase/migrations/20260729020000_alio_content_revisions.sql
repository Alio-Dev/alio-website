-- Content revision history — alio_audit_log records THAT something
-- changed; this records what it looked like BEFORE the change, so an
-- edit can be undone. A BEFORE UPDATE/DELETE trigger snapshots OLD (the
-- pre-change row) via to_jsonb(), same to_jsonb() approach as the audit
-- log — required because each table has a different shape (id vs slug
-- vs kind), so a direct `old.id` reference would fail to compile on
-- tables without that column.

create table if not exists alio_content_revisions (
  id bigint generated always as identity primary key,
  table_name text not null,
  record_id text not null,
  data jsonb not null,
  actor_email text,
  action text not null,
  created_at timestamptz not null default now()
);

create index if not exists alio_content_revisions_lookup_idx
  on alio_content_revisions(table_name, record_id, created_at desc);

alter table alio_content_revisions enable row level security;

drop policy if exists alio_content_revisions_select on alio_content_revisions;
create policy alio_content_revisions_select on alio_content_revisions
  for select using (alio_is_authorized_viewer());

create or replace function alio_snapshot_revision()
returns trigger as $$
declare
  rec jsonb;
  rec_id text;
begin
  rec := to_jsonb(old);
  rec_id := coalesce(rec->>'id', rec->>'slug', rec->>'kind', 'true');

  insert into alio_content_revisions (table_name, record_id, data, actor_email, action)
  values (tg_table_name, rec_id, rec, auth.jwt() ->> 'email', lower(tg_op));

  if tg_op = 'DELETE' then
    return old;
  else
    return new;
  end if;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists alio_revision_service_pages on alio_service_pages;
create trigger alio_revision_service_pages
  before update or delete on alio_service_pages
  for each row execute function alio_snapshot_revision();

drop trigger if exists alio_revision_blog_posts on alio_blog_posts;
create trigger alio_revision_blog_posts
  before update or delete on alio_blog_posts
  for each row execute function alio_snapshot_revision();

drop trigger if exists alio_revision_case_studies on alio_case_studies;
create trigger alio_revision_case_studies
  before update or delete on alio_case_studies
  for each row execute function alio_snapshot_revision();

drop trigger if exists alio_revision_job_openings on alio_job_openings;
create trigger alio_revision_job_openings
  before update or delete on alio_job_openings
  for each row execute function alio_snapshot_revision();

drop trigger if exists alio_revision_legal_docs on alio_legal_docs;
create trigger alio_revision_legal_docs
  before update or delete on alio_legal_docs
  for each row execute function alio_snapshot_revision();

drop trigger if exists alio_revision_site_settings on alio_site_settings;
create trigger alio_revision_site_settings
  before update or delete on alio_site_settings
  for each row execute function alio_snapshot_revision();
