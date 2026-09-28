export interface StepContactsValues {
  clientName: string;
  phone: string;
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
  const field = "block w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm min-h-11 focus-visible:outline-2 focus-visible:outline-accent";
  const label = "block text-sm font-medium text-text mb-1.5";
  const errorText = "mt-1 text-xs text-accent";

  return (
    <div className="space-y-5">
      <h2 className="font-heading text-lg text-text">Ваши контакты</h2>

      <div>
        <label className={label} htmlFor="clientName">Ваше имя</label>
        <input
          id="clientName"
          className={field}
          value={values.clientName}
          onChange={(e) => onChange("clientName", e.target.value)}
        />
        {errors.clientName && <p className={errorText}>{errors.clientName}</p>}
      </div>

      <div>
        <label className={label} htmlFor="phone">Телефон / WhatsApp</label>
        <input
          id="phone"
          type="tel"
          className={field}
          value={values.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+996 700 00 00 00"
        />
        {errors.phone && <p className={errorText}>{errors.phone}</p>}
      </div>

      <p className="text-xs text-muted">
        После отправки мы сразу откроем WhatsApp с готовой заявкой — останется только нажать «Отправить».
      </p>
    </div>
  );
}
