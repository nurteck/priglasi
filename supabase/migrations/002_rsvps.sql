-- Таблица ответов гостей (RSVP) с приглашений /i/[slug]
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  invitation_slug text not null,
  name text not null,
  attending boolean not null,
  guests integer not null default 1,
  wish text,
  created_at timestamptz not null default now()
);

create index if not exists rsvps_invitation_slug_idx on public.rsvps (invitation_slug);

alter table public.rsvps enable row level security;

-- Запись и чтение доступны только через сервисный ключ (API-роуты /api/rsvp,
-- /i/[slug]/guests и /api/guests/[slug]/csv), анонимный доступ запрещён.
create policy "rsvps_service_role_only" on public.rsvps
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
