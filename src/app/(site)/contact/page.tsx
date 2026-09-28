import { Phone, Clock, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { Send } from "lucide-react";
import { siteConfig } from "@/site.config";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Контакты",
  description: `Свяжитесь с ${siteConfig.brandName} в WhatsApp, Instagram или Telegram — ответим быстро.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <SectionTitle eyebrow="Связаться" title="Контакты" subtitle="Ответим в течение рабочего дня." />

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <Phone size={18} className="text-accent mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium">Телефон / WhatsApp</p>
              <a href={`tel:+${siteConfig.whatsapp}`} className="text-sm text-muted hover:text-accent">
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} className="text-accent mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium">Часы работы</p>
              <p className="text-sm text-muted">{siteConfig.hours}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-accent mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium">Город</p>
              <p className="text-sm text-muted">{siteConfig.city}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <InstagramIcon size={18} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium">Instagram</p>
              <a
                href={`https://instagram.com/${siteConfig.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-accent"
              >
                @{siteConfig.instagram}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Send size={18} className="text-accent mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium">Telegram</p>
              <a
                href={`https://t.me/${siteConfig.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-accent"
              >
                @{siteConfig.telegram}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-black/5 p-6">
          <h2 className="font-heading text-lg mb-4">Написать нам</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
