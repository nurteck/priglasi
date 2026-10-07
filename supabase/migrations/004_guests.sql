-- Персональные ссылки на приглашение, которые хозяин тоя создаёт на /host/[slug].
create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  name text not null,
  seats integer not null check (seats between 1 and 10),
  created_at timestamptz not null default now()
);

create index if not exists guests_slug_idx on public.guests (slug);

alter table public.guests enable row level security;

-- Страница /host/[slug] сама проверяет ?key= по meta.json на сервере и ходит
-- сервисным ключом (как orders/profiles) — анонимный доступ не нужен.
create policy "guests_service_role_only" on public.guests
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
