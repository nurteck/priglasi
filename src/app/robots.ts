import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/i/*/guests"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
