import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { LOGO_STACKED } from "@/components/brand/logo-paths";
import { site } from "@/data/site";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/**
 * One image with a `.png` id, so the static export writes
 * `out/opengraph-image/card.png`. (An extensionless file would be served by
 * GitHub Pages as application/octet-stream, which social crawlers reject.)
 */
export function generateImageMetadata() {
  return [
    {
      id: "card.png",
      alt: "Full Senyum — Cetak & souvenir untuk kebutuhan bisnis Anda",
      size,
      contentType: "image/png",
    },
  ];
}

const NAVY = "#0D1B3E";
const MUTED = "#5B6577";
const LINE = "#E3E6EB";

/** Static social card: white, navy stacked logo left, tagline right, a hairline. */
export default async function OpengraphImage() {
  const semibold = await readFile(join(process.cwd(), "src/fonts/switzer/Switzer-Semibold.ttf"));
  const [, , vbWidth, vbHeight] = LOGO_STACKED.viewBox.split(/[\s,]+/).map(Number);
  const logoWidth = 400;
  const logoHeight = Math.round((logoWidth * vbHeight) / vbWidth);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#FFFFFF",
          padding: "0 88px",
          fontFamily: "Switzer",
        }}
      >
        <div style={{ display: "flex", width: 440, justifyContent: "flex-start" }}>
          <svg
            width={logoWidth}
            height={logoHeight}
            viewBox={LOGO_STACKED.viewBox}
            fill={NAVY}
            xmlns="http://www.w3.org/2000/svg"
          >
            {LOGO_STACKED.letters.map((d, i) => (
              <path key={i} d={d} />
            ))}
            <path d={LOGO_STACKED.smile} />
          </svg>
        </div>
        <div style={{ width: 1, height: 360, background: LINE, margin: "0 64px" }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 50, lineHeight: 1.2, color: NAVY, fontWeight: 600 }}>
            {site.tagline}
          </div>
          <div style={{ marginTop: 28, fontSize: 24, lineHeight: 1.4, color: MUTED, fontWeight: 600 }}>
            {site.serviceArea}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Switzer", data: semibold, weight: 600, style: "normal" }],
    },
  );
}
