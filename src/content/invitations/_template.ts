import type { Invitation } from "@/types";

/**
 * ШАБЛОН для нового приглашения клиента.
 *
 * Как создать приглашение:
 * 1. Скопируйте этот файл в src/content/invitations/имя-slug.ts
 *    (slug — латиницей, например aibek-aizhan).
 * 2. Заполните поля ниже.
 * 3. Добавьте фото в public/images и укажите пути.
 * 4. Зарегистрируйте приглашение в src/content/invitations/index.ts.
 * 5. Ссылка для клиента: https://ваш-домен/i/имя-slug
 */
export const templateInvitation: Invitation = {
  slug: "imya-slug",
  themeId: "ivory-seal", // id темы из src/themes
  lang: "ky-ru",
  // guestsKey: "sekretnyi-klyuch-123", // раскомментируйте для премиум-пакета

  names: { first: "Имя", second: "Имя" },
  eventType: "wedding",
  date: "2026-08-15T17:00:00+06:00",
  coverPhoto: "/images/couple-placeholder.png",
  music: "/music/theme-ivory-seal.mp3",

  blocks: {
    envelope: true,
    intro: {
      text: {
        ky: "Урматтуу коноктор! Сиздерди үй-бүлөбүздүн эң кубанычтуу күнүнө чакырабыз.",
        ru: "Дорогие гости! Приглашаем вас разделить с нами самый радостный день нашей семьи.",
      },
    },
    hosts: {
      names: ["Ата-энеси Асан жана Гүлнара"],
    },
    calendar: true,
    countdown: true,
    program: [
      { time: "17:00", title: { ky: "Коноктарды тосуу", ru: "Встреча гостей" } },
      { time: "18:00", title: { ky: "Той башталышы", ru: "Начало тоя" } },
      { time: "22:00", title: { ky: "Бийлер", ru: "Танцы" } },
    ],
    venue: {
      name: "Той залы «Мисал»",
      address: "г. Бишкек, ул. Примерная, 1",
      gis2Url: "https://2gis.kg",
      googleUrl: "https://maps.google.com",
    },
    gallery: [],
    dressCode: {
      text: { ky: "Салтанаттуу кийим", ru: "Нарядный стиль" },
      colors: ["#7A1F2B", "#B8873A"],
    },
    rsvp: {},
    finale: true,
  },
};
