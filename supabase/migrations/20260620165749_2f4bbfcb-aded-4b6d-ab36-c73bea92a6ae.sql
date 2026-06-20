
-- ============================================================
-- 1. ENUM app_role (idempotente)
-- ============================================================
do $$ begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('editor', 'admin');
  end if;
end $$;

-- ============================================================
-- 2. Função update_updated_at_column (idempotente)
-- ============================================================
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- 3. Tabela user_roles
-- ============================================================
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

-- ============================================================
-- 4. Função has_role (security definer, evita recursão RLS)
-- ============================================================
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- ============================================================
-- 5. Policies em user_roles
-- ============================================================
drop policy if exists "Users can view own roles" on public.user_roles;
create policy "Users can view own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Admins can manage all roles" on public.user_roles;
create policy "Admins can manage all roles"
  on public.user_roles for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- 6. Tabela articles
-- ============================================================
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text,
  cover_image_url text,
  category text,
  status text not null default 'draft',
  author text,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint articles_status_check check (status in ('draft', 'published'))
);

create index if not exists articles_slug_idx on public.articles (slug);
create index if not exists articles_status_published_at_idx on public.articles (status, published_at desc);

grant select on public.articles to anon;
grant select, insert, update, delete on public.articles to authenticated;
grant all on public.articles to service_role;

alter table public.articles enable row level security;

-- ============================================================
-- 7. Policies em articles
-- ============================================================
drop policy if exists "Anyone can read published articles" on public.articles;
create policy "Anyone can read published articles"
  on public.articles for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Editors and admins can read all articles" on public.articles;
create policy "Editors and admins can read all articles"
  on public.articles for select
  to authenticated
  using (
    public.has_role(auth.uid(), 'editor')
    or public.has_role(auth.uid(), 'admin')
  );

drop policy if exists "Editors and admins can insert articles" on public.articles;
create policy "Editors and admins can insert articles"
  on public.articles for insert
  to authenticated
  with check (
    public.has_role(auth.uid(), 'editor')
    or public.has_role(auth.uid(), 'admin')
  );

drop policy if exists "Editors and admins can update articles" on public.articles;
create policy "Editors and admins can update articles"
  on public.articles for update
  to authenticated
  using (
    public.has_role(auth.uid(), 'editor')
    or public.has_role(auth.uid(), 'admin')
  )
  with check (
    public.has_role(auth.uid(), 'editor')
    or public.has_role(auth.uid(), 'admin')
  );

drop policy if exists "Editors and admins can delete articles" on public.articles;
create policy "Editors and admins can delete articles"
  on public.articles for delete
  to authenticated
  using (
    public.has_role(auth.uid(), 'editor')
    or public.has_role(auth.uid(), 'admin')
  );

-- ============================================================
-- 8. Trigger updated_at em articles
-- ============================================================
drop trigger if exists update_articles_updated_at on public.articles;
create trigger update_articles_updated_at
  before update on public.articles
  for each row execute function public.update_updated_at_column();

-- ============================================================
-- 9. Seed: artigo de teste (idempotente via ON CONFLICT)
-- ============================================================
insert into public.articles (title, slug, content, excerpt, status, category)
values (
  'Artigo de teste do painel',
  'artigo-teste-painel',
  '<p>Este é um artigo de teste criado para validar o painel de artigos. Pode ser removido posteriormente.</p>',
  'Artigo de teste para validação do painel.',
  'draft',
  'Teste'
)
on conflict (slug) do nothing;
