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

export interface PackageFeature {
  text: string;
}

export interface Package {
  id: PackageId;
  name: string;
  price: number;
  oldPrice?: number;
  popular?: boolean;
  features: string[];
}

/** Строка, которая может быть локализована на кыргызский и русский. */
export type Localized = string | { ky: string; ru: string };

export interface ThemeColors {
  bg: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  accentSoft: string;
  seal: string;
}

export interface ThemeFonts {
  script: string; // каллиграфический шрифт для имён
  heading: string;
  body: string;
}

export interface ThemeBackground {
  image?: string;
  texture?: "paper" | "linen" | "none";
  overlay?: string;
}

export type ThemeDecor = "seal" | "floral" | "botanical" | "ornament" | "photo";

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  background: ThemeBackground;
  decor: ThemeDecor;
  sealColor: string;
  music: string;
}

export interface Design {
  slug: string;
  name: string;
  category: CategoryId;
  themeId: string;
  cover: string;
  defaultPackage: PackageId;
  badges?: ("hit" | "new")[];
  featured?: boolean;
  order: number;
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

export interface ProgramItem {
  time: string;
  title: Localized;
}

export interface VenueInfo {
  name: string;
  address: string;
  gis2Url?: string;
  googleUrl?: string;
}

export interface InvitationBlocks {
  envelope?: boolean;
  intro?: { text: Localized };
  hosts?: { names: string[]; text?: Localized };
  calendar?: boolean;
  countdown?: boolean;
  program?: ProgramItem[];
  venue?: VenueInfo;
  gallery?: string[];
  dressCode?: { text: Localized; colors?: string[] };
  rsvp?: { deadline?: string };
  finale?: boolean;
}

export interface Invitation {
  slug: string;
  themeId: string;
  lang: Lang;
  guestsKey?: string; // секретный ключ для премиум-списка гостей
  names: { first: string; second?: string };
  eventType: CategoryId;
  date: string; // ISO со временем и часовым поясом
  coverPhoto: string;
  music?: string;
  blocks: InvitationBlocks;
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
  clientName: string;
  phone: string;
}

export interface Order extends OrderInput {
  id: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface RsvpInput {
  invitationSlug: string;
  name: string;
  attending: boolean;
  guests: number;
  wish?: string;
  honeypot?: string;
}

export interface Rsvp {
  id: string;
  invitationSlug: string;
  name: string;
  attending: boolean;
  guests: number;
  wish?: string;
  createdAt: string;
}
