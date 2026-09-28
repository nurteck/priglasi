import type { Theme } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

export function Hosts({
  theme,
  title,
  names,
  text,
}: {
  theme: Theme;
  title: string;
  names: string[];
  text?: string;
}) {
  return (
    <Reveal>
      <section className="px-6 py-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.colors.accent }}>
          {title}
        </p>
        <div className="mt-3 space-y-1">
          {names.map((n) => (
            <p key={n} className="text-base" style={{ color: theme.colors.text }}>
              {n}
            </p>
          ))}
        </div>
        {text && (
          <p className="mt-3 text-sm" style={{ color: theme.colors.muted }}>
            {text}
          </p>
        )}
      </section>
    </Reveal>
  );
}
