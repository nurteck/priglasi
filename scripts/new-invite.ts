/**
 * npm run new-invite -- --design <slug-дизайна-в-каталоге> --order <id-заказа-в-supabase>
 *
 * Клонирует папку дизайна из public/invites/<design>/ в новую папку
 * public/invites/<design>-<имя>-<ддмм>/, заполняет её data.json данными
 * заказа, ставит в meta.json type:"client" и новый hostKey, печатает
 * главную ссылку для клиента (/host/[slug]?key=...).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { inviteDataSchema } from "../src/lib/invite-data-schema";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}

function parseArgs(argv: string[]) {
  const out: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      out[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }
  return out;
}

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", ң: "ng", о: "o", ө: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ү: "u", ф: "f", х: "h", ц: "ts",
  ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .split("")
    .map((ch) => CYRILLIC_TO_LATIN[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "client";
}

function ddmm(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "0000";
  return `${String(d.getDate()).padStart(2, "0")}${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function copyDir(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

async function main() {
  loadEnvLocal();

  const args = parseArgs(process.argv.slice(2));
  const designSlug = args.design;
  const orderId = args.order;

  if (!designSlug || !orderId) {
    console.error("Использование: npm run new-invite -- --design <slug> --order <id>");
    process.exit(1);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("✗ Нет ключей Supabase в .env.local (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
    process.exit(1);
  }
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  const invitesDir = path.join(process.cwd(), "public", "invites");
  const designDir = path.join(invitesDir, designSlug);
  if (!fs.existsSync(path.join(designDir, "meta.json"))) {
    console.error(`✗ Дизайн public/invites/${designSlug}/ не найден.`);
    process.exit(1);
  }

  const { data: order, error } = await supabase.from("orders").select("*").eq("id", orderId).single();
  if (error || !order) {
    console.error(`✗ Заказ с id=${orderId} не найден в Supabase (${error?.message ?? "нет данных"}).`);
    process.exit(1);
  }

  const clientSlugPart = slugify(order.names_first ?? "client");
  const datePart = ddmm(order.event_date);
  let slug = `${designSlug}-${clientSlugPart}-${datePart}`;
  let suffix = 2;
  while (fs.existsSync(path.join(invitesDir, slug))) {
    slug = `${designSlug}-${clientSlugPart}-${datePart}-${suffix}`;
    suffix++;
  }

  const destDir = path.join(invitesDir, slug);
  copyDir(designDir, destDir);

  const sourceMeta = JSON.parse(fs.readFileSync(path.join(designDir, "meta.json"), "utf8"));
  const hostKey = crypto.randomBytes(16).toString("hex");
  const meta = {
    title: sourceMeta.title,
    category: order.event_type,
    type: "client",
    price: order.total ?? sourceMeta.price,
    author: sourceMeta.author,
    order: 0,
    hostKey,
    published: true,
  };
  fs.writeFileSync(path.join(destDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n", "utf8");

  const data = {
    couple: { one: order.names_first, two: order.names_second || undefined },
    eventType: order.event_type,
    date: order.event_date,
    time: order.event_time,
    venue: { name: order.venue, address: order.address, map2gis: "", mapGoogle: "" },
    hosts: order.hosts || undefined,
    inviteText: "",
    program: order.program ?? [],
    language: order.lang,
    photos: order.photos ?? [],
    music: order.music ?? "",
  };

  const parsed = inviteDataSchema.safeParse(data);
  if (!parsed.success) {
    console.error("✗ Данных заказа не хватает для data.json:");
    for (const issue of parsed.error.issues) console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    console.error(`Папка public/invites/${slug}/ создана — доберите data.json вручную и перезапустите npm run invites.`);
  }
  fs.writeFileSync(path.join(destDir, "data.json"), JSON.stringify(data, null, 2) + "\n", "utf8");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saltanat.kg";
  console.log(`✓ Готово: public/invites/${slug}/`);
  console.log(`Главная ссылка для клиента:\n${siteUrl}/host/${slug}?key=${hostKey}`);
  console.log(`\nНе забудьте: npm run invites (пересканировать) и cover.jpg при желании пересделать —`);
  console.log(`node scripts/screenshot-invite.mjs ${slug}`);
}

main();
