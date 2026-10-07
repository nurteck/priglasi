import type { Lang } from "@/types";
import { fieldClass, fieldBorder, fieldBorderError, labelClass, labelStyle, errorClass, errorStyle } from "./fieldStyles";

export interface StepContactsValues {
  clientName: string;
  phone: string; // ровно 9 цифр, без +996
  lang: Lang;
  wishes: string;
}

const langOptions: { id: Lang; label: string }[] = [
  { id: "ky-ru", label: "Кыргызча + Русский" },
  { id: "ky", label: "Кыргызча" },
  { id: "ru", label: "Русский" },
];

export function formatPhoneDigits(digits: string) {
  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 9)].filter(Boolean);
  return parts.join(" ");
}

export function StepContacts({
  values,
  errors,
  onChange,
}: {
  values: StepContactsValues;
  errors: Partial<Record<keyof StepContactsValues, string>>;
  onChange: <K extends keyof StepContactsValues>(key: K, value: StepContactsValues[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <h2
        className="text-[30px] sm:text-[34px]"
        style={{ fontFamily: "var(--font-cormorant), serif", color: "#2A0C12" }}
      >
        Контакты
      </h2>

      <div>
        <label className={labelClass} style={labelStyle} htmlFor="clientName">Ваше имя</label>
        <input
          id="clientName"
          autoComplete="name"
          className={fieldClass}
          style={errors.clientName ? fieldBorderError : fieldBorder}
          value={values.clientName}
          onChange={(e) => onChange("clientName", e.target.value)}
          aria-invalid={Boolean(errors.clientName)}
        />
        {errors.clientName && <p className={errorClass} style={errorStyle}>{errors.clientName}</p>}
      </div>

      <div>
        <label className={labelClass} style={labelStyle} htmlFor="phone">WhatsApp</label>
        <div
          className="flex items-center rounded-[14px] border bg-[#FFFCF7] pl-4 h-[54px] sm:h-14 focus-within:border-[#C79A5B] focus-within:ring-4 focus-within:ring-[rgba(216,178,122,.22)]"
          style={errors.phone ? fieldBorderError : fieldBorder}
        >
          <span className="font-bold" style={{ color: "#5A1826" }}>+996</span>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="h-full flex-1 bg-transparent px-3 text-base text-[#2A0C12] outline-none placeholder:text-[#9A8580]"
            value={formatPhoneDigits(values.phone)}
            onChange={(e) => onChange("phone", e.target.value.replace(/\D/g, "").slice(0, 9))}
            placeholder="700 123 456"
            aria-invalid={Boolean(errors.phone)}
          />
        </div>
        {errors.phone && <p className={errorClass} style={errorStyle}>{errors.phone}</p>}
      </div>

      <fieldset>
        <legend className={labelClass} style={labelStyle}>Язык приглашения</legend>
        <div role="radiogroup" aria-label="Язык приглашения" className="flex flex-wrap gap-2">
          {langOptions.map((opt) => {
            const selected = values.lang === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange("lang", opt.id)}
                className="flex h-11 items-center rounded-[22px] px-4 text-sm font-medium transition-colors"
                style={
                  selected
                    ? { background: "#5A1826", color: "#F7F0E6" }
                    : { border: "1px solid rgba(90,24,38,.25)", color: "#5A1826" }
                }
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label className={labelClass} style={labelStyle} htmlFor="wishes">Пожелания — необязательно</label>
        <textarea
          id="wishes"
          rows={3}
          className={`${fieldClass} h-auto py-3`}
          style={fieldBorder}
          value={values.wishes}
          onChange={(e) => onChange("wishes", e.target.value)}
          placeholder="Цвета, музыка, текст приглашения, фото…"
        />
      </div>

      <p className="text-xs" style={{ color: "#6A4A48" }}>
        После отправки мы сразу откроем WhatsApp с готовой заявкой — останется только нажать «Отправить».
      </p>
    </div>
  );
}
