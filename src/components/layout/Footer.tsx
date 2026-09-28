import Link from "next/link";
import { Send, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/site.config";

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/5 mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm text-muted">
              Цифровые сайты-приглашения на тои: свадьба, кыз узатуу, сүннөт той, тушоо той и юбилей.
              Готово за 1–2 дня.
            </p>
            <Button href="/order" size="md" className="mt-5">
              Заказать
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-medium text-text mb-3">Разделы</h3>
              <ul className="space-y-2 text-sm text-muted">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-accent transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text mb-3">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <Phone size={14} aria-hidden="true" />
                  <a href={`tel:+${siteConfig.whatsapp}`} className="hover:text-accent transition-colors">
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li>{siteConfig.city}</li>
                <li>{siteConfig.hours}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text mb-3">Мы на связи</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <a
                    href={`https://instagram.com/${siteConfig.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <InstagramIcon size={14} /> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={`https://t.me/${siteConfig.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <Send size={14} aria-hidden="true" /> Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-black/5 text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.brandName}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
