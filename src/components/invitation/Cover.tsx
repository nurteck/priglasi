import Image from "next/image";
import type { Theme } from "@/types";

export function Cover({
  theme,
  photo,
  names,
  dateLabel,
  scrollHint,
}: {
  theme: Theme;
  photo: string;
  names: string;
  dateLabel: string;
  scrollHint: string;
}) {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-end text-center px-6 pb-14">
      <Image src={photo} alt={names} fill priority sizes="480px" className="object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to top, ${theme.colors.bg} 5%, transparent 55%)` }}
        aria-hidden="true"
      />
      <div className="relative">
        <h1
          className="text-4xl sm:text-5xl"
          style={{ fontFamily: "var(--font-script), cursive", color: theme.colors.text }}
        >
          {names}
        </h1>
        <p className="mt-3 text-sm tracking-[0.2em] uppercase" style={{ color: theme.colors.muted }}>
          {dateLabel}
        </p>
        <p className="mt-6 text-xs animate-bounce" style={{ color: theme.colors.muted }}>
          {scrollHint}
        </p>
      </div>
    </section>
  );
}
