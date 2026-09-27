import type { MetadataRoute } from "next";

import { lines } from "@/data/lines";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/karya/", ...lines.map((l) => `/karya/${l.slug}/`), "/tentang/", "/kontak/"];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/karya/") && path !== "/karya/" ? 0.7 : 0.8,
  }));
}
