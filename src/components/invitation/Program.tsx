import type { Theme } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

export function Program({
  theme,
  title,
  items,
}: {
  theme: Theme;
  title: string;
  items: { time: string; title: string }[];
}) {
  if (!items.length) return null;
  return (
    <Reveal>
      <section className="px-6 py-10">
        <p className="text-center text-xs uppercase tracking-[0.2em]" style={{ color: theme.colors.accent }}>
          {title}
        </p>
        <div className="mx-auto mt-5 max-w-xs space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="w-14 shrink-0 text-right text-sm font-medium"
                style={{ color: theme.colors.accent }}
              >
                {item.time}
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: theme.sealColor }} />
              <span className="text-sm" style={{ color: theme.colors.text }}>
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
