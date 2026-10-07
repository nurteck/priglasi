# Салтанат — сайт цифровых приглашений на тои

Next.js (App Router) + TypeScript + Tailwind CSS. Мобильный трафик — приоритет,
все страницы проверены на ширине 375px.

## Быстрый старт

```bash
npm install
cp .env.example .env.local   # заполните ключи Supabase (см. ниже)
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm run start   # прод-сборка
```

`npm run dev`/`npm run build` сами сканируют `public/invites/` перед запуском
(`predev`/`prebuild` → `scripts/build-invites.ts`) — руками запускать не нужно,
но можно: `npm run invites`.

---

## 1. Как поменять название, телефон и цены

Все настройки бизнеса лежат в одном файле — **[`src/site.config.ts`](src/site.config.ts)**.
Больше нигде в проекте эти значения не хардкодятся.

- `brandName`, `tagline` — название и слоган.
- `whatsapp`, `instagram`, `telegram`, `phoneDisplay`, `city`, `hours` — контакты.
- `packages` — три тарифа мастера заказа `/order` (цена, старая цена, что входит, какой «Популярный»).
- `stats` — цифры в полосе доверия на главной.
- `theme.colors` / `theme.fonts` — базовые цвета и шрифты сайта.

После изменения файла просто сохраните — Next.js подхватит изменения в dev-режиме,
для прод-сборки запустите `npm run build`.

## 2. Как добавить новое приглашение (каталог или клиенту)

Каждое приглашение — самостоятельная папка в `public/invites/[slug]/` со своим
`index.html` (гость открывает её напрямую, без Next.js вокруг). **Данные
отдельны от дизайна**: ни одного имени, даты или адреса в `index.html` быть не
должно — всё это в `data.json` рядом. Сайт только сканирует эти папки и
показывает их в каталоге/заказе.

```
public/invites/ваш-slug/
  index.html   — вёрстка, любой стиль; подставляет данные через data-field
  data.json    — ВСЕ тексты: имена, дата, место, программа, фото, музыка
  meta.json    — карточка для каталога/админки: цена, категория, hostKey…
  cover.jpg    — обложка 9:16
  ...свои css/js/картинки/шрифты/музыку, пути только относительные
```

**3 шага:**

1. Скопируйте **[`public/invites/_template/`](public/invites/_template/)** в
   `public/invites/ваш-slug/` (slug — латиницей, через дефис). Там же лежит
   `README.txt` с описанием каждого поля.
