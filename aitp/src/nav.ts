import { site } from "@/data/site";

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

export const footer = {
  homeHref: site.url,
  links,
  more: [
    { href: site.url, label: "DAML main site" },
    { href: new URL("/recruitment", site.url).href, label: "Recruitment" },
    { href: site.youtube, label: "YouTube", external: true },
    { href: `mailto:${site.email}`, label: "Contact" },
  ],
};
