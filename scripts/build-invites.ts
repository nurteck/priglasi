/**
 * Сканирует public/invites/*, проверяет структуру, meta.json (карточка каталога)
 * и data.json (тексты приглашения — имена, дата, место и т.д., см.
 * src/lib/invite-data-schema.ts) каждой папки и генерирует
 * src/content/invites.generated.json (для каталога/сайта, без hostKey)
 * и src/content/invites.generated.server.json (для /host и админки, с hostKey).
 * Запускается автоматически перед `npm run dev` и `npm run build` (см. package.json).
 *
 * Папки, начинающиеся с "_", пропускаются (например public/invites/_template).
 * Папка с ошибкой пропускается (не попадает ни в один из файлов), но не роняет
 * сборку целиком — чтобы ошибка одного приглашения не блокировала остальные.
 */
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { inviteDataSchema } from "../src/lib/invite-data-schema";

const ROOT = process.cwd();
const INVITES_DIR = path.join(ROOT, "public", "invites");
const OUT_PUBLIC = path.join(ROOT, "src", "content", "invites.generated.json");
const OUT_SERVER = path.join(ROOT, "src", "content", "invites.generated.server.json");

const metaSchema = z.object({
  title: z.string().trim().min(1, "title не может быть пустым"),
  category: z.enum(["wedding", "kyz-uzatuu", "sunnot", "tushoo", "jubilee"], {
    message: "category должна быть одной из: wedding, kyz-uzatuu, sunnot, tushoo, jubilee",
  }),
  type: z.enum(["catalog", "client"], { message: 'type должен быть "catalog" или "client"' }),
  price: z.number().nonnegative("price не может быть отрицательным"),
  oldPrice: z.number().nonnegative().optional(),
  badges: z.array(z.enum(["hit", "new"])).optional(),
  order: z.number({ message: "order обязателен (число)" }),
  author: z.string().trim().min(1, "author не может быть пустым"),
  hostKey: z.string().trim().min(6, "hostKey должен быть длиннее (минимум 6 символов)"),
  published: z.boolean({ message: "published должен быть true или false" }),
});

interface Row {
  slug: string;
  title: string;
  category: string;
  type: "catalog" | "client";
  price: number;
  oldPrice?: number;
  badges?: ("hit" | "new")[];
  order: number;
  author: string;
  published: boolean;
  cover: string;
  hostKey: string;
  eventDate: string;
}

function fail(slug: string, message: string) {
  console.error(`✗ public/invites/${slug}: ${message}`);
}

function readJson(filePath: string): { ok: true; data: unknown } | { ok: false } {
  try {
    return { ok: true, data: JSON.parse(fs.readFileSync(filePath, "utf8")) };
  } catch {
    return { ok: false };
  }
}

function main() {
  if (!fs.existsSync(INVITES_DIR)) {
    console.error(`✗ Папка ${INVITES_DIR} не найдена.`);
    fs.writeFileSync(OUT_PUBLIC, "[]\n", "utf8");
    fs.writeFileSync(OUT_SERVER, "[]\n", "utf8");
    return;
  }

  const entries = fs
    .readdirSync(INVITES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
    .map((e) => e.name)
    .sort();

  const rows: Row[] = [];
  let errors = 0;

  for (const slug of entries) {
    const dir = path.join(INVITES_DIR, slug);

    const indexPath = path.join(dir, "index.html");
    const coverPath = path.join(dir, "cover.jpg");
    const metaPath = path.join(dir, "meta.json");
    const dataPath = path.join(dir, "data.json");

    if (!fs.existsSync(indexPath)) {
      fail(slug, "нет index.html");
      errors++;
      continue;
    }
    if (!fs.existsSync(coverPath)) {
      fail(slug, "нет cover.jpg");
      errors++;
      continue;
    }
    if (!fs.existsSync(metaPath)) {
      fail(slug, "нет meta.json");
      errors++;
      continue;
    }
    if (!fs.existsSync(dataPath)) {
      fail(slug, "нет data.json");
      errors++;
      continue;
    }

    const metaRaw = readJson(metaPath);
    if (!metaRaw.ok) {
      fail(slug, "meta.json — невалидный JSON");
      errors++;
      continue;
    }
    const metaResult = metaSchema.safeParse(metaRaw.data);
    if (!metaResult.success) {
      for (const issue of metaResult.error.issues) {
        fail(slug, `meta.json — ${issue.path.join(".") || "?"}: ${issue.message}`);
      }
      errors++;
      continue;
    }

    const dataRaw = readJson(dataPath);
    if (!dataRaw.ok) {
      fail(slug, "data.json — невалидный JSON");
      errors++;
      continue;
    }
    const dataResult = inviteDataSchema.safeParse(dataRaw.data);
    if (!dataResult.success) {
      for (const issue of dataResult.error.issues) {
        fail(slug, `data.json — ${issue.path.join(".") || "?"}: ${issue.message}`);
      }
      errors++;
      continue;
    }

    rows.push({
      slug,
      cover: `/invites/${slug}/cover.jpg`,
      eventDate: dataResult.data.date,
      ...metaResult.data,
    });
  }

  const serverRows = rows; // все валидные папки — и catalog, и client, опубликованные и нет
  const publicRows = rows
    .filter((r) => r.type === "catalog" && r.published)
    .map(({ hostKey: _hostKey, ...rest }) => rest);

  fs.mkdirSync(path.dirname(OUT_PUBLIC), { recursive: true });
  fs.writeFileSync(OUT_PUBLIC, JSON.stringify(publicRows, null, 2) + "\n", "utf8");
  fs.writeFileSync(OUT_SERVER, JSON.stringify(serverRows, null, 2) + "\n", "utf8");

  console.log(
    `✓ build-invites: ${rows.length} папок ок (${publicRows.length} в каталоге)` +
      (errors ? `, ${errors} с ошибками — пропущены` : "")
  );
}

main();
