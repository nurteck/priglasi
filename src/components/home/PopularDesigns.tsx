import { designs } from "@/content/designs";
import { DesignCard } from "@/components/catalog/DesignCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function PopularDesigns() {
  const popular = [...designs]
    .filter((d) => d.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 8);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <Reveal>
        <SectionTitle
          eyebrow="Каталог"
          title="Популярные дизайны"
          subtitle="Готовые приглашения — выберите похожий стиль или закажите похожее под ваш той."
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {popular.map((design, i) => (
          <Reveal key={design.slug} delay={i * 60}>
            <DesignCard design={design} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button href="/catalog" variant="secondary" size="lg">
          Весь каталог
        </Button>
      </div>
    </section>
  );
}
