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
    <Suspense fallback={null}>
      <OrderWizard />
    </Suspense>
  );
}
