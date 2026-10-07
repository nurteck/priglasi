import { z } from "zod";

export const orderStepEventSchema = z.object({
  eventType: z.enum(["wedding", "kyz-uzatuu", "sunnot", "tushoo", "jubilee"], {
    message: "Выберите тип тоя",
  }),
  namesFirst: z.string().trim().min(2, "Укажите имя (минимум 2 символа)"),
  namesSecond: z.string().trim().optional(),
  date: z.string().min(1, "Укажите дату тоя"),
  time: z.string().trim().optional(),
  venue: z.string().trim().optional(),
  address: z.string().trim().optional(),
  program: z
    .array(z.object({ time: z.string().trim().min(1), title: z.string().trim().min(1) }))
    .optional(),
  photos: z.array(z.string()).optional(),
  music: z.string().optional(),
});

export const orderStepContactsSchema = z.object({
  clientName: z.string().trim().min(2, "Укажите ваше имя"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{9}$/, "Введите номер полностью — 9 цифр после +996"),
  lang: z.enum(["ky", "ru", "ky-ru"]),
  wishes: z.string().trim().optional(),
});

export const orderSchema = z.object({
  designSlug: z.string().optional(),
  designName: z.string().optional(),
  packageId: z.enum(["basic", "premium"], { message: "Выберите пакет" }),
  hosts: z.string().trim().optional(),
  ...orderStepEventSchema.shape,
  ...orderStepContactsSchema.shape,
});

export type OrderFormValues = z.infer<typeof orderSchema>;

export const guestSchema = z.object({
  name: z.string().trim().min(1, "Укажите имя гостя"),
  seats: z.number().int().min(1, "Минимум 1 место").max(10, "Максимум 10 мест"),
});

export type GuestFormValues = z.infer<typeof guestSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Укажите ваше имя"),
  contact: z.string().trim().min(4, "Укажите телефон или Telegram"),
  message: z.string().trim().min(4, "Напишите сообщение"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
