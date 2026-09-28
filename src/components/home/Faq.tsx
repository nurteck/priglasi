import { faqs } from "@/content/faq";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4">
        <Reveal>
          <SectionTitle eyebrow="Вопросы" title="Частые вопросы" />
        </Reveal>
        <Reveal>
          <div className="mt-10">
            <Accordion items={faqs} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
