import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { waLink } from "@/lib/whatsapp";
import { siteConfig } from "@/site.config";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[600px] sm:min-h-[680px] flex items-center">
      {/* Фон: многослойный градиент + мягкое золотое сияние вместо плоской заливки */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 15%, #5C1D29 0%, #3B0F17 45%, #1A0A0D 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 85% 85%, rgba(184,135,58,0.35) 0%, transparent 70%)",
        }}
      />
      {/* Тонкая текстура точек для глубины */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      {/* Тонкая золотая рамка "приглашения" по периметру */}
      <div
        className="absolute inset-4 sm:inset-8 rounded-[1.5rem] border pointer-events-none"
        style={{ borderColor: "rgba(212,175,106,0.35)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10 py-20 sm:py-28 w-full">
        <div className="max-w-xl mx-auto text-center sm:mx-0 sm:text-left">
          <Reveal>
            <span
              className="inline-flex h-14 w-14 items-center justify-center rounded-full border text-xl"
              style={{ borderColor: "#D4AF6A", color: "#D4AF6A", fontFamily: "var(--font-heading), serif" }}
              aria-hidden="true"
            >
              {siteConfig.monogram}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-heading text-4xl sm:text-6xl text-white leading-[1.08] tracking-tight">
              Сайт-приглашение
              <br />
              на ваш той
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-5 h-px w-16 mx-auto sm:mx-0" style={{ background: "#D4AF6A" }} aria-hidden="true" />
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 text-base sm:text-lg text-white/80">
              Готово за 1–2 дня. На кыргызском и русском языках.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
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
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-10 flex flex-wrap justify-center sm:justify-start gap-2">
              {[
                `${siteConfig.stats.invitations} ${siteConfig.stats.invitationsLabel}`,
                `${siteConfig.stats.designs} ${siteConfig.stats.designsLabel}`,
                `${siteConfig.stats.speed}`,
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border px-3.5 py-1.5 text-xs text-white/85 backdrop-blur-sm"
                  style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)" }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
