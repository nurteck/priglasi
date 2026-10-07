"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getCatalogInvites } from "@/lib/invites";
import { categories } from "@/content/categories";
import { DesignCard } from "./DesignCard";
import { CategoryTabs, type CategoryTabItem } from "./CategoryTabs";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { waLink } from "@/lib/whatsapp";
import type { CategoryId } from "@/types";

const designs = getCatalogInvites();

export function CatalogClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState<CategoryId | "all">(
    (searchParams.get("cat") as CategoryId | null) ?? "all"
  );

  const tabs = useMemo<CategoryTabItem[]>(() => {
    const items: CategoryTabItem[] = [{ id: "all", label: "Все", count: designs.length }];
    for (const cat of categories) {
      const count = designs.filter((d) => d.category === cat.id).length;
      if (count > 0) items.push({ id: cat.id, label: cat.label, count });
    }
    return items;
  }, []);

  const visible = useMemo(() => {
    const list = active === "all" ? designs : designs.filter((d) => d.category === active);
    return [...list].sort((a, b) => a.order - b.order);
  }, [active]);

  function handleChange(id: CategoryId | "all") {
    setActive(id);
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") params.delete("cat");
    else params.set("cat", id);
    router.replace(params.size ? `/catalog?${params.toString()}` : "/catalog", { scroll: false });
  }

  return (
    <section className="relative overflow-hidden py-12 sm:py-16" style={{ background: "#F7F0E6" }}>
      <div className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] opacity-50 sm:right-8">
        <Ornament />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ background: "#D8B27A" }} aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[.32em]" style={{ color: "#9A6B3A" }}>
                Каталог
              </span>
            </div>
            <h2
              className="mt-4 text-[42px] leading-[1.05] sm:text-[68px]"
              style={{ fontFamily: "var(--font-cormorant), serif", color: "#2A0C12" }}
            >
              Все <span className="italic" style={{ color: "#9A6B3A" }}>дизайны</span>
            </h2>
            <p className="mt-3 max-w-md text-base font-light sm:text-lg" style={{ color: "#6A4A48" }}>
              Выберите категорию тоя и стиль, который откликается именно вам.
            </p>
            <Link
              href="/host/demo"
              className="mt-4 inline-flex h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors hover:bg-black/5"
              style={{ borderColor: "rgba(90,24,38,.25)", color: "#5A1826" }}
            >
              Как это работает для хозяев →
            </Link>
          </div>

          <div className="sm:pb-2">
            <CategoryTabs items={tabs} active={active} onChange={handleChange} />
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-5 text-center">
            <p style={{ color: "#6A4A48" }}>Скоро здесь появятся новые дизайны.</p>
            <a
              href={waLink("Здравствуйте! Хочу узнать про новые дизайны приглашений.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-6 text-sm font-medium text-white"
            >
              Написать в WhatsApp
            </a>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((design, i) => (
              <Reveal key={design.slug} delay={(i % 8) * 120}>
                <DesignCard design={design} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
