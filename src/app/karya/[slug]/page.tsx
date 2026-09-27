import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LabelSection } from "@/components/shared/label-section";
import { Reveal } from "@/components/shared/reveal";
import { TextLink } from "@/components/shared/text-link";
import { WaButton } from "@/components/shared/wa-button";
import { Gallery } from "@/components/sections/gallery";
import { WorkCard } from "@/components/sections/work-card";
import { getLine, lines, nextLines } from "@/data/lines";
import { getPhotos } from "@/lib/media";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return lines.map((line) => ({ slug: line.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const line = getLine(slug);
  if (!line) return {};
  return {
    title: line.title,
    description: line.description,
    alternates: { canonical: `/karya/${line.slug}/` },
    openGraph: {
      title: `${line.title} — Full Senyum`,
      description: line.description,
      url: `/karya/${line.slug}/`,
    },
  };
}

export default async function KaryaDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const line = getLine(slug);
  if (!line) notFound();

  const photos = getPhotos(line.photos);
  const meta = [
    { label: "Kategori", value: line.category },
    { label: "Klien", value: line.clients.join(", ") },
    { label: "Teknik", value: line.technique },
  ];

  return (
    <article>
      <header className="container-page pt-[calc(var(--header-h)+40px)] pb-10 md:pt-[calc(var(--header-h)+64px)] md:pb-14 xl:pt-[calc(var(--header-h)+88px)] xl:pb-16">
        <nav aria-label="Breadcrumb" className="animate-rise">
          <ol className="text-label flex flex-wrap items-center gap-x-2 text-muted">
            <li>
              <Link
                href="/karya/"
                className="inline-flex min-h-11 min-w-11 items-center underline-offset-[6px] transition-colors duration-150 hover:text-navy hover:underline"
              >
                Karya
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-navy">
              {line.title}
            </li>
          </ol>
        </nav>
        <h1 className="text-display animate-rise mt-4 text-navy [animation-delay:60ms] md:mt-6">
          {line.title}
        </h1>

        <dl className="animate-rise mt-8 grid gap-y-5 border-t border-line pt-5 [animation-delay:120ms] md:mt-12 md:grid-cols-12 md:gap-x-5 md:pt-6">
          {meta.map((item, i) => (
            <div
              key={item.label}
              className={
                i === 0
                  ? "md:col-span-3"
                  : i === 1
                    ? "md:col-span-6"
                    : "md:col-span-3 md:text-right"
              }
            >
              <dt className="text-label text-muted">{item.label}</dt>
              <dd className="text-body-strong mt-1 text-navy">{item.value}</dd>
            </div>
          ))}
        </dl>

        <p className="text-body-lg animate-rise mt-8 max-w-[720px] text-navy [animation-delay:180ms] md:mt-12">
          {line.description}
        </p>
      </header>

      <Gallery photos={photos} title={line.title} />

      <section aria-labelledby="bisa-dibuat" className="container-page section-y mt-8 md:mt-12">
        <Reveal>
          <LabelSection label="Yang bisa kami buat" labelId="bisa-dibuat">
            <ul className="border-b border-line">
              {line.items.map((item) => (
                <li key={item} className="text-title border-t border-line py-4 text-navy md:py-5">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 md:mt-10">
              <WaButton
                product={line.title}
                size="lg"
                label={`Tanya ${line.title} di WhatsApp`}
                className="max-lg:hidden"
              />
              <WaButton
                product={line.title}
                size="lg"
                label="Tanya di WhatsApp"
                className="lg:hidden"
              />
              <TextLink href="/karya/" arrow="right">
                Lihat semua karya
              </TextLink>
            </div>
          </LabelSection>
        </Reveal>
      </section>

      <section aria-labelledby="karya-lainnya" className="container-page section-y">
        <div className="mb-6 flex items-end justify-between gap-4 border-t border-line pt-4 md:mb-8">
          <h2 id="karya-lainnya" className="text-label text-muted">
            Karya lainnya
          </h2>
          <TextLink href="/karya/" tone="quiet" arrow="right" className="-my-3">
            Semua karya
          </TextLink>
        </div>
        <ul className="grid gap-x-4 gap-y-10 md:grid-cols-3">
          {nextLines(line.slug, 3).map((other, i) => (
            <Reveal as="li" key={other.slug} delay={i * 0.06}>
              <WorkCard line={other} sizes="(min-width: 1440px) 456px, (min-width: 810px) 33vw, 100vw" />
            </Reveal>
          ))}
        </ul>
      </section>
    </article>
  );
}
