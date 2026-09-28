"use client";

import clsx from "clsx";

export function LangSwitch({
  active,
  onChange,
}: {
  active: "ky" | "ru";
  onChange: (lang: "ky" | "ru") => void;
}) {
  return (
    <div className="fixed top-4 left-4 z-30 flex rounded-full bg-black/30 backdrop-blur p-1 text-xs">
      {(["ky", "ru"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          aria-pressed={active === l}
          className={clsx(
            "min-h-8 px-3 rounded-full font-medium transition-colors",
            active === l ? "bg-white text-black" : "text-white"
          )}
        >
          {l === "ky" ? "КЫР" : "РУС"}
        </button>
      ))}
    </div>
  );
}
