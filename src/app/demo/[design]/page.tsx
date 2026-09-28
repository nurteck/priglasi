import Image from "next/image";
import { notFound } from "next/navigation";
import { getDesignBySlug, designs } from "@/content/designs";
import { getTheme } from "@/themes";
import { pageMetadata } from "@/lib/seo";
import { categoryLabels } from "@/content/categories";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export function generateStaticParams() {
  return designs.map((d) => ({ design: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ design: string }>;
}): Promise<Metadata> {
  const { design: slug } = await params;
  const design = getDesignBySlug(slug);
  if (!design) return {};
  return pageMetadata({
    title: `Демо: ${design.name}`,
    description: `Предпросмотр дизайна «${design.name}» — закажите такое же приглашение для вашего тоя.`,
    path: `/demo/${slug}`,
    image: `/demo/${slug}/opengraph-image`,
  });
}

/**
 * Полноценное живое приглашение на этом дизайне создаётся отдельно под
 * конкретного клиента (движок в src/components/invitation). Здесь — витринный
 * предпросмотр обложки в макете телефона, чтобы клиент мог оценить стиль
 * и сразу заказать такое же.
 */
export default async function DemoPage({ params }: { params: Promise<{ design: string }> }) {
  const { design: slug } = await params;
  const design = getDesignBySlug(slug);
  if (!design) notFound();

  const theme = getTheme(design.themeId);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: theme.colors.bg }}
    >
      <div
        className="relative mx-auto aspect-[9/19] w-full max-w-[300px] rounded-[2.2rem] border-[8px] shadow-2xl overflow-hidden"
        style={{ borderColor: theme.colors.text, background: theme.colors.text }}
      >
        <div
          className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-xl"
          style={{ background: theme.colors.text }}
        />
        <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
          <Image src={design.cover} alt={design.name} fill sizes="300px" priority className="object-cover" />
          <div
            className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-10 text-center"
            style={{ background: `linear-gradient(to top, ${theme.colors.bg} 15%, transparent 60%)` }}
          >
            <p
              className="text-2xl"
              style={{ fontFamily: "var(--font-script), cursive", color: theme.colors.text }}
            >
              {design.name}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em]" style={{ color: theme.colors.muted }}>
              {categoryLabels[design.category]}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center max-w-xs">
        <p className="text-sm" style={{ color: theme.colors.muted }}>
          Ваше приглашение будет выглядеть в этом стиле — с вашими именами, датой,
          таймером и подтверждением гостей.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button href={`/order?design=${design.slug}`} size="lg">
            Хочу такое же
          </Button>
          <Button href="/catalog" variant="secondary" size="lg">
            Назад в каталог
          </Button>
        </div>
      </div>
    </div>
  );
}
