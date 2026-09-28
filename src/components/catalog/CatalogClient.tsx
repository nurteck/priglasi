"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { designs } from "@/content/designs";
import { siteConfig } from "@/site.config";
import { CategoryStories } from "./CategoryStories";
import { DesignCard } from "./DesignCard";
import type { CategoryId } from "@/types";

type SortId = "recommended" | "cheap" | "expensive" | "name";

const sortLabels: Record<SortId, string> = {
  recommended: "Рекомендуемые",
  cheap: "Сначала дешевле",
  expensive: "Сначала дороже",
  name: "По названию",
};

function priceOf(designSlug: (typeof designs)[number]) {
  return siteConfig.packages.find((p) => p.id === designSlug.defaultPackage)?.price ?? 0;
}

export function CatalogClient() {
  const searchParams = useSearchParams();
  const category = (searchParams.get("category") as CategoryId | null) ?? "all";
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("recommended");

  const filtered = useMemo(() => {
    let list = designs.filter((d) => category === "all" || d.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((d) => d.name.toLowerCase().includes(q));
    }
    const sorted = [...list];
    if (sort === "cheap") sorted.sort((a, b) => priceOf(a) - priceOf(b));
    else if (sort === "expensive") sorted.sort((a, b) => priceOf(b) - priceOf(a));
    else if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    else sorted.sort((a, b) => a.order - b.order);
    return sorted;
  }, [category, query, sort]);

  return (
    <div>
      <CategoryStories active={category as CategoryId | "all"} />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">{filtered.length} дизайнов</p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по названию"
              aria-label="Поиск по названию"
              className="w-full sm:w-56 rounded-full border border-black/10 bg-white pl-9 pr-4 py-2.5 text-sm min-h-11 focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
            aria-label="Сортировка"
            className="rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm min-h-11 focus-visible:outline-2 focus-visible:outline-accent"
          >
            {Object.entries(sortLabels).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted">Ничего не найдено. Попробуйте другой запрос.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((design) => (
            <DesignCard key={design.slug} design={design} />
          ))}
        </div>
      )}
    </div>
  );
}
