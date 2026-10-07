"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { siteConfig } from "@/site.config";
import { waLink } from "@/lib/whatsapp";

/** Шапка страницы заказа: тёмная, с кнопкой «назад», которая на мобильном ведёт по шагам мастера. */
export function OrderHeader({ onBack }: { onBack: () => void }) {
  return (
    <header
      className="w-full border-b"
      style={{ background: "#1E080D", borderColor: "rgba(216,178,122,.2)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-[76px]">
        {/* Мобильный: назад / заголовок / WhatsApp */}
        <button
          type="button"
          onClick={onBack}
          aria-label="Назад"
          className="flex h-11 w-11 items-center justify-center text-[#F6EFE6] md:hidden"
        >
          <ArrowLeft size={22} aria-hidden="true" />
        </button>
        <p className="text-base text-[#F6EFE6] md:hidden">
          Оформить <span className="italic" style={{ color: "#D8B27A", fontFamily: "var(--font-cormorant), serif" }}>заказ</span>
        </p>
        <a
          href={waLink("Здравствуйте! У меня вопрос по заказу приглашения.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
          className="flex h-11 w-11 items-center justify-center text-[#F6EFE6] md:hidden"
        >
          <MessageCircle size={22} aria-hidden="true" />
        </a>

        {/* Десктоп: логотип / меню / кнопка-вопрос */}
        <div className="hidden md:block">
          <Logo light />
        </div>
        <nav className="hidden md:flex items-center gap-8" aria-label="Основное меню">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[rgba(246,239,230,.78)] transition-colors hover:text-[#E6C48F]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={waLink("Здравствуйте! У меня вопрос по заказу приглашения.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-[46px] items-center justify-center rounded-full border px-5 text-sm text-[#D8B27A] transition-colors hover:bg-white/10 md:inline-flex"
          style={{ borderColor: "#D8B27A" }}
        >
          Вопрос? Написать в WhatsApp
        </a>
      </div>
    </header>
  );
}
