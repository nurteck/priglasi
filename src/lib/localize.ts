import type { Lang, Localized } from "@/types";

/** Достаёт нужный язык из Localized-строки. Для "ky-ru" по умолчанию берёт кыргызский. */
export function resolveText(text: Localized, lang: Lang, activeSingle: "ky" | "ru" = "ky"): string {
  if (typeof text === "string") return text;
  if (lang === "ky-ru") return text[activeSingle];
  return text[lang];
}

/** Статические UI-подписи движка приглашений на двух языках. */
export const inviteUi = {
  ky: {
    openHint: "Ачуу үчүн басыңыз",
    scrollHint: "Төмөн жылдырыңыз",
    days: "күн",
    hours: "саат",
    minutes: "мүнөт",
    seconds: "секунд",
    countdownTitle: "Тойго чейин",
    programTitle: "Кечки программа",
    venueTitle: "Той болуучу жер",
    gis: "2ГИС",
    gmaps: "Google Maps",
    galleryTitle: "Сүрөттөр",
    dressTitle: "Дресс-код",
    rsvpTitle: "Келериңизди тастыктаңыз",
    rsvpName: "Атыңыз",
    rsvpComing: "Келем",
    rsvpNotComing: "Келе албайм",
    rsvpGuests: "Конок саны",
    rsvpWish: "Тилегиңиз",
    rsvpSubmit: "Жөнөтүү",
    rsvpThanks: "Рахмат! Жообуңуз кабыл алынды.",
    finaleSignature: "Сүйүү менен",
    madeBy: "Салтанат тарабынан жасалды",
    hostsTitle: "Той ээлери",
  },
  ru: {
    openHint: "Нажмите, чтобы открыть",
    scrollHint: "Пролистайте вниз",
    days: "дней",
    hours: "часов",
    minutes: "минут",
    seconds: "секунд",
    countdownTitle: "До тоя осталось",
    programTitle: "Программа вечера",
    venueTitle: "Место проведения",
    gis: "2ГИС",
    gmaps: "Google Maps",
    galleryTitle: "Фотографии",
    dressTitle: "Дресс-код",
    rsvpTitle: "Подтвердите участие",
    rsvpName: "Ваше имя",
    rsvpComing: "Приду",
    rsvpNotComing: "Не смогу",
    rsvpGuests: "Количество гостей",
    rsvpWish: "Пожелание",
    rsvpSubmit: "Отправить",
    rsvpThanks: "Спасибо! Ваш ответ принят.",
    finaleSignature: "С любовью",
    madeBy: "Сделано в Салтанат",
    hostsTitle: "Хозяева тоя",
  },
} as const;

export type InviteUiLang = keyof typeof inviteUi;
