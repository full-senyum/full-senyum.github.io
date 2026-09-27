import type { Metadata } from "next";

import { Faq } from "@/components/shared/faq";
import { PageTitle } from "@/components/shared/page-title";
import { WorkList } from "@/components/sections/work-list";

const intro =
  "Sebagian hasil produksi untuk perusahaan, instansi, dan brand yang telah bekerja sama dengan kami.";

export const metadata: Metadata = {
  title: "Karya",
  description: intro,
  alternates: { canonical: "/karya/" },
  openGraph: { title: "Karya — Full Senyum", description: intro, url: "/karya/" },
};

export default function KaryaPage() {
  return (
    <>
      <PageTitle title="Karya" intro={intro} />
      <WorkList />
      <Faq />
    </>
  );
}
