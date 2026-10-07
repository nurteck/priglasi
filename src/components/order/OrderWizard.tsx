"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, MessageCircle } from "lucide-react";
import { getInviteBySlug } from "@/lib/invites";
import { siteConfig } from "@/site.config";
import type { CategoryId, PackageId } from "@/types";
import { orderStepEventSchema, orderStepContactsSchema } from "@/lib/validation";
import { buildOrderWizardText, waLink } from "@/lib/whatsapp";
import { formatSom } from "@/lib/format";
import { StepDesign, type DesignChoice } from "./StepDesign";
import { StepEvent, type StepEventValues } from "./StepEvent";
import { StepContacts, type StepContactsValues, formatPhoneDigits } from "./StepContacts";
import { StepIndicator } from "./StepIndicator";
import { OrderSummary } from "./OrderSummary";
import { OrderHeader } from "./OrderHeader";
import { Ornament } from "@/components/ui/Ornament";

const DRAFT_KEY = "saltanat_order_draft";

interface Draft {
  step: number;
  designChoice: DesignChoice;
  packageId: PackageId | null;
  eventValues: StepEventValues;
  contactValues: StepContactsValues;
}

const defaultPackageId = (siteConfig.packages.find((p) => p.popular) ?? siteConfig.packages[0]).id;

const emptyEvent: StepEventValues = {
  eventType: "",
  namesFirst: "",
  namesSecond: "",
  date: "",
  time: "",
  venue: "",
  address: "",
  program: [],
  photos: [],
  music: "",
};

const emptyContacts: StepContactsValues = {
  clientName: "",
  phone: "",
  lang: "ky-ru",
  wishes: "",
};

