import { Reveal } from "@/components/shared/reveal";
import { clients } from "@/lib/media";

import { ClientLogo } from "./client-logo";

/**
 * Origo "Brand Origins": a static wall of flat monochrome marks on grey-50
 * tiles. 3 columns on phones and tablets, 7 from 1024px (21 = 7 × 3).
 */
export function ClientGrid() {
  return (
    <section aria-labelledby="klien-grid-title" className="container-page section-y [--logo-h:28px] md:[--logo-h:34px] xl:[--logo-h:40px]">
      <Reveal>
        <h2 id="klien-grid-title" className="text-h3 whitespace-pre-line text-navy">
          {"Dipercaya bank, rumah sakit,\ninstansi, dan brand ritel."}
        </h2>
      </Reveal>
      <Reveal as="ul" className="mt-10 grid grid-cols-3 gap-2 md:mt-14 lg:grid-cols-7">
        {clients.map((client) => (
          <li
            key={client.slug}
            className="flex aspect-[4/3] items-center justify-center bg-grey-50 p-3 text-center transition-colors duration-200 hover:bg-grey-100 md:p-4"
          >
            <ClientLogo client={client} variant="tile" className="max-w-full" />
          </li>
        ))}
      </Reveal>
    </section>
  );
}
