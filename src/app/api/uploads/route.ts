import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_AUDIO_BYTES = 20 * 1024 * 1024;
const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_AUDIO = ["audio/mpeg", "audio/mp3"];

/** Загрузка фото/музыки прямо из формы заказа /order (шаг «О мероприятии»). */
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`uploads:${ip}`)) {
    return NextResponse.json({ error: "Слишком много запросов, попробуйте через минуту" }, { status: 429 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const kind = form?.get("kind"); // "photo" | "music"

  if (!(file instanceof File) || (kind !== "photo" && kind !== "music")) {
    return NextResponse.json({ error: "Нужны поля file и kind (photo|music)" }, { status: 400 });
  }

  const allowed = kind === "photo" ? ALLOWED_IMAGE : ALLOWED_AUDIO;
  const maxBytes = kind === "photo" ? MAX_IMAGE_BYTES : MAX_AUDIO_BYTES;

  if (!allowed.includes(file.type)) {
    return NextResponse.json(
      { error: kind === "photo" ? "Разрешены только JPG, PNG, WEBP" : "Разрешён только MP3" },
      { status: 400 }
    );
  }
  if (file.size > maxBytes) {
    return NextResponse.json({ error: "Файл слишком большой" }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase не настроен" }, { status: 500 });
  }

  const ext = file.name.split(".").pop() || (kind === "photo" ? "jpg" : "mp3");
  const key = `order-drafts/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(key, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: false });

  if (error) {
    return NextResponse.json({ error: "Не удалось загрузить файл" }, { status: 500 });
  }

  const { data: pub } = supabase.storage.from("uploads").getPublicUrl(key);
  return NextResponse.json({ url: pub.publicUrl });
}
