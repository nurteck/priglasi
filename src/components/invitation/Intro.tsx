import type { Theme } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

export function Intro({ theme, text }: { theme: Theme; text: string }) {
  if (!text) return null;
  return (
    <Reveal>
      <section className="px-6 py-14 text-center">
        <p
          className="mx-auto max-w-sm text-base leading-relaxed"
          style={{ color: theme.colors.text, fontFamily: "var(--font-heading), serif" }}
        >
          {text}
        </p>
      </section>
    </Reveal>
  );
}
