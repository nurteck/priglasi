import { notFound } from "next/navigation";
import { CheckCircle2, XCircle, Users, Download } from "lucide-react";
import { getInvitation } from "@/content/invitations";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { Rsvp } from "@/types";
import { GuestsTable } from "@/components/invitation/GuestsTable";

export const metadata = { title: "Список гостей — Салтанат", robots: { index: false, follow: false } };

export default async function GuestsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ key?: string }>;
}) {
  const { slug } = await params;
  const { key } = await searchParams;

  const invitation = getInvitation(slug);
  if (!invitation || !invitation.guestsKey) notFound();
  if (!key || key !== invitation.guestsKey) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-heading text-xl">Доступ ограничён</h1>
          <p className="mt-2 text-muted text-sm">Ссылка на список гостей должна содержать правильный ключ доступа.</p>
        </div>
      </div>
    );
  }

  const supabase = getSupabaseAdminClient();
  let rsvps: Rsvp[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("rsvps")
      .select("id, invitation_slug, name, attending, guests, wish, created_at")
      .eq("invitation_slug", slug)
      .order("created_at", { ascending: false });
    rsvps = (data ?? []).map((r) => ({
      id: r.id,
      invitationSlug: r.invitation_slug,
      name: r.name,
      attending: r.attending,
      guests: r.guests,
      wish: r.wish ?? undefined,
      createdAt: r.created_at,
    }));
  }

  const coming = rsvps.filter((r) => r.attending);
  const notComing = rsvps.filter((r) => !r.attending);
  const totalGuests = coming.reduce((sum, r) => sum + r.guests, 0);

  const names = [invitation.names.first, invitation.names.second].filter(Boolean).join(" & ");

  return (
    <div className="min-h-screen bg-bg px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-2xl text-text">Список гостей — {names}</h1>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white border border-black/5 p-4 text-center">
            <CheckCircle2 className="mx-auto text-accent" size={22} aria-hidden="true" />
            <p className="mt-1 font-heading text-xl">{coming.length}</p>
            <p className="text-xs text-muted">придут</p>
          </div>
          <div className="rounded-xl bg-white border border-black/5 p-4 text-center">
            <XCircle className="mx-auto text-muted" size={22} aria-hidden="true" />
            <p className="mt-1 font-heading text-xl">{notComing.length}</p>
            <p className="text-xs text-muted">не придут</p>
          </div>
          <div className="rounded-xl bg-white border border-black/5 p-4 text-center">
            <Users className="mx-auto text-gold" size={22} aria-hidden="true" />
            <p className="mt-1 font-heading text-xl">{totalGuests}</p>
            <p className="text-xs text-muted">всего человек</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <a
            href={`/api/guests/${slug}/csv?key=${encodeURIComponent(key)}`}
            className="inline-flex items-center gap-2 min-h-11 px-4 rounded-full border border-accent text-accent text-sm font-medium"
          >
            <Download size={16} aria-hidden="true" /> Скачать Excel (CSV)
          </a>
        </div>

        <div className="mt-4">
          <GuestsTable rsvps={rsvps} />
        </div>
      </div>
    </div>
  );
}
