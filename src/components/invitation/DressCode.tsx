import type { Theme } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

export function DressCode({
  theme,
  title,
  text,
  colors,
}: {
  theme: Theme;
  title: string;
  text: string;
  colors?: string[];
}) {
  return (
    <Reveal>
      <section className="px-6 py-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.colors.accent }}>
          {title}
        </p>
        <p className="mt-3 text-sm" style={{ color: theme.colors.text }}>
          {text}
        </p>
        {colors && colors.length > 0 && (
          <div className="mt-4 flex justify-center gap-2">
            {colors.map((c) => (
              <span
                key={c}
                className="h-7 w-7 rounded-full border"
                style={{ background: c, borderColor: theme.colors.muted }}
                aria-hidden="true"
              />
            ))}
          </div>
        )}
      </section>
    </Reveal>
  );
}
