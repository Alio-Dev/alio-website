-- Alio document vault — company + personal documents, per-document
-- public/protected visibility.
--
-- All objects use the alio_ prefix so they coexist safely with this
-- shared Supabase project's other (unrelated) tables. Storage files live
-- in the existing "alio" bucket, under documents/<category>/... .
--
-- Access model:
--   - "public" documents:  readable by anyone, no login required.
--   - "protected" documents: readable only by an authenticated user whose
--     email ends in @alio.ao, OR an email explicitly listed in
--     alio_authorized_viewers (for external collaborators, e.g. an
--     accountant, who don't have a corporate address).
--   - Writes (upload/edit/delete) require the same "corporate or
--     authorized" check — there's no separate narrower admin role yet;
--     add one later if more than one corporate account should NOT have
--     write access.
--
-- Run this once, in full, via the Supabase dashboard's SQL Editor
-- (Database > SQL Editor). No DB password / CLI link is available to run
-- it programmatically from here.

create table if not exists alio_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null check (category in ('empresa', 'pessoal')),
  visibility text not null default 'protected' check (visibility in ('public', 'protected')),
  storage_path text not null unique,
  mime_type text not null,
  size_bytes bigint not null,
  uploaded_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists alio_authorized_viewers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists alio_document_access_log (
  id bigint generated always as identity primary key,
  document_id uuid references alio_documents(id) on delete cascade,
  accessed_by uuid references auth.users(id),
  accessed_at timestamptz not null default now()
);

create index if not exists alio_documents_category_idx on alio_documents(category);
create index if not exists alio_documents_visibility_idx on alio_documents(visibility);
create index if not exists alio_document_access_log_document_idx on alio_document_access_log(document_id);

create or replace function alio_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists alio_documents_set_updated_at on alio_documents;
create trigger alio_documents_set_updated_at
  before update on alio_documents
  for each row execute function alio_set_updated_at();

-- Shared "is this caller allowed to see/manage protected docs" check —
-- one place to change the corporate-domain rule later.
create or replace function alio_is_authorized_viewer()
returns boolean as $$
  select
    auth.role() = 'authenticated'
    and (
      lower(coalesce(auth.jwt() ->> 'email', '')) like '%@alio.ao'
      or exists (
        select 1 from alio_authorized_viewers v
        where lower(v.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      )
    );
$$ language sql stable security definer set search_path = public;

alter table alio_documents enable row level security;
alter table alio_authorized_viewers enable row level security;
alter table alio_document_access_log enable row level security;

drop policy if exists alio_documents_select on alio_documents;
create policy alio_documents_select on alio_documents
  for select using (visibility = 'public' or alio_is_authorized_viewer());

drop policy if exists alio_documents_write on alio_documents;
create policy alio_documents_write on alio_documents
  for all using (alio_is_authorized_viewer()) with check (alio_is_authorized_viewer());

drop policy if exists alio_authorized_viewers_manage on alio_authorized_viewers;
create policy alio_authorized_viewers_manage on alio_authorized_viewers
  for all using (alio_is_authorized_viewer()) with check (alio_is_authorized_viewer());

drop policy if exists alio_access_log_insert on alio_document_access_log;
create policy alio_access_log_insert on alio_document_access_log
  for insert with check (true);

drop policy if exists alio_access_log_select on alio_document_access_log;
create policy alio_access_log_select on alio_document_access_log
  for select using (alio_is_authorized_viewer());

-- Storage: bucket "alio", path prefix "documents/" holds every vault file.
-- storage.objects already has RLS enabled by default in Supabase.

drop policy if exists alio_documents_storage_select on storage.objects;
create policy alio_documents_storage_select on storage.objects
  for select using (
    bucket_id = 'alio'
    and name like 'documents/%'
    and exists (
      select 1 from alio_documents d
      where d.storage_path = storage.objects.name
        and (d.visibility = 'public' or alio_is_authorized_viewer())
    )
  );

drop policy if exists alio_documents_storage_write on storage.objects;
create policy alio_documents_storage_write on storage.objects
  for all using (
    bucket_id = 'alio' and name like 'documents/%' and alio_is_authorized_viewer()
  ) with check (
    bucket_id = 'alio' and name like 'documents/%' and alio_is_authorized_viewer()
  );
