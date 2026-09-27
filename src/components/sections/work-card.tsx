import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

import { Img } from "@/components/shared/img";
import type { Line } from "@/data/lines";
import { getPhoto } from "@/lib/media";

type WorkCardProps = {
  line: Line;
  sizes: string;
  headingLevel?: "h2" | "h3";
};

/**
 * Origo home-grid card: a near-square image crop, then the title and the
 * category as plain muted text. Hover: slow zoom + an arrow slides in.
 */
export function WorkCard({ line, sizes, headingLevel: Heading = "h3" }: WorkCardProps) {
  const cover = getPhoto(line.photos[0]);
  return (
    <Link href={`/karya/${line.slug}/`} className="group block">
      <div className="relative aspect-[692/700] overflow-hidden bg-grey-50">
        {cover ? (
          <Img
            image={cover}
            alt=""
            sizes={sizes}
            className="size-full transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
          />
        ) : null}
      </div>
      <div className="mt-3 md:mt-4">
        <Heading className="text-h5 flex items-center gap-1.5 text-navy">
          <span>{line.title}</span>
          <IconArrowUpRight
            stroke={1.5}
            aria-hidden="true"
            className="size-5 shrink-0 -translate-x-1 opacity-0 transition-[opacity,transform] duration-300 ease-soft group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:size-6"
          />
        </Heading>
        <p className="text-body mt-0.5 text-muted">{line.category}</p>
      </div>
    </Link>
  );
}
