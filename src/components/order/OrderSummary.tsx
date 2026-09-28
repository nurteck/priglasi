import Image from "next/image";
import { siteConfig } from "@/site.config";
import type { Design, Lang, PackageId } from "@/types";

const langLabel: Record<Lang, string> = { ky: "Кыргызский", ru: "Русский", "ky-ru": "Кыргызский и русский" };

export function OrderSummary({
  design,
  packageId,
  lang,
}: {
  design: Design | undefined;
  packageId: PackageId | undefined;
  lang: Lang;
}) {
  const pkg = siteConfig.packages.find((p) => p.id === packageId);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5">
      <h3 className="font-heading text-lg text-text">Ваш заказ</h3>

      {design ? (
        <div className="mt-4 flex items-center gap-3">
          <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-black/5">
            <Image src={design.cover} alt={design.name} fill sizes="48px" className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium text-text">{design.name}</p>
            <p className="text-xs text-muted">Дизайн выбран</p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">Дизайн не выбран — можно оформить заказ и без него.</p>
      )}

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Пакет</dt>
          <dd className="text-text font-medium">{pkg ? pkg.name : "—"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Язык</dt>
          <dd className="text-text font-medium">{langLabel[lang]}</dd>
        </div>
      </dl>

      <div className="mt-4 pt-4 border-t border-black/10 flex justify-between items-baseline">
        <span className="text-sm text-muted">Итого</span>
        <span className="font-heading text-2xl text-accent">{pkg ? `${pkg.price} сом` : "—"}</span>
      </div>
    </div>
  );
}
