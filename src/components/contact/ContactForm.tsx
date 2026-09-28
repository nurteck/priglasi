"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/validation";
import { buildContactText, waLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", contact: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const errs: typeof errors = {};
      for (const issue of result.error.issues) errs[issue.path[0] as keyof typeof values] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    const text = buildContactText(result.data);
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  }

  const field = "block w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm min-h-11 focus-visible:outline-2 focus-visible:outline-accent";
  const label = "block text-sm font-medium text-text mb-1.5";
  const errorText = "mt-1 text-xs text-accent";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={label} htmlFor="c-name">Ваше имя</label>
        <input
          id="c-name"
          className={field}
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        />
        {errors.name && <p className={errorText}>{errors.name}</p>}
      </div>
      <div>
        <label className={label} htmlFor="c-contact">Телефон или Telegram</label>
        <input
          id="c-contact"
          className={field}
          value={values.contact}
          onChange={(e) => setValues((v) => ({ ...v, contact: e.target.value }))}
          placeholder="+996 700 00 00 00 или @username"
        />
        {errors.contact && <p className={errorText}>{errors.contact}</p>}
      </div>
      <div>
        <label className={label} htmlFor="c-message">Сообщение</label>
        <textarea
          id="c-message"
          rows={4}
          className={field}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
        />
        {errors.message && <p className={errorText}>{errors.message}</p>}
      </div>
      <Button type="submit" size="lg" className="w-full">Написать нам</Button>
    </form>
  );
}
