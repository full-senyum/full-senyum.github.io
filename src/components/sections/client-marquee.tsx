import { clients, type Client } from "@/lib/media";
import { Reveal } from "@/components/shared/reveal";

import { ClientLogo } from "./client-logo";

function MarqueeCopy({ items, duplicate = false }: { items: Client[]; duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className="marquee-copy flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14"
    >
      {items.map((client) => (
        <li key={client.slug} className="flex items-center">
          <ClientLogo client={client} hidden={duplicate} />
        </li>
      ))}
    </ul>
  );
}

function MarqueeRow({ items, direction }: { items: Client[]; direction: "left" | "right" }) {
  if (items.length === 0) return null;
  return (
    <div className="marquee-row edge-fade overflow-hidden">
      <div className="marquee-track flex w-max items-center" data-direction={direction}>
        <MarqueeCopy items={items} />
        <MarqueeCopy items={items} duplicate />
      </div>
    </div>
  );
}

/**
 * Client wall (printidea `space-y-8`): two CSS marquee rows moving in
 * opposite directions, each track duplicated for a seamless loop; pauses on
 * hover; reduced motion shows a static wrapped grid.
 */
export function ClientMarquee() {
  const marqueeClients = clients.filter((client) => client.marquee !== false);
  const rowOne = marqueeClients.slice(0, 10);
  const rowTwo = marqueeClients.slice(10);
  return (
    <section
      aria-labelledby="klien-title"
      className="section-y [--logo-h:28px] md:[--logo-h:44px]"
    >
      <div className="container-page">
        <Reveal>
          <h2 id="klien-title" className="text-h3 whitespace-pre-line text-navy">
            {"Dipercaya bank, rumah sakit,\ninstansi, dan brand ritel."}
          </h2>
        </Reveal>
        <Reveal className="mt-10 space-y-8 md:mt-14">
          <MarqueeRow items={rowOne} direction="left" />
          <MarqueeRow items={rowTwo} direction="right" />
        </Reveal>
      </div>
    </section>
  );
}
