-- Программа вечера, фото и музыка из мастера заказа /order — нужны
-- scripts/new-invite.ts, чтобы собрать data.json приглашения без ручного
-- ввода (см. README, "Как хозяин тоя создаёт ссылки гостям").
alter table public.orders add column if not exists program jsonb;
alter table public.orders add column if not exists photos text[];
alter table public.orders add column if not exists music text;

-- Бакет для фото/музыки, загруженных прямо из формы заказа (см. /api/uploads).
-- Публичное чтение — эти же файлы потом становятся частью готового приглашения.
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;
