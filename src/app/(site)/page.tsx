import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { PopularDesigns } from "@/components/home/PopularDesigns";
import { Features } from "@/components/home/Features";
import { Packages } from "@/components/home/Packages";
import { Steps } from "@/components/home/Steps";
import { Reviews } from "@/components/home/Reviews";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata = pageMetadata({
  title: siteConfig.tagline,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Suspense fallback={null}>
        <PopularDesigns />
      </Suspense>
      <Features />
      <Packages />
      <Steps />
      <Reviews />
      <Faq />
      <FinalCta />
    </>
  );
}
