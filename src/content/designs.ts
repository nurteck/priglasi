import type { Design } from "@/types";

/**
 * 12 дизайнов каталога. Каждый привязан к теме из src/themes
 * (цвета/шрифты/декор для будущего приглашения на этом дизайне).
 *
 * Чтобы добавить новый дизайн: допишите объект сюда и добавьте обложку
 * в public/images. Настоящее приглашение на этом дизайне создаётся
 * отдельно под конкретного клиента (см. src/content/invitations/_template.ts).
 */
export const designs: Design[] = [
  {
    slug: "ivory-classic",
    name: "Ivory Classic",
    category: "wedding",
    themeId: "ivory-seal",
    cover: "/images/design-ivory-classic-cover.png",
    defaultPackage: "photo",
    badges: ["hit"],
    featured: true,
    order: 1,
  },
  {
    slug: "burgundy-royal",
    name: "Burgundy Royal",
    category: "wedding",
    themeId: "burgundy-gold",
    cover: "/images/design-burgundy-royal-cover.png",
    defaultPackage: "premium",
    badges: ["hit"],
    featured: true,
    order: 2,
  },
  {
    slug: "olive-nezabudka",
    name: "Olive Незабудка",
    category: "kyz-uzatuu",
    themeId: "olive-garden",
    cover: "/images/design-olive-nezabudka-cover.png",
    defaultPackage: "photo",
    featured: true,
    order: 3,
  },
  {
    slug: "ala-too-salt",
    name: "Ала-Тоо Салтанат",
    category: "kyz-uzatuu",
    themeId: "ala-too",
    cover: "/images/design-ala-too-salt-cover.png",
    defaultPackage: "premium",
    badges: ["new"],
    featured: true,
    order: 4,
  },
  {
    slug: "noir-elegance",
    name: "Noir Elegance",
    category: "wedding",
    themeId: "noir-photo",
    cover: "/images/design-noir-elegance-cover.png",
    defaultPackage: "premium",
    featured: true,
    order: 5,
  },
  {
    slug: "pastel-gul",
    name: "Pastel Гүл",
    category: "jubilee",
    themeId: "pastel-bloom",
    cover: "/images/design-pastel-gul-cover.png",
    defaultPackage: "basic",
    featured: true,
    order: 6,
  },
  {
    slug: "sunnot-bahyt",
    name: "Сүннөт Бакыт",
    category: "sunnot",
    themeId: "ala-too",
    cover: "/images/design-sunnot-bahyt-cover.png",
    defaultPackage: "photo",
    badges: ["new"],
    featured: true,
    order: 7,
  },
  {
    slug: "tushoo-tim",
    name: "Тушоо Тим",
    category: "tushoo",
    themeId: "pastel-bloom",
    cover: "/images/design-tushoo-tim-cover.png",
    defaultPackage: "basic",
    featured: true,
    order: 8,
  },
  {
    slug: "olive-aigerim",
    name: "Olive Айгерим",
    category: "wedding",
    themeId: "olive-garden",
    cover: "/images/design-olive-aigerim-cover.png",
    defaultPackage: "photo",
    order: 9,
  },
  {
    slug: "burgundy-nur",
    name: "Burgundy Нур",
    category: "jubilee",
    themeId: "burgundy-gold",
    cover: "/images/design-burgundy-nur-cover.png",
    defaultPackage: "premium",
    order: 10,
  },
  {
    slug: "ivory-nika",
    name: "Ivory Ника",
    category: "kyz-uzatuu",
    themeId: "ivory-seal",
    cover: "/images/design-ivory-nika-cover.png",
    defaultPackage: "basic",
    order: 11,
  },
  {
    slug: "noir-adep",
    name: "Noir Адеп",
    category: "sunnot",
    themeId: "noir-photo",
    cover: "/images/design-noir-adep-cover.png",
    defaultPackage: "photo",
    order: 12,
  },
];

export function getDesignBySlug(slug: string): Design | undefined {
  return designs.find((d) => d.slug === slug);
}
