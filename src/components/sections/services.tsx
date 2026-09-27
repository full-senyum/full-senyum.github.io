import { LabelSection } from "@/components/shared/label-section";
import { Reveal } from "@/components/shared/reveal";
import { services } from "@/data/services";

/** Layanan (origo capabilities): label-left, five hairline rows. */
export function Services() {
  return (
    <section aria-labelledby="layanan-label" className="container-page section-y">
      <LabelSection label="Layanan" labelId="layanan-label">
        <ol className="border-b border-line">
          {services.map((service) => (
            <Reveal
              as="li"
              key={service.index}
              className="grid grid-cols-[2.75rem_1fr] gap-x-3 border-t border-line py-6 md:grid-cols-[3.5rem_1fr] md:py-7"
            >
              <span className="text-label pt-0.5 text-muted tabular-nums md:pt-1">
                {service.index}.
              </span>
              <div>
                <h3 className="text-title text-navy">{service.title}</h3>
                <p className="text-body mt-1.5 text-muted">{service.description}</p>
                {service.items.length > 0 ? (
                  <p className="text-label mt-3 text-muted">
                    {service.itemsLabel ? `${service.itemsLabel}: ` : null}
                    {service.items.join(" · ")}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </LabelSection>
    </section>
  );
}
