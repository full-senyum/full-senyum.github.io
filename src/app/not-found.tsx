import type { Metadata } from "next";

import { PageTitle } from "@/components/shared/page-title";
import { TextLink } from "@/components/shared/text-link";
import { WaButton } from "@/components/shared/wa-button";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <PageTitle title="404" intro="Halaman yang Anda cari tidak ada atau sudah dipindahkan.">
        <div className="animate-rise mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 [animation-delay:180ms] md:mt-12">
          <WaButton size="lg" label="Chat WhatsApp" />
          <TextLink href="/" arrow="right">
            Kembali ke beranda
          </TextLink>
        </div>
      </PageTitle>
      <div className="pb-16 md:pb-24 xl:pb-[120px]" />
    </>
  );
}
