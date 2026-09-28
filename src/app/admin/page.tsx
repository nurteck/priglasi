import { Logo } from "@/components/layout/Logo";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { Order } from "@/types";

export const metadata = { title: "Админка — Салтанат", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = getSupabaseAdminClient();
  let orders: Order[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    orders = (data ?? []).map((o) => ({
      id: o.id,
      designSlug: o.design_slug ?? undefined,
      designName: o.design_name ?? undefined,
      packageId: o.package_id,
      eventType: o.event_type,
      namesFirst: o.names_first,
      namesSecond: o.names_second ?? undefined,
      date: o.event_date,
      time: o.event_time,
      venue: o.venue,
      address: o.address,
      hosts: o.hosts,
      lang: o.lang,
      wishes: o.wishes ?? undefined,
      clientName: o.client_name,
      phone: o.phone,
      total: o.total,
      status: o.status,
      createdAt: o.created_at,
    }));
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Logo />
          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="font-heading text-2xl mb-1">Заказы</h1>
        <p className="text-muted text-sm mb-6">
          {supabase ? `Всего заказов: ${orders.length}` : "Supabase не настроен — заказы не сохраняются в базу."}
        </p>
        <div className="rounded-2xl bg-white border border-black/5 p-4">
          <OrdersTable orders={orders} />
        </div>
      </div>
    </div>
  );
}