2. Вёрстка — в `index.html`, любой стиль; подключите в конце один скрипт
   `<script src="/shared/invite-data.js" defer></script>` и используйте
   атрибуты `data-field="couple.one"` и т.п. вместо того, чтобы писать текст
   напрямую — он сам подставит значения из `data.json` (включая имя/места
   гостя из `?g=`/`?n=`, таймер, списки программы/фото, музыку). Полный список
   возможностей — в комментарии в начале `public/shared/invite-data.js`.
   Добавьте так же `<script src="/shared/invite-back.js" defer></script>` —
   плавающая кнопка «Назад» (работает в любом дизайне независимо от
   `invite-data.js`, не зависит от `data.json`).
   Заполните `data.json` (схема — см. `src/types/index.ts` → `InviteData`,
   валидируется zod'ом в `src/lib/invite-data-schema.ts`) и `meta.json`
   (`title`, `category`, `type`, `price`, `author`, `hostKey`, `published`) —
   дата тоя отдельно в `meta.json` не дублируется, она берётся из `date` в
   `data.json`.
3. `git push` — на сервере `scripts/build-invites.ts` пересканирует папку сам
   (проверяет и `meta.json`, и `data.json`). Локально проверить сразу:
   `npm run invites`, затем `npm run dev`.

**`type` в meta.json:**
- `"catalog"` — демо для каталога на сайте (выдуманная пара, клиенты выбирают стиль).
- `"client"` — личное приглашение конкретной пары; в каталоге на сайте **не показывается**,
  открывается только по прямой ссылке `/invites/[slug]/` или через `/host/[slug]`.

**Обложка (`cover.jpg`, 9:16).** Быстрее всего — автоматическим скриншотом
(нужен запущенный `npm run dev`):
```bash
node scripts/screenshot-invite.mjs ваш-slug
```
Скрипт открывает `/invites/ваш-slug/?g=Урматтуу+коноктор&n=2` в Playwright и
сохраняет первый экран как `cover.jpg` прямо в папку приглашения.

**`hostKey`** — длинная случайная строка (секретный ключ для `/host/[slug]`).
Сгенерировать: `node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"`.
В публичный каталог (`src/content/invites.generated.json`) этот ключ не попадает —
он есть только в серверном `invites.generated.server.json` (см. `src/lib/invites-server.ts`).

### 2.1. Как сделать приглашение клиенту из заказа — одной командой

Вместо того чтобы копировать папку и заполнять `data.json` руками, под готовый
заказ (оформленный на `/order`, со всеми именами/датой/программой/фото/музыкой)
можно клонировать любой дизайн каталога:

```bash
npm run new-invite -- --design golden-script --order <id заказа из таблицы orders>
```

Команда копирует `public/invites/golden-script/` в новую папку
`public/invites/golden-script-<имя>-<ддмм>/`, подставляет в `data.json` данные
заказа из Supabase, ставит в `meta.json` `type:"client"` и новый `hostKey`, и
печатает в консоль готовую главную ссылку для клиента (`/host/...?key=...`).
Требует заполненный `.env.local` (см. п.6). После — не забудьте `npm run invites`
и, если нужно, `node scripts/screenshot-invite.mjs <новый-slug>`.

## 3. Как хозяин тоя создаёт ссылки гостям

Клиенту (жениху/невесте, имениннику и т.д.) отправляется **одна главная ссылка**:

```
https://ваш-домен/host/[slug]?key=[hostKey из meta.json]
```

(Скопировать и отправить в WhatsApp можно прямо из `/admin/invites` — см. п.4.)

На этой странице хозяин сам:
- вводит имя гостя/семьи и количество мест → получает ссылку
  `/invites/[slug]/?g=имя&n=места`, которую можно скопировать, отправить в
  WhatsApp/Telegram или открыть;
- может вставить список гостей построчно (`имя;места`) и создать все ссылки разом;
- видит список всех созданных ссылок (можно изменить или удалить) и счётчики
  (сколько гостей, сколько мест всего);
- может скачать список гостей в CSV.

Без ключа или с неверным ключом страница показывает «Ссылка недействительна».
Демо без ключа и без сохранения — `/host/demo` (на неё же ведёт кнопка
«Как это работает для хозяев» в каталоге).

Гостевых ответов «Келем/Келбейм» в этой системе нет — хозяин сам ведёт список,
кому отправил приглашение.

## 4. Админка

- `/admin` — заказы с сайта (мастер `/order`), вход по email/паролю через
  Supabase Auth (см. п.6.1, как создать аккаунты).
- `/admin/invites` — список всех папок из `public/invites/`: название, тип,
  автор, дата тоя, количество созданных гостей и ссылка `/host/[slug]?key=...`
  с кнопками «Скопировать» и «Отправить клиенту в WhatsApp».

## 5. Темы и шрифты

`theme.colors` / `theme.fonts` в `src/site.config.ts` — общие цвета/шрифты
сайта (шапка, кнопки и т.д.), не самих приглашений. У каждого приглашения в
`public/invites/[slug]/` — полностью свой `index.html` со своими стилями,
сайт их не затрагивает.

## 6. Как создать проект Supabase и вставить ключи

1. Зайдите на [supabase.com](https://supabase.com) → New Project (бесплатный план).
2. В SQL Editor выполните по очереди файлы из папки **[`supabase/migrations/`](supabase/migrations/)**
   по номерам (`001_orders.sql`, `003_profiles.sql`, `004_guests.sql`, `005_drop_rsvps.sql`,
   `006_orders_content_fields.sql`, ...). Последняя заодно создаёт публичный
   Storage-бакет `uploads` (для фото/музыки, загруженных из формы `/order`).
3. В настройках проекта (Settings → API) скопируйте:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` ключ → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` ключ → `SUPABASE_SERVICE_ROLE_KEY` (секретный, только на сервере!)
4. Вставьте значения в `.env.local` (создайте его на основе `.env.example`).
5. Без этих ключей сайт продолжает работать: заказы всё равно уходят в WhatsApp,
   просто не сохраняются в базу, а `/host/[slug]` не сможет создавать гостей
   (только `/host/demo` — он не трогает Supabase). Вход в `/admin` без ключей
   Supabase невозможен.

### 6.1. Как создать 2 аккаунта для админки

Публичной регистрации нет — оба аккаунта создаются вручную:

1. В Supabase Dashboard → **Authentication → Users → Add user** → создайте
   пользователя по email и паролю (повторите для второго человека). Отметьте
   "Auto Confirm User", чтобы не настраивать письма подтверждения.
2. Скопируйте `User UID` созданного пользователя.
3. В **SQL Editor** выполните для каждого аккаунта (подставив свои значения):
   ```sql
   insert into public.profiles (id, email, name, role)
   values ('вставьте-user-uid', 'email@example.com', 'Имя Фамилия', 'admin');
   ```
4. Готово — этот email/пароль теперь открывает `/admin`. Без строки в
   `profiles` вход будет отклонён, даже если пароль верный (роль проверяется
   в `src/proxy.ts`).

## 7. Как залить на GitHub, подключить Vercel и домен .kg

```bash
git init                       # если ещё не инициализирован
git add .
git commit -m "Первая версия сайта Салтанат"
git branch -M main
git remote add origin https://github.com/ваш-аккаунт/saltanat.git
git push -u origin main
```

1. На [vercel.com](https://vercel.com) → Add New → Project → выберите репозиторий.
2. В настройках проекта → Environment Variables добавьте те же переменные,
   что в `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`).
3. Нажмите Deploy.
4. Домен `.kg`: в Vercel → Settings → Domains добавьте свой домен, затем
   у регистратора домена пропишите DNS-записи, которые покажет Vercel
   (обычно A-запись или CNAME на `cname.vercel-dns.com`).
5. После получения реального домена обновите `url` в `src/site.config.ts`.

---

## Структура проекта

```
public/invites/[slug]/  — каждое приглашение: index.html, data.json, meta.json,
                           cover.jpg, свои css/js/картинки/шрифты/музыка (см. п.2)
public/invites/_template/ — заготовка для нового приглашения
public/shared/invite-data.js — общий скрипт: подставляет data.json в index.html (см. п.2)
public/shared/invite-back.js — плавающая кнопка «Назад» на странице приглашения (см. п.2)
src/
  site.config.ts        — все настройки бизнеса (см. п.1)
  types/                — общие типы (InviteMeta, InviteRecord, InviteData, Guest, Order, ...)
  content/
    invites.generated.json         — каталог (без hostKey), генерируется автоматически
    invites.generated.server.json  — то же + hostKey, только для сервера
    categories.ts, faq.ts, reviews.ts — остальные тексты сайта
  lib/
    invites.ts              — чтение generated.json (можно импортировать в клиентские компоненты)
    invites-server.ts       — чтение generated.server.json (ТОЛЬКО сервер — там hostKey)
    invite-data-schema.ts   — zod-схема data.json (используют build-invites.ts и new-invite.ts)
    supabase.ts              — Supabase-клиенты для данных (orders/guests), supabase-server/-browser — для сессии админки
    whatsapp.ts, validation.ts, format.ts, rate-limit.ts, seo.ts
  components/
    layout/              — шапка, подвал, WhatsApp-кнопка
    home/, catalog/, order/, admin/, host/ — блоки соответствующих страниц
  app/
    (site)/               — страницы с шапкой/подвалом (главная, каталог, о нас, контакты)
    order/                  — мастер заказа (свой заголовок, без общей шапки)
    host/[slug]/             — страница хозяина тоя (см. п.3)
    admin/                    — админка (Supabase Auth + роль admin, см. src/proxy.ts)
    api/                      — маршруты для заказов, загрузки файлов и для /host
supabase/migrations/     — SQL для таблиц orders, profiles, guests + бакет uploads
scripts/
  build-invites.ts        — сканирует public/invites, генерирует invites.generated*.json
  new-invite.ts            — клонирует дизайн + данные заказа в новое приглашение (см. п.2.1)
  screenshot-invite.mjs    — скриншот обложки 9:16 через Playwright (см. п.2)
  gen-placeholders.mjs     — генератор PNG-заглушек для прочих картинок сайта (см. ниже)
```

## О картинках-заглушках

В `public/images/` уже лежат сгенерированные PNG-заглушки для картинок сайта
(не приглашений — те в `public/invites/`, см. п.2) — цветные градиенты, чтобы
сайт был рабочим и без ваших фото. Замените файл с тем же именем своим —
путь в коде менять не нужно. Перегенерировать: `node scripts/gen-placeholders.mjs`.

## Чек-лист перед запуском

1. Заменить временный номер `whatsapp` в `site.config.ts` на реальный.
2. Заменить `url` в `site.config.ts` на реальный домен после деплоя.
3. Создать проект Supabase, выполнить миграции, вставить ключи (см. п.6).
4. Создать 2 аккаунта админки и выдать им роль `admin` (см. п.6.1).
5. Добавить хотя бы несколько реальных приглашений в `public/invites/` (см. п.2) —
   сейчас в каталоге только одно демо (`golden-script`).
6. Проверить `/admin` и `/admin/invites` — вход по email/паролю, ссылки для хозяев.
7. Пройти весь путь целиком: `/host/[slug]?key=...` → создать гостя → открыть
   полученную ссылку `/invites/[slug]/?g=...&n=...` на телефоне (375px) и
   убедиться, что имя и количество мест подставились.
8. Прогнать Lighthouse (мобильный) на главной и каталоге — цель 90+ по
   производительности и доступности.
