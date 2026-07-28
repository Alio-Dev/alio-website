-- Alio content-management schema — lets the public marketing site (service
-- pages, blog, case studies, careers, legal, site-wide contact/social
-- settings) be edited from the /gestao admin portal instead of requiring a
-- code change + deploy for every content edit.
--
-- Bilingual fields are stored as jsonb: {"pt": "...", "en": "..."}. Public
-- rows (published = true) are readable by anyone with no login — this is
-- what the marketing site itself queries at runtime. Everything else
-- (drafts, writes) requires the same @alio.ao / alio_authorized_viewers
-- check already defined for the document vault (alio_is_authorized_viewer()
-- in the 20260728000000_alio_document_vault.sql migration) — reused as-is
-- so there's one single access-control rule for the whole alio_ schema,
-- not a second one to keep in sync.
--
-- Run via `supabase db push` (not `supabase config push` — that command
-- touches project-wide settings shared with other apps in this Supabase
-- project and must not be used again without extreme care).

create table if not exists alio_service_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  icon text not null,
  gradient text not null,
  title jsonb not null,
  subtitle jsonb not null,
  description jsonb not null,
  features jsonb not null default '[]'::jsonb,
  technologies jsonb not null default '[]'::jsonb,
  features_title jsonb not null,
  service_type text not null,
  display_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists alio_blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  excerpt jsonb not null,
  body jsonb not null default '{"pt": "", "en": ""}'::jsonb,
  category text,
  cover_media_id uuid,
  author text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists alio_case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  summary jsonb not null,
  client text,
  industry text,
  challenge jsonb,
  solution jsonb,
  results jsonb,
  cover_media_id uuid,
  display_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists alio_job_openings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  department text,
  location text,
  employment_type text,
  description jsonb not null,
  requirements jsonb not null default '[]'::jsonb,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists alio_legal_docs (
  kind text primary key check (kind in ('privacy', 'terms')),
  intro jsonb not null,
  sections jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists alio_site_settings (
  id boolean primary key default true check (id),
  phone text,
  email text,
  address text,
  social_links jsonb not null default '[]'::jsonb,
  tagline jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists alio_media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  alt_text jsonb,
  width integer,
  height integer,
  created_at timestamptz not null default now()
);

create index if not exists alio_blog_posts_published_idx on alio_blog_posts(published, published_at desc);
create index if not exists alio_case_studies_published_idx on alio_case_studies(published, display_order);
create index if not exists alio_job_openings_published_idx on alio_job_openings(published);
create index if not exists alio_service_pages_published_idx on alio_service_pages(published, display_order);

drop trigger if exists alio_service_pages_set_updated_at on alio_service_pages;
create trigger alio_service_pages_set_updated_at
  before update on alio_service_pages
  for each row execute function alio_set_updated_at();

drop trigger if exists alio_blog_posts_set_updated_at on alio_blog_posts;
create trigger alio_blog_posts_set_updated_at
  before update on alio_blog_posts
  for each row execute function alio_set_updated_at();

drop trigger if exists alio_case_studies_set_updated_at on alio_case_studies;
create trigger alio_case_studies_set_updated_at
  before update on alio_case_studies
  for each row execute function alio_set_updated_at();

drop trigger if exists alio_job_openings_set_updated_at on alio_job_openings;
create trigger alio_job_openings_set_updated_at
  before update on alio_job_openings
  for each row execute function alio_set_updated_at();

drop trigger if exists alio_legal_docs_set_updated_at on alio_legal_docs;
create trigger alio_legal_docs_set_updated_at
  before update on alio_legal_docs
  for each row execute function alio_set_updated_at();

drop trigger if exists alio_site_settings_set_updated_at on alio_site_settings;
create trigger alio_site_settings_set_updated_at
  before update on alio_site_settings
  for each row execute function alio_set_updated_at();

alter table alio_service_pages enable row level security;
alter table alio_blog_posts enable row level security;
alter table alio_case_studies enable row level security;
alter table alio_job_openings enable row level security;
alter table alio_legal_docs enable row level security;
alter table alio_site_settings enable row level security;
alter table alio_media enable row level security;

drop policy if exists alio_service_pages_select on alio_service_pages;
create policy alio_service_pages_select on alio_service_pages
  for select using (published or alio_is_authorized_viewer());
drop policy if exists alio_service_pages_write on alio_service_pages;
create policy alio_service_pages_write on alio_service_pages
  for all using (alio_is_authorized_viewer()) with check (alio_is_authorized_viewer());

drop policy if exists alio_blog_posts_select on alio_blog_posts;
create policy alio_blog_posts_select on alio_blog_posts
  for select using (published or alio_is_authorized_viewer());
drop policy if exists alio_blog_posts_write on alio_blog_posts;
create policy alio_blog_posts_write on alio_blog_posts
  for all using (alio_is_authorized_viewer()) with check (alio_is_authorized_viewer());

drop policy if exists alio_case_studies_select on alio_case_studies;
create policy alio_case_studies_select on alio_case_studies
  for select using (published or alio_is_authorized_viewer());
drop policy if exists alio_case_studies_write on alio_case_studies;
create policy alio_case_studies_write on alio_case_studies
  for all using (alio_is_authorized_viewer()) with check (alio_is_authorized_viewer());

drop policy if exists alio_job_openings_select on alio_job_openings;
create policy alio_job_openings_select on alio_job_openings
  for select using (published or alio_is_authorized_viewer());
drop policy if exists alio_job_openings_write on alio_job_openings;
create policy alio_job_openings_write on alio_job_openings
  for all using (alio_is_authorized_viewer()) with check (alio_is_authorized_viewer());

-- Legal docs and site settings have no "published" concept — always public.
drop policy if exists alio_legal_docs_select on alio_legal_docs;
create policy alio_legal_docs_select on alio_legal_docs for select using (true);
drop policy if exists alio_legal_docs_write on alio_legal_docs;
create policy alio_legal_docs_write on alio_legal_docs
  for all using (alio_is_authorized_viewer()) with check (alio_is_authorized_viewer());

drop policy if exists alio_site_settings_select on alio_site_settings;
create policy alio_site_settings_select on alio_site_settings for select using (true);
drop policy if exists alio_site_settings_write on alio_site_settings;
create policy alio_site_settings_write on alio_site_settings
  for all using (alio_is_authorized_viewer()) with check (alio_is_authorized_viewer());

drop policy if exists alio_media_select on alio_media;
create policy alio_media_select on alio_media for select using (true);
drop policy if exists alio_media_write on alio_media;
create policy alio_media_write on alio_media
  for all using (alio_is_authorized_viewer()) with check (alio_is_authorized_viewer());

-- Storage: media library images live in the existing "alio" bucket under
-- media/ — same bucket the document vault already uses, different prefix.
drop policy if exists alio_media_storage_select on storage.objects;
create policy alio_media_storage_select on storage.objects
  for select using (bucket_id = 'alio' and name like 'media/%');

drop policy if exists alio_media_storage_write on storage.objects;
create policy alio_media_storage_write on storage.objects
  for all using (
    bucket_id = 'alio' and name like 'media/%' and alio_is_authorized_viewer()
  ) with check (
    bucket_id = 'alio' and name like 'media/%' and alio_is_authorized_viewer()
  );
