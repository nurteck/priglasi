import { notFound } from "next/navigation";
import { getDesignBySlug, designs } from "@/content/designs";
import { getDemoInvitation } from "@/content/invitations/demo";
import { getTheme } from "@/themes";
import { InvitationRenderer } from "@/components/invitation/InvitationRenderer";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export function generateStaticParams() {
  return designs.map((d) => ({ design: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ design: string }>;
}): Promise<Metadata> {
  const { design: slug } = await params;
  const design = getDesignBySlug(slug);
  if (!design) return {};
  return pageMetadata({
    title: `Демо: ${design.name}`,
    description: `Живое демо приглашения «${design.name}» — посмотрите, как оно выглядит для гостей.`,
    path: `/demo/${slug}`,
    image: `/demo/${slug}/opengraph-image`,
  });
}

export default async function DemoPage({ params }: { params: Promise<{ design: string }> }) {
  const { design: slug } = await params;
  const design = getDesignBySlug(slug);
  if (!design) notFound();

  const invitation = getDemoInvitation(design.demoInvitation);
  if (!invitation) notFound();

  const theme = getTheme(invitation.themeId);

  return <InvitationRenderer invitation={invitation} theme={theme} />;
}
