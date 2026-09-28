import { categories } from "@/content/categories";
import type { Lang } from "@/types";

export interface StepEventValues {
  eventType: string;
  namesFirst: string;
  namesSecond: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  hosts: string;
  lang: Lang;
  wishes: string;
}

const langOptions: { id: Lang; label: string }[] = [
  { id: "ky", label: "Кыргызский" },
  { id: "ru", label: "Русский" },
  { id: "ky-ru", label: "Оба (без доплаты)" },
];

export function StepEvent({
  values,
  errors,
  onChange,
}: {
  values: StepEventValues;
  errors: Partial<Record<keyof StepEventValues, string>>;
  onChange: <K extends keyof StepEventValues>(key: K, value: StepEventValues[K]) => void;
}) {
  const field = "block w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm min-h-11 focus-visible:outline-2 focus-visible:outline-accent";
  const label = "block text-sm font-medium text-text mb-1.5";
  const errorText = "mt-1 text-xs text-accent";

  return (
    <div className="space-y-5">
      <h2 className="font-heading text-lg text-text">О мероприятии</h2>

      <div>
        <label className={label} htmlFor="eventType">Тип тоя</label>
        <select
          id="eventType"
          className={field}
          value={values.eventType}
          onChange={(e) => onChange("eventType", e.target.value)}
        >
          <option value="">Выберите тип</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
        {errors.eventType && <p className={errorText}>{errors.eventType}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label} htmlFor="namesFirst">Имя (жениха/виновника)</label>
          <input id="namesFirst" className={field} value={values.namesFirst} onChange={(e) => onChange("namesFirst", e.target.value)} />
          {errors.namesFirst && <p className={errorText}>{errors.namesFirst}</p>}
        </div>
        <div>
          <label className={label} htmlFor="namesSecond">Имя (невесты), если есть</label>
          <input id="namesSecond" className={field} value={values.namesSecond} onChange={(e) => onChange("namesSecond", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label} htmlFor="date">Дата</label>
          <input id="date" type="date" className={field} value={values.date} onChange={(e) => onChange("date", e.target.value)} />
          {errors.date && <p className={errorText}>{errors.date}</p>}
        </div>
        <div>
          <label className={label} htmlFor="time">Время</label>
          <input id="time" type="time" className={field} value={values.time} onChange={(e) => onChange("time", e.target.value)} />
          {errors.time && <p className={errorText}>{errors.time}</p>}
        </div>
      </div>

      <div>
        <label className={label} htmlFor="venue">Заведение</label>
        <input id="venue" className={field} value={values.venue} onChange={(e) => onChange("venue", e.target.value)} placeholder="Например, той-зал «Ак-Сарай»" />
        {errors.venue && <p className={errorText}>{errors.venue}</p>}
      </div>

      <div>
        <label className={label} htmlFor="address">Адрес</label>
        <input id="address" className={field} value={values.address} onChange={(e) => onChange("address", e.target.value)} />
        {errors.address && <p className={errorText}>{errors.address}</p>}
      </div>

      <div>
        <label className={label} htmlFor="hosts">Хозяева тоя</label>
        <input id="hosts" className={field} value={values.hosts} onChange={(e) => onChange("hosts", e.target.value)} placeholder="Например, родители Асан и Гүлнара" />
        {errors.hosts && <p className={errorText}>{errors.hosts}</p>}
      </div>

      <div>
        <span className={label}>Язык приглашения</span>
        <div className="flex flex-wrap gap-2">
          {langOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange("lang", opt.id)}
              className={`min-h-11 px-4 rounded-full border text-sm transition-colors ${
                values.lang === opt.id ? "border-accent bg-accent-soft/50 text-accent" : "border-black/10 text-text"
              }`}
              aria-pressed={values.lang === opt.id}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={label} htmlFor="wishes">Пожелания</label>
        <textarea
          id="wishes"
          className={field}
          rows={3}
          value={values.wishes}
          onChange={(e) => onChange("wishes", e.target.value)}
          placeholder="Особые пожелания к дизайну или тексту"
        />
      </div>
    </div>
  );
}
