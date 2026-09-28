"use client";

import { useState } from "react";
import type { Theme } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

interface RsvpLabels {
  title: string;
  name: string;
  coming: string;
  notComing: string;
  guests: string;
  wish: string;
  submit: string;
  thanks: string;
}

export function Rsvp({
  theme,
  invitationSlug,
  labels,
}: {
  theme: Theme;
  invitationSlug: string;
  labels: RsvpLabels;
}) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [wish, setWish] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || attending === null) {
      setError("Заполните имя и выберите, придёте ли вы");
      return;
    }
    setError(null);
    setStatus("sending");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationSlug, name, attending, guests, wish, honeypot }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Не получилось отправить, попробуйте ещё раз");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Не получилось отправить, попробуйте ещё раз");
      setStatus("error");
    }
  }

  const field =
    "block w-full rounded-xl border bg-transparent px-4 py-2.5 text-sm min-h-11 focus-visible:outline-2";

  if (status === "done") {
    return (
      <Reveal>
        <section className="px-6 py-10 text-center">
          <p className="text-sm" style={{ color: theme.colors.accent }}>
            {labels.thanks}
          </p>
        </section>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <section className="px-6 py-10">
        <p className="text-center text-xs uppercase tracking-[0.2em]" style={{ color: theme.colors.accent }}>
          {labels.title}
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-5 max-w-xs space-y-3">
          {/* honeypot — скрытое поле для защиты от ботов */}
          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <input
            className={field}
            style={{ borderColor: theme.colors.accentSoft, color: theme.colors.text }}
            placeholder={labels.name}
            aria-label={labels.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className="flex-1 min-h-11 rounded-xl border text-sm font-medium"
              style={
                attending === true
                  ? { background: theme.colors.accent, color: "#fff", borderColor: theme.colors.accent }
                  : { borderColor: theme.colors.accentSoft, color: theme.colors.text }
              }
            >
              {labels.coming}
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className="flex-1 min-h-11 rounded-xl border text-sm font-medium"
              style={
                attending === false
                  ? { background: theme.colors.accent, color: "#fff", borderColor: theme.colors.accent }
                  : { borderColor: theme.colors.accentSoft, color: theme.colors.text }
              }
            >
              {labels.notComing}
            </button>
          </div>

          {attending && (
            <div>
              <label className="block text-xs mb-1" style={{ color: theme.colors.muted }}>
                {labels.guests}
              </label>
              <input
                type="number"
                min={1}
                max={20}
                className={field}
                style={{ borderColor: theme.colors.accentSoft, color: theme.colors.text }}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value) || 1)}
              />
            </div>
          )}

          <textarea
            className={field}
            style={{ borderColor: theme.colors.accentSoft, color: theme.colors.text }}
            placeholder={labels.wish}
            aria-label={labels.wish}
            rows={2}
            value={wish}
            onChange={(e) => setWish(e.target.value)}
          />

          {error && (
            <p className="text-xs" style={{ color: theme.colors.accent }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full min-h-11 rounded-full text-sm font-medium"
            style={{ background: theme.colors.accent, color: "#fff" }}
          >
            {status === "sending" ? "…" : labels.submit}
          </button>
        </form>
      </section>
    </Reveal>
  );
}
