import { navLinks, site } from "@/data/site";

/** Section links on the AITP home page. Absolute from "/" so the 404 page can
 *  use them too. */
const links = [
  { href: "/#lessons", label: "Lessons" },
  { href: "/#syllabus", label: "Syllabus" },
  { href: "/#logistics", label: "Logistics" },
];

/** The logo is the way back to the main DAML site. */
export const nav = {
  homeHref: site.url,
  links,
  cta: { href: site.joinFormUrl, label: "Join DAML" },
};

/** The main site's footer, unchanged: its page links point back at
 *  dukedaml.com, since those pages don't exist on this domain. */
export const footer = {
  homeHref: site.url,
  links: navLinks.map((l) => ({ ...l, href: new URL(l.href, site.url).href })),
};
