import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Клиент Supabase для браузера — вход/выход в админке (страница логина, кнопка «Выйти»). */
export function getSupabaseBrowserClient() {
  if (!url || !anonKey) {
    throw new Error("Supabase не настроен: заполните NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY в .env.local");
  }
  return createBrowserClient(url, anonKey);
}
