import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

import { Img } from "@/components/shared/img";
import { Reveal } from "@/components/shared/reveal";
import { lines } from "@/data/lines";
import { getPhotos, type Photo } from "@/lib/media";

/** One filmstrip slot: 148×194 at desktop, shrinking evenly on tablets. */
const slot = "aspect-[148/194] min-w-0 flex-[0_1_148px]";

const scrim =
  "pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(13,27,62,0.35))] opacity-0 transition-opacity duration-300 group-hover:opacity-100";

function Thumb({ photo, className, sizes }: { photo: Photo; className: string; sizes: string }) {
  return (
    <div className={`relative overflow-hidden bg-grey-50 ${className}`}>
      <Img image={photo} alt="" sizes={sizes} className="size-full" />
      <div aria-hidden="true" className={scrim} />
    </div>
  );
}

/**
 * Origo /work list: one link per row, zero gap, hairlines between. Text on
 * the left (index in its own narrow column); on the right a five-slot strip
 * (four photos + a detail tile with "+N foto" / "Lihat detail"). Phones show
 * two photos side by side.
 */
export function WorkList() {
  return (
    <section aria-label="Daftar karya" className="container-page pb-8 md:pb-12 xl:pb-[60px]">
      <ol className="border-b border-line">
        {lines.map((line) => {
          const photos = getPhotos(line.photos);
          return (
            <Reveal as="li" key={line.slug} className="border-t border-line">
              <Link
                href={`/karya/${line.slug}/`}
                className="group grid gap-y-5 py-6 md:grid-cols-12 md:gap-x-5"
              >
                <div className="grid grid-cols-[2.75rem_1fr] gap-x-3 md:col-span-5 md:grid-cols-[4rem_1fr] xl:grid-cols-[6.375rem_1fr]">
                  <span className="text-label pt-0.5 text-muted tabular-nums transition-colors duration-300 group-hover:text-navy">
                    {line.index}.
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-title text-navy transition-transform duration-300 ease-soft group-hover:translate-x-1">
                      {line.title}
                    </h2>
                    <p className="text-label mt-2 max-w-[22rem] text-muted md:mt-3">
                      {line.description}
                    </p>
                    <p className="text-label mt-3 max-w-[22rem] text-muted">
                      Klien: {line.clients.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Phones: two photos side by side. */}
                <div className="grid grid-cols-2 gap-2 md:hidden">
                  {photos.slice(0, 2).map((photo) => (
                    <Thumb key={photo.id} photo={photo} className="aspect-[179/225]" sizes="50vw" />
                  ))}
                </div>

                {/* Tablet / desktop: always five equal slots (4 photos + a detail tile), so
                    every strip starts at the same x. */}
                <div className="hidden min-w-0 justify-end gap-2 md:col-span-7 md:flex">
                  {Array.from({ length: 4 }, (_, i) => photos[i]).map((photo, i) =>
                    photo ? (
                      <Thumb key={photo.id} photo={photo} className={slot} sizes="148px" />
                    ) : (
                      <div key={`empty-${i}`} aria-hidden="true" className={`${slot} bg-grey-50`} />
                    ),
                  )}
                  <div
                    aria-hidden="true"
                    className={`${slot} flex flex-col items-start justify-between bg-grey-50 p-2.5 transition-colors duration-300 group-hover:bg-navy lg:p-3`}
                  >
                    <IconArrowUpRight
                      stroke={1.5}
                      className="size-5 self-end text-navy transition-colors duration-300 group-hover:text-white"
                    />
                    <span className="text-label text-muted transition-colors duration-300 group-hover:text-white">
                      {photos.length > 4 ? `+${photos.length - 4} foto` : "Lihat detail"}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
