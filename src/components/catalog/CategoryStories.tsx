"use client";

import Link from "next/link";
import clsx from "clsx";
import { LayoutGrid, Heart, Flower2, Shield, Baby, PartyPopper, type LucideIcon } from "lucide-react";
import { categories } from "@/content/categories";
import type { CategoryId } from "@/types";

// Пока нет реальных фото категорий — используем иконки на фирменном градиенте,
// чтобы кружки читались осмысленно. Замените на фото гостей/декора, когда будут готовы:
// достаточно добавить <Image> внутрь span вместо иконки, путь останется в content/categories.ts.
const categoryIcons: Record<CategoryId | "all", LucideIcon> = {
  all: LayoutGrid,
  wedding: Heart,
  "kyz-uzatuu": Flower2,
  sunnot: Shield,
  tushoo: Baby,
  jubilee: PartyPopper,
};

export function CategoryStories({ active }: { active: CategoryId | "all" }) {
  const items: { id: CategoryId | "all"; label: string }[] = [
    { id: "all", label: "Все" },
    ...categories,
  ];

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-0 sm:justify-center">
      {items.map((item) => {
        const isActive = active === item.id;
        const href = item.id === "all" ? "/catalog" : `/catalog?category=${item.id}`;
        const Icon = categoryIcons[item.id];
        return (
          <Link
            key={item.id}
            href={href}
            className="flex flex-col items-center gap-2 shrink-0 w-[76px]"
          >
            <span
              className={clsx(
                "relative h-16 w-16 rounded-full p-[2px] transition-transform",
                isActive ? "bg-gradient-to-tr from-accent to-gold scale-105" : "bg-black/10"
              )}
            >
              <span
                className="flex h-full w-full items-center justify-center rounded-full border-2 border-bg"
                style={{ background: "linear-gradient(135deg, var(--color-accent-soft), #fff)" }}
              >
                <Icon
                  size={24}
                  className={isActive ? "text-accent" : "text-muted"}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
            </span>
            <span className={clsx("text-xs text-center", isActive ? "text-accent font-medium" : "text-muted")}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
