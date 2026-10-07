import { getSupabaseServerClient } from "@/lib/supabase-server";
import type { Profile } from "@/types";

/** Текущий вошедший админ (для шапки /admin/*). Доступ уже проверен в src/proxy.ts. */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, email, name, role, created_at")
    .eq("id", user.id)
    .single();
  if (!data) return null;

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    role: data.role,
    createdAt: data.created_at,
  };
}
