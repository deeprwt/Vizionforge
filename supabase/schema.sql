-- =====================================================================
--  VizionForge blog — Supabase schema
--  Run this once in Supabase Dashboard → SQL Editor. Safe to re-run.
-- =====================================================================

-- ---------------------------------------------------------------------
--  Admins: only users listed here can manage blogs.
-- ---------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admins can read their own row" on public.admin_users;
create policy "Admins can read their own row"
  on public.admin_users for select
  to authenticated
  using (user_id = (select auth.uid()));

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------
--  Blogs
-- ---------------------------------------------------------------------
create table if not exists public.blogs (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  excerpt          text,
  content          text not null default '',          -- HTML from the editor
  cover_image_url  text,
  category         text,
  tags             text[] not null default '{}',
  author_name      text,
  status           text not null default 'draft'
                     check (status in ('draft', 'published')),
  featured         boolean not null default false,
  seo_title        text,
  seo_description  text,
  reading_time     integer not null default 1,        -- minutes
  published_at     timestamptz,
  created_by       uuid references auth.users (id) on delete set null default auth.uid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists blogs_status_published_at_idx
  on public.blogs (status, published_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blogs_set_updated_at on public.blogs;
create trigger blogs_set_updated_at
  before update on public.blogs
  for each row execute function public.set_updated_at();

alter table public.blogs enable row level security;

drop policy if exists "Published blogs are public" on public.blogs;
create policy "Published blogs are public"
  on public.blogs for select
  to anon, authenticated
  using (status = 'published' or (select public.is_admin()));

drop policy if exists "Admins can insert blogs" on public.blogs;
create policy "Admins can insert blogs"
  on public.blogs for insert
  to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins can update blogs" on public.blogs;
create policy "Admins can update blogs"
  on public.blogs for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins can delete blogs" on public.blogs;
create policy "Admins can delete blogs"
  on public.blogs for delete
  to authenticated
  using ((select public.is_admin()));

-- ---------------------------------------------------------------------
--  Storage: public bucket for cover + inline images (5 MB max).
--  Public read works through the public URL; only admins can write.
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can read blog images" on storage.objects;
create policy "Admins can read blog images"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'blog-images' and (select public.is_admin()));

drop policy if exists "Admins can upload blog images" on storage.objects;
create policy "Admins can upload blog images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images' and (select public.is_admin()));

drop policy if exists "Admins can update blog images" on storage.objects;
create policy "Admins can update blog images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-images' and (select public.is_admin()));

drop policy if exists "Admins can delete blog images" on storage.objects;
create policy "Admins can delete blog images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images' and (select public.is_admin()));

-- ---------------------------------------------------------------------
--  Make a user an admin.
--  1. Supabase Dashboard → Authentication → Users → "Add user"
--     (email + password, tick "Auto Confirm User").
--  2. Run the statement below with that email.
-- ---------------------------------------------------------------------
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'admin@vizionforge.com'
-- on conflict do nothing;
