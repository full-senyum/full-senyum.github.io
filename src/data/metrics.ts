/**
 * Metrics (build-spec §5, home section 5). Sourced: 33 distinct clients in the
 * company profile; ~30 product types in its service lists; 7 sticker
 * materials; nationwide shipping (38 provinces).
 */
export const metrics = [
  { value: 30, suffix: "+", label: "klien korporat & instansi" },
  { value: 25, suffix: "+", label: "jenis produk custom" },
  { value: 7, suffix: "", label: "pilihan bahan stiker" },
  { value: 38, suffix: "", label: "provinsi jangkauan kirim" },
] as const;
