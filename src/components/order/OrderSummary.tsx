import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/site.config";
import { categoryLabels } from "@/content/categories";
import { formatSom } from "@/lib/format";
import type { CategoryId, InviteRecord, Lang, PackageId } from "@/types";
import type { DesignChoice } from "./StepDesign";

const langLabel: Record<Lang, string> = { ky: "Кыргызча", ru: "Русский", "ky-ru": "Кыргызча + Русский" };

export function OrderSummary({
  step,
  design,
  designChoice,
  packageId,
  eventType,
  date,
  lang,
}: {
  step: number;
  design: InviteRecord | undefined;
  designChoice: DesignChoice;
  packageId: PackageId | null;
  eventType: CategoryId | "";
  date: string;
  lang: Lang;
}) {
  const pkg = siteConfig.packages.find((p) => p.id === packageId);

  return (
    <div
      className="rounded-[28px] p-6"
      style={{
        background: "#1E080D",
        boxShadow: "inset 0 0 0 1px rgba(216,178,122,.22)",
        color: "#F6EFE6",
      }}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-[30px]" style={{ fontFamily: "var(--font-cormorant), serif" }}>
          Ваш заказ
        </h3>
        <span className="text-xs font-medium" style={{ color: "#D8B27A" }}>
          Шаг {step + 1} / 3
        </span>
      </div>

      {design ? (
        <div className="mt-5 flex items-center gap-3">
          <div className="relative h-[76px] w-[60px] shrink-0 overflow-hidden rounded-lg">
            <Image src={design.cover} alt={design.title} fill sizes="60px" className="object-cover object-top" />
          </div>
          <div>
            <p className="text-sm font-medium">{design.title}</p>
            <p className="text-xs" style={{ color: "rgba(246,239,230,.62)" }}>
              {categoryLabels[design.category]} · дизайн выбран
            </p>
          </div>
        </div>
      ) : designChoice === "together" ? (
        <div className="mt-5">
          <p className="text-sm font-medium">Подберём вместе</p>
          <p className="text-xs" style={{ color: "rgba(246,239,230,.62)" }}>Предложим варианты в WhatsApp</p>
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-sm font-medium">Дизайн не выбран</p>
          <p className="text-xs" style={{ color: "rgba(246,239,230,.62)" }}>Можно выбрать позже</p>
        </div>
      )}

      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt style={{ color: "rgba(246,239,230,.62)" }}>Пакет</dt>
          <dd className="font-medium">{pkg ? pkg.name : "—"}</dd>
        </div>
        {eventType && (
          <div className="flex justify-between">
            <dt style={{ color: "rgba(246,239,230,.62)" }}>Той</dt>
            <dd className="font-medium">{categoryLabels[eventType]}</dd>
          </div>
        )}
        {date && (
          <div className="flex justify-between">
            <dt style={{ color: "rgba(246,239,230,.62)" }}>Дата</dt>
            <dd className="font-medium">{date}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt style={{ color: "rgba(246,239,230,.62)" }}>Язык</dt>
          <dd className="font-medium">{langLabel[lang]}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-baseline justify-between border-t pt-5" style={{ borderColor: "rgba(216,178,122,.22)" }}>
        <span className="text-sm" style={{ color: "rgba(246,239,230,.62)" }}>Итого</span>
        <span className="text-[34px] font-bold" style={{ color: "#E6C48F" }}>{pkg ? formatSom(pkg.price) : "—"}</span>
      </div>

      <div
        className="mt-5 flex items-start gap-2.5 rounded-2xl p-3.5 text-xs"
        style={{ background: "rgba(216,178,122,.08)", color: "rgba(246,239,230,.78)" }}
      >
        <MessageCircle size={16} className="mt-0.5 shrink-0" style={{ color: "#D8B27A" }} aria-hidden="true" />
        <span>Заявка откроется в WhatsApp с уже заполненным текстом — останется нажать «Отправить».</span>
      </div>
    </div>
  );
}
