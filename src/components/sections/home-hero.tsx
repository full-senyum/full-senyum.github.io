import { Logo } from "@/components/brand/logo";
import { TextLink } from "@/components/shared/text-link";
import { WaButton } from "@/components/shared/wa-button";

/**
 * Giant wordmark hero (origo): the logo is the headline. Horizontal lockup at
 * full container width from 810px, the stacked original on phones.
 */
export function HomeHero() {
  return (
    <section className="container-page pt-[calc(var(--header-h)+40px)] md:pt-[calc(var(--header-h)+64px)] xl:pt-[calc(var(--header-h)+88px)]">
      <h1 className="sr-only">Full Senyum — Cetak &amp; souvenir untuk kebutuhan bisnis Anda</h1>
      <Logo variant="stacked" animate decorative className="h-auto w-full text-navy md:hidden" />
      <Logo variant="horizontal" animate decorative className="hidden h-auto w-full text-navy md:block" />

      <div className="mt-10 grid gap-y-8 md:mt-16 md:grid-cols-12 md:items-end md:gap-x-5 xl:mt-24">
        <p className="text-h4 animate-rise max-w-[800px] text-navy [animation-delay:450ms] md:col-span-8 xl:col-span-7">
          Cetak, merchandise, dan souvenir korporat yang dipersonalisasi dengan identitas brand
          Anda. Dikerjakan di Bengkulu, dikirim ke seluruh Indonesia.
        </p>
        <div className="animate-rise flex flex-wrap items-center gap-x-7 gap-y-3 [animation-delay:550ms] md:col-span-4 md:flex-col md:items-start xl:col-span-5 xl:flex-row xl:items-center">
          <WaButton size="lg" label="Chat WhatsApp" />
          <TextLink href="/karya/" arrow="right">
            Lihat karya
          </TextLink>
        </div>
      </div>
    </section>
  );
}
