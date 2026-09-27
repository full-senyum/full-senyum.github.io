import type { Metadata } from "next";

import { Faq } from "@/components/shared/faq";
import { PageTitle } from "@/components/shared/page-title";
import { Reveal } from "@/components/shared/reveal";
import { WaButton } from "@/components/shared/wa-button";
import { ProductPicker } from "@/components/sections/product-picker";
import { Showreel } from "@/components/sections/showreel";
import { mapsEmbed, site, waLink } from "@/data/site";
import { getStock } from "@/lib/media";

const intro =
  "Hubungi admin untuk penawaran harga, contoh bahan, dan konsultasi kebutuhan cetak serta merchandise Anda.";

export const metadata: Metadata = {
  title: "Kontak",
  description: intro,
  alternates: { canonical: "/kontak/" },
  openGraph: { title: "Kontak — Full Senyum", description: intro, url: "/kontak/" },
};

export default function KontakPage() {
  return (
    <>
      <PageTitle title="Kontak" intro={intro} />

      <section aria-label="Kontak dan alamat" className="container-page section-y">
        <Reveal className="grid gap-y-12 border-t border-line pt-6 md:grid-cols-12 md:gap-x-5 md:pt-8">
          <div className="md:col-span-7">
            <h2 className="text-label text-muted">WhatsApp</h2>
            <p className="text-display mt-2 text-navy tabular-nums md:mt-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center underline decoration-transparent decoration-2 underline-offset-8 transition-colors duration-150 hover:decoration-navy"
              >
                {site.whatsapp.display}
                <span className="sr-only"> (membuka WhatsApp)</span>
              </a>
            </p>
            <p className="text-title mt-1 text-muted">{site.email}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-8">
              <WaButton size="lg" label="Chat sekarang" />
              <p className="text-label text-muted">Admin membalas lewat WhatsApp.</p>
            </div>
          </div>
          <div className="md:col-span-5">
            <h2 className="text-label text-muted">Alamat</h2>
            <address className="text-title mt-2 not-italic text-navy md:mt-3">
              {site.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </Reveal>
      </section>

      <ProductPicker />

      <section aria-label="Peta lokasi" className="container-page section-y">
        <Reveal>
          <div className="aspect-[4/3] overflow-hidden bg-grey-50 md:aspect-video">
            <iframe
              src={mapsEmbed}
              title="Peta lokasi Full Senyum di Jl. Jendral Sudirman, Kota Bengkulu"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0 grayscale"
            />
          </div>
        </Reveal>
      </section>

      <Showreel
        image={getStock("contact-parcel")}
        aspectClassName="aspect-[4/3] md:aspect-[1400/700]"
      />

      <Faq />
    </>
  );
}
