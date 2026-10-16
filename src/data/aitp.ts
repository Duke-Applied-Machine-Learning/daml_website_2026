/**
 * The AITP syllabus. Shared by the main site's /recruitment page and the
 * standalone AITP site in aitp/ — edit it here, both pick it up.
 *
 * `video` is a YouTube video id from the DAML channel. Leave it off for weeks
 * that haven't been recorded yet; the AITP site shows a placeholder instead.
 */
export interface Session {
  theme: string;
  topics: string;
  handsOn?: string;
}

export interface Week {
  week: number;
  sessions: Session[];
  video?: { id: string; title: string };
}

export const aitpTerm = "Fall 2026";

export const syllabus: Week[] = [
  {
    week: 1,
    video: { id: "yTkQPeINaQ0", title: "AITP 2026 Lesson 1: Introduction" },
    sessions: [
      {
        theme: "Intuition & ML landscape",
        topics:
          "Supervised vs unsupervised, different problem types, what ML can solve, cool applications, limitations (AGI, BCI, genetics)",
        handsOn: "Discuss examples; no coding yet",
      },
    ],
  },
  {
    week: 2,
    video: { id: "4S-VpRuPlUE", title: "AITP 2026 Lesson 2: Math and Basics" },
    sessions: [
      {
        theme: "Math & metrics bootcamp",
        topics: "Probability, statistics, loss functions, evaluation metrics",
        handsOn:
          "Small exercises: compute accuracy, precision, recall, cross-entropy by hand/code",
      },
    ],
  },
  {
    week: 3,
    video: {
      id: "Og3PrwOquc0",
      title: "AITP 2026 Lesson 3: Supervised Learning",
    },
    sessions: [
      {
        theme: "Simple supervised classification",
        topics: "KNN, logistic regression, decision trees, Gini impurity",
        handsOn: "Train each on tabular data; compare decision boundaries",
      },
    ],
  },
  {
    week: 4,
    video: {
      id: "q_0hEjmQlk8",
      title: "AITP 2026 Lesson 4: Unsupervised Learning",
    },
    sessions: [
      {
        theme: "Simple unsupervised + signal/time-series methods",
        topics: "K-means, PCA, NMF, FA, HMM, GFPA, Granger causality",
        handsOn: "Cluster and decompose data; apply HMM/Granger to time series",
      },
      {
        theme: "Reinforcement learning",
        topics: "Q-learning, basic RL concepts",
        handsOn: "Gridworld Q-learning demo; maybe CartPole if time",
      },
    ],
  },
  {
    week: 5,
    sessions: [
      {
        theme: "Intro to deep learning + classical baselines",
        topics: "MLP, backprop, random forest, SVM",
        handsOn:
          "Build small MLP; compare with random forest/SVM on same dataset",
      },
    ],
  },
  {
    week: 6,
    sessions: [
      {
        theme: "Convolution & image recognition",
        topics: "Convolution, image recognition, YOLO",
        handsOn: "Train a small CNN; use pretrained YOLO for object detection",
      },
    ],
  },
  {
    week: 7,
    sessions: [
      {
        theme: "Sequences & attention before transformers",
        topics:
          "Recurrent networks, simple attention, hard/soft attention, QKR, applications, LSTM",
        handsOn:
          "Use RNN/LSTM; visualize attention weights; discuss attention pre-transformers",
      },
    ],
  },
  {
    week: 8,
    sessions: [
      {
        theme: "Transformers & modern sequence models",
        topics: "Transformers, transformer internals, SSMs",
        handsOn: "Use a pretrained transformer; overview SSMs",
      },
    ],
  },
  {
    week: 9,
    sessions: [
      {
        theme: "Generative modeling",
        topics: "AE, VAE, GAN, diffusion, flow matching",
        handsOn:
          "Train/generate with pretrained VAE/GAN/diffusion; explain flow matching conceptually",
      },
    ],
  },
  {
    week: 10,
    sessions: [
      {
        theme: "Applications & agents",
        topics: "API, Token, MoE, SWARM, CLAW, MCP",
      },
    ],
  },
];

/** Program logistics — the cards on /recruitment and the AITP site. */
export const structureItems = [
  {
    label: "Weekly cadence",
    detail: "Workshops run Saturdays 2:00–3:00 pm in Social Sciences 139.",
  },
  {
    label: "Project sessions",
    detail:
      "Dedicated project work sessions follow immediately after from 3:00–4:00 pm with mentor check-ins.",
  },
  {
    label: "Mentorship",
    detail:
      "Each project team is paired with experienced DAML engineers who guide scoping, execution, and delivery.",
  },
];

export const requirementItems = [
  {
    label: "Prerequisites",
    detail:
      "Comfort with Python from CS 101/201 or equivalent. Prior ML exposure is helpful but not required.",
  },
  {
    label: "Attendance",
    detail:
      "More than two unexcused absences removes eligibility for certification. Recordings are provided for approved conflicts.",
  },
  {
    label: "Deliverables",
    detail:
      "A final project showcase judged by our DS Directors. Weighted scores across presentation and exam inform whether members pass our program.",
  },
];
