export const site = {
  name: "Duke Applied Machine Learning",
  short: "DAML",
  tagline:
    "An open-membership student organization dedicated to enhancing machine learning education at Duke.",
  email: "dukeappliedmachinelearning@gmail.com",
  joinFormUrl:
    "https://duke.is/b/5q32",
  /** The main site's public origin — the AITP site links back through it. */
  url: "https://dukedaml.com",
  aitpUrl: "https://aitp.dukedaml.com",
  youtube: "https://www.youtube.com/@DukeAppliedMachineLearning",
  linkedin: "https://linkedin.com/company/dukeaml",
  instagram: "https://www.instagram.com/dukeappliedml/",
} as const;

export const navLinks = [
  { href: "/mission", label: "Mission" },
  { href: "/recruitment", label: "Recruitment" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/partner", label: "Partner" },
] as const;
