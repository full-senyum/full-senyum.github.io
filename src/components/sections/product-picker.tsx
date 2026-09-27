import { lines } from "@/data/lines";
import { waLink } from "@/data/site";

const chipClass =
  "text-label-strong inline-flex min-h-11 items-center rounded-full border border-navy px-5 text-navy transition-colors duration-200 hover:bg-navy hover:text-white";

/** "Mau buat apa?": each chip opens WhatsApp with the product in the message. */
export function ProductPicker() {
  const chips = [
    ...lines.map((line) => ({ label: line.title, href: waLink(line.title) })),
    { label: "Lainnya", href: waLink() },
  ];
  return (
    <section aria-labelledby="picker-title" className="container-page section-y">
      <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-5">
        <h2 id="picker-title" className="text-h5 text-navy md:col-span-4 xl:col-span-7">
          Mau buat apa?
        </h2>
        <ul className="flex flex-wrap gap-2 md:col-span-8 xl:col-span-5">
          {chips.map((chip) => (
            <li key={chip.label}>
              <a href={chip.href} target="_blank" rel="noopener" className={chipClass}>
                {chip.label}
                <span className="sr-only"> (chat WhatsApp)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
