import { getInviteWithKey } from "@/lib/invites-server";
import { HostDashboard } from "@/components/host/HostDashboard";

export const metadata = { title: "Для хозяев тоя", robots: { index: false, follow: false } };

const DEMO_INVITE = {
  slug: "demo",
  title: "Айбек & Айжан",
  eventDate: "2027-06-12",
};

export default async function HostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ key?: string }>;
}) {
  const { slug } = await params;
  const { key } = await searchParams;

  if (slug === "demo") {
    return <HostDashboard slug="demo" title={DEMO_INVITE.title} eventDate={DEMO_INVITE.eventDate} hostKey="" isDemo />;
  }

  const invite = getInviteWithKey(slug);
  const authorized = Boolean(invite) && Boolean(key) && key === invite?.hostKey;

  if (!authorized || !invite) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F0E6] px-6 text-center">
        <div>
          <h1 className="text-2xl" style={{ fontFamily: "var(--font-cormorant), serif", color: "#2A0C12" }}>
            Ссылка недействительна
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#6A4A48" }}>
            Проверьте ссылку, которую вам прислали, или свяжитесь с нами.
          </p>
        </div>
      </div>
    );
  }

  return (
    <HostDashboard slug={invite.slug} title={invite.title} eventDate={invite.eventDate} hostKey={key as string} />
  );
}
