"use client";

import { useState } from "react";
import { Plus, X, Upload, Music, Image as ImageIcon } from "lucide-react";
import { categories } from "@/content/categories";
import type { CategoryId, InviteProgramItem } from "@/types";
import { fieldClass, fieldBorder, fieldBorderError, labelClass, labelStyle, errorClass, errorStyle } from "./fieldStyles";

export interface StepEventValues {
  eventType: CategoryId | "";
  namesFirst: string;
  namesSecond: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  program: InviteProgramItem[];
  photos: string[];
  music: string;
}

async function uploadFile(file: File, kind: "photo" | "music"): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("kind", kind);
  const res = await fetch("/api/uploads/", { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Не удалось загрузить файл");
  return data.url as string;
}

export function StepEvent({
  values,
  errors,
  onChange,
}: {
  values: StepEventValues;
  errors: Partial<Record<keyof StepEventValues, string>>;
  onChange: <K extends keyof StepEventValues>(key: K, value: StepEventValues[K]) => void;
}) {
  const isWedding = values.eventType === "wedding";
  const nameLabels = isWedding
    ? { first: "Имя жениха", second: "Имя невесты" }
    : { first: "Имя виновника торжества", second: "Второе имя, если есть" };

  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [uploadingMusic, setUploadingMusic] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  function addProgramRow() {
    onChange("program", [...values.program, { time: "", title: "" }]);
  }
  function updateProgramRow(i: number, patch: Partial<InviteProgramItem>) {
    onChange("program", values.program.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }
  function removeProgramRow(i: number) {
    onChange("program", values.program.filter((_, idx) => idx !== i));
  }

  async function handlePhotosSelected(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploadError(null);
    setUploadingPhotos(true);
    try {
      const urls = await Promise.all(Array.from(files).slice(0, 10).map((f) => uploadFile(f, "photo")));
      onChange("photos", [...values.photos, ...urls]);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Не удалось загрузить фото");
    } finally {
      setUploadingPhotos(false);
    }
  }

  async function handleMusicSelected(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploadingMusic(true);
    try {
      const url = await uploadFile(file, "music");
      onChange("music", url);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Не удалось загрузить музыку");
    } finally {
      setUploadingMusic(false);
    }
  }

  return (
    <div className="space-y-6">
      <h2
        className="text-[30px] sm:text-[34px]"
        style={{ fontFamily: "var(--font-cormorant), serif", color: "#2A0C12" }}
      >
        О мероприятии
      </h2>

      <fieldset>
        <legend className={labelClass} style={labelStyle}>Тип тоя</legend>
        <div role="radiogroup" aria-label="Тип тоя" className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const selected = values.eventType === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange("eventType", c.id)}
                className="flex h-11 items-center rounded-[22px] px-4 text-sm font-medium transition-colors"
                style={
                  selected
                    ? { background: "#5A1826", color: "#F7F0E6" }
                    : { border: "1px solid rgba(90,24,38,.25)", color: "#5A1826" }
                }
              >
                {c.label}
              </button>
            );
          })}
        </div>
        {errors.eventType && <p className={errorClass} style={errorStyle}>{errors.eventType}</p>}
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} style={labelStyle} htmlFor="namesFirst">{nameLabels.first}</label>
          <input
            id="namesFirst"
            className={fieldClass}
            style={errors.namesFirst ? fieldBorderError : fieldBorder}
            value={values.namesFirst}
            onChange={(e) => onChange("namesFirst", e.target.value)}
            aria-invalid={Boolean(errors.namesFirst)}
          />
          {errors.namesFirst && <p className={errorClass} style={errorStyle}>{errors.namesFirst}</p>}
        </div>
        <div>
          <label className={labelClass} style={labelStyle} htmlFor="namesSecond">{nameLabels.second}</label>
          <input
            id="namesSecond"
            className={fieldClass}
            style={fieldBorder}
            value={values.namesSecond}
            onChange={(e) => onChange("namesSecond", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={labelStyle} htmlFor="date">Дата</label>
          <input
            id="date"
            type="date"
            className={fieldClass}
            style={errors.date ? fieldBorderError : fieldBorder}
            value={values.date}
            onChange={(e) => onChange("date", e.target.value)}
            aria-invalid={Boolean(errors.date)}
          />
          {errors.date && <p className={errorClass} style={errorStyle}>{errors.date}</p>}
        </div>
        <div>
          <label className={labelClass} style={labelStyle} htmlFor="time">Начало</label>
          <input
            id="time"
            type="time"
            className={fieldClass}
            style={fieldBorder}
            value={values.time}
            onChange={(e) => onChange("time", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} style={labelStyle} htmlFor="venue">Заведение</label>
        <input
          id="venue"
          className={fieldClass}
          style={fieldBorder}
          value={values.venue}
          onChange={(e) => onChange("venue", e.target.value)}
          placeholder="Например, той-зал «Ак-Сарай»"
        />
      </div>

      <div>
        <label className={labelClass} style={labelStyle} htmlFor="address">Адрес</label>
        <input
          id="address"
          className={fieldClass}
          style={fieldBorder}
          value={values.address}
          onChange={(e) => onChange("address", e.target.value)}
        />
        <p className="mt-1 text-xs" style={{ color: "#6A4A48" }}>— добавим карту в приглашение</p>
      </div>

      <fieldset>
        <legend className={labelClass} style={labelStyle}>Программа вечера — необязательно</legend>
        <div className="space-y-2">
          {values.program.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="time"
                value={row.time}
                onChange={(e) => updateProgramRow(i, { time: e.target.value })}
                className={fieldClass}
                style={{ ...fieldBorder, width: 120 }}
              />
              <input
                value={row.title}
                onChange={(e) => updateProgramRow(i, { title: e.target.value })}
                placeholder="Например, Конокторду тосуу"
                className={`${fieldClass} flex-1`}
                style={fieldBorder}
              />
              <button
                type="button"
                onClick={() => removeProgramRow(i)}
                aria-label="Удалить пункт программы"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: "rgba(90,24,38,.2)", color: "#5A1826" }}
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addProgramRow}
          className="mt-2 inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-medium"
          style={{ borderColor: "rgba(90,24,38,.25)", color: "#5A1826" }}
        >
          <Plus size={14} aria-hidden="true" /> Добавить пункт
        </button>
      </fieldset>

      <fieldset>
        <legend className={labelClass} style={labelStyle}>Фото — необязательно</legend>
        <div className="flex flex-wrap gap-2">
          {values.photos.map((url, i) => (
            <div key={url} className="relative h-16 w-16 overflow-hidden rounded-lg border" style={{ borderColor: "rgba(90,24,38,.18)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- внешние Storage-URL, next/image тут не нужен */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange("photos", values.photos.filter((_, idx) => idx !== i))}
                aria-label="Удалить фото"
                className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <X size={10} aria-hidden="true" />
              </button>
            </div>
          ))}
          <label className="flex h-16 w-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-xs" style={{ borderColor: "rgba(90,24,38,.3)", color: "#6A4A48" }}>
            {uploadingPhotos ? <Upload size={16} className="animate-pulse" aria-hidden="true" /> : <ImageIcon size={16} aria-hidden="true" />}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={(e) => handlePhotosSelected(e.target.files)}
              disabled={uploadingPhotos}
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClass} style={labelStyle}>Музыка — необязательно</legend>
        {values.music ? (
          <div className="flex items-center gap-2 text-sm" style={{ color: "#2A0C12" }}>
            <Music size={16} aria-hidden="true" /> Файл загружен
            <button type="button" onClick={() => onChange("music", "")} className="underline" style={{ color: "#5A1826" }}>
              Убрать
            </button>
          </div>
        ) : (
          <label
            className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-full border px-4 text-sm font-medium"
            style={{ borderColor: "rgba(90,24,38,.25)", color: "#5A1826" }}
          >
            {uploadingMusic ? <Upload size={14} className="animate-pulse" aria-hidden="true" /> : <Music size={14} aria-hidden="true" />}
            {uploadingMusic ? "Загружаем…" : "Загрузить MP3"}
            <input
              type="file"
              accept="audio/mpeg,audio/mp3"
              className="hidden"
              onChange={(e) => handleMusicSelected(e.target.files)}
              disabled={uploadingMusic}
            />
          </label>
        )}
      </fieldset>

      {uploadError && <p className={errorClass} style={errorStyle}>{uploadError}</p>}
    </div>
  );
}
