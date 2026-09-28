import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative min-h-[560px] sm:min-h-[620px] flex items-end sm:items-center">
      <Image
        src="/images/hero-main.png"
        alt="Праздничное оформление тоя"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24 w-full">
        <div className="max-w-lg">
          <h1 className="font-heading text-3xl sm:text-5xl text-white leading-tight">
            Сайт-приглашение на ваш той
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/85">
            Готово за 1–2 дня. На кыргызском и русском языках.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href="/catalog" size="lg">
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
      </div>
    </section>
  );
}
