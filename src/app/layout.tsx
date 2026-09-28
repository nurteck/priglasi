import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope, Marck_Script } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { siteConfig } from "@/site.config";
import { pageMetadata, localBusinessJsonLd } from "@/lib/seo";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const marckScript = Marck_Script({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  ...pageMetadata({
    title: siteConfig.tagline,
    description: siteConfig.description,
  }),
  metadataBase: new URL(siteConfig.url),
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf6ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = localBusinessJsonLd();
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${manrope.variable} ${marckScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-body">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