export function OrderWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formTopRef = useRef<HTMLDivElement>(null);
  const restoredFromDraft = useRef(false);

  const initialDesignSlug = searchParams.get("design");
  const initialPackage = searchParams.get("package") as PackageId | null;
  const initialStep = Math.min(2, Math.max(0, Number(searchParams.get("step") ?? 0) || 0));

  const [step, setStep] = useState(initialStep);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [designChoice, setDesignChoice] = useState<DesignChoice>(initialDesignSlug);
  const [packageId, setPackageId] = useState<PackageId | null>(initialPackage ?? defaultPackageId);

  const [eventValues, setEventValues] = useState<StepEventValues>(() => {
    const design = initialDesignSlug ? getInviteBySlug(initialDesignSlug) : undefined;
    return design ? { ...emptyEvent, eventType: design.category } : emptyEvent;
  });
  const [eventErrors, setEventErrors] = useState<Partial<Record<keyof StepEventValues, string>>>({});

  const [contactValues, setContactValues] = useState<StepContactsValues>(emptyContacts);
  const [contactErrors, setContactErrors] = useState<Partial<Record<keyof StepContactsValues, string>>>({});

  const design = designChoice && designChoice !== "together" ? getInviteBySlug(designChoice) : undefined;
  const pkg = siteConfig.packages.find((p) => p.id === packageId);

  // Восстановление черновика из localStorage (после монтирования — чтобы не спорить с ?design=/?package= из URL).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw) as Draft;
      if (!initialDesignSlug && !initialPackage) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- одноразовое восстановление черновика из внешнего хранилища при монтировании
        if (draft.designChoice) setDesignChoice(draft.designChoice);
        if (draft.packageId) setPackageId(draft.packageId);
      }
      setEventValues((v) => ({ ...v, ...draft.eventValues }));
      setContactValues((v) => ({ ...v, ...draft.contactValues }));
    } catch {
      /* localStorage недоступен — просто начинаем с пустой формы */
    } finally {
      restoredFromDraft.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Сохраняем черновик при любом изменении.
  useEffect(() => {
    if (submitted) return;
    try {
      const draft: Draft = { step, designChoice, packageId, eventValues, contactValues };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* нет доступа к localStorage — молча пропускаем */
    }
  }, [step, designChoice, packageId, eventValues, contactValues, submitted]);

  // Шаг — в URL, чтобы работала кнопка «назад» браузера.
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (step === 0) params.delete("step");
    else params.set("step", String(step));
    router.replace(params.size ? `/order?${params.toString()}` : "/order", { scroll: false });
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function goToStep(index: number) {
    setStep(index);
  }

  function goNext() {
    if (step === 0) {
      setStep(1);
      return;
    }
    if (step === 1) {
      const result = orderStepEventSchema.safeParse(eventValues);
      if (!result.success) {
        const errs: Partial<Record<keyof StepEventValues, string>> = {};
        for (const issue of result.error.issues) errs[issue.path[0] as keyof StepEventValues] = issue.message;
        setEventErrors(errs);
        return;
      }
      setEventErrors({});
      setStep(2);
    }
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1);
    else history.back();
  }

  async function handleSubmit() {
    const result = orderStepContactsSchema.safeParse(contactValues);
    if (!result.success) {
      const errs: Partial<Record<keyof StepContactsValues, string>> = {};
      for (const issue of result.error.issues) errs[issue.path[0] as keyof StepContactsValues] = issue.message;
      setContactErrors(errs);
      return;
    }
    setContactErrors({});
    setSubmitting(true);

    const orderPayload = {
      designSlug: design?.slug,
      designName: design?.title,
      packageId: (packageId ?? defaultPackageId) as PackageId,
      eventType: eventValues.eventType as CategoryId,
      namesFirst: eventValues.namesFirst,
      namesSecond: eventValues.namesSecond || undefined,
      date: eventValues.date,
      time: eventValues.time,
      venue: eventValues.venue,
      address: eventValues.address,
      hosts: "",
      program: eventValues.program.length > 0 ? eventValues.program : undefined,
      photos: eventValues.photos.length > 0 ? eventValues.photos : undefined,
      music: eventValues.music || undefined,
      lang: contactValues.lang,
      wishes: contactValues.wishes || undefined,
      clientName: contactValues.clientName,
      phone: `+996 ${formatPhoneDigits(contactValues.phone)}`,
    };

    try {
      await fetch("/api/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
    } catch (e) {
      console.warn("[Салтанат] Не удалось сохранить заказ, но заявка всё равно уйдёт в WhatsApp:", e);
    }

    const designLabel = design ? design.title : designChoice === "together" ? "Подберём вместе" : undefined;
    const text = buildOrderWizardText({
      ...orderPayload,
      phone: formatPhoneDigits(contactValues.phone),
      designLabel,
      total: pkg?.price ?? 0,
    });
    window.open(waLink(text), "_blank", "noopener,noreferrer");

    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 2) goNext();
    else void handleSubmit();
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgba(216,178,122,.16)" }}
        >
          <Check size={28} style={{ color: "#5A1826" }} aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-2xl" style={{ fontFamily: "var(--font-cormorant), serif", color: "#2A0C12" }}>
          Спасибо! Мы напишем вам в течение часа
        </h1>
        <p className="mt-3 text-sm" style={{ color: "#6A4A48" }}>
          Заявка отправлена в WhatsApp — если окно не открылось само, напишите нам напрямую.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-14 items-center justify-center rounded-full px-8 text-sm font-medium"
          style={{ background: "#5A1826", color: "#F7F0E6" }}
        >
          На главную
        </Link>
      </div>
    );
  }

  const summaryLine = [pkg?.name, design?.title ?? (designChoice === "together" ? "Подберём вместе" : null)]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <OrderHeader onBack={goBack} />

      <div className="hidden md:block" style={{ background: "#F7F0E6" }}>
        <div className="relative mx-auto max-w-[1200px] overflow-hidden px-6 py-14 text-center">
          <div className="pointer-events-none absolute -left-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 opacity-20" aria-hidden="true">
            <Ornament spin={false} />
          </div>
          <div className="relative flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: "#D8B27A" }} aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-[.32em]" style={{ color: "#9A6B3A" }}>
              Заявка
            </span>
            <span className="h-px w-8" style={{ background: "#D8B27A" }} aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-[64px] leading-[1.05]" style={{ fontFamily: "var(--font-cormorant), serif", color: "#2A0C12" }}>
            Оформить <span className="italic" style={{ color: "#9A6B3A" }}>заказ</span>
          </h1>
          <p className="mt-2 text-base" style={{ color: "#6A4A48" }}>
            3 коротких шага — и заявка у нас в WhatsApp.
          </p>
        </div>
      </div>

      <div style={{ background: "#F7F0E6" }}>
        <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-6 sm:py-10 lg:grid lg:grid-cols-[740px_400px] lg:gap-[60px]">
          <div ref={formTopRef}>
            <StepIndicator step={step} onGoTo={goToStep} />

            <form onSubmit={handleFormSubmit}>
              {step === 0 && (
                <StepDesign
                  designSlug={designChoice}
                  packageId={packageId}
                  onSelectDesign={setDesignChoice}
                  onSelectPackage={setPackageId}
                />
              )}

              {step === 1 && (
                <StepEvent
                  values={eventValues}
                  errors={eventErrors}
                  onChange={(key, value) => setEventValues((v) => ({ ...v, [key]: value }))}
                />
              )}

              {step === 2 && (
                <StepContacts
                  values={contactValues}
                  errors={contactErrors}
                  onChange={(key, value) => setContactValues((v) => ({ ...v, [key]: value }))}
                />
              )}

              <div className="mt-8 hidden gap-3 sm:flex">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex h-14 items-center justify-center rounded-full border px-6 text-sm font-medium transition-colors hover:bg-black/5"
                    style={{ borderColor: "rgba(90,24,38,.3)", color: "#5A1826" }}
                  >
                    ← Назад
                  </button>
                )}
                {step < 2 ? (
                  <button
                    type="submit"
                    className="inline-flex h-14 flex-1 items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-[#7A2233] sm:flex-none sm:px-10"
                    style={{ background: "#5A1826", color: "#F7F0E6" }}
                  >
                    Далее →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full text-sm font-medium disabled:opacity-70 sm:flex-none sm:px-10"
                    style={{ background: "#1A7F45", color: "#FFFFFF" }}
                  >
                    <MessageCircle size={18} aria-hidden="true" />
                    {submitting ? "Отправляем…" : "Отправить заявку в WhatsApp"}
                  </button>
                )}
              </div>
            </form>
          </div>

          <aside className="mt-10 hidden lg:mt-0 lg:block">
            <div className="sticky" style={{ top: "100px" }}>
              <OrderSummary
                step={step}
                design={design}
                designChoice={designChoice}
                packageId={packageId}
                eventType={eventValues.eventType}
                date={eventValues.date}
                lang={contactValues.lang}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Мобильная нижняя панель */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 rounded-t-[22px] px-5 pt-4 sm:hidden"
        style={{ background: "#1E080D", paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
      >
        <div className="min-w-0">
          <p className="truncate text-xs" style={{ color: "rgba(246,239,230,.6)" }}>
            {summaryLine || "Оформление заказа"}
          </p>
          <p className="text-2xl font-bold" style={{ color: "#E6C48F" }}>{pkg ? formatSom(pkg.price) : "—"}</p>
        </div>
        {step < 2 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-[54px] shrink-0 items-center justify-center rounded-full px-6 text-sm font-medium"
            style={{ background: "#D8B27A", color: "#2A0C12" }}
          >
            Далее →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex h-[54px] shrink-0 items-center justify-center rounded-full px-6 text-sm font-medium disabled:opacity-70"
            style={{ background: "#1A7F45", color: "#fff" }}
          >
            {submitting ? "Отправляем…" : "Отправить"}
          </button>
        )}
      </div>
      <div className="h-28 sm:hidden" aria-hidden="true" />
    </>
  );
}
