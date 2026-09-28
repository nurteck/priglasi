import type { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = true,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : ""}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-medium mb-2">{eyebrow}</p>
      )}
      <h2 className="font-heading text-2xl sm:text-3xl text-text">{title}</h2>
      {subtitle && <p className="mt-3 text-muted text-sm sm:text-base">{subtitle}</p>}
      {children}
    </div>
  );
}
