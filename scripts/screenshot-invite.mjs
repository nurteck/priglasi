// Разовый скрипт: скриншот первого экрана приглашения 9:16 → cover.jpg.
// Использование: node scripts/screenshot-invite.mjs <slug> [baseUrl]
import { chromium } from "playwright";
import path from "node:path";

const slug = process.argv[2];
const baseUrl = process.argv[3] ?? "http://localhost:3000";
if (!slug) {
  console.error("Использование: node scripts/screenshot-invite.mjs <slug> [baseUrl]");
  process.exit(1);
}

const url = `${baseUrl}/invites/${slug}/?g=${encodeURIComponent("Урматтуу коноктор")}&n=2`;
const out = path.join(process.cwd(), "public", "invites", slug, "cover.jpg");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 750, height: 1334 } });
await page.goto(url, { waitUntil: "networkidle" });
// Разные дизайны открываются по-разному (некоторые — долгой вступительной
// анимацией с конвертом/гербом в несколько секунд). Ждём, пока дизайн сам
// пометит себя открытым (общий признак — body.revealed, как в наших
// шаблонах), иначе просто даём анимациям время доиграть по таймауту.
await page
  .waitForFunction(() => document.body.classList.contains("revealed"), { timeout: 6000 })
  .catch(() => {});
await page.waitForTimeout(1200);
await page.screenshot({ path: out, type: "jpeg", quality: 90 });
await browser.close();

console.log(`✓ Сохранено: ${out}`);
