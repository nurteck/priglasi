import Image from "next/image";
import type { Design } from "@/types";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { categoryLabels } from "@/content/categories";
import { siteConfig } from "@/site.config";
import { waLink, buildCatalogOrderText } from "@/lib/whatsapp";

export function DesignCard({ design }: { design: Design }) {
  const pkg = siteConfig.packages.find((p) => p.id === design.defaultPackage)!;
  const demoUrl = `${siteConfig.url}/demo/${design.slug}`;
  const orderText = buildCatalogOrderText({
    designName: design.name,
    demoUrl,
    packageName: pkg.name,
    price: pkg.price,
  });

  return (
    <div className="flex flex-col rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
      <div className="relative">
        <PhoneFrame>
          <Image
            src={design.cover}
            alt={`Обложка приглашения «${design.name}»`}
            fill
            sizes="220px"
            loading="lazy"
            className="object-cover"
          />
        </PhoneFrame>
        {design.badges && design.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {design.badges.map((b) => (
              <Badge key={b} tone={b === "hit" ? "accent" : "gold"}>
                {b === "hit" ? "Хит" : "Новинка"}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 text-center">
        <h3 className="font-heading text-base text-text leading-tight">{design.name}</h3>
        <p className="text-xs text-muted mt-0.5">{categoryLabels[design.category]}</p>

        <div className="mt-1.5 flex items-baseline justify-center gap-2">
          {pkg.oldPrice && (
            <span className="text-xs text-muted line-through">{pkg.oldPrice} сом</span>
          )}
          <span className="font-heading text-base text-accent">{pkg.price} сом</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button href={`/demo/${design.slug}`} variant="secondary" size="md" className="!px-2 text-xs">
          Смотреть
        </Button>
        <Button href={waLink(orderText)} target="_blank" rel="noopener noreferrer" size="md" className="!px-2 text-xs">
          Заказать
        </Button>
      </div>
    </div>
  );
}
