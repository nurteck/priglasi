"use client";

import { useEffect, useState } from "react";
import { Copy, Send, Download, Trash2, Pencil, Check, X } from "lucide-react";
import { siteConfig } from "@/site.config";
import type { Guest } from "@/types";

const dict = {
  ky: {
    title: "Конокторго жеке шилтеме түзүү",
    subtitle: "Ар бир конок же үй-бүлө үчүн өзүнчө шилтеме түзүңүз — ал шилтемеде анын аты жана орун саны көрсөтүлөт.",
    nameLabel: "Коноктун же үй-бүлөнүн аты",
    namePlaceholder: "Мисалы, Азамат менен Айгерим",
    seatsLabel: "Орун саны",
    create: "Шилтеме түзүү",
    bulkTitle: "Бир нече конокту бир жолу кошуу",
    bulkHint: "Ар бир сапта: аты;орун саны (мисалы: Азамат менен Айгерим;2)",
    bulkCreate: "Баарын түзүү",
    invited: "Чакырылган",
    seats: "орун",
    guestsCount: "конок",
    downloadCsv: "Тизмени жүктөө (CSV)",
    list: "Түзүлгөн шилтемелер",
    empty: "Азырынча шилтеме жок — жогорудан түзө баштаңыз.",
    copy: "Көчүрүү",
    copied: "Көчүрүлдү!",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    open: "Ачуу",
    edit: "Өзгөртүү",
    delete: "Өчүрүү",
    save: "Сактоо",
    cancel: "Жокко чыгаруу",
    confirmDelete: "Чын эле өчүрөсүзбү?",
  },
  ru: {
    title: "Создание персональных ссылок гостям",
    subtitle: "Создайте отдельную ссылку для каждого гостя или семьи — в ней будет его имя и количество мест.",
    nameLabel: "Имя гостя или семьи",
    namePlaceholder: "Например, Азамат менен Айгерим",
    seatsLabel: "Количество мест",
    create: "Создать ссылку",
    bulkTitle: "Добавить несколько гостей сразу",
    bulkHint: "Каждая строка: имя;места (например: Азамат менен Айгерим;2)",
    bulkCreate: "Создать все",
    invited: "Приглашено",
    seats: "мест",
    guestsCount: "гостей",
    downloadCsv: "Скачать список (CSV)",
    list: "Созданные ссылки",
    empty: "Пока нет ни одной ссылки — создайте первую выше.",
    copy: "Скопировать",
    copied: "Скопировано!",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    open: "Открыть",
    edit: "Изменить",
    delete: "Удалить",
    save: "Сохранить",
    cancel: "Отмена",
    confirmDelete: "Точно удалить?",
  },
} as const;

type LangKey = keyof typeof dict;

function guestLink(slug: string, name: string, seats: number) {
  return `${siteConfig.url}/invites/${slug}/?g=${encodeURIComponent(name)}&n=${seats}`;
}

