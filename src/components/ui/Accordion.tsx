"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export function Accordion({ items }: { items: { id: string; question: string; answer: string }[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
              className="w-full flex items-center justify-between gap-4 py-4 text-left min-h-11"
            >
              <span className="font-medium text-text text-sm sm:text-base">{item.question}</span>
              <ChevronDown
                size={20}
                className={clsx("shrink-0 text-muted transition-transform", isOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-panel-${item.id}`}
              className={clsx("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <p className="text-sm text-muted leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
