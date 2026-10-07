import { NextResponse } from "next/server";
import { getInviteWithKey } from "@/lib/invites-server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { guestSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";
import type { Guest } from "@/types";

function checkKey(slug: string, key: string | null) {
  if (!key) return false;
  const invite = getInviteWithKey(slug);
  return Boolean(invite) && invite?.hostKey === key;
}

function mapRow(row: Record<string, unknown>): Guest {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    seats: row.seats as number,
    createdAt: row.created_at as string,
  };
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const key = new URL(request.url).searchParams.get("key");
  if (!checkKey(slug, key)) {
    return NextResponse.json({ error: "Ссылка недействительна" }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ guests: [] });

  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("slug", slug)
    .order("created_at", { ascending: false });

  return NextResponse.json({ guests: (data ?? []).map(mapRow) });
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await request.json().catch(() => null);
  const key = body?.key as string | undefined;

  if (!checkKey(slug, key ?? null)) {
    return NextResponse.json({ error: "Ссылка недействительна" }, { status: 401 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`host:${slug}:${ip}`)) {
    return NextResponse.json({ error: "Слишком много запросов, попробуйте через минуту" }, { status: 429 });
  }

  const rawGuests: unknown[] = Array.isArray(body?.guests) ? body.guests : [body];
  const parsed: ReturnType<typeof guestSchema.safeParse>[] = rawGuests.map((g) => guestSchema.safeParse(g));
  const invalid = parsed.find((p) => !p.success);
  if (invalid && !invalid.success) {
    return NextResponse.json({ error: invalid.error.issues[0]?.message ?? "Неверные данные" }, { status: 400 });
  }

  const rows = parsed.map((p) => {
    if (!p.success) throw new Error("unreachable");
    return { slug, name: p.data.name, seats: p.data.seats };
  });

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase не настроен" }, { status: 500 });
  }

  const { data, error } = await supabase.from("guests").insert(rows).select("*");
  if (error) {
    return NextResponse.json({ error: "Не удалось сохранить" }, { status: 500 });
  }

  return NextResponse.json({ guests: (data ?? []).map(mapRow) });
}
