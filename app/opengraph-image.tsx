import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — Nashville & Memphis Real Estate`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          backgroundColor: "#092c4a",
          color: "#ede6d8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 76,
            fontWeight: 600,
            letterSpacing: 6,
          }}
        >
          <span>ROWE</span>
          <span style={{ color: "#bfb091" }}>|</span>
          <span>WYSE</span>
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 24,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#bfb091",
          }}
        >
          Partners
        </div>
        <div
          style={{
            marginTop: 48,
            width: 90,
            height: 3,
            backgroundColor: "#bfb091",
          }}
        />
        <div
          style={{
            marginTop: 40,
            fontSize: 30,
            color: "#ede6d8cc",
            letterSpacing: 2,
          }}
        >
          Nashville &amp; Memphis Real Estate
        </div>
      </div>
    ),
    { ...size }
  );
}
