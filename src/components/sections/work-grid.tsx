import { Reveal } from "@/components/shared/reveal";
import { TextLink } from "@/components/shared/text-link";
import { lines } from "@/data/lines";

import { WorkCard } from "./work-card";

/** Home work section (origo): 2-column grid of the six product lines. */
export function WorkGrid() {
  return (
    <section aria-labelledby="karya-pilihan" className="container-page section-y">
      <div className="mb-6 flex items-end justify-between gap-4 border-t border-line pt-4 md:mb-8">
        <h2 id="karya-pilihan" className="text-label text-muted">
          Karya pilihan
        </h2>
        <TextLink href="/karya/" tone="quiet" arrow="right" className="-my-3">
          Semua karya
        </TextLink>
      </div>
      <ul className="grid gap-x-4 gap-y-10 md:grid-cols-2 md:gap-y-14">
        {lines.map((line, i) => (
          <Reveal as="li" key={line.slug} delay={(i % 2) * 0.06}>
            <WorkCard line={line} sizes="(min-width: 1440px) 692px, (min-width: 810px) 50vw, 100vw" />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
