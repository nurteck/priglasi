import type { Theme } from "@/types";
import { buildMonthGrid, monthNames, weekdayNames, weekdayFullNames } from "@/lib/calendar";
import { Reveal } from "@/components/ui/Reveal";

export function CalendarBlock({
  theme,
  date,
  langKey,
  timeLabel,
}: {
  theme: Theme;
  date: Date;
  langKey: "ky" | "ru";
  timeLabel: string;
}) {
  const weeks = buildMonthGrid(date);

  return (
    <Reveal>
      <section className="px-6 py-10">
        <div
          className="mx-auto max-w-xs rounded-2xl p-5 text-center"
          style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.accentSoft}` }}
        >
          <p className="font-heading text-lg" style={{ color: theme.colors.text }}>
            {monthNames[langKey][date.getMonth()]} {date.getFullYear()}
          </p>

          <div className="mt-4 grid grid-cols-7 gap-1 text-[11px]" style={{ color: theme.colors.muted }}>
            {weekdayNames[langKey].map((w) => (
              <div key={w}>{w}</div>
            ))}
          </div>

          {weeks.map((week, wi) => (
            <div key={wi} className="mt-1 grid grid-cols-7 gap-1">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="flex h-7 items-center justify-center rounded-full text-xs"
                  style={
                    day.isTarget
                      ? { background: theme.colors.accent, color: "#fff" }
                      : { color: day.isCurrentMonth ? theme.colors.text : "transparent" }
                  }
                >
                  {day.date || ""}
                </div>
              ))}
            </div>
          ))}

          <p className="mt-4 text-sm" style={{ color: theme.colors.accent }}>
            {weekdayFullNames[langKey][(date.getDay() + 6) % 7]} · {timeLabel}
          </p>
        </div>
      </section>
    </Reveal>
  );
}
