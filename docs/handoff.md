# Handoff — Full Senyum website

Status of the build against `docs/build-spec.md`, what is still placeholder, and what the owner
should confirm before launch.

## 1. Please confirm (owner)

1. **Address spelling.** The site shows "Jl. Jendral Sudirman, Pintu Batu" (as supplied). The official
   street name is usually spelled "Jl. Jenderal Sudirman". Change it in one place:
   `src/data/site.ts` → `address.lines` and `address.query` (the query also drives the Google Maps link
   and the embedded map).
2. **Cara pesan, step 03.** "Konfirmasi desain — Posisi logo, warna, dan detail disepakati sebelum
   produksi dimulai." Confirm this matches how orders really run (e.g. whether a digital mock-up is
   always sent). File: `src/data/process.ts`.
3. **Stock photos to replace.** Four Unsplash images stand in for real photography
   (`placeholder: true` in `src/data/stock.json`, credits in `CREDITS.md`):
   - `home-showreel` (home, full-width break) — a notebook and pen holder flat lay
   - `about-print` (Tentang) — a printing press
   - `about-smile` (Tentang, next to Cara pesan) — two people laughing in an office
   - `contact-parcel` (Kontak) — stacked shipping boxes

   Best replacements: the team at work, the production floor, packed orders ready to ship.
4. **Metrics.** 30+ klien, 25+ jenis produk, 7 bahan stiker, 38 provinsi — derived from the company
   profile (33 clients named, ~30 product types, 7 sticker materials, nationwide shipping). Edit
   `src/data/metrics.ts` if the owner prefers other figures.
5. **"Teknik" on each detail page** (short summaries written from the product lists): Grafir laser
   atau UV print · Muka jam full color · Logo full color di panel · Cetak kertas · Die cut atau kiss cut
   · Logo di tiap produk. File: `src/data/lines.ts` → `technique`.
6. **Client list and logos.** 21 clients in the marquee and the Tentang grid. Four have no usable logo
   file and show a short-name wordmark instead (We Care, Granita, BARO, Komipo). Confirm
   the owner is comfortable showing every mark; remove any from `src/data/clients.json`.

## 2. Placeholder or pending

- **Stock photography** — see 1.3.
- **Portfolio photos** are the 30 company-profile shots (456–900 px wide). They are never shown wider
  than ~700 CSS px; new, consistently lit photography would lift the Karya pages the most.
- **Repository / deploy** — git is initialised on `main` but nothing is committed or pushed. See
  README → Deploy.

## 3. Logo and icons (final)

The owner approved the current wordmark: "Full Senyum" set in Switzer Bold with the smile arc under
"enyu". It is generated, not traced — `tools/logo/generate.mjs` builds it from the font file and writes:

- `src/components/brand/logo-paths.ts` — `LOGO_HORIZONTAL`, `LOGO_STACKED` (one path per glyph + the
  smile, used by the site and the hero animation) and `LOGO_MARK` (the "S" over a heavier smile, for
  small sizes)
- `brand/logo-{horizontal,stacked,mark}.svg` (`currentColor`) plus `-navy` and `-white` variants for
  print and social use
- favicons: `src/app/icon.svg` and `favicon.ico` (16/32/48) use the mark, white on navy; the home-screen
  icons (`src/app/apple-icon.png` 180, `public/icon-192.png`, `public/icon-512.png`) use the stacked
  wordmark, white on navy, inside the maskable safe zone

Re-run instructions are in the script header (its tooling is installed outside `package.json`).

## 4. Decisions taken while building (deviations from the spec, all small)

- `text-mega` on phones is `min(100px, 23.5vw)`: "Tentang" is 3.86em wide in Switzer Bold, so a fixed
  100px would overflow a 390px screen. From ~425px up it is exactly 100px; tablet 150 / desktop 250.
- Section rhythm: each major section carries half of the spec's spacing top and bottom, so neighbours
  sit 64 / 96 / 120px apart (the spec's "between major sections" value).
- Home statement max width 1200px (spec "~1100") so "Souvenir yang baik tidak berakhir di laci." holds
  one line at 64px; "di laci" is joined with a no-break space.
- Detail gallery: the first two photos as a pair, the rest in 3 columns when the count divides by
  three, otherwise 2 — rows never end ragged.
- The long "Tanya {produk} di WhatsApp" label appears from 1024px; smaller screens show
  "Tanya di WhatsApp" (the product is still in the message).
- Hero wordmark animation runs in CSS (not JS) so it paints on the first frame; it replays if the
  viewport crosses the 810px breakpoint (the two lockups swap).
- Client names from photo captions are shown without branch-office suffixes ("KC …"); the one such
  caption was also corrected at the source (`photos.json`, h06-10 → "BTN"). BTN's marquee `scale` was
  lowered from 1.298 to 1.0 so it no longer outweighs the other marks.
- The OG image is exported as `/opengraph-image/card.png` (a `.png` URL, so GitHub Pages serves the
  right content type for social previews).
- Photos inside card/row links use empty `alt` (the link text names the product); gallery photos carry
  full descriptions.

## 5. Quality gates

`npm run typecheck`, `npm run lint` and `npm run build` pass. The static export was checked at 390 /
810 / 1024 / 1440 / 1920px on `/`, `/karya/`, `/karya/tumbler-botol/`, `/tentang/` and `/kontak/`: no
horizontal overflow, no console errors, no broken images; reduced motion shows a static client grid,
final counter values and poster-only videos.
