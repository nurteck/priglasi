"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { categories } from "@/content/categories";
import type { CategoryId } from "@/types";

export function CategoryStories({ active }: { active: CategoryId | "all" }) {
  const items: { id: CategoryId | "all"; label: string; image: string }[] = [
    { id: "all", label: "Все", image: "/images/category-all.png" },
    ...categories,
  ];

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-0 sm:justify-center">
      {items.map((item) => {
        const isActive = active === item.id;
        const href = item.id === "all" ? "/catalog" : `/catalog?category=${item.id}`;
        return (
          <Link
            key={item.id}
            href={href}
            className="flex flex-col items-center gap-2 shrink-0 w-[76px]"
          >
            <span
              className={clsx(
                "relative h-16 w-16 rounded-full p-[2px]",
                isActive
                  ? "bg-gradient-to-tr from-accent to-gold"
                  : "bg-black/10"
              )}
            >
              <span className="block h-full w-full rounded-full overflow-hidden border-2 border-bg relative">
                <Image src={item.image} alt={item.label} fill sizes="64px" className="object-cover" />
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
