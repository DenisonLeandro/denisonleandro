-- =====================================================
-- ETAPA 1 — Fundação de autenticação e permissões
-- Idempotente: pode ser rodada várias vezes sem erro.
-- Banco: pgimbjfdxwefahxmpdpc (Lovable Cloud)
-- =====================================================

-- 1) Enum app_role (criado só se não existir)
do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('editor', 'admin');
  end if;
end$$;

-- 2) Tabela user_roles (criada só se não existir, não apaga dados)
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

-- 3) Grants (Data API)
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

-- 4) RLS
alter table public.user_roles enable row level security;

-- 5) Função has_role (SECURITY DEFINER, evita recursão de RLS)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- 6) Policies (drop + create para garantir idempotência)
drop policy if exists "Users can read own roles" on public.user_roles;
create policy "Users can read own roles"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Admins manage all roles" on public.user_roles;
create policy "Admins manage all roles"
on public.user_roles
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- FIM — Etapa 1
-- =====================================================