function csvEscape(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((r) => r.map(csvEscape).join(";")).join("\r\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

let demoIdCounter = 0;

export function HostDashboard({
  slug,
  title,
  eventDate,
  hostKey,
  isDemo = false,
}: {
  slug: string;
  title: string;
  eventDate: string;
  hostKey: string;
  isDemo?: boolean;
}) {
  const [lang, setLang] = useState<LangKey>("ky");
  const t = dict[lang];

  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(!isDemo);
  const [name, setName] = useState("");
  const [seats, setSeats] = useState(2);
  const [bulkText, setBulkText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSeats, setEditSeats] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isDemo) return;
    fetch(`/api/host/${slug}/guests/?key=${encodeURIComponent(hostKey)}`)
      .then((r) => r.json())
      .then((data) => setGuests(data.guests ?? []))
      .finally(() => setLoading(false));
  }, [slug, hostKey, isDemo]);

  async function addGuests(entries: { name: string; seats: number }[]) {
    if (entries.length === 0) return;
    setError(null);

    if (isDemo) {
      const created = entries.map((e) => ({
        id: `demo-${++demoIdCounter}`,
        slug,
        name: e.name,
        seats: e.seats,
        createdAt: new Date().toISOString(),
      }));
      setGuests((g) => [...created, ...g]);
      return;
    }

    const res = await fetch(`/api/host/${slug}/guests/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: hostKey, guests: entries }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Не удалось создать");
      return;
    }
    setGuests((g) => [...data.guests, ...g]);
  }

  async function handleCreateOne(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await addGuests([{ name: name.trim(), seats }]);
    setName("");
    setSeats(2);
  }

  async function handleCreateBulk() {
    const entries = bulkText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [rawName, rawSeats] = line.split(";");
        return { name: (rawName ?? "").trim(), seats: Math.max(1, Math.min(10, Number(rawSeats) || 1)) };
      })
      .filter((e) => e.name);
    await addGuests(entries);
    setBulkText("");
  }

  async function handleDelete(id: string) {
    if (!confirm(t.confirmDelete)) return;
    if (isDemo) {
      setGuests((g) => g.filter((x) => x.id !== id));
      return;
    }
    await fetch(`/api/host/${slug}/guests/${id}/?key=${encodeURIComponent(hostKey)}`, { method: "DELETE" });
    setGuests((g) => g.filter((x) => x.id !== id));
  }

  function startEdit(guest: Guest) {
    setEditingId(guest.id);
    setEditName(guest.name);
    setEditSeats(guest.seats);
  }

  async function saveEdit(id: string) {
    if (isDemo) {
      setGuests((g) => g.map((x) => (x.id === id ? { ...x, name: editName, seats: editSeats } : x)));
      setEditingId(null);
      return;
    }
    await fetch(`/api/host/${slug}/guests/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: hostKey, name: editName, seats: editSeats }),
    });
    setGuests((g) => g.map((x) => (x.id === id ? { ...x, name: editName, seats: editSeats } : x)));
    setEditingId(null);
  }

  function copyLink(guest: Guest) {
    navigator.clipboard?.writeText(guestLink(slug, guest.name, guest.seats)).then(() => {
      setCopiedId(guest.id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  }

  const totalSeats = guests.reduce((sum, g) => sum + g.seats, 0);

  return (
    <div className="min-h-screen" style={{ background: "#F7F0E6" }}>
      <header className="border-b" style={{ background: "#1E080D", borderColor: "rgba(216,178,122,.2)" }}>
        <div className="mx-auto max-w-2xl px-5 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[.2em]" style={{ color: "#9A6B3A" }}>
                {isDemo ? "ДЕМО" : "Салтанат"}
              </p>
              <h1 className="mt-1 text-2xl" style={{ fontFamily: "var(--font-cormorant), serif", color: "#F6EFE6" }}>
                {title}
              </h1>
              <p className="text-sm" style={{ color: "rgba(246,239,230,.6)" }}>{eventDate}</p>
            </div>
            <div className="flex gap-1 rounded-full border p-1" style={{ borderColor: "rgba(216,178,122,.3)" }}>
              {(["ky", "ru"] as LangKey[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={lang === l ? { background: "#D8B27A", color: "#2A0C12" } : { color: "#F6EFE6" }}
                >
                  {l === "ky" ? "KG" : "RU"}
                </button>
              ))}
            </div>
          </div>
          <a
            href={guestLink(slug, lang === "ky" ? "Урматтуу коноктор" : "Уважаемые гости", 2)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-11 items-center rounded-full px-5 text-sm font-medium"
            style={{ background: "#D8B27A", color: "#2A0C12" }}
          >
            {lang === "ky" ? "Чакырууну көрүү" : "Посмотреть приглашение"}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-6">
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl p-4" style={{ background: "#FFFCF7", boxShadow: "0 0 0 1px rgba(199,154,91,.22)" }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-cormorant), serif", color: "#5A1826" }}>
              {guests.length}
            </p>
            <p className="text-xs" style={{ color: "#6A4A48" }}>{t.invited} ({t.guestsCount})</p>
          </div>
          <div className="rounded-2xl p-4" style={{ background: "#FFFCF7", boxShadow: "0 0 0 1px rgba(199,154,91,.22)" }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-cormorant), serif", color: "#5A1826" }}>
              {totalSeats}
            </p>
            <p className="text-xs" style={{ color: "#6A4A48" }}>{t.seats}</p>
          </div>
        </div>

        <section className="rounded-2xl p-5" style={{ background: "#FFFCF7", boxShadow: "0 0 0 1px rgba(199,154,91,.22)" }}>
          <h2 className="text-lg font-semibold" style={{ color: "#2A0C12" }}>{t.title}</h2>
          <p className="mt-1 text-xs" style={{ color: "#6A4A48" }}>{t.subtitle}</p>

          <form onSubmit={handleCreateOne} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold" style={{ color: "#2A0C12" }}>{t.nameLabel}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="h-12 w-full rounded-xl border bg-white px-3 text-base outline-none focus:border-[#C79A5B]"
                style={{ borderColor: "rgba(90,24,38,.18)" }}
              />
            </div>
            <div className="w-full sm:w-28">
              <label className="mb-1 block text-xs font-semibold" style={{ color: "#2A0C12" }}>{t.seatsLabel}</label>
              <input
                type="number"
                min={1}
                max={10}
                value={seats}
                onChange={(e) => setSeats(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                className="h-12 w-full rounded-xl border bg-white px-3 text-base outline-none focus:border-[#C79A5B]"
                style={{ borderColor: "rgba(90,24,38,.18)" }}
              />
            </div>
            <button
              type="submit"
              className="h-12 shrink-0 rounded-full px-6 text-sm font-medium"
              style={{ background: "#5A1826", color: "#F7F0E6" }}
            >
              {t.create}
            </button>
          </form>

          <details className="mt-5">
            <summary className="cursor-pointer text-sm font-medium" style={{ color: "#5A1826" }}>
              {t.bulkTitle}
            </summary>
            <p className="mt-2 text-xs" style={{ color: "#6A4A48" }}>{t.bulkHint}</p>
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              rows={4}
              className="mt-2 w-full rounded-xl border bg-white p-3 text-sm outline-none focus:border-[#C79A5B]"
              style={{ borderColor: "rgba(90,24,38,.18)" }}
            />
            <button
              type="button"
              onClick={handleCreateBulk}
              className="mt-2 h-11 rounded-full px-5 text-sm font-medium"
              style={{ background: "#5A1826", color: "#F7F0E6" }}
            >
              {t.bulkCreate}
            </button>
          </details>

          {error && <p className="mt-3 text-sm" style={{ color: "#5A1826" }}>{error}</p>}
        </section>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold" style={{ color: "#2A0C12" }}>{t.list}</h2>
          {guests.length > 0 && (
            <button
              type="button"
              onClick={() =>
                downloadCsv(
                  `${slug}-guests.csv`,
                  [
                    ["Имя", "Места", "Ссылка", "Дата"],
                    ...guests.map((g) => [g.name, String(g.seats), guestLink(slug, g.name, g.seats), g.createdAt]),
                  ]
                )
              }
              className="inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-xs font-medium"
              style={{ borderColor: "rgba(90,24,38,.25)", color: "#5A1826" }}
            >
              <Download size={14} aria-hidden="true" /> {t.downloadCsv}
            </button>
          )}
        </div>

        {loading ? (
          <p className="mt-4 text-sm" style={{ color: "#6A4A48" }}>…</p>
        ) : guests.length === 0 ? (
          <p className="mt-4 text-sm" style={{ color: "#6A4A48" }}>{t.empty}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {guests.map((guest) => {
              const link = guestLink(slug, guest.name, guest.seats);
              const message =
                lang === "ky"
                  ? `Урматтуу ${guest.name}! Сиздерди тоюбузга чакырабыз: ${link}`
                  : `Урматтуу ${guest.name}! Сиздерди тоюбузга чакырабыз: ${link}`;
              const isEditing = editingId === guest.id;

              return (
                <li key={guest.id} className="rounded-2xl p-4" style={{ background: "#FFFCF7", boxShadow: "0 0 0 1px rgba(199,154,91,.22)" }}>
                  {isEditing ? (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-10 flex-1 rounded-lg border bg-white px-3 text-sm"
                        style={{ borderColor: "rgba(90,24,38,.18)" }}
                      />
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={editSeats}
                        onChange={(e) => setEditSeats(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                        className="h-10 w-20 rounded-lg border bg-white px-3 text-sm"
                        style={{ borderColor: "rgba(90,24,38,.18)" }}
                      />
                      <div className="flex gap-2">
                        <button type="button" onClick={() => saveEdit(guest.id)} className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "#5A1826", color: "#fff" }}>
                          <Check size={16} aria-hidden="true" />
                        </button>
                        <button type="button" onClick={() => setEditingId(null)} className="flex h-10 w-10 items-center justify-center rounded-full border" style={{ borderColor: "rgba(90,24,38,.25)", color: "#5A1826" }}>
                          <X size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium" style={{ color: "#2A0C12" }}>{guest.name}</p>
                          <p className="text-xs" style={{ color: "#6A4A48" }}>{guest.seats} {t.seats}</p>
                        </div>
                        <div className="flex gap-1">
                          <button type="button" onClick={() => startEdit(guest)} aria-label={t.edit} className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ borderColor: "rgba(90,24,38,.2)", color: "#5A1826" }}>
                            <Pencil size={14} aria-hidden="true" />
                          </button>
                          <button type="button" onClick={() => handleDelete(guest.id)} aria-label={t.delete} className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ borderColor: "rgba(90,24,38,.2)", color: "#5A1826" }}>
                            <Trash2 size={14} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => copyLink(guest)}
                          className="inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-medium"
                          style={{ borderColor: "rgba(90,24,38,.25)", color: "#5A1826" }}
                        >
                          <Copy size={13} aria-hidden="true" /> {copiedId === guest.id ? t.copied : t.copy}
                        </button>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(message)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium"
                          style={{ background: "#25D366", color: "#fff" }}
                        >
                          <Send size={13} aria-hidden="true" /> {t.whatsapp}
                        </a>
                        <a
                          href={`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(message)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium"
                          style={{ background: "#229ED9", color: "#fff" }}
                        >
                          <Send size={13} aria-hidden="true" /> {t.telegram}
                        </a>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center rounded-full border px-3 text-xs font-medium"
                          style={{ borderColor: "rgba(90,24,38,.25)", color: "#5A1826" }}
                        >
                          {t.open}
                        </a>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
