"use client";

import { useEffect, useState } from "react";
import type { Theme } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

export function Countdown({
  theme,
  target,
  title,
  labels,
}: {
  theme: Theme;
  target: Date;
  title: string;
  labels: { days: string; hours: string; minutes: string; seconds: string };
}) {
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: [number, string][] = [
    [time.days, labels.days],
    [time.hours, labels.hours],
    [time.minutes, labels.minutes],
    [time.seconds, labels.seconds],
  ];

  return (
    <Reveal>
      <section className="px-6 py-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.colors.accent }}>
          {title}
        </p>
        <div className="mt-4 flex justify-center gap-3">
          {units.map(([value, label]) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center rounded-xl w-16 h-16"
              style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.accentSoft}` }}
            >
              <span className="font-heading text-xl" style={{ color: theme.colors.text }}>
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-[10px]" style={{ color: theme.colors.muted }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
