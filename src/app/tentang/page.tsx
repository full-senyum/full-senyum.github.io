import type { Metadata } from "next";

import { Img } from "@/components/shared/img";
import { LabelSection } from "@/components/shared/label-section";
import { PageTitle } from "@/components/shared/page-title";
import { Reveal } from "@/components/shared/reveal";
import { ClientGrid } from "@/components/sections/client-grid";
import { HowToOrder } from "@/components/sections/how-to-order";
import { Services } from "@/components/sections/services";
import { Showreel } from "@/components/sections/showreel";
import { getStock } from "@/lib/media";

const intro =
  "Full Senyum adalah mitra cetak dan merchandise untuk perusahaan, instansi, dan brand.";

export const metadata: Metadata = {
  title: "Tentang",
  description: intro,
  alternates: { canonical: "/tentang/" },
  openGraph: { title: "Tentang — Full Senyum", description: intro, url: "/tentang/" },
};

export default function TentangPage() {
  const smile = getStock("about-smile");
  return (
    <>
      <PageTitle title="Tentang" intro={intro} />

      <section aria-labelledby="cerita-kami" className="container-page section-y">
        <Reveal>
          <LabelSection label="Cerita kami" labelId="cerita-kami">
            <div className="text-body-lg space-y-5 text-navy">
              <p>
                Kami menangani kebutuhan cetak dan merchandise perusahaan, dari materi promosi dan
                perlengkapan event hingga souvenir korporat. Semuanya bisa dipersonalisasi dengan
                logo dan identitas brand Anda.
              </p>
              <p>Kami berbasis di Kota Bengkulu dan mengirim pesanan ke seluruh Indonesia.</p>
            </div>
          </LabelSection>
        </Reveal>
      </section>

      <Showreel
        image={getStock("about-print")}
        aspectClassName="aspect-[4/3] md:aspect-video"
      />

      <section aria-labelledby="tekad-kami" className="container-page section-y">
        <Reveal>
          <h2 id="tekad-kami" className="text-label text-muted">
            Tekad kami
          </h2>
          <blockquote className="mt-6 md:mt-8">
            <p className="text-display max-w-[1100px] text-navy">
              Memberikan cetakan dan souvenir berkualitas secara konsisten dan tepat waktu, dengan
              proses yang praktis, untuk mendukung kesan terbaik bagi bisnis Anda.
            </p>
          </blockquote>
        </Reveal>
      </section>

      <Services />
      <ClientGrid />

      <section className="container-page section-y">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-5">
          {smile ? (
            <Reveal className="lg:col-span-5">
              <div className="aspect-[4/3] overflow-hidden bg-grey-50 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:aspect-[4/5]">
                <Img
                  image={smile}
                  sizes="(min-width: 1440px) 575px, (min-width: 1024px) 40vw, 100vw"
                  className="size-full"
                />
              </div>
            </Reveal>
          ) : null}
          <HowToOrder
            bare
            layout="pair"
            className={smile ? "lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7" : "lg:col-span-12"}
          />
        </div>
      </section>
    </>
  );
}
