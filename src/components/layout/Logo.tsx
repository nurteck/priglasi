import Link from "next/link";
import { siteConfig } from "@/site.config";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 shrink-0 ${className}`}
      aria-label={`${siteConfig.brandName} — на главную`}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold text-lg"
        style={{ fontFamily: "var(--font-heading), serif" }}
        aria-hidden="true"
      >
        {siteConfig.monogram}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-heading text-lg text-text">{siteConfig.brandName}</span>
        <span className="text-[11px] text-muted tracking-wide uppercase">{siteConfig.tagline}</span>
      </span>
    </Link>
  );
}
