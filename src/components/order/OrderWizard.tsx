"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { getDesignBySlug } from "@/content/designs";
import { siteConfig } from "@/site.config";
import type { Lang, PackageId } from "@/types";
import { orderStepEventSchema, orderStepContactsSchema } from "@/lib/validation";
import { buildOrderWizardText, waLink } from "@/lib/whatsapp";
import { StepDesign } from "./StepDesign";
import { StepEvent, type StepEventValues } from "./StepEvent";
import { StepContacts, type StepContactsValues } from "./StepContacts";
import { OrderSummary } from "./OrderSummary";
import { Button } from "@/components/ui/Button";

const stepTitles = ["Дизайн и пакет", "О мероприятии", "Контакты"];

export function OrderWizard() {
  const searchParams = useSearchParams();
  const initialDesign = searchParams.get("design");
  const initialPackage = searchParams.get("package") as PackageId | null;

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [designSlug, setDesignSlug] = useState<string | null>(initialDesign);
  const [packageId, setPackageId] = useState<PackageId | null>(
    initialPackage ?? (initialDesign ? getDesignBySlug(initialDesign)?.defaultPackage ?? null : null)
  );

  const [eventValues, setEventValues] = useState<StepEventValues>({
    eventType: "",
    namesFirst: "",
    namesSecond: "",
    date: "",
    time: "",
    venue: "",
    address: "",
    hosts: "",
    lang: "ky-ru" as Lang,
    wishes: "",
  });
  const [eventErrors, setEventErrors] = useState<Partial<Record<keyof StepEventValues, string>>>({});

  const [contactValues, setContactValues] = useState<StepContactsValues>({ clientName: "", phone: "" });
  const [contactErrors, setContactErrors] = useState<Partial<Record<keyof StepContactsValues, string>>>({});

  const [designError, setDesignError] = useState<string | null>(null);

  const design = designSlug ? getDesignBySlug(designSlug) : undefined;
  const pkg = useMemo(() => siteConfig.packages.find((p) => p.id === packageId), [packageId]);

  function goNext() {
    if (step === 0) {
      if (!packageId) {
        setDesignError("Выберите пакет, чтобы продолжить");
        return;
      }
      setDesignError(null);
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
      return;
    }
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
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
      designName: design?.name,
      packageId: packageId as PackageId,
      ...eventValues,
      eventType: eventValues.eventType as StepEventValues["eventType"],
      namesSecond: eventValues.namesSecond || undefined,
      wishes: eventValues.wishes || undefined,
      clientName: contactValues.clientName,
      phone: contactValues.phone,
    };

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
    } catch (e) {
      console.warn("[Салтанат] Не удалось сохранить заказ, но заявка всё равно уйдёт в WhatsApp:", e);
    }

    const text = buildOrderWizardText({
      ...orderPayload,
      eventType: orderPayload.eventType as never,
      total: pkg?.price ?? 0,
    });
    window.open(waLink(text), "_blank", "noopener,noreferrer");

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md text-center py-16">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
          <Check size={28} className="text-accent" aria-hidden="true" />
        </div>
        <h1 className="mt-6 font-heading text-2xl text-text">Спасибо! Мы напишем вам в течение часа</h1>
        <p className="mt-3 text-muted text-sm">
          Заявка отправлена в WhatsApp — если окно не открылось само, напишите нам напрямую.
        </p>
        <Button href="/" size="lg" className="mt-8">На главную</Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        {/* Прогресс */}
        <div className="flex items-center gap-2 mb-8" aria-label={`Шаг ${step + 1} из 3`}>
          {stepTitles.map((title, i) => (
            <div key={title} className="flex items-center gap-2 flex-1">
              <div
                className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-xs font-medium ${
                  i <= step ? "bg-accent text-white" : "bg-black/10 text-muted"
                }`}
              >
                {i + 1}
              </div>
              <span className={`hidden sm:inline text-xs ${i === step ? "text-text font-medium" : "text-muted"}`}>
                {title}
              </span>
              {i < stepTitles.length - 1 && <div className="flex-1 h-px bg-black/10" />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <StepDesign
            designSlug={designSlug}
            packageId={packageId}
            onSelectDesign={setDesignSlug}
            onSelectPackage={(id) => {
              setPackageId(id);
              setDesignError(null);
            }}
          />
        )}
        {designError && step === 0 && <p className="mt-3 text-xs text-accent">{designError}</p>}

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

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <Button variant="secondary" size="lg" onClick={goBack} type="button">
              Назад
            </Button>
          )}
          {step < 2 ? (
            <Button size="lg" onClick={goNext} type="button" className="flex-1 sm:flex-none">
              Далее
            </Button>
          ) : (
            <Button size="lg" onClick={handleSubmit} type="button" disabled={submitting} className="flex-1 sm:flex-none">
              {submitting ? "Отправляем…" : "Отправить заявку"}
            </Button>
          )}
        </div>
      </div>

      {/* Сводка заказа: десктоп — сайдбар, мобильный — липко снизу */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <OrderSummary design={design} packageId={packageId ?? undefined} lang={eventValues.lang} />
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-black/10 bg-white p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <p className="text-xs text-muted">Итого</p>
            <p className="font-heading text-lg text-accent">{pkg ? `${pkg.price} сом` : "—"}</p>
          </div>
          {step < 2 ? (
            <Button size="md" onClick={goNext} type="button">Далее</Button>
          ) : (
            <Button size="md" onClick={handleSubmit} type="button" disabled={submitting}>
              {submitting ? "Отправляем…" : "Отправить"}
            </Button>
          )}
        </div>
      </div>
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </div>
  );
}
