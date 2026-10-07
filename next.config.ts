import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Разрешаем dev-серверу отдавать JS/HMR на запросы с телефона по локальной сети —
  // без этого страница открывается, но все кнопки и формы не работают
  // (Next.js блокирует "чужой" origin по умолчанию в целях безопасности).
  // Если IP компьютера в Wi-Fi поменяется — обновите его здесь и перезапустите dev-сервер.
  allowedDevOrigins: ["192.168.1.16", "172.23.112.1"],
  // Убираем отладочный значок Next.js (индикатор сборки) из угла экрана.
  devIndicators: false,
  // public/invites/[slug]/ — статичные папки приглашений (см. scripts/build-invites.ts).
  // Next.js не резолвит index.html по адресу папки сам (в отличие от обычного
  // статик-хостинга) — переписываем /invites/[slug]/ на файл явно.
  async rewrites() {
    return [{ source: "/invites/:slug/", destination: "/invites/:slug/index.html" }];
  },
  // ВАЖНО: без этого /invites/[slug]/ (со слэшем — так на него везде ссылается сайт)
  // по умолчанию редиректится на адрес БЕЗ слэша, и тогда все относительные пути
  // внутри приглашения (fonts/…, data.json, music.mp3) резолвятся мимо его папки —
  // браузер считает "[slug]" последним сегментом файла, а не именем директории.
  trailingSlash: true,
};

export default nextConfig;
