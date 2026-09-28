import type { Category } from "@/types";

export const categories: Category[] = [
  { id: "wedding", label: "Свадьба", image: "/images/category-wedding.png" },
  { id: "kyz-uzatuu", label: "Кыз узатуу", image: "/images/category-kyz-uzatuu.png" },
  { id: "sunnot", label: "Сүннөт той", image: "/images/category-sunnot.png" },
  { id: "tushoo", label: "Тушоо той", image: "/images/category-tushoo.png" },
  { id: "jubilee", label: "Юбилей", image: "/images/category-jubilee.png" },
];

export const categoryLabels: Record<Category["id"], string> = categories.reduce(
  (acc, c) => ({ ...acc, [c.id]: c.label }),
  {} as Record<Category["id"], string>
);
