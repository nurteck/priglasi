import { siteConfig } from "@/site.config";
import type { OrderInput } from "@/types";

/** Ссылка на WhatsApp с заранее заполненным текстом. */
export function waLink(text: string, phone: string = siteConfig.whatsapp): string {
  const clean = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

/** Текст заявки на заказ дизайна прямо из каталога. */
export function buildCatalogOrderText(params: {
  designName: string;
  demoUrl: string;
  packageName: string;
  price: number;
}): string {
  const { designName, demoUrl, packageName, price } = params;
  return `Здравствуйте! Хочу заказать приглашение. Дизайн: ${designName}. Демо: ${demoUrl}. Пакет: ${packageName}. Цена: ${price} сом.`;
}

const langLabel: Record<string, string> = {
  ky: "кыргызский",
  ru: "русский",
  "ky-ru": "кыргызский и русский",
};

/** Полный текст заявки после мастера заказа /order. */
export function buildOrderWizardText(order: OrderInput & { designName?: string; total: number }): string {
  const lines = [
    "Здравствуйте! Хочу оформить заявку на приглашение.",
    order.designName ? `Дизайн: ${order.designName}` : null,
    `Пакет: ${packageNameById(order.packageId)}`,
    `Тип тоя: ${eventLabel(order.eventType)}`,
    `Имена: ${order.namesFirst}${order.namesSecond ? ` и ${order.namesSecond}` : ""}`,
    `Дата: ${order.date}${order.time ? `, ${order.time}` : ""}`,
    order.venue ? `Заведение: ${order.venue}` : null,
    order.address ? `Адрес: ${order.address}` : null,
    order.hosts ? `Хозяева тоя: ${order.hosts}` : null,
    `Язык приглашения: ${langLabel[order.lang]}`,
    order.wishes ? `Пожелания: ${order.wishes}` : null,
    `Итого: ${order.total} сом`,
    `Клиент: ${order.clientName}, ${order.phone}`,
  ].filter(Boolean);
  return lines.join("\n");
}

/** Текст письма из формы обратной связи на /contact. */
export function buildContactText(params: { name: string; contact: string; message: string }): string {
  return `Здравствуйте! Меня зовут ${params.name} (${params.contact}).\n${params.message}`;
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
