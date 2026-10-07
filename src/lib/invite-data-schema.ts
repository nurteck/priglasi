import { z } from "zod";

/**
 * Схема data.json внутри public/invites/[slug]/ — единственное место с
 * текстами приглашения (имена, дата, место и т.д.). index.html их не хранит,
 * только читает через public/shared/invite-data.js. Используется и в
 * scripts/build-invites.ts (валидация при сканировании), и в
 * scripts/new-invite.ts (генерация data.json из заказа).
 */
export const inviteDataSchema = z.object({
  couple: z.object({
    one: z.string().trim().min(1, "couple.one не может быть пустым"),
    two: z.string().trim().optional(),
  }),
  eventType: z.enum(["wedding", "kyz-uzatuu", "sunnot", "tushoo", "jubilee"]),
  date: z.string().trim().min(1, "date обязателен (YYYY-MM-DD)"),
  time: z.string().trim().min(1, "time обязателен (HH:mm)"),
  venue: z.object({
    name: z.string().trim().min(1, "venue.name не может быть пустым"),
    address: z.string().trim().min(1, "venue.address не может быть пустым"),
    map2gis: z.string().trim().optional(),
    mapGoogle: z.string().trim().optional(),
  }),
  hosts: z.string().trim().optional(),
  inviteText: z.string().trim().optional(),
  program: z
    .array(z.object({ time: z.string().trim().min(1), title: z.string().trim().min(1) }))
    .optional(),
  language: z.enum(["ky", "ru", "ky-ru"]),
  photos: z.array(z.string()).optional(),
  music: z.string().optional(),
});

export type InviteDataParsed = z.infer<typeof inviteDataSchema>;
