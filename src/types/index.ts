// Центральные типы проекта "Салтанат"

export type Lang = "ky" | "ru" | "ky-ru";

export type CategoryId =
  | "wedding"
  | "kyz-uzatuu"
  | "sunnot"
  | "tushoo"
  | "jubilee";

export type PackageId = "basic" | "photo" | "premium";

export interface Category {
  id: CategoryId;
  label: string;
  image: string;
}

export interface Package {
  id: PackageId;
  name: string;
  price: number;
  oldPrice?: number;
  popular?: boolean;
  features: string[];
}

/** Профиль пользователя админки (создаётся вручную в Supabase после регистрации в Auth). */
export interface Profile {
  id: string;
  email: string;
  name: string;
  role: "admin";
  createdAt: string;
}

export type InviteKind = "catalog" | "client";

/** Содержимое meta.json внутри public/invites/[slug]/ (без hostKey) — карточка каталога/админки. */
export interface InviteMeta {
  title: string;
  category: CategoryId;
  type: InviteKind;
  price: number;
  oldPrice?: number;
  badges?: ("hit" | "new")[];
  order: number;
  author: string;
  published: boolean;
}

/** Публичная запись каталога — generated.json, без hostKey (безопасно для клиента).
 *  eventDate берётся из data.json (единственный источник даты тоя — не дублируется в meta.json). */
export interface InviteRecord extends InviteMeta {
  slug: string;
  cover: string; // путь вида /invites/[slug]/cover.jpg
  eventDate: string;
}

/** Серверная запись — generated.server.json, с hostKey. Не импортировать в клиентские компоненты! */
export interface InviteRecordWithKey extends InviteRecord {
  hostKey: string;
}

export interface InviteProgramItem {
  time: string;
  title: string;
}

/** Содержимое data.json внутри public/invites/[slug]/ — ВСЕ тексты приглашения,
 *  index.html их не хранит (см. public/shared/invite-data.js). */
export interface InviteData {
  couple: { one: string; two?: string };
  eventType: CategoryId;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  venue: { name: string; address: string; map2gis?: string; mapGoogle?: string };
  hosts?: string;
  inviteText?: string;
  program?: InviteProgramItem[];
  language: Lang;
  photos?: string[];
  music?: string;
}

export interface Review {
  id: string;
  name: string;
  event: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar?: string;
  date: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export type OrderStatus = "new" | "in_progress" | "done" | "paid";

export interface OrderInput {
  designSlug?: string;
  designName?: string;
  packageId: PackageId;
  eventType: CategoryId;
  namesFirst: string;
  namesSecond?: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  hosts: string;
  lang: Lang;
  wishes?: string;
  program?: InviteProgramItem[];
  photos?: string[];
  music?: string;
  clientName: string;
  phone: string;
}

export interface Order extends OrderInput {
  id: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

/** Персональная ссылка на приглашение, которую хозяин тоя создаёт на /host/[slug]. */
export interface GuestInput {
  slug: string;
  name: string;
  seats: number;
}

export interface Guest extends GuestInput {
  id: string;
  createdAt: string;
}
