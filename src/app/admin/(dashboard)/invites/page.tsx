import { getAllInvitesWithKey } from "@/lib/invites-server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { categoryLabels } from "@/content/categories";
import { siteConfig } from "@/site.config";
import { InviteHostLink } from "@/components/admin/InviteHostLink";

export const metadata = { title: "Приглашения — Админка", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminInvitesPage() {
  const invites = getAllInvitesWithKey();

  const supabase = getSupabaseAdminClient();
  const guestCounts = new Map<string, number>();
  if (supabase) {
    const { data } = await supabase.from("guests").select("slug");
    for (const row of data ?? []) {
      guestCounts.set(row.slug, (guestCounts.get(row.slug) ?? 0) + 1);
    }
  }

  return (
    <div>
      <h1 className="font-heading text-2xl mb-1">Приглашения</h1>
      <p className="text-muted text-sm mb-6">
        Папки из public/invites — {invites.length} шт. Чтобы добавить новое, см. README.
      </p>

      {invites.length === 0 ? (
        <p className="text-sm text-muted">Пока нет ни одной папки с приглашением.</p>
      ) : (
        <div className="space-y-3">
          {invites.map((invite) => (
            <div key={invite.slug} className="rounded-2xl bg-white border border-black/5 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-lg text-text">{invite.title}</p>
                  <p className="text-xs text-muted">
                    {categoryLabels[invite.category]} · {invite.type === "catalog" ? "каталог" : "клиент"} ·{" "}
                    {invite.published ? "опубликовано" : "черновик"} · автор {invite.author} · той{" "}
                    {invite.eventDate}
                  </p>
                </div>
                <span className="rounded-full bg-black/5 px-3 py-1 text-xs text-text">
                  {guestCounts.get(invite.slug) ?? 0} гостей
                </span>
              </div>

              <div className="mt-3">
                <InviteHostLink
                  url={`${siteConfig.url}/host/${invite.slug}?key=${invite.hostKey}`}
                  title={invite.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
