import Link from "next/link";
import type { Theme } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

export function Finale({
  theme,
  names,
  dateLabel,
  signature,
  madeBy,
}: {
  theme: Theme;
  names: string;
  dateLabel: string;
  signature: string;
  madeBy: string;
}) {
  return (
    <Reveal>
      <section className="px-6 py-16 text-center">
        <p className="text-sm" style={{ color: theme.colors.muted }}>
          {signature}
        </p>
        <p
          className="mt-2 text-3xl"
          style={{ fontFamily: "var(--font-script), cursive", color: theme.colors.text }}
        >
          {names}
        </p>
        <p className="mt-2 text-xs" style={{ color: theme.colors.muted }}>
          {dateLabel}
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-[11px] underline"
          style={{ color: theme.colors.muted }}
        >
          {madeBy}
        </Link>
      </section>
    </Reveal>
  );
}
