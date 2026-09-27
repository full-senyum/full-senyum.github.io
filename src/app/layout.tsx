import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { MobileWaBar } from "@/components/layout/mobile-wa-bar";
import { Providers } from "@/components/layout/providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/data/site";

import "./globals.css";

// Switzer (Fontshare, ITF Free Font License — see src/fonts/switzer/LICENSE-FFL.txt).
const switzer = localFont({
  src: [
    { path: "../fonts/switzer/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/switzer/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/switzer/Switzer-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/switzer/Switzer-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const homeTitle = "Full Senyum — Cetak & souvenir untuk kebutuhan bisnis Anda";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: homeTitle, template: "%s — Full Senyum" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: site.name,
    title: homeTitle,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: homeTitle, description: site.description },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={switzer.variable} data-scroll-behavior="smooth">
      <body>
        {/* Without JS, reveal-on-scroll content (SSR'd at opacity 0) must still show. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<style>[style*="opacity:0"]{opacity:1!important;transform:none!important}</style>',
          }}
        />
        <div id="top" />
        <a
          href="#konten"
          className="text-label-strong sr-only rounded-full bg-navy px-5 py-3 text-white focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-3 focus-visible:z-[60]"
        >
          Lewati ke konten
        </a>
        <Providers>
          <SiteHeader />
          <main id="konten" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <MobileWaBar />
        </Providers>
      </body>
    </html>
  );
}
