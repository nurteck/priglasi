import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/validation";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const body = await request.json().catch(() => null);
  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Проверьте, что поля заполнены верно" },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot: если скрытое поле заполнено — это бот.
  if (data.honeypot) {
    return NextResponse.json({ ok: true }); // отвечаем "успехом", чтобы не подсказывать ботам
  }

  if (isRateLimited(`${ip}:${data.invitationSlug}`)) {
    return NextResponse.json(
      { ok: false, error: "Слишком много попыток, попробуйте чуть позже" },
      { status: 429 }
    );
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, saved: false });
  }

  const { error } = await supabase.from("rsvps").insert({
    invitation_slug: data.invitationSlug,
    name: data.name,
    attending: data.attending,
    guests: data.guests,
    wish: data.wish || null,
  });

  if (error) {
    console.error("[Salтanat] Не удалось сохранить RSVP:", error.message);
    return NextResponse.json({ ok: true, saved: false });
  }

  return NextResponse.json({ ok: true, saved: true });
}
