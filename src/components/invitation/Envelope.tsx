"use client";

import clsx from "clsx";
import type { Theme } from "@/types";

export function Envelope({
  theme,
  hint,
  opening,
  onOpen,
}: {
  theme: Theme;
  hint: string;
  opening: boolean;
  onOpen: () => void;
}) {
  return (
    <div
      className={clsx(
        "absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 transition-opacity duration-700",
        opening && "opacity-0 pointer-events-none"
      )}
      style={{ background: theme.colors.bg }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group relative flex h-28 w-40 items-center justify-center rounded-lg border"
        style={{ borderColor: theme.colors.accent, background: theme.colors.surface }}
        aria-label={hint}
      >
        <span
          className="absolute -top-1 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-transform group-active:scale-90"
          style={{ borderColor: theme.sealColor, color: theme.sealColor, background: theme.colors.surface }}
          aria-hidden="true"
        >
          С
        </span>
        <span
          className="absolute inset-x-3 top-3 border-t"
          style={{ borderColor: theme.colors.accentSoft }}
          aria-hidden="true"
        />
      </button>
      <p
        className="text-sm tracking-wide text-center px-6"
        style={{ color: theme.colors.muted, fontFamily: "var(--font-heading), serif" }}
      >
        {hint}
      </p>
    </div>
  );
}
