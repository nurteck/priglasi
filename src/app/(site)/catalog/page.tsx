import { Suspense } from "react";
import { CatalogClient } from "@/components/catalog/CatalogClient";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Каталог дизайнов",
  description: "12 дизайнов приглашений на свадьбу, кыз узатуу, сүннөт той, тушоо той и юбилей.",
  path: "/catalog",
});

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionTitle
        eyebrow="Каталог"
        title="Все дизайны"
        subtitle="Выберите категорию тоя и стиль, который откликается именно вам."
      />

      <div className="mt-10">
        <Suspense fallback={<p className="text-center text-muted">Загрузка…</p>}>
          <CatalogClient />
        </Suspense>
      </div>
    </div>
  );
}
