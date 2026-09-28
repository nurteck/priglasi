"use client";

import { useState } from "react";
import type { Rsvp } from "@/types";

export function GuestsTable({ rsvps }: { rsvps: Rsvp[] }) {
  const [query, setQuery] = useState("");
  const filtered = rsvps.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="rounded-xl bg-white border border-black/5 overflow-hidden">
      <div className="p-3 border-b border-black/5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по имени"
          aria-label="Поиск по имени"
          className="w-full rounded-full border border-black/10 px-4 py-2 text-sm min-h-11"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted text-xs">
              <th className="px-4 py-2">Имя</th>
              <th className="px-4 py-2">Придёт</th>
              <th className="px-4 py-2">Гостей</th>
              <th className="px-4 py-2">Пожелание</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-muted">
                  Пока нет ответов
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-t border-black/5">
                  <td className="px-4 py-2">{r.name}</td>
                  <td className="px-4 py-2">{r.attending ? "Да" : "Нет"}</td>
                  <td className="px-4 py-2">{r.guests}</td>
                  <td className="px-4 py-2 text-muted">{r.wish || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
