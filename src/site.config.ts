import type { Package } from "@/types";

/**
 * Единый файл настроек сайта "Салтанат".
 * Меняйте название, телефон, цены и т.д. только здесь —
 * больше нигде в проекте эти значения не хардкодятся.
 */
export const siteConfig = {
  brandName: "Салтанат",
  monogram: "С",
  tagline: "Приглашения на той",
  description:
    "Цифровые сайты-приглашения на тои в Кыргызстане: свадьба, кыз узатуу, сүннөт той, тушоо той, юбилей. Готово за 1–2 дня.",

  url: "https://saltanat.kg", // поменяйте на реальный домен после деплоя

  // Контакты
  whatsapp: "996553343210", // формат без "+", код 996 + номер без ведущего 0
  instagram: "saltanat",
  telegram: "saltanat",
  phoneDisplay: "+996 553 34 32 10",
  city: "Бишкек",
  hours: "Пн–Сб 10:00–19:00",

  // Меню — чтобы позже легко добавить новый раздел (например Love story),
  // достаточно дописать пункт сюда.
  nav: [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: "/catalog" },
    { label: "О нас", href: "/about" },
    { label: "Контакты", href: "/contact" },
  ],

  // Доп. услуги (задел на будущее, сейчас не отображаются отдельной страницей)
  services: [] as { label: string; href: string }[],

  // Пакеты услуг
  packages: [
    {
      id: "basic",
      name: "Базовый",
      price: 2500,
      features: [
        "Один готовый дизайн",
        "Имена, дата и место",
        "Таймер до тоя",
        "Фото и музыка по желанию",
        "Ссылка на 3 месяца",
      ],
    },
    {
      id: "premium",
      name: "Премиум",
      price: 4000,
      popular: true,
      features: [
        "Всё из «Базового»",
        "Персональные ссылки гостям (имя, количество мест)",
        "Список гостей и экспорт в Excel",
        "Безлимит правок 7 дней",
        "Приоритетная поддержка",
      ],
    },
  ] satisfies Package[],

  // Статистика для полосы доверия
  stats: {
    invitations: "300+",
    invitationsLabel: "приглашений",
    designs: "12",
    designsLabel: "дизайнов",
    speed: "от 1 дня",
    speedLabel: "готово",
  },

  // Оплата — отображается в FAQ
  payment: {
    methods: ["MBank", "Optima Bank", "О!Деньги"],
    prepayment: "50%",
  },

  // Цвета и шрифты по умолчанию для сайта (не для тем приглашений —
  // те лежат в src/themes). Собраны в духе сдержанной свадебной эстетики:
  // молочный фон, бордовый и золотой акценты.
  theme: {
    colors: {
      bg: "#FBF6EE",
      surface: "#FFFFFF",
      text: "#2A1B1E",
      muted: "#7A6A63",
      accent: "#7A1F2B", // бордо
      accentSoft: "#F3E4C9",
      gold: "#B8873A",
    },
    fonts: {
      heading: "Playfair Display",
      body: "Manrope",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
