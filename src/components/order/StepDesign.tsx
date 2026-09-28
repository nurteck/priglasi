import Image from "next/image";
import clsx from "clsx";
import { designs } from "@/content/designs";
import { siteConfig } from "@/site.config";
import type { PackageId } from "@/types";

export function StepDesign({
  designSlug,
  packageId,
  onSelectDesign,
  onSelectPackage,
}: {
  designSlug: string | null;
  packageId: PackageId | null;
  onSelectDesign: (slug: string | null) => void;
  onSelectPackage: (id: PackageId) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-lg text-text">Выберите дизайн</h2>
        <p className="text-sm text-muted mt-1">Можно пропустить — подберём подходящий вместе с вами.</p>

        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {designs.map((d) => (
            <button
              key={d.slug}
              type="button"
              onClick={() => onSelectDesign(designSlug === d.slug ? null : d.slug)}
              className={clsx(
                "relative aspect-[3/4] overflow-hidden rounded-xl border-2 transition-colors",
                designSlug === d.slug ? "border-accent" : "border-transparent"
              )}
              aria-pressed={designSlug === d.slug}
              aria-label={`Выбрать дизайн ${d.name}`}
            >
              <Image src={d.cover} alt={d.name} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-heading text-lg text-text">Пакет</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {siteConfig.packages.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => onSelectPackage(pkg.id)}
              className={clsx(
                "rounded-xl border-2 p-4 text-left transition-colors min-h-11",
                packageId === pkg.id ? "border-accent bg-accent-soft/40" : "border-black/10 bg-white"
              )}
              aria-pressed={packageId === pkg.id}
            >
              <p className="font-medium text-text text-sm">{pkg.name}</p>
              <p className="text-accent font-heading text-lg mt-1">{pkg.price} сом</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
