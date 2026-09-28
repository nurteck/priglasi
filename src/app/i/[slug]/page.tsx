import { notFound } from "next/navigation";
import { getInvitation } from "@/content/invitations";
import { getTheme } from "@/themes";
import { InvitationRenderer } from "@/components/invitation/InvitationRenderer";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const invitation = getInvitation(slug);
  if (!invitation) return {};
  const names = [invitation.names.first, invitation.names.second].filter(Boolean).join(" & ");
  return pageMetadata({
    title: `Приглашение: ${names}`,
    description: `Приглашение на той — ${names}. Откройте, чтобы посмотреть дату, место и подтвердить участие.`,
    path: `/i/${slug}`,
    image: `/i/${slug}/opengraph-image`,
  });
}

export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const invitation = getInvitation(slug);
  if (!invitation) notFound();

  const theme = getTheme(invitation.themeId);
  return <InvitationRenderer invitation={invitation} theme={theme} />;
}
