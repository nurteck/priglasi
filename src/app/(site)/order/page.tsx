import { Suspense } from "react";
import { OrderWizard } from "@/components/order/OrderWizard";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Заказать приглашение",
  description: "Оформите заявку на приглашение на той за 2–3 минуты — мы свяжемся с вами в WhatsApp.",
  path: "/order",
});

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-heading text-2xl sm:text-3xl text-text text-center">Оформить заказ</h1>
      <p className="mt-2 text-center text-muted text-sm">3 коротких шага — и заявка у нас в WhatsApp.</p>

      <div className="mt-10">
        <Suspense fallback={<p className="text-center text-muted">Загрузка…</p>}>
          <OrderWizard />
        </Suspense>
      </div>
    </div>
  );
}
