import { Img } from "@/components/shared/img";
import { Reveal } from "@/components/shared/reveal";
import { photoCaption, type Photo } from "@/lib/media";
import { cn } from "@/lib/utils";

function Figure({ photo, sizes, priority }: { photo: Photo; sizes: string; priority?: boolean }) {
  return (
    <figure className="m-0">
      <div
        className="overflow-hidden bg-grey-50"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <Img image={photo} sizes={sizes} priority={priority} className="size-full" />
      </div>
      <figcaption className="text-label mt-2 text-muted md:mt-3">{photoCaption(photo)}</figcaption>
    </figure>
  );
}

/**
 * Detail gallery: the first two photos as a 2-up pair, the rest in a grid
 * (3 columns when the count divides by three, otherwise 2) so rows never end
 * ragged. Photos are 456–900px wide, so no cell exceeds ~700 CSS px.
 */
export function Gallery({ photos, title }: { photos: Photo[]; title: string }) {
  const pair = photos.slice(0, 2);
  const rest = photos.slice(2);
  const threeUp = rest.length > 0 && rest.length % 3 === 0;

  return (
    <section aria-label={`Galeri ${title}`} className="container-page">
      <div className="grid grid-cols-2 gap-x-2 gap-y-6">
        {pair.map((photo, i) => (
          <Reveal key={photo.id} delay={i * 0.06}>
            <Figure
              photo={photo}
              priority
              sizes="(min-width: 1440px) 696px, 50vw"
            />
          </Reveal>
        ))}
      </div>
      {rest.length > 0 ? (
        <div
          className={cn(
            "mt-6 grid grid-cols-2 gap-x-2 gap-y-6 md:mt-8",
            threeUp && "lg:grid-cols-3",
          )}
        >
          {rest.map((photo, i) => (
            <Reveal key={photo.id} delay={(i % (threeUp ? 3 : 2)) * 0.06}>
              <Figure
                photo={photo}
                sizes={threeUp ? "(min-width: 1440px) 461px, (min-width: 1024px) 33vw, 50vw" : "(min-width: 1440px) 696px, 50vw"}
              />
            </Reveal>
          ))}
        </div>
      ) : null}
    </section>
  );
}
