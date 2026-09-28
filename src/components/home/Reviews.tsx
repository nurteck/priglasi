"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "@/content/reviews";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

export function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(delta: number) {
    trackRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <Reveal>
        <SectionTitle eyebrow="Отзывы" title="Что говорят клиенты" />
      </Reveal>

      <div className="mt-10 relative">
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
        >
          {reviews.map((r) => (
            <article
              key={r.id}
              className="snap-start shrink-0 w-[85%] sm:w-[360px] rounded-2xl border border-black/5 bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={r.avatar ?? "/images/review-placeholder.png"}
                  alt={`Фото ${r.name}`}
                  width={44}
                  height={44}
                  className="rounded-full object-cover h-11 w-11"
                />
                <div>
                  <p className="text-sm font-medium text-text">{r.name}</p>
                  <p className="text-xs text-muted">{r.event}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5" aria-label={`Оценка ${r.rating} из 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < r.rating ? "fill-gold text-gold" : "text-black/15"}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted leading-relaxed">{r.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollBy(-380)}
            aria-label="Предыдущий отзыв"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 hover:bg-black/5"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(380)}
            aria-label="Следующий отзыв"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 hover:bg-black/5"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
