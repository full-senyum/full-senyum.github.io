import { IconChevronDown } from "@tabler/icons-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LabelSection } from "@/components/shared/label-section";
import { Reveal } from "@/components/shared/reveal";
import { faq } from "@/data/faq";

/** Label-left "Pertanyaan umum" + single, collapsible accordion with hairlines. */
export function Faq() {
  return (
    <section aria-labelledby="faq-label" className="container-page section-y">
      <Reveal>
        <LabelSection label="Pertanyaan umum" labelId="faq-label">
          <Accordion className="border-t border-line">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`} className="border-b border-line">
                <AccordionTrigger>
                  <span>{item.q}</span>
                  <IconChevronDown
                    stroke={1.5}
                    aria-hidden="true"
                    className="size-5 shrink-0 text-navy transition-transform duration-300 ease-soft group-data-[panel-open]/trigger:rotate-180"
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body max-w-[60ch] pb-6 text-muted">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </LabelSection>
      </Reveal>
    </section>
  );
}
