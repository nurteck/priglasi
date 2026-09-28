-- Таблица заказов, создаваемых через мастер /order
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  design_slug text,
  design_name text,
  package_id text not null check (package_id in ('basic', 'photo', 'premium')),
  event_type text not null check (event_type in ('wedding', 'kyz-uzatuu', 'sunnot', 'tushoo', 'jubilee')),
  names_first text not null,
  names_second text,
  event_date text not null,
  event_time text not null,
  venue text not null,
  address text not null,
  hosts text not null,
  lang text not null check (lang in ('ky', 'ru', 'ky-ru')),
  wishes text,
  client_name text not null,
  phone text not null,
  total integer not null default 0,
  status text not null default 'new' check (status in ('new', 'in_progress', 'done', 'paid')),
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Запись и чтение доступны только через сервисный ключ (используется в API-роутах),
-- анонимный доступ запрещён.
create policy "orders_service_role_only" on public.orders
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
