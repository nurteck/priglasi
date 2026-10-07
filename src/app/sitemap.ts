import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { getCatalogInvites } from "@/lib/invites";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/catalog", "/order", "/about", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  // Приглашения клиентов (type=client) — приватные ссылки, в sitemap не попадают.
  const inviteRoutes = getCatalogInvites().map((invite) => ({
    url: `${siteConfig.url}/invites/${invite.slug}/`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...inviteRoutes];
}
