/**
 * Logos are transparent PNGs in src/assets/companies/<group>/. `logo` is the
 * path below that folder. Order here is display order.
 */
export interface Company {
  name: string;
  logo: string;
}

/** Where DAML members go after graduating — the homepage rail. */
export const alumniCompanies: Company[] = [
  { name: "Google", logo: "alumni/google.png" },
  { name: "Microsoft", logo: "alumni/microsoft.png" },
  { name: "Meta", logo: "alumni/meta.png" },
  { name: "Databricks", logo: "alumni/databricks.png" },
  { name: "Bloomberg", logo: "alumni/bloomberg.png" },
  { name: "IMC Trading", logo: "alumni/imc.png" },
  { name: "Point72", logo: "alumni/point72.png" },
  { name: "Wells Fargo", logo: "alumni/wellsfargo.png" },
  { name: "Palantir", logo: "alumni/palantir.png" },
  { name: "Mercor", logo: "alumni/mercor.png" },
  { name: "Applied Compute", logo: "alumni/appliedcompute.png" },
  { name: "Bank of America", logo: "alumni/bofa.png" },
];

/** Organizations DAML teams have built projects with. */
export const partnerCompanies: Company[] = [
  { name: "IBM", logo: "partners/ibm.png" },
  { name: "Duke Health", logo: "partners/dukehealth.png" },
  { name: "Coursera", logo: "partners/coursera.png" },
  { name: "Twitter", logo: "partners/twitter.png" },
  { name: "U.S. Army", logo: "partners/usarmy.png" },
  { name: "Major League Soccer", logo: "partners/mls.png" },
  { name: "levels.fyi", logo: "partners/levelsfyi.png" },
  { name: "Glean", logo: "partners/glean.png" },
  { name: "Hiya", logo: "partners/hiya.png" },
  { name: "Zogo", logo: "partners/zogo.png" },
  { name: "Uizard", logo: "partners/uizard.png" },
  { name: "Marco", logo: "partners/marco.png" },
  { name: "Nordot", logo: "partners/nordot.png" },
  { name: "Liberata", logo: "partners/liberata.png" },
];

/**
 * Height that gives a logo roughly `area` px² on screen, so a long wordmark
 * and a square mark carry the same visual weight in a row.
 */
export const logoHeight = (
  img: { width: number; height: number },
  area: number,
  min: number,
  max: number,
) => {
  const h = Math.sqrt(area / (img.width / img.height));
  return Math.round(Math.min(max, Math.max(min, h)));
};
