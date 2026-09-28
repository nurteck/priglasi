import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

const statuses = ["new", "in_progress", "done", "paid"] as const;

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = body?.status;

  if (!statuses.includes(status)) {
    return NextResponse.json({ error: "Некорректный статус" }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase не настроен" }, { status: 500 });
  }

  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
