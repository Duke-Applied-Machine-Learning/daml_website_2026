export const teams = ["Exec", "Outreach", "Marketing"] as const;
export type Team = (typeof teams)[number];

export type TeamMember = {
  name: string;
  team: Team;
  /** The member's role within DAML. */
  role: string;
  major?: string;
  year?: string;
  /** Filename in src/assets/headshots/, e.g. "Jane_Doe.jpg". */
  photo?: string;
};

/** Everyone, in display order within each team. */
export const members: TeamMember[] = [
  {
    name: "Renzo Larrea",
    team: "Exec",
    role: "Co-President",
    photo: "Renzo_Larrea.jpg",
    major: "Math, CS",
    year: "2028",
  },
  {
    name: "Mayur Sekhar",
    team: "Exec",
    role: "Co-President",
    photo: "Mayur_Sekhar.jpg",
    major: "Math, CS/AI",
    year: "2027",
  },
  {
    name: "Danielle Li",
    team: "Exec",
    role: "Data Science Director",
    photo: "Danielle_Li.jpg",
    major: "Math, CS",
    year: "2028",
  },
  {
    name: "Ruben Marcus",
    team: "Exec",
    role: "Data Science Director",
    photo: "Ruben_Marcus.jpg",
    major: "Math",
    year: "2029",
  },
  {
    name: "David Li",
    team: "Exec",
    role: "Data Science Director",
    photo: "David_Li.jpg",
    major: "CS, Econ",
    year: "2028",
  },
  {
    name: "Aashish Cheruvu",
    team: "Exec",
    role: "Data Science Director & AITP Instructor",
    photo: "Aashish_Cheruvu.jpg",
    major: "BME, ECE",
    year: "2028",
  },
  {
    name: "Steve Yin",
    team: "Exec",
    role: "AITP Instructor",
    photo: "Steve_Yin.jpg",
  },
  {
    name: "Clara Bartusiak",
    team: "Outreach",
    role: "Director of Outreach",
    photo: "Clara_Bartusiak.jpg",
    major: "ECE, CS",
    year: "2027",
  },
  {
    name: "Arnav Dhar",
    team: "Outreach",
    role: "Outreach Coordinator",
    photo: "Arnav_Dhar.jpg",
  },
  {
    name: "Erica Zhang",
    team: "Outreach",
    role: "Outreach Coordinator",
    photo: "Erica_Zhang.jpg",
    major: "ECE, CS",
    year: "2028",
  },
  {
    name: "Aryan Garg",
    team: "Outreach",
    role: "Outreach Coordinator",
    photo: "Aryan_Garg.jpg",
    major: "CS, Neuro",
    year: "2029",
  },
  {
    name: "Ashley Park",
    team: "Marketing",
    role: "Director of Marketing",
    photo: "Ashley_Park.jpg",
    major: "CS, Stats",
    year: "2028",
  },
];

export const byTeam = (t: Team) => members.filter((m) => m.team === t);
