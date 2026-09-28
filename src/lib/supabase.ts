import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let warned = false;
function warnMissing() {
  if (!warned) {
    console.warn(
      "[Salтanat] Ключи Supabase не заданы (.env.local). Заказы и RSVP не будут сохраняться в базу, " +
        "но заявки всё равно уйдут в WhatsApp. Смотрите README.md → раздел Supabase."
    );
    warned = true;
  }
}

/** Клиент для браузера / серверных компонентов с чтением (анонимный ключ). */
export function getSupabaseClient(): SupabaseClient | null {
  if (!url || !anonKey) {
    warnMissing();
    return null;
  }
  return createClient(url, anonKey);
}

/** Клиент с сервисным ключом для API-роутов (запись в orders/rsvps). Использовать только на сервере! */
export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!url || !serviceKey) {
    warnMissing();
    return null;
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
