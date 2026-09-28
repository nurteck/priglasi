import Image from "next/image";
import { Smartphone, Clock, Palette, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { waLink } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "О нас",
  description: "Салтанат — цифровые приглашения на тои в Кыргызстане. История, подход и команда.",
  path: "/about",
});

const reasons = [
  { icon: Smartphone, title: "Всегда под рукой", text: "Ссылку не потеряют — она живёт в телефоне, а не в ящике стола." },
  { icon: Clock, title: "Быстро", text: "Не нужно ждать неделями типографию — готово за 1–2 дня." },
  { icon: Palette, title: "Красиво", text: "Дизайны, сделанные с учётом кыргызских традиций и современного вкуса." },
  { icon: HeartHandshake, title: "Без забот", text: "Мы берём на себя всё оформление — вам остаётся прислать детали." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Reveal>
        <div className="flex flex-col items-center text-center">
          <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow">
            <Image src="/images/about-nurtilek.png" alt="Нуртилек, основатель Салтанат" fill sizes="112px" className="object-cover" />
          </div>
          <h1 className="mt-5 font-heading text-2xl sm:text-3xl">Привет, я Нуртилек</h1>
          <p className="mt-3 text-muted text-sm sm:text-base max-w-md">
            Делаю цифровые приглашения на тои — свадьбы, кыз узатуу, сүннөт той, тушоо той и юбилеи —
            чтобы каждый той начинался красиво, ещё до того, как гости переступят порог зала.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-14">
          <SectionTitle center={false} eyebrow="История" title="Как всё начиналось" />
          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
            Идея Салтанат родилась из простого наблюдения: бумажные приглашения теряются, а гости всё
            равно уточняют адрес и время в личных сообщениях. Мы решили сделать так, чтобы вся нужная
            информация — дата, место, программа вечера — была под рукой у каждого гостя в один клик,
            а хозяева тоя точно знали, сколько человек придёт.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-10">
          <SectionTitle center={false} eyebrow="Подход" title="Как мы работаем" />
          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
            Каждое приглашение мы собираем вручную под ваши данные — имена, дату, место и пожелания.
            Дизайн остаётся прежним, а история — только ваша. Общаемся напрямую в WhatsApp, без лишних
            созвонов и долгих согласований.
          </p>
        </div>
      </Reveal>

      <div className="mt-14">
        <SectionTitle eyebrow="Почему онлайн" title="4 причины выбрать цифровое приглашение" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 60}>
              <div className="text-center rounded-xl bg-white border border-black/5 p-4 h-full">
                <r.icon size={24} className="mx-auto text-accent" aria-hidden="true" />
                <h3 className="mt-2 text-sm font-medium">{r.title}</h3>
                <p className="mt-1 text-xs text-muted">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal>
        <div className="mt-14 text-center rounded-2xl bg-accent-soft/40 p-8">
          <h2 className="font-heading text-xl">Готовы обсудить ваш той?</h2>
          <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
            <Button href="/catalog" variant="secondary" size="lg">Смотреть каталог</Button>
            <Button href={waLink("Здравствуйте! Хочу узнать подробнее про Салтанат.")} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg">
              Написать в WhatsApp
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
