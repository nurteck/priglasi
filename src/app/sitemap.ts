import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { designs } from "@/content/designs";
import { invitations } from "@/content/invitations";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/catalog", "/order", "/about", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const demoRoutes = designs.map((d) => ({
    url: `${siteConfig.url}/demo/${d.slug}`,
    lastModified: new Date(),
  }));

  // Приглашения клиентов не индексируем поисковиками (см. robots.ts),
  // но добавляем в sitemap для удобства навигации внутри проекта.
  const invitationRoutes = Object.keys(invitations).map((slug) => ({
    url: `${siteConfig.url}/i/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...demoRoutes, ...invitationRoutes];
}
