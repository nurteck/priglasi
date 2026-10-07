"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCatalogInvites } from "@/lib/invites";
import { categories } from "@/content/categories";
import { DesignCard } from "@/components/catalog/DesignCard";
import { CategoryTabs, type CategoryTabItem } from "@/components/catalog/CategoryTabs";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { waLink } from "@/lib/whatsapp";
import type { CategoryId } from "@/types";

const invites = getCatalogInvites();

export function PopularDesigns() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState<CategoryId | "all">(
    (searchParams.get("cat") as CategoryId | null) ?? "all"
  );

  const tabs = useMemo<CategoryTabItem[]>(() => {
    const items: CategoryTabItem[] = [{ id: "all", label: "Все", count: invites.length }];
    for (const cat of categories) {
      const count = invites.filter((d) => d.category === cat.id).length;
      if (count > 0) items.push({ id: cat.id, label: cat.label, count });
    }
    return items;
  }, []);

  const visible = useMemo(
    () => (active === "all" ? invites : invites.filter((d) => d.category === active)).slice(0, 8),
    [active]
  );

  function handleChange(id: CategoryId | "all") {
    setActive(id);
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") params.delete("cat");
    else params.set("cat", id);
    router.replace(params.size ? `/?${params.toString()}` : "/", { scroll: false });
  }

  if (invites.length === 0) return null;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24" style={{ background: "#F7F0E6" }}>
      <div className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] opacity-50 sm:right-8">
        <Ornament />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ background: "#D8B27A" }} aria-hidden="true" />
              <span
                className="text-xs font-medium uppercase tracking-[.32em]"
                style={{ color: "#9A6B3A" }}
              >
                Каталог
              </span>
            </div>
            <h2
              className="mt-4 text-[42px] leading-[1.05] sm:text-[68px]"
              style={{ fontFamily: "var(--font-cormorant), serif", color: "#2A0C12" }}
            >
              Популярные <span className="italic" style={{ color: "#9A6B3A" }}>дизайны</span>
            </h2>
            <p className="mt-3 max-w-md text-base font-light sm:text-lg" style={{ color: "#6A4A48" }}>
              Выберите стиль — мы адаптируем его под ваш той: имена, дата, место и язык.
            </p>
          </div>

          <div className="sm:pb-2">
            <CategoryTabs items={tabs} active={active} onChange={handleChange} />
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="mt-14 flex flex-col items-center gap-4 text-center">
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
              <Reveal key={design.slug} delay={i * 120}>
                <DesignCard design={design} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-14 flex items-center gap-6">
          <span className="hidden h-px flex-1 sm:block" style={{ background: "rgba(216,178,122,.4)" }} aria-hidden="true" />
          <a
            href="/catalog"
            className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border px-8 text-sm font-medium transition-colors hover:bg-[#2A0C12] hover:text-[#F7F0E6] sm:w-auto"
            style={{ borderColor: "#2A0C12", color: "#2A0C12" }}
          >
            <span className="sm:hidden">Все {invites.length} дизайнов</span>
            <span className="hidden sm:inline">Смотреть все {invites.length} дизайнов</span>
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
          <span className="hidden h-px flex-1 sm:block" style={{ background: "rgba(216,178,122,.4)" }} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
