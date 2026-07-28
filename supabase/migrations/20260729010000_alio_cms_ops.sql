-- Operational layer for /gestao: staff roles, audit log, contact-form
-- submissions. Scoped deliberately small — this is a services company's
-- marketing site, not an enterprise multi-department portal.
--
-- alio_staff replaces the implicit "any @alio.ao email = full access"
-- assumption for the SENSITIVE sections (Settings, Legal, Access,
-- Auditoria). Content editing (services/blog/case studies/careers) stays
-- gated by the existing alio_is_authorized_viewer() — any staff/editor
-- can manage content; only 'admin' role can touch site-wide config or
-- see who has access.

create table if not exists alio_staff (
  email text primary key,
  name text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

insert into alio_staff (email, name, role)
values ('aristoteles.bernardo@alio.ao', 'Aristóteles Bernardo', 'admin')
on conflict (email) do nothing;

create or replace function alio_is_admin()
returns boolean as $$
  select exists (
    select 1 from alio_staff s
    where lower(s.email) = lower(coalesce(auth.jwt() ->> 'email', '')) and s.role = 'admin'
  );
$$ language sql stable security definer set search_path = public;

alter table alio_staff enable row level security;

drop policy if exists alio_staff_select on alio_staff;
create policy alio_staff_select on alio_staff
  for select using (alio_is_authorized_viewer());

drop policy if exists alio_staff_write on alio_staff;
create policy alio_staff_write on alio_staff
  for all using (alio_is_admin()) with check (alio_is_admin());

-- Tighten write access on the site-wide / access-control tables to admin
-- only (previously any authorized viewer could edit these).
drop policy if exists alio_site_settings_write on alio_site_settings;
create policy alio_site_settings_write on alio_site_settings
  for all using (alio_is_admin()) with check (alio_is_admin());

drop policy if exists alio_legal_docs_write on alio_legal_docs;
create policy alio_legal_docs_write on alio_legal_docs
  for all using (alio_is_admin()) with check (alio_is_admin());

drop policy if exists alio_authorized_viewers_manage on alio_authorized_viewers;
create policy alio_authorized_viewers_manage on alio_authorized_viewers
  for all using (alio_is_admin()) with check (alio_is_admin());

-- Audit log — one generic trigger covers every CMS content table
-- regardless of shape (to_jsonb sidesteps each table having different
-- columns: id vs slug vs kind, title vs no title, etc).
create table if not exists alio_audit_log (
  id bigint generated always as identity primary key,
  actor_email text,
  action text not null,
  table_name text not null,
  record_id text,
  summary text,
  created_at timestamptz not null default now()
);

create index if not exists alio_audit_log_created_idx on alio_audit_log(created_at desc);

alter table alio_audit_log enable row level security;

drop policy if exists alio_audit_log_select on alio_audit_log;
create policy alio_audit_log_select on alio_audit_log
  for select using (alio_is_authorized_viewer());

create or replace function alio_log_audit()
returns trigger as $$
declare
  rec jsonb;
  rec_id text;
  summary text;
begin
  rec := to_jsonb(coalesce(new, old));
  rec_id := coalesce(rec->>'id', rec->>'slug', rec->>'kind', 'true');
  summary := coalesce(rec->'title'->>'pt', rec->>'slug', rec->>'kind', tg_table_name);

  insert into alio_audit_log (actor_email, action, table_name, record_id, summary)
  values (auth.jwt() ->> 'email', lower(tg_op), tg_table_name, rec_id, summary);

  return coalesce(new, old);
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists alio_audit_service_pages on alio_service_pages;
create trigger alio_audit_service_pages
  after insert or update or delete on alio_service_pages
  for each row execute function alio_log_audit();

drop trigger if exists alio_audit_blog_posts on alio_blog_posts;
create trigger alio_audit_blog_posts
  after insert or update or delete on alio_blog_posts
  for each row execute function alio_log_audit();

drop trigger if exists alio_audit_case_studies on alio_case_studies;
create trigger alio_audit_case_studies
  after insert or update or delete on alio_case_studies
  for each row execute function alio_log_audit();

drop trigger if exists alio_audit_job_openings on alio_job_openings;
create trigger alio_audit_job_openings
  after insert or update or delete on alio_job_openings
  for each row execute function alio_log_audit();

drop trigger if exists alio_audit_legal_docs on alio_legal_docs;
create trigger alio_audit_legal_docs
  after insert or update or delete on alio_legal_docs
  for each row execute function alio_log_audit();

drop trigger if exists alio_audit_site_settings on alio_site_settings;
create trigger alio_audit_site_settings
  after insert or update or delete on alio_site_settings
  for each row execute function alio_log_audit();

-- Contact-form submissions — the public form already sends to Formspree
-- (email); this parallel, best-effort store lets staff see submissions
-- inside /gestao without checking a separate inbox/dashboard.
create table if not exists alio_contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  service text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists alio_contact_submissions_status_idx on alio_contact_submissions(status, created_at desc);

alter table alio_contact_submissions enable row level security;

drop policy if exists alio_contact_submissions_insert on alio_contact_submissions;
create policy alio_contact_submissions_insert on alio_contact_submissions
  for insert with check (true);

drop policy if exists alio_contact_submissions_select on alio_contact_submissions;
create policy alio_contact_submissions_select on alio_contact_submissions
  for select using (alio_is_authorized_viewer());

drop policy if exists alio_contact_submissions_update on alio_contact_submissions;
create policy alio_contact_submissions_update on alio_contact_submissions
  for update using (alio_is_authorized_viewer()) with check (alio_is_authorized_viewer());

drop policy if exists alio_contact_submissions_delete on alio_contact_submissions;
create policy alio_contact_submissions_delete on alio_contact_submissions
  for delete using (alio_is_admin());
