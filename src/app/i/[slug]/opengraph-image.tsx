import { ImageResponse } from "next/og";
import { getInvitation } from "@/content/invitations";
import { getTheme } from "@/themes";
import { siteConfig } from "@/site.config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const invitation = getInvitation(slug);
  const theme = invitation ? getTheme(invitation.themeId) : null;

  const names = invitation
    ? [invitation.names.first, invitation.names.second].filter(Boolean).join(" & ")
    : siteConfig.brandName;
  const dateLabel = invitation
    ? new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(
        new Date(invitation.date)
      )
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: theme?.colors.bg ?? "#FBF6EE",
          color: theme?.colors.text ?? "#2A1B1E",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: theme?.colors.accent ?? "#7A1F2B" }}>
          {siteConfig.brandName}
        </div>
        <div style={{ fontSize: 84, marginTop: 24, textAlign: "center", padding: "0 60px" }}>{names}</div>
        <div style={{ fontSize: 32, marginTop: 20, color: theme?.colors.muted ?? "#7A6A63" }}>{dateLabel}</div>
      </div>
    ),
    { ...size }
  );
}
