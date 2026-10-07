import { Suspense } from "react";
import { CatalogClient } from "@/components/catalog/CatalogClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Каталог дизайнов",
  description: "12 дизайнов приглашений на свадьбу, кыз узатуу, сүннөт той, тушоо той и юбилей.",
  path: "/catalog",
});

export default function CatalogPage() {
  return (
    <Suspense fallback={null}>
      <CatalogClient />
    </Suspense>
  );
}
