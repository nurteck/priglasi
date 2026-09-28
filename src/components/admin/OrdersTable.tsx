"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import clsx from "clsx";
import type { Order, OrderStatus } from "@/types";
import { waLink } from "@/lib/whatsapp";

const statusLabels: Record<OrderStatus, string> = {
  new: "Новый",
  in_progress: "В работе",
  done: "Готово",
  paid: "Оплачен",
};

const statusStyles: Record<OrderStatus, string> = {
  new: "bg-black/5 text-text",
  in_progress: "bg-gold/20 text-gold",
  done: "bg-accent-soft text-accent",
  paid: "bg-accent text-white",
};

export function OrdersTable({ orders: initial }: { orders: Order[] }) {
  const [orders, setOrders] = useState(initial);

  async function changeStatus(id: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  if (orders.length === 0) {
    return <p className="text-center text-muted py-16">Заказов пока нет.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[860px]">
        <thead>
          <tr className="text-left text-muted text-xs">
            <th className="px-3 py-2">Дата</th>
            <th className="px-3 py-2">Клиент</th>
            <th className="px-3 py-2">Дизайн / пакет</th>
            <th className="px-3 py-2">Той</th>
            <th className="px-3 py-2">Сумма</th>
            <th className="px-3 py-2">Статус</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-black/5">
              <td className="px-3 py-3 text-muted">{new Date(o.createdAt).toLocaleDateString("ru-RU")}</td>
              <td className="px-3 py-3">
                <p className="font-medium">{o.clientName}</p>
                <p className="text-xs text-muted">{o.phone}</p>
              </td>
              <td className="px-3 py-3">
                <p>{o.designName ?? "—"}</p>
                <p className="text-xs text-muted">{o.packageId}</p>
              </td>
              <td className="px-3 py-3">
                <p>{o.namesFirst}{o.namesSecond ? ` и ${o.namesSecond}` : ""}</p>
                <p className="text-xs text-muted">{o.date} {o.time}</p>
              </td>
              <td className="px-3 py-3">{o.total} сом</td>
              <td className="px-3 py-3">
                <select
                  value={o.status}
                  onChange={(e) => changeStatus(o.id, e.target.value as OrderStatus)}
                  className={clsx("rounded-full text-xs px-3 py-1.5 border-0 min-h-8", statusStyles[o.status])}
                >
                  {Object.entries(statusLabels).map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-3">
                <a
                  href={waLink(`Здравствуйте, ${o.clientName}! Пишем по вашей заявке на приглашение.`, o.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent text-xs min-h-11"
                  aria-label={`Написать ${o.clientName} в WhatsApp`}
                >
                  <MessageCircle size={16} aria-hidden="true" /> WhatsApp
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
