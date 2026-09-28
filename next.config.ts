import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Разрешаем dev-серверу отдавать JS/HMR на запросы с телефона по локальной сети —
  // без этого страница открывается, но все кнопки и формы не работают
  // (Next.js блокирует "чужой" origin по умолчанию в целях безопасности).
  // Если IP компьютера в Wi-Fi поменяется — обновите его здесь и перезапустите dev-сервер.
  allowedDevOrigins: ["192.168.1.16", "172.23.112.1"],
};

export default nextConfig;
