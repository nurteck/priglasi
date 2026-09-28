import type { Theme } from "@/types";

/**
 * 6 тем приглашений. Тема = цвета, шрифты, фон/текстура, декор,
 * цвет печати и музыка. Данные конкретной пары (Invitation) хранятся
 * отдельно в src/content/invitations/*.
 *
 * Чтобы добавить новую тему — скопируйте один объект, поменяйте id
 * и подключите его в designs.ts у нужных дизайнов.
 */
export const themes: Theme[] = [
  {
    id: "ivory-seal",
    name: "Ivory Seal",
    colors: {
      bg: "#FBF7EE",
      surface: "#FFFFFF",
      text: "#2A2320",
      muted: "#8A7F73",
      accent: "#B8873A",
      accentSoft: "#F1E6CC",
      seal: "#B8873A",
    },
    fonts: { script: "Marck Script", heading: "Playfair Display", body: "Manrope" },
    background: { image: "/images/theme-ivory-seal-bg.png", texture: "paper" },
    decor: "seal",
    sealColor: "#B8873A",
    music: "/music/theme-ivory-seal.mp3",
  },
  {
    id: "burgundy-gold",
    name: "Burgundy Gold",
    colors: {
      bg: "#3B0F17",
      surface: "#4A1620",
      text: "#F7ECD9",
      muted: "#D8B98F",
      accent: "#D4AF6A",
      accentSoft: "#5C1D29",
      seal: "#D4AF6A",
    },
    fonts: { script: "Marck Script", heading: "Playfair Display", body: "Manrope" },
    background: { image: "/images/theme-burgundy-gold-bg.png", texture: "linen" },
    decor: "ornament",
    sealColor: "#D4AF6A",
    music: "/music/theme-burgundy-gold.mp3",
  },
  {
    id: "olive-garden",
    name: "Olive Garden",
    colors: {
      bg: "#F3F2E8",
      surface: "#FFFFFF",
      text: "#28301F",
      muted: "#6F7A5C",
      accent: "#5B6B3C",
      accentSoft: "#E3E6D0",
      seal: "#5B6B3C",
    },
    fonts: { script: "Marck Script", heading: "Playfair Display", body: "Manrope" },
    background: { image: "/images/theme-olive-garden-bg.png", texture: "paper" },
    decor: "botanical",
    sealColor: "#5B6B3C",
    music: "/music/theme-olive-garden.mp3",
  },
  {
    id: "ala-too",
    name: "Ala-Too",
    colors: {
      bg: "#FAF3E7",
      surface: "#FFFFFF",
      text: "#2A1B1E",
      muted: "#8A6A5A",
      accent: "#A5222E",
      accentSoft: "#F1D9AF",
      seal: "#C79A3B",
    },
    fonts: { script: "Marck Script", heading: "Playfair Display", body: "Manrope" },
    background: { image: "/images/theme-ala-too-bg.png", texture: "linen" },
    decor: "ornament",
    sealColor: "#C79A3B",
    music: "/music/theme-ala-too.mp3",
  },
  {
    id: "noir-photo",
    name: "Noir Photo",
    colors: {
      bg: "#111112",
      surface: "#1B1B1D",
      text: "#F2F1EE",
      muted: "#A6A29B",
      accent: "#C9A24B",
      accentSoft: "#2A2A2C",
      seal: "#C9A24B",
    },
    fonts: { script: "Marck Script", heading: "Playfair Display", body: "Manrope" },
    background: { image: "/images/theme-noir-photo-bg.png", texture: "none" },
    decor: "photo",
    sealColor: "#C9A24B",
    music: "/music/theme-noir-photo.mp3",
  },
  {
    id: "pastel-bloom",
    name: "Pastel Bloom",
    colors: {
      bg: "#FDF3F3",
      surface: "#FFFFFF",
      text: "#3A2A2E",
      muted: "#9A7F84",
      accent: "#D98A96",
      accentSoft: "#F7E1E3",
      seal: "#D98A96",
    },
    fonts: { script: "Marck Script", heading: "Playfair Display", body: "Manrope" },
    background: { image: "/images/theme-pastel-bloom-bg.png", texture: "paper" },
    decor: "floral",
    sealColor: "#D98A96",
    music: "/music/theme-pastel-bloom.mp3",
  },
];

export function getTheme(id: string): Theme {
  const theme = themes.find((t) => t.id === id);
  if (!theme) throw new Error(`Тема "${id}" не найдена`);
  return theme;
}
