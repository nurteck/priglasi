import { NextResponse } from "next/server";
import { getInvitation } from "@/content/invitations";
import { getSupabaseAdminClient } from "@/lib/supabase";

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const key = new URL(request.url).searchParams.get("key");

  const invitation = getInvitation(slug);
  if (!invitation || !invitation.guestsKey || key !== invitation.guestsKey) {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase не настроен" }, { status: 500 });
  }

  const { data } = await supabase
    .from("rsvps")
    .select("name, attending, guests, wish, created_at")
    .eq("invitation_slug", slug)
    .order("created_at", { ascending: false });

  const rows = data ?? [];
  const header = ["Имя", "Придёт", "Количество гостей", "Пожелание", "Дата ответа"];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        csvEscape(r.name),
        r.attending ? "Да" : "Нет",
        String(r.guests),
        csvEscape(r.wish ?? ""),
        csvEscape(new Date(r.created_at).toLocaleString("ru-RU")),
      ].join(",")
    );
  }

  const csv = "﻿" + lines.join("\n"); // BOM для корректной кодировки в Excel

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="guests-${slug}.csv"`,
    },
  });
}
