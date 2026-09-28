import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#FBF6EE",
          color: "#2A1B1E",
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            border: "3px solid #B8873A",
            color: "#B8873A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
          }}
        >
          С
        </div>
        <div style={{ fontSize: 64, marginTop: 28 }}>{siteConfig.brandName}</div>
        <div style={{ fontSize: 30, marginTop: 12, color: "#7A6A63" }}>{siteConfig.tagline}</div>
      </div>
    ),
    { ...size }
  );
}
