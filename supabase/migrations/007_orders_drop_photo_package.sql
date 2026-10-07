-- Убрали пакет "С фото" (photo) — фото и музыка теперь доступны в любом
-- приглашении (см. data.json), это больше не отдельный платный уровень.
alter table public.orders drop constraint if exists orders_package_id_check;
alter table public.orders add constraint orders_package_id_check
  check (package_id in ('basic', 'premium'));
