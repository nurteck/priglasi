import clsx from "clsx";

export function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: React.ReactNode;
  tone?: "accent" | "gold" | "neutral";
  className?: string;
}) {
  const tones = {
    accent: "bg-accent text-white",
    gold: "bg-gold text-white",
    neutral: "bg-black/5 text-text",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
