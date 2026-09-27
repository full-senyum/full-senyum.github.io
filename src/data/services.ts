/** Layanan (build-spec §5, home section 7). */
export type Service = {
  index: string;
  title: string;
  description: string;
  items: string[];
  /** Optional lead-in for the item list, e.g. "Bahan". */
  itemsLabel?: string;
};

export const services: Service[] = [
  {
    index: "01",
    title: "Cetak kertas",
    description: "Materi cetak untuk promosi, komunikasi, dan operasional perusahaan.",
    items: [
      "Brosur A4, A5, A6",
      "flyer",
      "poster A3+",
      "kartu nama",
      "tent card",
      "thank you card",
      "notebook",
      "sertifikat",
      "buku dan katalog",
    ],
  },
  {
    index: "02",
    title: "Stiker & cutting",
    description: "Stiker ukuran A3+ dengan potong die cut atau kiss cut.",
    itemsLabel: "Bahan",
    items: ["cromo", "vinyl doff", "vinyl glossy", "gold", "silver", "hologram", "transparan"],
  },
  {
    index: "03",
    title: "Merchandise",
    description: "Merchandise custom untuk karyawan, klien, dan program promosi.",
    items: [
      "Tumbler",
      "kartu e-toll (e-Money, Flazz, Brizzi)",
      "mug",
      "pin",
      "gantungan kunci",
      "kaos promosi",
      "plakat dan akrilik",
    ],
  },
  {
    index: "04",
    title: "Souvenir & kalender",
    description: "Media promosi yang dipakai sehari-hari dan terlihat sepanjang tahun.",
    items: [
      "Jam dinding promosi berbagai ukuran",
      "kalender meja dan dinding",
      "payung custom (lipat, golf, otomatis)",
    ],
  },
  {
    index: "05",
    title: "Pengadaan custom",
    description:
      "Barang spesifik sesuai permintaan, dipersonalisasi dengan logo perusahaan untuk event dan promosi.",
    items: [],
  },
];
