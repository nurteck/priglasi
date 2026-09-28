// Генератор PNG-заглушек без внешних зависимостей (использует только node:zlib).
// Создаёт однотонные/градиентные картинки понятного размера с шумом-текстурой,
// чтобы плейсхолдеры не выглядели как сплошная плашка. Пользователь потом
// заменяет файлы в public/images своими — имена и размеры менять не нужно.
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })());
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a, b, t) {
  return a + (b - a) * t;
}

/** Простой детерминированный псевдослучайный генератор (для стабильного "шума"). */
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h >>> 0;
}

/** Рисует диагональный градиент от colorA к colorB с лёгким шумом и монограммой-меткой в центре. */
function makePng({ width, height, colorA, colorB, seed }) {
  const [r1, g1, b1] = hexToRgb(colorA);
  const [r2, g2, b2] = hexToRgb(colorB);
  const rand = mulberry32(seedFromString(seed));

  const raw = Buffer.alloc((width * 3 + 1) * height);
  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0; // без фильтра
    for (let x = 0; x < width; x++) {
      const t = (x / width + y / height) / 2;
      const noise = (rand() - 0.5) * 14;
      raw[offset++] = clamp(mix(r1, r2, t) + noise);
      raw[offset++] = clamp(mix(g1, g2, t) + noise);
      raw[offset++] = clamp(mix(b1, b2, t) + noise);
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const idat = deflateSync(raw);
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
  return png;
}

function clamp(v) {
  return Math.max(0, Math.min(255, Math.round(v)));
}

// slug -> [ширина, высота, цветA, цветB]
const themeColors = {
  "ivory-seal": ["#FBF7EE", "#B8873A"],
  "burgundy-gold": ["#3B0F17", "#D4AF6A"],
  "olive-garden": ["#F3F2E8", "#5B6B3C"],
  "ala-too": ["#FAF3E7", "#A5222E"],
  "noir-photo": ["#111112", "#C9A24B"],
  "pastel-bloom": ["#FDF3F3", "#D98A96"],
};

const items = [];

// Категории (круглые сторис) — квадрат
const categoryThemes = {
  all: themeColors["ivory-seal"],
  wedding: themeColors["burgundy-gold"],
  "kyz-uzatuu": themeColors["olive-garden"],
  sunnot: themeColors["ala-too"],
  tushoo: themeColors["pastel-bloom"],
  jubilee: themeColors["noir-photo"],
};
for (const [id, [a, b]] of Object.entries(categoryThemes)) {
  items.push({ name: `category-${id}`, width: 200, height: 200, colorA: a, colorB: b });
}

// Обложки дизайнов каталога (портрет, под рамку телефона)
const designThemeMap = {
  "ivory-classic": "ivory-seal",
  "burgundy-royal": "burgundy-gold",
  "olive-nezabudka": "olive-garden",
  "ala-too-salt": "ala-too",
  "noir-elegance": "noir-photo",
  "pastel-gul": "pastel-bloom",
  "sunnot-bahyt": "ala-too",
  "tushoo-tim": "pastel-bloom",
  "olive-aigerim": "olive-garden",
  "burgundy-nur": "burgundy-gold",
  "ivory-nika": "ivory-seal",
  "noir-adep": "noir-photo",
};
for (const [slug, theme] of Object.entries(designThemeMap)) {
  const [a, b] = themeColors[theme];
  items.push({ name: `design-${slug}-cover`, width: 480, height: 640, colorA: a, colorB: b });
}

// Демо-приглашения (обложки + доп. фото галереи)
const demoThemeMap = {
  "wedding-ivory": "ivory-seal",
  "wedding-burgundy": "burgundy-gold",
  "kyz-uzatuu-olive": "olive-garden",
  "kyz-uzatuu-ala-too": "ala-too",
  "wedding-noir": "noir-photo",
  "jubilee-pastel": "pastel-bloom",
  "sunnot-bahyt": "ala-too",
  "tushoo-tim": "pastel-bloom",
  "wedding-olive": "olive-garden",
  "jubilee-burgundy": "burgundy-gold",
  "kyz-uzatuu-ivory": "ivory-seal",
  "sunnot-noir": "noir-photo",
};
for (const [slug, theme] of Object.entries(demoThemeMap)) {
  const [a, b] = themeColors[theme];
  items.push({ name: `demo-${slug}-cover`, width: 800, height: 1200, colorA: a, colorB: b });
}
// доп. фото галерей демо (те, что реально использованы в контенте)
const demoGalleryExtras = [
  "demo-wedding-ivory-1", "demo-wedding-ivory-2",
  "demo-wedding-burgundy-1",
  "demo-wedding-noir-1", "demo-wedding-noir-2",
  "demo-wedding-olive-1",
];
for (const name of demoGalleryExtras) {
  const theme = name.includes("ivory") ? "ivory-seal" : name.includes("burgundy") ? "burgundy-gold" : name.includes("noir") ? "noir-photo" : "olive-garden";
  const [a, b] = themeColors[theme];
  items.push({ name, width: 600, height: 600, colorA: a, colorB: b });
}

// Пара клиента aibek-aizhan (тема burgundy-gold)
{
  const [a, b] = themeColors["burgundy-gold"];
  items.push({ name: "couple-aibek-aizhan", width: 800, height: 1200, colorA: a, colorB: b });
  items.push({ name: "couple-aibek-aizhan-1", width: 600, height: 600, colorA: a, colorB: b });
  items.push({ name: "couple-aibek-aizhan-2", width: 600, height: 600, colorA: a, colorB: b });
  items.push({ name: "couple-aibek-aizhan-3", width: 600, height: 600, colorA: a, colorB: b });
}
{
  const [a, b] = themeColors["ivory-seal"];
  items.push({ name: "couple-placeholder", width: 800, height: 1200, colorA: a, colorB: b });
}

// Фоны тем (портретные, под весь экран приглашения)
for (const [id, [a, b]] of Object.entries(themeColors)) {
  items.push({ name: `theme-${id}-bg`, width: 480, height: 900, colorA: a, colorB: b });
}

// Отзывы (круглые аватары)
const reviewNames = ["review-aigerim", "review-bermet", "review-tilek", "review-jamilya", "review-daniyar", "review-placeholder"];
for (const name of reviewNames) {
  const [a, b] = themeColors["ala-too"];
  items.push({ name, width: 120, height: 120, colorA: a, colorB: b });
}

// Общие изображения сайта
items.push({ name: "hero-main", width: 1600, height: 1000, colorA: "#3B0F17", colorB: "#B8873A" });
items.push({ name: "about-nurtilek", width: 400, height: 400, colorA: "#FAF3E7", colorB: "#7A1F2B" });

let count = 0;
for (const item of items) {
  const png = makePng({
    width: item.width,
    height: item.height,
    colorA: item.colorA,
    colorB: item.colorB,
    seed: item.name,
  });
  writeFileSync(join(outDir, `${item.name}.png`), png);
  count++;
}

console.log(`Сгенерировано ${count} PNG-заглушек в public/images`);
