/**
 * The AITP syllabus. Shared by the main site's /recruitment page and the
 * standalone AITP site in aitp/ — edit it here, both pick it up.
 *
 * Lesson videos live in aitp-videos.json, keyed by week number. A GitHub
 * Action (.github/workflows/sync-youtube.yml) fills it in from the DAML
 * YouTube channel, matching uploads titled "AITP <year> Lesson <week>: …".
 * Weeks with no entry show a placeholder on the AITP site.
 */
import videos from "./aitp-videos.json";

export interface Session {
  theme: string;
  topics: string;
  handsOn?: string;
}

/**
 * An optional supplement to a lecture. Kept deliberately sparse: only a
 * topic's foundational paper or an explainer that makes it unusually clear.
 */
export interface Reading {
  title: string;
  /** Who it's from, e.g. "3Blue1Brown" or "Breiman, 2001". */
  source: string;
  /** One line on what it covers or why it's worth reading. */
  description: string;
  url: string;
}

export interface Week {
  week: number;
  sessions: Session[];
  /** 0–3 optional readings, shown under the week on the AITP site. */
  readings?: Reading[];
  video?: { id: string; title: string };
}

export const aitpTerm = "Fall 2026";

const weeks: Omit<Week, "video">[] = [
  {
    week: 1,
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
    sessions: [
      {
        theme: "Math & metrics bootcamp",
        topics: "Probability, statistics, loss functions, evaluation metrics",
        handsOn:
          "Small exercises: compute accuracy, precision, recall, cross-entropy by hand/code",
      },
    ],
    readings: [
      {
        title: "But what is cross-entropy?",
        source: "3Blue1Brown",
        description:
          "Builds up the cross-entropy loss from probability, step by step.",
        url: "https://www.youtube.com/watch?v=GlYgs6v2YfU",
      },
      {
        title: "Neural Networks, Manifolds, and Topology",
        source: "Chris Olah",
        description:
          "How networks reshape the manifold your data lives on until the classes pull apart.",
        url: "https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/",
      },
    ],
  },
  {
    week: 3,
    sessions: [
      {
        theme: "Simple supervised classification",
        topics: "KNN, logistic regression, decision trees, Gini impurity",
        handsOn: "Train each on tabular data; compare decision boundaries",
      },
    ],
    readings: [
      {
        title: "A Visual Introduction to Machine Learning",
        source: "R2D3",
        description:
          "An animated walkthrough of how a decision tree chooses its splits.",
        url: "https://r2d3.us/visual-intro-to-machine-learning-part-1/",
      },
    ],
  },
  {
    week: 4,
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
    readings: [
      {
        title: "Principal Component Analysis Explained Visually",
        source: "Setosa",
        description:
          "Interactive plots showing what PCA's components actually capture.",
        url: "https://setosa.io/ev/principal-component-analysis/",
      },
      {
        title: "Deep RL Course, Unit 2: Q-learning",
        source: "Hugging Face",
        description:
          "A beginner-friendly Q-learning walkthrough with code you can run.",
        url: "https://huggingface.co/learn/deep-rl-course/unit2/introduction",
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
    readings: [
      {
        title: "Neural Networks (videos 1–4)",
        source: "3Blue1Brown",
        description:
          "Neurons, gradient descent, and backpropagation, explained visually.",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
      },
      {
        title: "Building a Neural Network from Scratch",
        source: "Samson Zhang",
        description:
          "Builds and trains an MLP with only NumPy, deriving the math as it goes.",
        url: "https://www.youtube.com/watch?v=w8yWXqWQYmU",
      },
      {
        title: "Random Forests",
        source: "Breiman, 2001",
        description:
          "The original paper introducing random forests.",
        url: "https://www.stat.berkeley.edu/~breiman/randomforest2001.pdf",
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
    readings: [
      {
        title: "Conv Nets: A Modular Perspective",
        source: "Chris Olah",
        description:
          "An intuitive picture of convolutional layers as reusable feature detectors.",
        url: "https://colah.github.io/posts/2014-07-Conv-Nets-Modular/",
      },
      {
        title: "You Only Look Once (YOLO)",
        source: "Redmon et al., 2016",
        description:
          "The original YOLO paper: object detection in a single forward pass.",
        url: "https://arxiv.org/abs/1506.02640",
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
    readings: [
      {
        title: "Understanding LSTM Networks",
        source: "Chris Olah",
        description:
          "The classic visual guide to how LSTM gates work.",
        url: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/",
      },
      {
        title: "Neural Machine Translation by Jointly Learning to Align and Translate",
        source: "Bahdanau et al., 2014",
        description:
          "The paper that introduced attention for translation, before transformers.",
        url: "https://arxiv.org/abs/1409.0473",
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
    readings: [
      {
        title: "Attention Is All You Need",
        source: "Vaswani et al., 2017",
        description:
          "The original transformer paper.",
        url: "https://arxiv.org/abs/1706.03762",
      },
      {
        title: "Transformers and Attention (videos 6–8)",
        source: "3Blue1Brown",
        description:
          "Embeddings, attention, and how transformers store facts, explained visually.",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
      },
      {
        title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
        source: "Gu & Dao, 2023",
        description:
          "The state space model behind the recent push beyond transformers for long sequences.",
        url: "https://arxiv.org/abs/2312.00752",
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
    readings: [
      {
        title: "Auto-Encoding Variational Bayes",
        source: "Kingma & Welling, 2013",
        description:
          "The original variational autoencoder (VAE) paper.",
        url: "https://arxiv.org/abs/1312.6114",
      },
      {
        title: "Generative Adversarial Networks",
        source: "Goodfellow et al., 2014",
        description:
          "The original GAN paper.",
        url: "https://arxiv.org/abs/1406.2661",
      },
      {
        title: "What are Diffusion Models?",
        source: "Lilian Weng",
        description:
          "A thorough, well-illustrated walkthrough of how diffusion models work.",
        url: "https://lilianweng.github.io/posts/2021-07-11-diffusion-models/",
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
    readings: [
      {
        title: "Building Effective Agents",
        source: "Anthropic",
        description:
          "Practical patterns for LLM agents, and when a simpler workflow is enough.",
        url: "https://www.anthropic.com/engineering/building-effective-agents",
      },
      {
        title: "ReAct: Synergizing Reasoning and Acting in Language Models",
        source: "Yao et al., 2022",
        description:
          "The paper behind the reason-then-act loop most LLM agents use.",
        url: "https://arxiv.org/abs/2210.03629",
      },
    ],
  },
];

const videoFor = videos as Record<string, Week["video"]>;

export const syllabus: Week[] = weeks.map((w) => ({
  ...w,
  video: videoFor[w.week],
}));

/** Program logistics — the cards on /recruitment and the AITP site. */
export const structureItems = [
  {
    label: "Weekly cadence",
    detail: "Workshops run Saturdays 12:00–1:00 pm in Social Sciences 139.",
  },
  {
    label: "Project sessions",
    detail:
      "Dedicated project work sessions follow immediately after from 1:00–2:00 pm with mentor check-ins.",
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
