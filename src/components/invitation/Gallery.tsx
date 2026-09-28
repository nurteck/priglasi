import Image from "next/image";
import type { Theme } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

export function Gallery({ theme, title, photos }: { theme: Theme; title: string; photos: string[] }) {
  if (!photos.length) return null;
  return (
    <Reveal>
      <section className="px-6 py-10">
        <p className="text-center text-xs uppercase tracking-[0.2em]" style={{ color: theme.colors.accent }}>
          {title}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {photos.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
              <Image src={src} alt="" fill sizes="120px" loading="lazy" className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
