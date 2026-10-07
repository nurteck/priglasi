import { siteConfig } from "@/site.config";
import { formatSom } from "@/lib/format";
import type { OrderInput } from "@/types";

/** Ссылка на WhatsApp с заранее заполненным текстом. */
export function waLink(text: string, phone: string = siteConfig.whatsapp): string {
  const clean = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

/** Короткий текст заявки прямо с карточки дизайна в каталоге/на главной — с названием и ссылкой на демо. */
export function buildDesignOrderText(designTitle: string, demoUrl: string): string {
  return [
    "Здравствуйте! 👋",
    `Хочу заказать приглашение *«${designTitle}»* ✨`,
    "",
    `🔗 Демо: ${demoUrl}`,
    "",
    "Подскажите, пожалуйста, как оформить заказ 🙏",
  ].join("\n");
}

const langLabel: Record<string, string> = {
  ky: "кыргызча",
  ru: "русский",
  "ky-ru": "кыргызча и русский",
};

/**
 * Текст заявки после мастера заказа /order — открывается в WhatsApp на шаге 3.
 * designLabel: название дизайна, "Подберём вместе" (если выбрана эта плитка)
 * или undefined (дизайн пропущен) — тогда строка "Дизайн:" вообще не включается.
 */
export function buildOrderWizardText(
  order: OrderInput & { designLabel?: string; total: number }
): string {
  const dateTime = order.date
    ? `📅 Дата и время: ${order.date}${order.time ? `, ${order.time}` : ""}`
    : null;
  const place = order.venue || order.address
    ? `📍 Заведение: ${[order.venue, order.address].filter(Boolean).join(", ")}`
    : null;

  const lines = [
    "Здравствуйте! 👋",
    "Хочу оформить заказ приглашения на сайте ✨",
    "",
    order.designLabel ? `🎨 Дизайн: ${order.designLabel}` : null,
    `📦 Пакет: *${packageNameById(order.packageId)}* — ${formatSom(order.total)}`,
    `💍 Той: ${eventLabel(order.eventType)}`,
    order.namesFirst
      ? `🤍 Имена: ${order.namesFirst}${order.namesSecond ? ` и ${order.namesSecond}` : ""}`
      : null,
    dateTime,
    place,
    `🌐 Язык приглашения: ${langLabel[order.lang]}`,
    order.wishes ? `💌 Пожелания: ${order.wishes}` : null,
    "",
    `👤 ${order.clientName}`,
    `📱 WhatsApp: +996 ${order.phone}`,
    "",
    "Буду благодарен(на) за обратную связь 🙏",
  ].filter((line) => line !== null);
  return lines.join("\n");
}

/** Текст письма из формы обратной связи на /contact. */
export function buildContactText(params: { name: string; contact: string; message: string }): string {
  return [
    "Здравствуйте! 👋",
    `Меня зовут *${params.name}* (${params.contact}).`,
    "",
    params.message,
  ].join("\n");
}

function packageNameById(id: string): string {
  return siteConfig.packages.find((p) => p.id === id)?.name ?? id;
}

function eventLabel(id: string): string {
  const map: Record<string, string> = {
    wedding: "Свадьба",
    "kyz-uzatuu": "Кыз узатуу",
    sunnot: "Сүннөт той",
    tushoo: "Тушоо той",
    jubilee: "Юбилей",
  };
  return map[id] ?? id;
}
