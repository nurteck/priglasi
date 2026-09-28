import type { Invitation } from "@/types";

/** Пример реального приглашения клиента: /i/aibek-aizhan */
export const aibekAizhan: Invitation = {
  slug: "aibek-aizhan",
  themeId: "burgundy-gold",
  lang: "ky-ru",
  guestsKey: "aibek-aizhan-2026",

  names: { first: "Айбек", second: "Айжан" },
  eventType: "wedding",
  date: "2026-11-14T17:00:00+06:00",
  coverPhoto: "/images/couple-aibek-aizhan.png",
  music: "/music/theme-burgundy-gold.mp3",

  blocks: {
    envelope: true,
    intro: {
      text: {
        ky: "Урматтуу коноктор! Сиздерди эң кубанычтуу күнүбүзгө — үйлөнүү тоюбузга чакырабыз.",
        ru: "Дорогие гости! Приглашаем вас разделить с нами самый счастливый день — нашу свадьбу.",
      },
    },
    hosts: {
      names: ["Ата-энелери Марат жана Гүлмира", "Асан жана Роза"],
    },
    calendar: true,
    countdown: true,
    program: [
      { time: "17:00", title: { ky: "Коноктарды тосуу", ru: "Встреча гостей" } },
      { time: "18:00", title: { ky: "Жаш кыйынды тосуу", ru: "Выход молодожёнов" } },
      { time: "19:00", title: { ky: "Тамактануу", ru: "Праздничный ужин" } },
      { time: "21:00", title: { ky: "Бийлер жана тойго тамаша", ru: "Танцы и развлечения" } },
    ],
    venue: {
      name: "Той-зал «Ак-Сарай»",
      address: "г. Бишкек, пр. Чүй, 154",
      gis2Url: "https://2gis.kg/bishkek",
      googleUrl: "https://maps.google.com",
    },
    gallery: [
      "/images/couple-aibek-aizhan-1.png",
      "/images/couple-aibek-aizhan-2.png",
      "/images/couple-aibek-aizhan-3.png",
    ],
    dressCode: {
      text: { ky: "Салтанаттуу, бордо жана алтын түстөр кубатталат", ru: "Нарядный стиль, приветствуются бордовый и золотой" },
      colors: ["#7A1F2B", "#D4AF6A"],
    },
    rsvp: { deadline: "2026-11-05" },
    finale: true,
  },
};
