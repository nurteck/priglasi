"use client";

import clsx from "clsx";
import type { CategoryId } from "@/types";

export interface CategoryTabItem {
  id: CategoryId | "all";
  label: string;
  count: number;
}

/** Табы фильтра категорий: «Все / Свадьба / ...» с количеством дизайнов. */
export function CategoryTabs({
  items,
  active,
  onChange,
}: {
  items: CategoryTabItem[];
  active: CategoryId | "all";
  onChange: (id: CategoryId | "all") => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Фильтр по категории"
      className="flex gap-2 overflow-x-auto no-scrollbar [scroll-snap-type:x_mandatory] sm:flex-wrap sm:overflow-visible"
    >
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={clsx(
              "shrink-0 [scroll-snap-align:start] rounded-[22px] px-4 h-11 text-sm font-medium transition-colors whitespace-nowrap",
              isActive
                ? "bg-[#5A1826] text-[#F7F0E6]"
                : "border border-[rgba(90,24,38,.25)] text-[#5A1826] hover:border-[#5A1826]"
            )}
          >
            {item.label}{" "}
            <span className="opacity-60">({item.count})</span>
          </button>
        );
      })}
    </div>
  );
}
