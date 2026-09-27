/* eslint-disable @next/next/no-img-element -- static export, pre-sized webp */
import { LabelSection } from "@/components/shared/label-section";
import { Reveal } from "@/components/shared/reveal";
import { bento, type BentoTile } from "@/lib/media";
import { cn } from "@/lib/utils";

import { BentoVideo } from "./bento-video";

function Tile({ tile, big }: { tile: BentoTile; big: boolean }) {
  const isVideo = tile.kind === "video" && Boolean(tile.video);
  return (
    <figure
      className={cn(
        "relative m-0 overflow-hidden bg-navy",
        isVideo ? "h-[240px]" : "h-[180px]",
        "md:h-auto",
        big && "md:row-span-2",
      )}
    >
      {isVideo ? (
        <BentoVideo src={tile.video!} poster={tile.poster} />
      ) : tile.image ? (
        <img
          src={tile.image}
          alt=""
          width={tile.width || undefined}
          height={tile.height || undefined}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,62,0)_40%,rgba(13,27,62,0.78)_100%)]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5 xl:p-6">
        <span className="text-label block text-white/70">{tile.kicker}</span>
        <span className="text-title mt-0.5 block text-white">{tile.title}</span>
      </figcaption>
    </figure>
  );
}

/** Proses (tumbleryuk bento): label-left intro, then a 5-tile media grid. */
export function ProcessBento() {
  if (bento.length === 0) return null;
  return (
    <section aria-labelledby="proses-title" className="container-page section-y">
      <Reveal>
        <LabelSection label="Proses" labelAs="p">
          <h2 id="proses-title" className="text-h3 text-navy">
            Logo Anda dikerjakan dengan teknik yang tepat.
          </h2>
          <p className="text-body mt-4 text-muted md:mt-6">
            Grafir laser untuk logo permanen di tumbler dan logam. UV print untuk warna penuh di
            hampir semua permukaan. Bingung pilih yang mana? Tanyakan saja ke admin.
          </p>
        </LabelSection>
      </Reveal>
      <Reveal className="mt-10 grid gap-2 md:mt-14 md:auto-rows-[200px] md:grid-cols-[1.4fr_1fr] xl:auto-rows-[240px]">
        {bento.map((tile, i) => (
          <Tile key={tile.id} tile={tile} big={i === 0} />
        ))}
      </Reveal>
    </section>
  );
}
