import type { Metadata } from "next";

import { Faq } from "@/components/shared/faq";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { HomeHero } from "@/components/sections/home-hero";
import { HowToOrder } from "@/components/sections/how-to-order";
import { Metrics } from "@/components/sections/metrics";
import { ProcessBento } from "@/components/sections/process-bento";
import { Services } from "@/components/sections/services";
import { Showreel } from "@/components/sections/showreel";
import { Statement } from "@/components/sections/statement";
import { WorkGrid } from "@/components/sections/work-grid";
import { site } from "@/data/site";
import { getStock } from "@/lib/media";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.url,
  description: site.description,
  image: `${site.url}/opengraph-image/card.png`,
  telephone: `+${site.whatsapp.e164}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Jendral Sudirman, Pintu Batu",
    addressLocality: "Kota Bengkulu",
    addressRegion: "Bengkulu",
    postalCode: "38115",
    addressCountry: "ID",
  },
  areaServed: "ID",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WorkGrid />
      <Statement />
      <ClientMarquee />
      <Metrics />
      <ProcessBento />
      <Services />
      <HowToOrder />
      <Showreel image={getStock("home-showreel")} />
      <Faq />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
