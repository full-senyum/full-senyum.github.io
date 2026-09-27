/**
 * Product lines (build-spec §6). Order = display order. `photos` reference ids
 * in photos.json; the first photo is the cover.
 */
export type Line = {
  slug: string;
  index: string;
  title: string;
  category: "Merchandise" | "Souvenir" | "Cetak";
  description: string;
  /** Short value for the "Teknik" cell of the detail meta row. */
  technique: string;
  photos: string[];
  clients: string[];
  items: string[];
};

export const lines: Line[] = [
  {
    slug: "tumbler-botol",
    index: "01",
    title: "Tumbler & Botol",
    category: "Merchandise",
    description:
      "Tumbler, botol minum, dan shaker dengan logo grafir atau cetak. Dipakai setiap hari, dilihat banyak orang.",
    technique: "Grafir laser atau UV print",
    photos: ["h06-03", "h06-01", "h06-04", "h06-02"],
    clients: ["KB Bank", "Erablue Electronics", "Fit", "Mitra Keluarga"],
    items: [
      "Tumbler stainless",
      "Botol minum",
      "Shaker bottle",
      "Mug",
      "Logo grafir laser atau UV print",
    ],
  },
  {
    slug: "jam-dinding",
    index: "02",
    title: "Jam Dinding Promosi",
    category: "Souvenir",
    description:
      "Jam dinding dengan logo di muka jam, termasuk ukuran 40 cm. Terpasang di kantor dan terlihat sepanjang hari.",
    technique: "Muka jam full color",
    photos: ["h07-03", "h07-02", "h07-04", "h07-01", "h07-05", "h07-06"],
    clients: [
      "Komipo Energy Indonesia",
      "RS Masmitra",
      "Teh Tarik Granita",
      "Panin Bank",
      "Kementerian Agama",
      "IFBC Expo",
    ],
    items: [
      "Jam dinding berbagai ukuran, termasuk 40 cm",
      "Muka jam full color dengan logo",
      "Kemasan per unit",
    ],
  },
  {
    slug: "payung",
    index: "03",
    title: "Payung Custom",
    category: "Souvenir",
    description:
      "Payung golf, lipat, dan otomatis dengan logo full color. Berguna saat hujan, terlihat saat dibawa.",
    technique: "Logo full color di panel",
    photos: ["h07-08", "h07-07", "h07-09", "h07-10"],
    clients: ["Guinness", "Intivesta", "BTN", "Summer Ulu"],
    items: ["Payung golf", "Payung lipat", "Payung otomatis", "Logo di panel payung"],
  },
  {
    slug: "kalender-katalog-notebook",
    index: "04",
    title: "Kalender, Katalog & Notebook",
    category: "Cetak",
    description:
      "Kalender meja, katalog produk, dan notebook spiral yang membawa identitas brand Anda ke meja kerja.",
    technique: "Cetak kertas",
    photos: ["h05-03", "h05-02", "h05-04", "h05-01"],
    clients: ["Mitra Keluarga", "PT Ariake Europe Indonesia", "Kargolo", "Hajimee"],
    items: [
      "Kalender meja dan dinding",
      "Katalog dan buku",
      "Notebook spiral",
      "Brosur, flyer, poster A3+",
      "Kartu nama, tent card, sertifikat",
    ],
  },
  {
    slug: "stiker-label",
    index: "05",
    title: "Stiker & Label",
    category: "Cetak",
    description:
      "Stiker label nama, stiker logo, dan thank you card untuk kemasan produk, dipotong die cut atau kiss cut.",
    technique: "Die cut atau kiss cut",
    photos: ["h05-07", "h05-08", "h05-05", "h05-06"],
    clients: ["Chic n Pop"],
    items: [
      "Stiker A3+ die cut dan kiss cut",
      "Label nama",
      "Stiker logo",
      "Thank you card",
      "Bahan cromo, vinyl doff, vinyl glossy, gold, silver, hologram, transparan",
    ],
  },
  {
    slug: "merchandise-event",
    index: "06",
    title: "Merchandise Event",
    category: "Merchandise",
    description:
      "Gift set, pulpen, lanyard, pouch, tas foldable, dan kipas promosi untuk event dan program korporat.",
    technique: "Logo di tiap produk",
    photos: ["h06-05", "h06-07", "h06-08", "h06-09", "h06-11", "h06-06"],
    clients: [
      "Lotte Mall",
      "Kargolo",
      "Pertamina",
      "Erablue Electronics",
      "Taman Nasional Kepulauan Seribu",
    ],
    items: [
      "Gift set notebook dan pulpen",
      "Pulpen",
      "Lanyard dan ID card",
      "Pouch",
      "Tas foldable",
      "Kipas promosi",
      "Kartu e-toll",
      "Pin, gantungan kunci, kaos, plakat",
    ],
  },
];

export function getLine(slug: string): Line | undefined {
  return lines.find((line) => line.slug === slug);
}

/** The next `count` lines after `slug`, wrapping around (for "Karya lainnya"). */
export function nextLines(slug: string, count = 3): Line[] {
  const start = lines.findIndex((line) => line.slug === slug);
  return Array.from({ length: count }, (_, i) => lines[(start + 1 + i) % lines.length]);
}
