import { Reveal } from "@/components/shared/reveal";

/** Full-width two-tone statement (origo). */
export function Statement() {
  return (
    <section className="container-page section-y">
      <Reveal>
        <p className="text-display max-w-[1200px] text-navy">
          Souvenir yang baik tidak berakhir di{"\u00a0"}laci.{" "}
          <span className="text-muted">
            Ia dipakai setiap hari: di meja kerja, di dinding kantor, di tangan klien Anda.
          </span>
        </p>
      </Reveal>
    </section>
  );
}
