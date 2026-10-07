import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {/* Шапка теперь fixed на всех страницах (sticky ломается из-за overflow-x:hidden на body/html) —
          компенсируем её высоту отступом сверху. Hero на главной сам «съедает» этот отступ обратно,
          чтобы прозрачная шапка лежала поверх него вплотную к краю экрана. */}
      <main className="flex-1 pt-16 md:pt-[76px]">{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
