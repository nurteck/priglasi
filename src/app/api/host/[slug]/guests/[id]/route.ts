import { NextResponse } from "next/server";
import { getInviteWithKey } from "@/lib/invites-server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { guestSchema } from "@/lib/validation";

function checkKey(slug: string, key: string | null | undefined) {
  if (!key) return false;
  const invite = getInviteWithKey(slug);
  return Boolean(invite) && invite?.hostKey === key;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const body = await request.json().catch(() => null);

  if (!checkKey(slug, body?.key)) {
    return NextResponse.json({ error: "Ссылка недействительна" }, { status: 401 });
  }

  const result = guestSchema.safeParse({ name: body?.name, seats: body?.seats });
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0]?.message ?? "Неверные данные" }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: "Supabase не настроен" }, { status: 500 });

  const { error } = await supabase
    .from("guests")
    .update({ name: result.data.name, seats: result.data.seats })
    .eq("id", id)
    .eq("slug", slug);

  if (error) return NextResponse.json({ error: "Не удалось сохранить" }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const key = new URL(request.url).searchParams.get("key");

  if (!checkKey(slug, key)) {
    return NextResponse.json({ error: "Ссылка недействительна" }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: "Supabase не настроен" }, { status: 500 });

  const { error } = await supabase.from("guests").delete().eq("id", id).eq("slug", slug);
  if (error) return NextResponse.json({ error: "Не удалось удалить" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
