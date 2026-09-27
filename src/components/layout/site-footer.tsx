import Link from "next/link";
import { IconArrowUp } from "@tabler/icons-react";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/logo";
import { WaButton } from "@/components/shared/wa-button";
import { lines } from "@/data/lines";
import { nav, site, waLink } from "@/data/site";

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center text-label text-white/90 underline-offset-[6px] transition-colors duration-150 hover:text-white hover:underline md:min-h-9";

function FooterColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-label mb-3 text-on-navy-muted md:mb-4">{title}</h2>
      {children}
    </div>
  );
}

/**
 * Navy footer: CTA line, three link columns, the wordmark spanning the full
 * container (origo footer) and a small legal row.
 */
export function SiteFooter() {
  return (
    <footer id="site-footer" className="on-navy bg-navy text-white">
      <div className="container-page pt-16 md:pt-24 xl:pt-[120px]">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-5">
          <p className="text-display text-white lg:col-span-7">
            Mari bikin souvenir yang bikin senyum.
          </p>
          <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:justify-end">
            <WaButton variant="inverse" size="lg" label="Chat admin di WhatsApp" />
            <div className="text-label text-on-navy-muted">
              <p className="tabular-nums">{site.whatsapp.display}</p>
              <p>{site.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 border-t border-on-navy-line pt-10 md:mt-24 md:grid-cols-12">
          <FooterColumn title="Halaman" className="md:col-span-3">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Produk" className="md:col-span-4">
            <ul>
              {lines.map((line) => (
                <li key={line.slug}>
                  <Link href={`/karya/${line.slug}/`} className={linkClass}>
                    {line.title}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Kontak" className="col-span-2 md:col-span-5">
            <ul>
              <li>
                <a href={waLink()} target="_blank" rel="noopener" className={`${linkClass} tabular-nums`}>
                  WhatsApp {site.whatsapp.display}
                  <span className="sr-only"> (membuka WhatsApp)</span>
                </a>
              </li>
            </ul>
            <p className="text-label text-on-navy-muted">{site.email}</p>
            <address className="text-label mt-3 not-italic text-on-navy-muted">
              {site.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </FooterColumn>
        </div>

        <Logo decorative className="mt-16 h-auto w-full text-white md:mt-24" />

        <div className="text-label mt-8 flex flex-col gap-1 border-t border-on-navy-line py-6 text-on-navy-muted md:mt-10 md:flex-row md:items-center md:justify-between md:gap-6">
          <p>© 2026 Full Senyum</p>
          <p>{site.serviceArea}</p>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-1.5 transition-colors duration-150 hover:text-white"
          >
            Kembali ke atas
            <IconArrowUp stroke={1.5} className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
