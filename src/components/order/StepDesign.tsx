"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { getCatalogInvites } from "@/lib/invites";
import { categoryLabels } from "@/content/categories";
import { siteConfig } from "@/site.config";
import { formatSom } from "@/lib/format";
import type { PackageId } from "@/types";

export type DesignChoice = string | "together" | null;

export function StepDesign({
  designSlug,
  packageId,
  onSelectDesign,
  onSelectPackage,
}: {
  designSlug: DesignChoice;
  packageId: PackageId | null;
  onSelectDesign: (choice: DesignChoice) => void;
  onSelectPackage: (id: PackageId) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const designs = getCatalogInvites();
  const visibleDesigns = showAll ? designs : designs.slice(0, 8);

  return (
    <div className="space-y-10">
      <fieldset>
        <legend
          className="text-[30px] sm:text-[34px]"
          style={{ fontFamily: "var(--font-cormorant), serif", color: "#2A0C12" }}
        >
          Выберите дизайн
        </legend>
        <p className="mt-1 text-sm" style={{ color: "#6A4A48" }}>
          Можно пропустить — подберём подходящий вместе с вами.
        </p>

        <div role="radiogroup" aria-label="Дизайн приглашения" className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {visibleDesigns.map((d) => {
            const selected = designSlug === d.slug;
            return (
              <button
                key={d.slug}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onSelectDesign(selected ? null : d.slug)}
                className="rounded-[14px] p-1.5 text-left transition-shadow"
                style={
                  selected
                    ? { boxShadow: "0 0 0 2px #C79A5B, 0 12px 24px -12px rgba(90,24,38,.35)" }
                    : { boxShadow: "0 0 0 1px rgba(90,24,38,.1)" }
                }
              >
                <div className="relative h-32 overflow-hidden rounded-xl sm:h-[168px]">
                  <Image
                    src={d.cover}
                    alt={d.title}
                    fill
                    sizes="(min-width: 640px) 160px, 45vw"
                    className="object-cover object-top"
                  />
                  {selected && (
                    <span
                      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full"
                      style={{ background: "#5A1826" }}
                    >
                      <Check size={14} color="#F7F0E6" aria-hidden="true" />
                    </span>
                  )}
                </div>
                <p
                  className="mt-2 truncate text-[19px] leading-tight"
                  style={{ fontFamily: "var(--font-cormorant), serif", color: "#2A0C12" }}
                >
                  {d.title}
                </p>
                <p className="text-[11px] font-medium uppercase tracking-[.15em]" style={{ color: "#9A6B3A" }}>
                  {categoryLabels[d.category]}
                </p>
              </button>
            );
          })}
        </div>

        {!showAll && designs.length > 8 && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-4 text-sm font-medium underline"
            style={{ color: "#5A1826" }}
          >
            Показать все {designs.length}
          </button>
        )}

        <button
          type="button"
          role="radio"
          aria-checked={designSlug === "together"}
          onClick={() => onSelectDesign(designSlug === "together" ? null : "together")}
          className="mt-4 flex w-full flex-col items-start rounded-[14px] border border-dashed p-4 text-left transition-colors"
          style={{
            borderColor: designSlug === "together" ? "#C79A5B" : "rgba(90,24,38,.25)",
            background: designSlug === "together" ? "rgba(216,178,122,.08)" : "transparent",
          }}
        >
          <span className="text-sm font-semibold" style={{ color: "#2A0C12" }}>
            Ещё не выбрали? Подберём вместе
          </span>
          <span className="mt-0.5 text-xs" style={{ color: "#6A4A48" }}>
            Покажем варианты в WhatsApp под ваш стиль и цвета тоя
          </span>
        </button>
      </fieldset>

      <fieldset>
        <legend
          className="text-[30px] sm:text-[34px]"
          style={{ fontFamily: "var(--font-cormorant), serif", color: "#2A0C12" }}
        >
          Пакет
        </legend>

        <div role="radiogroup" aria-label="Пакет услуг" className="mt-5 grid gap-3 sm:grid-cols-3">
          {siteConfig.packages.map((pkg) => {
            const selected = packageId === pkg.id;
            return (
              <button
                key={pkg.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onSelectPackage(pkg.id)}
                className="relative rounded-[16px] p-5 text-left transition-shadow"
                style={{
                  background: "#FFFCF7",
                  boxShadow: selected ? "0 0 0 2px #5A1826" : "0 0 0 1px rgba(199,154,91,.22)",
                }}
              >
                {pkg.popular && (
                  <span
                    className="absolute -top-3 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[.1em]"
                    style={{ background: "#D8B27A", color: "#2A0C12" }}
                  >
                    Популярный
                  </span>
                )}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#2A0C12" }}>{pkg.name}</p>
                    <p className="mt-1 text-2xl font-bold" style={{ color: "#5A1826" }}>
                      {formatSom(pkg.price)}
                    </p>
                  </div>
                  <span
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
                    style={{ borderColor: selected ? "#5A1826" : "rgba(90,24,38,.3)" }}
                  >
                    {selected && <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#5A1826" }} />}
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-xs" style={{ color: "#6A4A48" }}>
                  {pkg.features.slice(0, 3).map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
