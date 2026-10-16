export const teams = ["Exec", "Outreach", "Marketing"] as const;
export type Team = (typeof teams)[number];

export type TeamMember = {
  name: string;
  team: Team;
  /** The member's role within DAML. */
  role: string;
  major?: string;
  year?: string;
  /** Filename in src/assets/headshots/, e.g. "jane_doe.jpg". */
  photo?: string;
};

/** Everyone, in display order within each team. */
export const members: TeamMember[] = [
  {
    name: "Renzo Larrea",
    team: "Exec",
    role: "Co-President",
    photo: "renzo_larrea.jpg",
    major: "Math, CS",
    year: "2028",
  },
  {
    name: "Mayur Sekhar",
    team: "Exec",
    role: "Co-President",
    photo: "mayur_sekhar.jpg",
    major: "Math, CS/AI",
    year: "2027",
  },
  {
    name: "Danielle Li",
    team: "Exec",
    role: "Data Science Director",
    photo: "danielle_li.jpg",
    major: "Chem, CS",
    year: "2029",
  },
  {
    name: "Ruben Marcus",
    team: "Exec",
    role: "Data Science Director",
    photo: "ruben_marcus.jpg",
    major: "Math",
    year: "2029",
  },
  {
    name: "David Li",
    team: "Exec",
    role: "Data Science Director",
    photo: "david_li.jpg",
    major: "CS, Econ",
    year: "2028",
  },
  {
    name: "Aashish Cheruvu",
    team: "Exec",
    role: "Data Science Director & AITP Instructor",
    photo: "aashish_cheruvu.jpg",
    major: "BME, ECE",
    year: "2028",
  },
  {
    name: "Steve Yin",
    team: "Exec",
    role: "AITP Instructor",
    photo: "steve_yin.jpg",
    major: "BME, CS, Math",
    year: "2029",
  },
  {
    name: "Clara Bartusiak",
    team: "Outreach",
    role: "Director of Outreach",
    photo: "clara_bartusiak.jpg",
    major: "ECE, CS",
    year: "2027",
  },
  {
    name: "Arnav Dhar",
    team: "Outreach",
    role: "Outreach Coordinator",
    photo: "arnav_dhar.jpg",
    major: "CS, Math",
    year: "2029",
  },
  {
    name: "Erica Zhang",
    team: "Outreach",
    role: "Outreach Coordinator",
    photo: "erica_zhang.jpg",
    major: "ECE, CS",
    year: "2028",
  },
  {
    name: "Aryan Garg",
    team: "Outreach",
    role: "Outreach Coordinator",
    photo: "aryan_garg.jpg",
    major: "Stats, Neuro",
    year: "2029",
  },
  {
    name: "Ashley Park",
    team: "Marketing",
    role: "Director of Marketing",
    photo: "ashley_park.jpg",
    major: "CS, Stats",
    year: "2028",
  },
  {
    name: "Christian Paul",
    team: "Marketing",
    role: "Marketing Coordinator",
    photo: "christian_paul.jpg",
    major: "CS/AI",
    year: "2028",
  },
  {
    name: "Thomas Hughes",
    team: "Marketing",
    role: "Marketing Coordinator",
    photo: "thomas_hughes.jpg",
    major: "CS, Linguistics",
    year: "2030",
  },
  {
    name: "Veronika Vitko",
    team: "Marketing",
    role: "Marketing Coordinator",
    photo: "veronika_vitko.jpg",
    year: "2030",
  },
  {
    name: "Jimmy Chen",
    team: "Marketing",
    role: "Marketing Coordinator",
    photo: "jimmy_chen.jpg",
    major: "Math, CS",
    year: "2030",
  },
];

export const byTeam = (t: Team) => members.filter((m) => m.team === t);
