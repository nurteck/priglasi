import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

interface PageMetaParams {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

/** Собирает Metadata (title/description/OG) для страницы с учётом site.config. */
export function pageMetadata({ title, description, path = "", image }: PageMetaParams): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? `${siteConfig.url}/opengraph-image`;
  return {
    title: `${title} — ${siteConfig.brandName}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${siteConfig.brandName}`,
      description,
      url,
      siteName: siteConfig.brandName,
      images: [{ url: ogImage }],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteConfig.brandName}`,
      description,
      images: [ogImage],
    },
  };
}

/** JSON-LD LocalBusiness для главной страницы. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.brandName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: `+${siteConfig.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressCountry: "KG",
    },
    openingHours: siteConfig.hours,
    sameAs: [
      `https://instagram.com/${siteConfig.instagram}`,
      `https://t.me/${siteConfig.telegram}`,
    ],
  };
}
