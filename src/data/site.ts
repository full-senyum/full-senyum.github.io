/**
 * Business facts: the single source (build-spec §1). Change contact details,
 * address or the WhatsApp greeting here and every page follows.
 */
export const site = {
  name: "Full Senyum",
  url: "https://full-senyum.github.io",
  tagline: "Cetak & souvenir untuk kebutuhan bisnis Anda.",
  description:
    "Cetak, merchandise, dan souvenir korporat yang dipersonalisasi dengan identitas brand Anda. Berbasis di Kota Bengkulu, kirim ke seluruh Indonesia.",
  whatsapp: { display: "+62 852-8531-7790", e164: "6285285317790" },
  /** Shown as plain text under the WhatsApp number — not a mailto link. */
  email: "fullsenyumgroup@gmail.com",
  waMessage: "Halo admin! saya tertarik untuk membuat souvenir",
  waEmoji: "😁",
  address: {
    lines: [
      "Jl. Jendral Sudirman, Pintu Batu",
      "Kec. Tlk. Segara, Kota Bengkulu",
      "Bengkulu 38115, Indonesia",
    ],
    query:
      "Jl. Jendral Sudirman, Pintu Batu, Teluk Segara, Kota Bengkulu, Bengkulu 38115",
  },
  serviceArea: "Berbasis di Kota Bengkulu, kirim ke seluruh Indonesia.",
} as const;

/**
 * WhatsApp deep link. Without a product: "Halo admin! saya tertarik untuk
 * membuat souvenir 😁"; with a product it goes before the emoji:
 * "… membuat souvenir {product} 😁".
 */
export function waLink(product?: string): string {
  const text = [site.waMessage, product, site.waEmoji].filter(Boolean).join(" ");
  return `https://wa.me/${site.whatsapp.e164}?text=${encodeURIComponent(text)}`;
}

// No outbound Google Maps link on purpose (owner request); only the embed on /kontak/.
export const mapsEmbed =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(site.address.query) +
  "&output=embed";

export const nav = [
  { href: "/", label: "Beranda" },
  { href: "/karya/", label: "Karya" },
  { href: "/tentang/", label: "Tentang" },
  { href: "/kontak/", label: "Kontak" },
] as const;
