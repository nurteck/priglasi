import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { n: "1", title: "Выберите дизайн", text: "Посмотрите каталог и выберите стиль, который подходит вашему тою." },
  { n: "2", title: "Отправьте детали", text: "Имена, дата, место и пожелания — присылаете нам в WhatsApp или через форму." },
  { n: "3", title: "Мы оформим", text: "Соберём приглашение по вашим данным и пришлём на проверку." },
  { n: "4", title: "Получите ссылку", text: "Делитесь ссылкой в Instagram и WhatsApp — гости открывают её с телефона." },
];

export function Steps() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <SectionTitle eyebrow="Процесс" title="Как всё проходит" />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white font-heading">
                  {s.n}
                </div>
                <h3 className="mt-3 text-sm font-medium text-text">{s.title}</h3>
                <p className="mt-1 text-xs text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
