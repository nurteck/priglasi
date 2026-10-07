"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/site.config";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // На главной шапка лежит поверх тёмного hero прозрачной и золотой, а после
  // прокрутки за его пределы — и на всех остальных страницах с самого начала —
  // становится тёмно-винной с блюром (единый брендовый вид шапки сайта).
  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={
        "fixed top-0 z-40 w-full transition-colors duration-300 " +
        (transparent ? "bg-transparent" : "border-b")
      }
      style={
        transparent
          ? undefined
          : {
              background: "rgba(30,8,13,.94)",
              backdropFilter: "blur(14px)",
              borderColor: "rgba(216,178,122,.2)",
            }
      }
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-[76px]">
        <Logo light />

        <nav className="hidden md:flex items-center gap-8" aria-label="Основное меню">
          {siteConfig.nav.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm transition-colors"
                style={{
                  color: isActive ? "#E6C48F" : "rgba(246,239,230,.78)",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button
            href="/order"
            size="md"
            className="h-[46px] border-0 bg-[#D8B27A] text-[#2A0C12] hover:bg-[#E9CB98]"
          >
            Заказать
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden flex h-11 w-11 items-center justify-center -mr-2 text-[#F6EFE6]"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-1"
          style={{ background: "rgba(30,8,13,.98)", borderColor: "rgba(216,178,122,.2)" }}
        >
          {siteConfig.nav.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base transition-colors min-h-11 flex items-center"
                style={{ color: isActive ? "#E6C48F" : "rgba(246,239,230,.78)" }}
              >
                {item.label}
              </Link>
            );
          })}
          <Button href="/order" size="md" className="mt-2 w-full border-0 bg-[#D8B27A] text-[#2A0C12] hover:bg-[#E9CB98]">
            Заказать
          </Button>
        </div>
      )}
    </header>
  );
}
