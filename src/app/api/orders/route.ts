import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/validation";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { siteConfig } from "@/site.config";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Некорректные данные заявки", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const pkg = siteConfig.packages.find((p) => p.id === data.packageId);
  const total = pkg?.price ?? 0;

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    // Ключей Supabase нет — заявка всё равно считается принятой,
    // клиент отправит её в WhatsApp на фронтенде.
    return NextResponse.json({ ok: true, saved: false });
  }

  const { error } = await supabase.from("orders").insert({
    design_slug: data.designSlug ?? null,
    design_name: data.designName ?? null,
    package_id: data.packageId,
    event_type: data.eventType,
    names_first: data.namesFirst,
    names_second: data.namesSecond || null,
    event_date: data.date,
    event_time: data.time,
    venue: data.venue,
    address: data.address,
    hosts: data.hosts,
    lang: data.lang,
    wishes: data.wishes || null,
    client_name: data.clientName,
    phone: data.phone,
    total,
    status: "new",
  });

  if (error) {
    console.error("[Salтanat] Не удалось сохранить заказ в Supabase:", error.message);
    return NextResponse.json({ ok: true, saved: false });
  }

  return NextResponse.json({ ok: true, saved: true });
}
