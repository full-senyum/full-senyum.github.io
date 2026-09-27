import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { WaButton } from "@/components/shared/wa-button";
import { processSteps } from "@/data/process";
import { cn } from "@/lib/utils";

type HowToOrderProps = {
  /** `row`: 4 columns ≥1024 (home). `pair`: 2×2, for a half-width column. */
  layout?: "row" | "pair";
  className?: string;
  /** Render without its own container/section padding (when nested). */
  bare?: boolean;
};

/** Cara pesan: four hairline steps and one WhatsApp button. */
export function HowToOrder({ layout = "row", className, bare = false }: HowToOrderProps) {
  const content = (
    <>
      <Reveal>
        <h2 id="cara-pesan-title" className="text-h3 text-navy">
          Empat langkah, satu chat.
        </h2>
      </Reveal>
      <RevealGroup
        as="ol"
        className={cn(
          "mt-10 grid gap-x-5 gap-y-10 md:mt-14 md:grid-cols-2",
          layout === "row" && "lg:grid-cols-4",
        )}
      >
        {processSteps.map((step) => (
          <RevealItem as="li" key={step.index} className="border-t border-line pt-5 md:pt-6">
            <p aria-hidden="true" className="text-display text-muted tabular-nums">
              {step.index}
            </p>
            <h3 className="text-title mt-3 text-navy md:mt-5">
              <span className="sr-only">Langkah {Number(step.index)}: </span>
              {step.title}
            </h3>
            <p className="text-body mt-1.5 text-muted">{step.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal className="mt-10 md:mt-14">
        <WaButton size="lg" label="Mulai chat" />
      </Reveal>
    </>
  );

  if (bare) {
    return <div className={className}>{content}</div>;
  }
  return (
    <section aria-labelledby="cara-pesan-title" className={cn("container-page section-y", className)}>
      {content}
    </section>
  );
}
