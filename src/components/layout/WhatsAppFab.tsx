"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

export function WhatsAppFab() {
  const pathname = usePathname();

  // На /order внизу уже есть своя липкая панель с кнопкой «Далее»/«Отправить» —
  // плавающая кнопка WhatsApp перекрывала бы её на мобильном. Скрываем здесь,
  // чтобы не мешать основному сценарию оформления заказа.
  if (pathname?.startsWith("/order")) return null;

  return (
    <a
      href={waLink("Здравствуйте! Хочу узнать подробнее про приглашения на той.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:bg-[#1fba59] transition-colors"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
