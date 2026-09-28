import { ImageResponse } from "next/og";
import { getDesignBySlug } from "@/content/designs";
import { getTheme } from "@/themes";
import { siteConfig } from "@/site.config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ design: string }> }) {
  const { design: slug } = await params;
  const design = getDesignBySlug(slug);
  const theme = design ? getTheme(design.themeId) : null;

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
          {siteConfig.brandName} · Демо
        </div>
        <div style={{ fontSize: 76, marginTop: 24, textAlign: "center", padding: "0 60px" }}>
          {design?.name ?? siteConfig.brandName}
        </div>
      </div>
    ),
    { ...size }
  );
}
