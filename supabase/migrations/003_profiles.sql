-- Профили пользователей админки. Строка создаётся вручную в Supabase Dashboard
-- после создания аккаунта в Auth (см. README) — публичной регистрации нет.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Пользователь может прочитать только свою запись — этого достаточно, чтобы
-- middleware (src/proxy.ts) могло проверить его роль по сессии.
create policy "profiles_select_own" on public.profiles
  for select
  using (auth.uid() = id);

-- Изменение профилей — только сервисным ключом (вручную через Dashboard/SQL).
create policy "profiles_write_service_role_only" on public.profiles
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
