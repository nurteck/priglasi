import { Check } from "lucide-react";
import clsx from "clsx";
import { siteConfig } from "@/site.config";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

export function Packages() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <Reveal>
        <SectionTitle eyebrow="Тарифы" title="Пакеты" subtitle="Выберите то, что нужно именно вашему тою." />
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {siteConfig.packages.map((pkg, i) => (
          <Reveal key={pkg.id} delay={i * 80}>
            <div
              className={clsx(
                "relative flex h-full flex-col rounded-2xl border p-6",
                pkg.popular ? "border-accent bg-white shadow-lg sm:scale-105" : "border-black/10 bg-white"
              )}
            >
              {pkg.popular && (
                <Badge tone="accent" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Популярный
                </Badge>
              )}
              <h3 className="font-heading text-xl text-text text-center">{pkg.name}</h3>
              <div className="mt-3 text-center">
                {"oldPrice" in pkg && pkg.oldPrice && (
                  <span className="mr-2 text-sm text-muted line-through">{pkg.oldPrice} сом</span>
                )}
                <span className="font-heading text-3xl text-accent">{pkg.price} сом</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                href={`/order?package=${pkg.id}`}
                variant={pkg.popular ? "primary" : "secondary"}
                size="lg"
                className="mt-6 w-full"
              >
                Выбрать
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
