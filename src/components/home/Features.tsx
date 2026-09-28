import { Smartphone, CheckCircle2, Timer, MapPin, Languages, Music2 } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  { icon: Smartphone, title: "Любой экран", text: "Идеально смотрится на телефоне, планшете и компьютере." },
  { icon: CheckCircle2, title: "Подтверждение гостей", text: "Гости отвечают, придут ли они, прямо на странице." },
  { icon: Timer, title: "Таймер до тоя", text: "Обратный отсчёт создаёт настроение ожидания праздника." },
  { icon: MapPin, title: "Карта 2ГИС / Google", text: "Гости находят дорогу до места за один клик." },
  { icon: Languages, title: "Два языка", text: "Кыргызский и русский — гость сам выбирает удобный." },
  { icon: Music2, title: "Музыка", text: "Приглашение открывается с приятной мелодией." },
];

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <Reveal>
        <SectionTitle eyebrow="Внутри" title="Что внутри приглашения" />
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 60}>
            <div className="flex flex-col items-center text-center gap-2 rounded-xl bg-white border border-black/5 p-5 h-full">
              <f.icon size={26} className="text-accent" aria-hidden="true" />
              <h3 className="text-sm font-medium text-text">{f.title}</h3>
              <p className="text-xs text-muted">{f.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
