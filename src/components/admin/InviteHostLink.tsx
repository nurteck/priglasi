"use client";

import { useState } from "react";
import { Copy, MessageCircle } from "lucide-react";

export function InviteHostLink({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <code className="max-w-[220px] truncate rounded bg-black/5 px-2 py-1 text-xs">{url}</code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-8 items-center gap-1 rounded-full border border-black/10 px-2.5 text-xs hover:bg-black/5"
      >
        <Copy size={12} aria-hidden="true" /> {copied ? "Скопировано" : "Копировать"}
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`Здравствуйте! Вот ваша ссылка для создания приглашений «${title}»: ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-8 items-center gap-1 rounded-full bg-[#25D366] px-2.5 text-xs text-white hover:bg-[#1fba59]"
      >
        <MessageCircle size={12} aria-hidden="true" /> Отправить клиенту
      </a>
    </div>
  );
}
