import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Клиент Supabase с сессией пользователя (cookies) для серверных компонентов
 * и route-хендлеров админки — только чтобы узнать, кто вошёл (auth.getUser()).
 * Для запросов к данным (orders/designs/rsvps) по-прежнему используйте
 * getSupabaseAdminClient() из "@/lib/supabase" — так и было в проекте раньше.
 */
export async function getSupabaseServerClient() {
  if (!url || !anonKey) return null;

  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Вызвано из серверного компонента (не из route-хендлера/action) —
          // сессия в этом случае уже обновляется в proxy.ts, здесь можно проигнорировать.
        }
      },
    },
  });
}
