"use client";

import { Check } from "lucide-react";

const titles = ["Дизайн и пакет", "О мероприятии", "Контакты"];

export function StepIndicator({
  step,
  onGoTo,
}: {
  step: number;
  onGoTo: (index: number) => void;
}) {
  return (
    <div className="mb-8">
      {/* Мобильный */}
      <div className="sm:hidden">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium uppercase tracking-[.2em]" style={{ color: "#9A6B3A" }}>
            Шаг {step + 1} из {titles.length}
          </span>
          <span className="text-sm font-semibold" style={{ color: "#2A0C12" }}>
            {titles[step]}
          </span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {titles.map((title, i) => (
            <span
              key={title}
              className="h-[3px] flex-1 rounded-full"
              style={{ background: i <= step ? "#C79A5B" : "rgba(90,24,38,.12)" }}
            />
          ))}
        </div>
      </div>

      {/* Десктоп */}
      <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4">
        {titles.map((title, i) => {
          const done = i < step;
          const current = i === step;
          const clickable = done;
          return (
            <div key={title} className="flex flex-col items-center text-center">
              <span
                className="mb-4 h-[3px] w-full rounded-full"
                style={{ background: i <= step ? "#C79A5B" : "rgba(90,24,38,.12)" }}
              />
              <button
                type="button"
                onClick={() => clickable && onGoTo(i)}
                disabled={!clickable}
                aria-current={current ? "step" : undefined}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full text-sm font-medium transition-colors"
                style={
                  done
                    ? { background: "#C79A5B", color: "#2A0C12", cursor: "pointer" }
                    : current
                      ? { background: "#5A1826", color: "#F7F0E6" }
                      : { border: "1px solid rgba(90,24,38,.25)", color: "#6A4A48" }
                }
              >
                {done ? <Check size={16} aria-hidden="true" /> : i + 1}
              </button>
              <span className="mt-2 text-[11px] font-medium uppercase tracking-[.15em]" style={{ color: "#9A6B3A" }}>
                Шаг {i + 1}
              </span>
              <span className="mt-0.5 text-[15px] font-semibold" style={{ color: "#2A0C12" }}>
                {title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
