import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { waLink } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <Reveal>
        <div className="rounded-3xl bg-accent px-6 py-14 text-center sm:py-16">
          <h2 className="font-heading text-2xl sm:text-3xl text-white">
            Готовы удивить гостей вашего тоя?
          </h2>
          <p className="mt-3 text-white/80 max-w-md mx-auto">
            Оформим приглашение за 1–2 дня и пришлём готовую ссылку прямо в WhatsApp.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Button href="/catalog" variant="secondary" size="lg">
              Смотреть каталог
            </Button>
            <Button
              href={waLink("Здравствуйте! Хочу заказать приглашение на той.")}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              Заказать в WhatsApp
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
