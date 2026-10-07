-- Старый встроенный движок тем (src/themes, src/content/invitations, /i/[slug])
-- удалён из кода — каждое приглашение теперь статичная папка в public/invites/[slug].
-- Гостевые ответы там не нужны (см. meta.json/hostKey + таблица guests), поэтому
-- таблица rsvps, созданная в 002_rsvps.sql, больше не используется.
drop table if exists public.rsvps;
