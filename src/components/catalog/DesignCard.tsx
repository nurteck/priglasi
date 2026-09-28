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
    <div className="flex flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      <div className="relative">
        <PhoneFrame>
          <Image
            src={design.cover}
            alt={`Обложка приглашения «${design.name}»`}
            fill
            sizes="260px"
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

      <div className="mt-4 text-center">
        <h3 className="font-heading text-lg text-text">{design.name}</h3>
        <p className="text-xs text-muted mt-0.5">{categoryLabels[design.category]}</p>

        <div className="mt-2 flex items-baseline justify-center gap-2">
          {pkg.oldPrice && (
            <span className="text-sm text-muted line-through">{pkg.oldPrice} сом</span>
          )}
          <span className="font-heading text-lg text-accent">{pkg.price} сом</span>
        </div>
        <p className="text-xs text-muted">пакет «{pkg.name}»</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button href={`/demo/${design.slug}`} variant="secondary" size="md">
          Посмотреть
        </Button>
        <Button href={waLink(orderText)} target="_blank" rel="noopener noreferrer" size="md">
          Заказать
        </Button>
      </div>
    </div>
  );
}
