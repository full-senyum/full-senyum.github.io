/**
 * Typed access to the generated asset manifests (owned by the asset
 * pipelines, never edited by hand). The JSON is cast through `unknown` so a
 * regenerated file drops in without code changes; the helpers below tolerate
 * optional fields.
 */
import bentoJson from "@/data/bento.json";
import clientsJson from "@/data/clients.json";
import photosJson from "@/data/photos.json";
import stockJson from "@/data/stock.json";

export type ImageSource = { w: number; src: string };

/** Anything the <Img> component can render. */
export type ImageAsset = {
  alt: string;
  width: number;
  height: number;
  sources: ImageSource[];
  lqip?: string;
};

export type Photo = ImageAsset & {
  id: string;
  file?: string;
  line: string;
  product: string;
  client?: string | null;
};

export type StockImage = ImageAsset & {
  id: string;
  credit?: { name: string; profile?: string; photo?: string };
  placeholder?: boolean;
};

export type BentoTile = {
  id: string;
  kind: "video" | "image";
  video?: string;
  poster?: string;
  image?: string;
  width: number;
  height: number;
  kicker: string;
  title: string;
  note?: string;
  source?: string;
};

export type Client = {
  name: string;
  short?: string;
  slug: string;
  src: string;
  width: number;
  height: number;
  scale?: number;
  fallbackText?: boolean;
  source?: string;
};

export const photos = photosJson as unknown as Photo[];
export const stock = stockJson as unknown as StockImage[];
export const bento = bentoJson as unknown as BentoTile[];
export const clients = clientsJson as unknown as Client[];

const photoById = new Map(photos.map((p) => [p.id, p]));

export function getPhoto(id: string): Photo | undefined {
  return photoById.get(id);
}

/** Photos for a list of ids, skipping any the manifest doesn't have yet. */
export function getPhotos(ids: readonly string[]): Photo[] {
  return ids.map((id) => photoById.get(id)).filter((p): p is Photo => Boolean(p));
}

export function getStock(id: string): StockImage | undefined {
  return stock.find((s) => s.id === id);
}

/** Client names are shown without branch-office suffixes ("KC …"). */
export function displayClient(client?: string | null): string | null {
  if (!client) return null;
  return client.replace(/\s+KC\s+.*$/i, "").trim() || null;
}

/** Gallery caption: "{product} — {client}" or just the product. */
export function photoCaption(photo: Photo): string {
  const client = displayClient(photo.client);
  return client ? `${photo.product} — ${client}` : photo.product;
}
