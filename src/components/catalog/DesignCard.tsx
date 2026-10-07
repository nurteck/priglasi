import Image from "next/image";
import { Eye } from "lucide-react";
import type { InviteRecord } from "@/types";
import { categoryLabels } from "@/content/categories";
import { siteConfig } from "@/site.config";
import { waLink, buildDesignOrderText } from "@/lib/whatsapp";
import { formatSom } from "@/lib/format";

const demoHref = (slug: string) => `/invites/${slug}/?g=${encodeURIComponent("Урматтуу коноктор")}&n=2`;

export function DesignCard({ design }: { design: InviteRecord }) {
  const savings = design.oldPrice ? design.oldPrice - design.price : 0;
  const demoUrl = `${siteConfig.url}/invites/${design.slug}/`;
  const orderText = buildDesignOrderText(design.title, demoUrl);

  return (
    <article
      className="group flex h-full flex-col rounded-[24px] bg-[#FFFCF7] p-3 shadow-[0_0_0_1px_rgba(199,154,91,.22)] transition-[transform,box-shadow] duration-300 [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-[0_30px_60px_-30px_rgba(90,24,38,.35),0_0_0_1px_rgba(199,154,91,.45)] active:scale-[.98] [@media(hover:hover)]:active:scale-100"
    >
      <a
        href={demoHref(design.slug)}
        aria-label={`Смотреть демо: ${design.title}`}
        className="group/preview relative block h-[204px] overflow-hidden rounded-[15px] sm:h-[340px] sm:rounded-[18px]"
      >
        <Image
          src={design.cover}
          alt={`Первый экран приглашения «${design.title}»`}
          fill
          sizes="(min-width: 1200px) 276px, (min-width: 768px) 32vw, 46vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGN0YwRTYiLz48L3N2Zz4="
          className="object-cover object-top transition-transform duration-[800ms] [@media(hover:hover)]:group-hover/preview:scale-[1.04]"
        />

        {design.badges && design.badges.length > 0 && (
          <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
            {design.badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[.12em]"
                style={
                  b === "hit"
                    ? { background: "#5A1826", color: "#F7F0E6" }
                    : { background: "#D8B27A", color: "#2A0C12" }
                }
              >
                {b === "hit" ? "Хит" : "Новинка"}
              </span>
            ))}
          </div>
        )}

        {/* Десктоп: затемнение + подсказка «Открыть демо» на ховере */}
        <div className="pointer-events-none absolute inset-0 hidden items-end justify-center bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover/preview:opacity-100 sm:flex">
          <span className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#F7F0E6]">
            <Eye size={16} aria-hidden="true" /> Открыть демо
          </span>
        </div>

        {/* Мобильный: постоянная подсказка-кружок с иконкой глаза */}
        <span
          className="absolute bottom-2 right-2 flex h-[30px] w-[30px] items-center justify-center rounded-full sm:hidden"
          style={{ background: "rgba(42,12,18,.55)" }}
          aria-hidden="true"
        >
          <Eye size={14} color="#F7F0E6" />
        </span>
      </a>

      <p className="mt-3 text-[11px] font-medium uppercase tracking-[.2em]" style={{ color: "#9A6B3A" }}>
        {categoryLabels[design.category]}
      </p>

      <h3
        className="mt-1 min-h-[2.4em] text-xl leading-tight sm:min-h-0 sm:text-[27px]"
        style={{ fontFamily: "var(--font-cormorant), serif", color: "#2A0C12" }}
      >
        {design.title}
      </h3>

      <div className="mt-1.5 flex items-center gap-2">
        <span className="text-[19px] font-bold" style={{ color: "#5A1826" }}>
          {formatSom(design.price)}
        </span>
        {design.oldPrice && (
          <span className="text-sm line-through" style={{ color: "#8A7470" }}>
            {new Intl.NumberFormat("ru-RU").format(design.oldPrice)}
          </span>
        )}
        {savings > 0 && (
          <span
            className="hidden rounded-[6px] px-1.5 py-0.5 text-xs font-medium sm:inline-block"
            style={{ background: "#F3E5CF", color: "#7A4E1E" }}
          >
            −{savings}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-1 items-end gap-2">
        <a
          href={waLink(orderText)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#5A1826] text-sm font-medium text-[#F7F0E6] transition-colors hover:bg-[#7A2233] sm:h-12"
        >
          Заказать
        </a>
        <a
          href={demoHref(design.slug)}
          aria-label={`Смотреть демо: ${design.title}`}
          className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border text-[#5A1826] transition-colors hover:bg-[#5A1826]/5 sm:flex"
          style={{ borderColor: "rgba(90,24,38,.28)" }}
        >
          <Eye size={18} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
