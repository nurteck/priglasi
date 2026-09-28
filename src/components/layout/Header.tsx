"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/site.config";
import Link from "next/link";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8" aria-label="Основное меню">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/order" size="md">
            Заказать
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden flex h-11 w-11 items-center justify-center -mr-2 text-text"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-bg px-4 py-4 flex flex-col gap-1">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-text hover:text-accent transition-colors min-h-11 flex items-center"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/order" size="md" className="mt-2 w-full">
            Заказать
          </Button>
        </div>
      )}
    </header>
  );
}
