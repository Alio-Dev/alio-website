-- Simplify: store the cover image's storage_path directly instead of a
-- cover_media_id FK — avoids an extra alio_media lookup per post/case
-- study for what's just a display image. Tables are still empty (no
-- content authored yet), so a straight column swap is safe.
alter table alio_blog_posts drop column if exists cover_media_id;
alter table alio_blog_posts add column if not exists cover_path text;

alter table alio_case_studies drop column if exists cover_media_id;
alter table alio_case_studies add column if not exists cover_path text;
