import { z } from "zod";

const phoneRegex = /^[\d+()\s-]{6,20}$/;

export const orderStepEventSchema = z.object({
  eventType: z.enum(["wedding", "kyz-uzatuu", "sunnot", "tushoo", "jubilee"], {
    message: "Выберите тип тоя",
  }),
  namesFirst: z.string().trim().min(2, "Укажите имя (минимум 2 символа)"),
  namesSecond: z.string().trim().optional(),
  date: z.string().min(1, "Укажите дату тоя"),
  time: z.string().min(1, "Укажите время"),
  venue: z.string().trim().min(2, "Укажите название заведения"),
  address: z.string().trim().min(2, "Укажите адрес"),
  hosts: z.string().trim().min(2, "Укажите хозяев тоя"),
  lang: z.enum(["ky", "ru", "ky-ru"]),
  wishes: z.string().trim().optional(),
});

export const orderStepContactsSchema = z.object({
  clientName: z.string().trim().min(2, "Укажите ваше имя"),
  phone: z
    .string()
    .trim()
    .min(6, "Укажите номер телефона")
    .regex(phoneRegex, "Похоже, номер введён неверно"),
});

export const orderSchema = z.object({
  designSlug: z.string().optional(),
  designName: z.string().optional(),
  packageId: z.enum(["basic", "photo", "premium"], { message: "Выберите пакет" }),
  ...orderStepEventSchema.shape,
  ...orderStepContactsSchema.shape,
});

export type OrderFormValues = z.infer<typeof orderSchema>;

export const rsvpSchema = z.object({
  invitationSlug: z.string().min(1),
  name: z.string().trim().min(2, "Укажите ваше имя"),
  attending: z.boolean(),
  guests: z
    .number({ message: "Укажите количество гостей" })
    .int()
    .min(1, "Минимум 1 человек")
    .max(20, "Слишком большое число — напишите нам напрямую"),
  wish: z.string().trim().max(500, "Слишком длинное сообщение").optional(),
  honeypot: z.string().max(0, "Спам обнаружен").optional(),
});

export type RsvpFormValues = z.infer<typeof rsvpSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Укажите ваше имя"),
  contact: z.string().trim().min(4, "Укажите телефон или Telegram"),
  message: z.string().trim().min(4, "Напишите сообщение"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
