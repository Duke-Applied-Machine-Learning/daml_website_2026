import type { ImageMetadata } from "astro";

/**
 * Photographs live in src/assets so Astro can optimise them at build time —
 * which means they cannot be addressed by a plain string path the way a
 * /public asset can. These globs give the data files a stable key to point
 * at ("Executive/jai.jpeg") and resolve it to the real ImageMetadata here.
 */
type Glob = Record<string, { default: ImageMetadata }>;

const strip = (all: Glob, prefix: string) =>
  Object.fromEntries(
    Object.entries(all).map(([path, mod]) => [
      path.slice(prefix.length),
      mod.default,
    ]),
  );

export const headshots = strip(
  import.meta.glob("/src/assets/headshots/*.{jpg,jpeg,png}", {
    eager: true,
  }) as Glob,
  "/src/assets/headshots/",
);

export const projectShots = strip(
  import.meta.glob("/src/assets/project_images/*.{jpg,jpeg,png}", {
    eager: true,
  }) as Glob,
  "/src/assets/project_images/",
);

/** The showcase strip, ordered 1..12 rather than lexically (1, 10, 11, 2...). */
export const showcase: ImageMetadata[] = Object.entries(
  import.meta.glob("/src/assets/showcase/*.jpeg", { eager: true }) as Glob,
)
  .sort(
    ([a], [b]) =>
      Number(a.match(/(\d+)\.jpeg$/)?.[1] ?? 0) -
      Number(b.match(/(\d+)\.jpeg$/)?.[1] ?? 0),
  )
  .map(([, mod]) => mod.default);

/** Company logos, keyed "alumni/google.png" / "partners/ibm.png". */
export const companyLogos = strip(
  import.meta.glob("/src/assets/companies/**/*.png", { eager: true }) as Glob,
  "/src/assets/companies/",
);
