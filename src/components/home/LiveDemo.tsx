"use client";

import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { designs } from "@/content/designs";

const featuredDesign = designs.find((d) => d.slug === "ivory-classic") ?? designs[0];

export function LiveDemo() {
  return (
    <section className="bg-accent-soft/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <SectionTitle
            eyebrow="Попробуйте сами"
            title="Живое демо"
            subtitle="Откройте приглашение прямо здесь и пролистайте его — так его увидят ваши гости."
          />
        </Reveal>

        <div className="mt-10 flex flex-col items-center gap-6">
          <Reveal>
            <PhoneFrame className="max-w-[280px]">
              <iframe
                src={`/demo/${featuredDesign.slug}`}
                title="Демо приглашения"
                className="h-full w-full border-0"
                loading="lazy"
              />
            </PhoneFrame>
          </Reveal>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button href={`/demo/${featuredDesign.slug}`} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
              Открыть на весь экран
            </Button>
            <Button href={`/order?design=${featuredDesign.slug}`} size="lg">
              Хочу такое же
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
