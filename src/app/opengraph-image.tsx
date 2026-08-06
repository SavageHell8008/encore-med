import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/constants";

export const alt = `${BRAND.name} — ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card, generated at build time.
 *
 * No custom font is loaded: fetching one would add a network dependency to
 * image generation for a marginal typographic gain. What makes the card
 * recognisable in a feed is the light green wash and the green chips, not the
 * typeface — most cards in a healthcare feed are white, so the tint carries it.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #FFFFFF 0%, #F4FBF7 55%, #EAF6F0 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "2px solid rgba(4, 120, 87, 0.375)",
              background: "rgba(4, 120, 87, 0.090)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: 5, background: "#047857" }} />
          </div>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>
            <span style={{ color: "#0B1F17" }}>Encone</span>
            <span style={{ color: "#047857" }}>Med</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              color: "#0B1F17",
              maxWidth: 940,
            }}
          >
            Medical equipment on rent &amp; sale in Delhi
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              color: "#33544A",
              maxWidth: 900,
              display: "flex",
            }}
          >
            Hospital beds · Oxygen concentrators · BiPAP · Home ICU setups
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Rent or buy", "Sanitised every rental", "Installed in 4 hours"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 999,
                border: "2px solid rgba(21, 128, 61, 0.338)",
                background: "rgba(21, 128, 61, 0.075)",
                color: "#15803D",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
