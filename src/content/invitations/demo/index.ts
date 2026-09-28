import type { Invitation } from "@/types";

/**
 * Демо-приглашения для /demo/[design] — выдуманные пары, показывающие
 * дизайн вживую. Каждый дизайн в content/designs.ts ссылается на один
 * из slug-ов ниже через поле demoInvitation.
 */
function makeDemo(base: Invitation): Invitation {
  return base;
}

export const demoInvitations: Record<string, Invitation> = {
  "wedding-ivory": makeDemo({
    slug: "wedding-ivory",
    themeId: "ivory-seal",
    lang: "ky-ru",
    names: { first: "Тимур", second: "Назира" },
    eventType: "wedding",
    date: "2026-10-10T17:00:00+06:00",
    coverPhoto: "/images/demo-wedding-ivory-cover.png",
    music: "/music/theme-ivory-seal.mp3",
    blocks: {
      envelope: true,
      intro: {
        text: {
          ky: "Урматтуу коноктор! Үйлөнүү тоюбузга чакырабыз.",
          ru: "Дорогие гости! Приглашаем вас на нашу свадьбу.",
        },
      },
      hosts: { names: ["Ата-энелери Бакыт жана Айнура"] },
      calendar: true,
      countdown: true,
      program: [
        { time: "17:00", title: { ky: "Коноктарды тосуу", ru: "Встреча гостей" } },
        { time: "18:30", title: { ky: "Той башталышы", ru: "Начало торжества" } },
        { time: "21:00", title: { ky: "Бийлер", ru: "Танцы" } },
      ],
      venue: {
        name: "Той-зал «Нур»",
        address: "г. Бишкек, ул. Ахунбаева, 95",
        gis2Url: "https://2gis.kg",
        googleUrl: "https://maps.google.com",
      },
      gallery: ["/images/demo-wedding-ivory-1.png", "/images/demo-wedding-ivory-2.png"],
      dressCode: { text: { ky: "Салтанаттуу кийим", ru: "Нарядный стиль" }, colors: ["#B8873A", "#2A2320"] },
      rsvp: {},
      finale: true,
    },
  }),

  "wedding-burgundy": makeDemo({
    slug: "wedding-burgundy",
    themeId: "burgundy-gold",
    lang: "ky-ru",
    names: { first: "Эрлан", second: "Мээрим" },
    eventType: "wedding",
    date: "2026-09-20T18:00:00+06:00",
    coverPhoto: "/images/demo-wedding-burgundy-cover.png",
    music: "/music/theme-burgundy-gold.mp3",
    blocks: {
      envelope: true,
      intro: {
        text: {
          ky: "Урматтуу коноктор! Үй-бүлөбүздүн кубанычтуу күнүнө чакырабыз.",
          ru: "Дорогие гости! Приглашаем на праздник нашей семьи.",
        },
      },
      hosts: { names: ["Ата-энелери Нурлан жана Гүлзат"] },
      calendar: true,
      countdown: true,
      program: [
        { time: "18:00", title: { ky: "Коноктарды тосуу", ru: "Встреча гостей" } },
        { time: "19:00", title: { ky: "Жаш кыйынды тосуу", ru: "Выход молодожёнов" } },
      ],
      venue: {
        name: "Той-зал «Ала-Тоо»",
        address: "г. Бишкек, пр. Манас, 40",
        gis2Url: "https://2gis.kg",
        googleUrl: "https://maps.google.com",
      },
      gallery: ["/images/demo-wedding-burgundy-1.png"],
      dressCode: { text: { ky: "Бордо жана алтын түстөр", ru: "Бордовый и золотой" }, colors: ["#7A1F2B", "#D4AF6A"] },
      rsvp: {},
      finale: true,
    },
  }),

  "kyz-uzatuu-olive": makeDemo({
    slug: "kyz-uzatuu-olive",
    themeId: "olive-garden",
    lang: "ky-ru",
    names: { first: "Айгерим" },
    eventType: "kyz-uzatuu",
    date: "2026-08-05T16:00:00+06:00",
    coverPhoto: "/images/demo-kyz-uzatuu-olive-cover.png",
    music: "/music/theme-olive-garden.mp3",
    blocks: {
      envelope: true,
      intro: {
        text: { ky: "Урматтуу тууган-туушкандар! Кызыбызды узатуу тоюна чакырабыз.", ru: "Дорогие родные! Приглашаем на проводы нашей дочери." },
      },
      hosts: { names: ["Ата-энеси Мурат жана Салтанат"] },
      calendar: true,
      countdown: true,
      program: [{ time: "16:00", title: { ky: "Коноктарды тосуу", ru: "Встреча гостей" } }],
      venue: { name: "Той-зал «Жашыл багы»", address: "г. Ош, ул. Ленина, 12" },
      gallery: [],
      rsvp: {},
      finale: true,
    },
  }),

  "kyz-uzatuu-ala-too": makeDemo({
    slug: "kyz-uzatuu-ala-too",
    themeId: "ala-too",
    lang: "ky",
    names: { first: "Бермет" },
    eventType: "kyz-uzatuu",
    date: "2026-07-19T16:00:00+06:00",
    coverPhoto: "/images/demo-kyz-uzatuu-ala-too-cover.png",
    music: "/music/theme-ala-too.mp3",
    blocks: {
      envelope: true,
      intro: { text: { ky: "Урматтуу коноктор! Кызыбызды узатуу тоюна чакырабыз.", ru: "" } },
      hosts: { names: ["Ата-энеси Талант жана Жамал"] },
      calendar: true,
      countdown: true,
      venue: { name: "Той-зал «Салтанат»", address: "г. Каракол, ул. Абдрахманова, 3" },
      rsvp: {},
      finale: true,
    },
  }),

  "wedding-noir": makeDemo({
    slug: "wedding-noir",
    themeId: "noir-photo",
    lang: "ru",
    names: { first: "Азамат", second: "Диана" },
    eventType: "wedding",
    date: "2026-12-05T18:00:00+06:00",
    coverPhoto: "/images/demo-wedding-noir-cover.png",
    music: "/music/theme-noir-photo.mp3",
    blocks: {
      envelope: true,
      intro: { text: { ru: "Дорогие гости! Приглашаем разделить с нами этот особенный вечер.", ky: "" } },
      hosts: { names: ["Родители Максат и Айгуль"] },
      calendar: true,
      countdown: true,
      program: [{ time: "18:00", title: { ru: "Встреча гостей", ky: "" } }],
      venue: { name: "Ресторан «Silk Road»", address: "г. Бишкек, ул. Токтогула, 200" },
      gallery: ["/images/demo-wedding-noir-1.png", "/images/demo-wedding-noir-2.png"],
      dressCode: { text: { ru: "Чёрно-белый дресс-код", ky: "" }, colors: ["#111112", "#F2F1EE"] },
      rsvp: {},
      finale: true,
    },
  }),

  "jubilee-pastel": makeDemo({
    slug: "jubilee-pastel",
    themeId: "pastel-bloom",
    lang: "ru",
    names: { first: "Клара Ивановна" },
    eventType: "jubilee",
    date: "2026-05-30T17:00:00+06:00",
    coverPhoto: "/images/demo-jubilee-pastel-cover.png",
    music: "/music/theme-pastel-bloom.mp3",
    blocks: {
      envelope: true,
      intro: { text: { ru: "Дорогие друзья! Приглашаем на юбилейный вечер.", ky: "" } },
      hosts: { names: ["Семья Осмоновых"] },
      calendar: true,
      countdown: true,
      venue: { name: "Банкетный зал «Жасмин»", address: "г. Бишкек, ул. Московская, 88" },
      rsvp: {},
      finale: true,
    },
  }),

  "sunnot-bahyt": makeDemo({
    slug: "sunnot-bahyt",
    themeId: "ala-too",
    lang: "ky-ru",
    names: { first: "Бахыт уулу Ілияс" },
    eventType: "sunnot",
    date: "2026-06-14T13:00:00+06:00",
    coverPhoto: "/images/demo-sunnot-bahyt-cover.png",
    music: "/music/theme-ala-too.mp3",
    blocks: {
      envelope: true,
      intro: { text: { ky: "Урматтуу коноктор! Уулубуздун сүннөт тоюна чакырабыз.", ru: "Дорогие гости! Приглашаем на праздник в честь нашего сына." } },
      hosts: { names: ["Ата-энеси Женишбек жана Нурила"] },
      calendar: true,
      countdown: true,
      venue: { name: "Той-зал «Бакыт»", address: "г. Бишкек, ул. Жибек Жолу, 55" },
      rsvp: {},
      finale: true,
    },
  }),

  "tushoo-tim": makeDemo({
    slug: "tushoo-tim",
    themeId: "pastel-bloom",
    lang: "ky-ru",
    names: { first: "Тимур" },
    eventType: "tushoo",
    date: "2026-04-18T14:00:00+06:00",
    coverPhoto: "/images/demo-tushoo-tim-cover.png",
    music: "/music/theme-pastel-bloom.mp3",
    blocks: {
      envelope: true,
      intro: { text: { ky: "Урматтуу коноктор! Тушоо кесүү тоюна чакырабыз.", ru: "Дорогие гости! Приглашаем на праздник тушоо кесуу." } },
      hosts: { names: ["Ата-энеси Улан жана Асель"] },
      calendar: true,
      countdown: true,
      venue: { name: "Кафе «Балапан»", address: "г. Бишкек, ул. Фрунзе, 15" },
      rsvp: {},
      finale: true,
    },
  }),

  "wedding-olive": makeDemo({
    slug: "wedding-olive",
    themeId: "olive-garden",
    lang: "ky-ru",
    names: { first: "Марат", second: "Гулим" },
    eventType: "wedding",
    date: "2026-09-01T17:00:00+06:00",
    coverPhoto: "/images/demo-wedding-olive-cover.png",
    music: "/music/theme-olive-garden.mp3",
    blocks: {
      envelope: true,
      intro: { text: { ky: "Урматтуу коноктор! Тоюбузга чакырабыз.", ru: "Дорогие гости! Приглашаем на нашу свадьбу." } },
      hosts: { names: ["Ата-энелери Сапар жана Токтосун"] },
      calendar: true,
      countdown: true,
      venue: { name: "Ресторан «Оливковый сад»", address: "г. Бишкек, ул. Гоголя, 70" },
      gallery: ["/images/demo-wedding-olive-1.png"],
      rsvp: {},
      finale: true,
    },
  }),

  "jubilee-burgundy": makeDemo({
    slug: "jubilee-burgundy",
    themeId: "burgundy-gold",
    lang: "ru",
    names: { first: "Асан Молдоевич" },
    eventType: "jubilee",
    date: "2026-03-22T18:00:00+06:00",
    coverPhoto: "/images/demo-jubilee-burgundy-cover.png",
    music: "/music/theme-burgundy-gold.mp3",
    blocks: {
      envelope: true,
      intro: { text: { ru: "Дорогие друзья! Приглашаем разделить с нами юбилейный вечер.", ky: "" } },
      hosts: { names: ["Семья Бекова"] },
      calendar: true,
      countdown: true,
      venue: { name: "Банкетный зал «Достук»", address: "г. Бишкек, пр. Мира, 33" },
      rsvp: {},
      finale: true,
    },
  }),

  "kyz-uzatuu-ivory": makeDemo({
    slug: "kyz-uzatuu-ivory",
    themeId: "ivory-seal",
    lang: "ky-ru",
    names: { first: "Нурзат" },
    eventType: "kyz-uzatuu",
    date: "2026-08-22T16:00:00+06:00",
    coverPhoto: "/images/demo-kyz-uzatuu-ivory-cover.png",
    music: "/music/theme-ivory-seal.mp3",
    blocks: {
      envelope: true,
      intro: { text: { ky: "Урматтуу коноктор! Кызыбызды узатуу тоюна чакырабыз.", ru: "Дорогие гости! Приглашаем на проводы нашей дочери." } },
      hosts: { names: ["Ата-энеси Кубат жана Гүлнара"] },
      calendar: true,
      countdown: true,
      venue: { name: "Той-зал «Гүлдер»", address: "г. Бишкек, ул. Байтик Баатыра, 20" },
      rsvp: {},
      finale: true,
    },
  }),

  "sunnot-noir": makeDemo({
    slug: "sunnot-noir",
    themeId: "noir-photo",
    lang: "ky-ru",
    names: { first: "Адеп уулу Алишер" },
    eventType: "sunnot",
    date: "2026-07-02T13:00:00+06:00",
    coverPhoto: "/images/demo-sunnot-noir-cover.png",
    music: "/music/theme-noir-photo.mp3",
    blocks: {
      envelope: true,
      intro: { text: { ky: "Урматтуу коноктор! Уулубуздун сүннөт тоюна чакырабыз.", ru: "Дорогие гости! Приглашаем на праздник нашего сына." } },
      hosts: { names: ["Ата-энеси Бакыт жана Жылдыз"] },
      calendar: true,
      countdown: true,
      venue: { name: "Той-зал «Адеп»", address: "г. Бишкек, ул. Киевская, 111" },
      rsvp: {},
      finale: true,
    },
  }),
};

export function getDemoInvitation(slug: string): Invitation | undefined {
  return demoInvitations[slug];
}
