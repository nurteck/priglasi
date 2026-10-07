"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { siteConfig } from "@/site.config";
import { Ornament } from "@/components/ui/Ornament";

const INTRO_KEY = "saltanat_hero_intro_seen";

type Phase = "idle" | "splash" | "reveal";

function Anim({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`hero-anim ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

function HeroSplash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="hero-splash fixed inset-0 z-[100] flex items-center justify-center bg-[#1E080D]"
      aria-hidden="true"
    >
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="68" stroke="rgba(216,178,122,.2)" strokeWidth="1" />
        <circle
          className="hero-splash-circle"
          cx="70"
          cy="70"
          r="35"
          stroke="#D8B27A"
          strokeWidth="1.5"
          transform="rotate(-90 70 70)"
        />
        <text
          x="70"
          y="82"
          textAnchor="middle"
          className="hero-splash-letter"
          style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 40, fill: "#D8B27A" }}
        >
          {siteConfig.monogram}
        </text>
      </svg>
    </div>
  );
}

function PhoneMockup() {
  const timer = [
    { value: "04", label: "дни" },
    { value: "12", label: "часы" },
    { value: "36", label: "мин" },
  ];

  return (
    <div className="hero-float relative z-10 h-[520px] w-[260px] sm:h-[610px] sm:w-[300px] rounded-[48px] border border-[rgba(216,178,122,.4)] bg-[#2A0C12] p-3 shadow-[0_40px_80px_rgba(0,0,0,.45)]">
      <div className="flex h-full w-full flex-col items-center overflow-hidden rounded-[36px] bg-gradient-to-b from-[#4A1420] via-[#2A0C12] to-[#1E080D] px-6 pb-8 text-center">
        {/* Имитация статус-бара экрана — чтобы читалось как скриншот, а не карточка */}
        <div className="flex w-full items-center justify-between pt-3 text-[10px] text-[rgba(246,239,230,.5)]" aria-hidden="true">
          <span>9:41</span>
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[rgba(246,239,230,.5)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[rgba(246,239,230,.5)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[rgba(246,239,230,.5)]" />
          </span>
        </div>

        <div className="mt-6 flex h-28 w-28 items-center justify-center rounded-t-full border border-[rgba(216,178,122,.5)] bg-[radial-gradient(circle_at_50%_30%,rgba(216,178,122,.22),transparent_70%)]">
          <span className="text-2xl" style={{ fontFamily: "var(--font-cormorant), serif", color: "#D8B27A" }} aria-hidden="true">
            &amp;
          </span>
        </div>
        <p
          className="mt-6 text-2xl italic text-[#E6C48F]"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          Айбек &amp; Айзада
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-[.28em] text-[rgba(246,239,230,.6)]">
          14 июня 2026
        </p>
        <div className="mt-6 flex gap-2">
          {timer.map((t) => (
            <div key={t.label} className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(216,178,122,.3)] text-sm text-[#F6EFE6]">
                {t.value}
              </div>
              <span className="mt-1 text-[9px] uppercase tracking-[.2em] text-[rgba(246,239,230,.5)]">
                {t.label}
              </span>
            </div>
          ))}
        </div>
        <span className="mt-6 inline-flex h-9 items-center rounded-full bg-[#D8B27A] px-5 text-xs font-medium text-[#2A0C12]">
          Подтвердить визит
        </span>
        <div className="mt-auto flex items-center gap-1 rounded-full border border-[rgba(246,239,230,.25)] p-1 text-[10px] text-[rgba(246,239,230,.7)]">
          <span className="rounded-full bg-[#D8B27A] px-3 py-1 text-[#2A0C12]">KG</span>
          <span className="px-3 py-1">RU</span>
        </div>
      </div>
    </div>
  );
}

const sparkPositions = [
  { top: "10%", left: "20%", delay: 0 },
  { top: "70%", left: "8%", delay: 900 },
  { top: "30%", left: "85%", delay: 1600 },
  { top: "85%", left: "70%", delay: 400 },
  { top: "50%", left: "92%", delay: 2200 },
  { top: "15%", left: "55%", delay: 1200 },
];

export function Hero() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [offscreen, setOffscreen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Синхронизируем с sessionStorage (внешнее хранилище) до первой отрисовки в браузере,
  // чтобы заставка не "мигала" поверх уже показанного контента.
  useLayoutEffect(() => {
    try {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const seen = sessionStorage.getItem(INTRO_KEY);
      if (!reduced && !seen) {
        sessionStorage.setItem(INTRO_KEY, "1");
        // eslint-disable-next-line react-hooks/set-state-in-effect -- одноразовая синхронизация с sessionStorage до первой отрисовки, не производное состояние
        setPhase("splash");
      }
    } catch {
      /* sessionStorage недоступен — просто без заставки */
    }
  }, []);

  // Ставим бесконечные декоративные анимации (орнамент, парение, искры) на паузу,
  // когда hero прокручен за пределы экрана — экономит CPU/батарею на длинной странице.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const contentVisible = phase !== "splash";

  return (
    <section
      ref={sectionRef}
      className={`relative -mt-16 flex min-h-[100svh] items-center overflow-hidden bg-[#1E080D] md:-mt-[76px] ${offscreen ? "hero-offscreen" : ""}`}
    >
      {phase === "splash" && <HeroSplash onDone={() => setPhase("reveal")} />}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 700px at 18% 20%, #551826, transparent 70%), radial-gradient(700px 600px at 78% 58%, rgba(216,178,122,.14), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Тонкая золотая рамка по периметру экрана — поверх абсолютно всего (шапка z-40, WhatsApp-кнопка z-40) */}
      <div
        className="pointer-events-none absolute inset-1 z-[200] rounded-2xl border sm:inset-2 md:rounded-[28px]"
        style={{ borderColor: "rgba(216,178,122,.18)" }}
        aria-hidden="true"
      />

      {contentVisible && (
        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-16 px-6 py-28 sm:px-10 md:grid-cols-2 md:px-[120px] md:py-24">
          <div className="mx-auto max-w-[520px] text-center md:mx-0 md:max-w-[520px] md:text-left">
            <Anim delay={0} className="flex items-center justify-center gap-3 md:justify-start">
              <span className="h-px w-8 bg-[#D8B27A]" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[.32em] text-[#D8B27A]">
                Онлайн-приглашения на той
              </span>
            </Anim>

            <h1
              className="mt-6 text-[9.5vw] italic leading-[1.05] font-medium text-[#F6EFE6] sm:text-[64px] sm:leading-[1] md:text-[96px]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              <span className="hero-line-mask">
                <span className="hero-anim hero-line-inner block" style={{ "--d": "250ms" } as CSSProperties}>
                  Сайт-приглашение
                </span>
              </span>
              <span className="hero-line-mask">
                <span className="hero-anim hero-line-inner block" style={{ "--d": "400ms" } as CSSProperties}>
                  <span
                    className="hero-shimmer-text bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #C79A5B, #F3DDAE, #C79A5B)",
                    }}
                  >
                    на ваш той
                  </span>
                </span>
              </span>
            </h1>

            <Anim delay={650} className="mt-6 flex justify-center md:justify-start">
              <div className="hero-divider h-px w-[88px] bg-[#D8B27A]" style={{ "--d": "650ms" } as CSSProperties} />
            </Anim>

            <Anim delay={750}>
              <p className="mx-auto mt-6 max-w-[460px] text-base font-light text-[rgba(246,239,230,.78)] sm:text-xl md:mx-0">
                Готово за 1–2 дня. На кыргызском и русском языках — одна красивая ссылка
                для всех гостей.
              </p>
            </Anim>

            <Anim delay={850}>
              <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center md:justify-start">
                <a
                  href={waLink("Здравствуйте! Хочу заказать приглашение на той.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#D8B27A] px-8 text-base font-medium text-[#2A0C12] transition-all hover:-translate-y-0.5 hover:bg-[#E9CB98] hover:shadow-[0_14px_30px_rgba(216,178,122,.35)] sm:h-[60px]"
                >
                  <MessageCircle size={20} aria-hidden="true" />
                  Заказать в WhatsApp
                </a>
                <Link
                  href="/catalog"
                  className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full border border-[rgba(246,239,230,.3)] px-8 text-base text-[#F6EFE6] transition-colors hover:bg-white/10 sm:h-[60px]"
                >
                  Смотреть каталог →
                </Link>
              </div>
            </Anim>

            <Anim delay={950}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:justify-start md:gap-8">
                {[
                  [siteConfig.stats.invitations, siteConfig.stats.invitationsLabel],
                  [siteConfig.stats.designs, siteConfig.stats.designsLabel],
                  [siteConfig.stats.speed, "срок готовности"],
                ].map(([value, label], i) => (
                  <div key={label} className="flex items-center gap-6 md:gap-8">
                    {i > 0 && <span className="hidden h-8 w-px bg-[rgba(216,178,122,.25)] sm:block" aria-hidden="true" />}
                    <div>
                      <div
                        className="text-[28px] leading-none text-[#E6C48F] md:text-[40px]"
                        style={{ fontFamily: "var(--font-cormorant), serif" }}
                      >
                        {value}
                      </div>
                      <div className="mt-1 text-[13px] text-[rgba(246,239,230,.62)]">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Anim>
          </div>

          <div className="relative mx-auto flex aspect-square w-full max-w-[440px] items-center justify-center md:aspect-auto md:h-[640px] md:max-w-none">
            <div className="hero-anim absolute inset-0 md:h-[640px] md:w-[640px]" style={{ "--d": "500ms" } as CSSProperties}>
              <Ornament />
            </div>

            <div
              className="hero-anim hero-float-card absolute h-[240px] w-[180px] rotate-[8deg] rounded-[14px] border p-5 sm:h-[300px] sm:w-[220px] md:h-[360px] md:w-[260px]"
              style={{
                "--d": "700ms",
                background: "#F4EADB",
                borderColor: "rgba(216,178,122,.5)",
              } as CSSProperties}
            >
              <p className="text-sm italic text-[#5C1D29]" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Урматтуу коноктор!
              </p>
              <p className="mt-3 text-[11px] leading-relaxed text-[#5C1D29]/80">
                Сиздерди тоюбузга чакырабыз. Күтүп калабыз.
              </p>
            </div>

            <Anim delay={900} className="relative">
              <PhoneMockup />
            </Anim>

            <Anim
              delay={1100}
              className="absolute bottom-10 -right-2 sm:right-0 md:bottom-16 md:-right-6"
            >
              <div className="flex items-center gap-2 rounded-full border border-[rgba(216,178,122,.3)] bg-white/5 px-4 py-2 text-xs text-[#F6EFE6] backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D8B27A]" aria-hidden="true" />
                Кыргызча · Русский
              </div>
            </Anim>

            {sparkPositions.map((s, i) => (
              <span
                key={i}
                className="hero-spark absolute h-[3px] w-[3px] rounded-full bg-[#E6C48F]"
                style={{ top: s.top, left: s.left, "--d": `${s.delay}ms` } as CSSProperties}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-6 z-10 hidden items-center gap-3 text-[11px] uppercase tracking-[.28em] text-[rgba(246,239,230,.55)] sm:flex md:left-[120px]">
        <span>Листайте вниз</span>
        <span className="relative h-10 w-px overflow-hidden bg-[rgba(246,239,230,.2)]">
          <span className="hero-scroll-dot absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#D8B27A]" />
        </span>
      </div>
    </section>
  );
}
