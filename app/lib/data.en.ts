import type { CareerEntry, Project } from "@/app/lib/data";
import { project as glnFaq } from "@/app/lib/en/gln-faq";
import { project as clasConversion } from "@/app/lib/en/clas-conversion";
import { project as cloudMigration } from "@/app/lib/en/cloud-migration";
import { project as gmVoiceUx } from "@/app/lib/en/gm-voice-ux";
import { project as gmEvCharging } from "@/app/lib/en/gm-ev-charging";

// English mirror of data.ts — same exports, same shape.

export const profile = {
  name: "Jiyeon Kim",
  nameKo: "김지연",
  role: "Service Planner · UX Researcher",
  location: "Seoul, Korea",
  about:
    "Across fintech, cloud, mobility, commerce, and delivery, I've analyzed qualitative data from more than 366 users and turned it into solutions that fit their real context.",
  email: "thingzwell@gmail.com",
  phone: "010-2835-3619",
  resumeUrl: "https://drive.google.com/file/d/1sIo2LergOQy2tsaw9t5FXeh84NpFBiUS/view?usp=sharing",
};

export const strengths = [
  {
    title: "Problem definition and user-centered analysis",
    bullets: [
      "I systematically uncover user pain points with a wide range of qualitative and quantitative methods — journey mapping, interviews, shadowing, surveys, SUS, and A/B testing.",
      "From in-car voice agents to metaverse exhibitions and cloud migration, I've found the core of the problem in very different domains, surfaced key needs, and shaped the direction of the service.",
    ],
  },
  {
    title: "Data-driven decisions and hypothesis validation",
    bullets: [
      "I set data-informed UX hypotheses and validate usability and satisfaction by pairing experiments (A/B tests, surveys) with interviews.",
      "In a digital exhibition UX study, I used PCA and regression models to identify what drives satisfaction and turned the findings into service improvements.",
    ],
  },
  {
    title: "Project leadership and stakeholder alignment",
    bullets: [
      "Working with designers, developers, marketers, and external partners, I've led the whole process — from writing proposals and coordinating schedules to sharing deliverables and gathering feedback.",
      "As team lead or PM in hackathons, industry–academia collaborations, and corporate projects, I've delivered results on schedule even in complex situations.",
    ],
  },
];

export const career: CareerEntry[] = [
  {
    period: "2026.04 — 2026.07",
    role: "UX Researcher",
    org: "Woowa Brothers",
    logo: "/logos/woowa.svg",
    groups: [
      {
        heading: "Exploratory research to improve Group Order, an underused service",
        bullets: [
          "Planned and ran two rounds of remote usability tests with 4 hosts and 4 participants to tackle low repeat use (63.1% of hosts used it only once) and usability issues from entry to settlement",
          "Built hypotheses and task scenarios around a four-step journey (entry / checking status / completing the order / splitting the bill) and cross-checked them against quantitative data (310K Group Order attempts)",
          "Found shared failure patterns: hosts never got in because they didn't know the feature existed, participants misread the term “Confirm menu,” and the “Complete” button in bill splitting was often misunderstood",
        ],
      },
      {
        heading: "Planning and launching a research dashboard to grow research across the company",
        bullets: [
          "Organized research data scattered across Google Sheets and Jira and tallied by hand every month, and planned a research dashboard to hit the OKR for employee research participation",
          "Designed an n8n workflow that automatically collects and syncs Jira and Sheets data (refreshing every 15 minutes)",
          "Defined key metrics — participation status, activity trends, Baemin Voice Day participation rate — and designed the screens",
          "Unified the research ID scheme so incidence, cost, and participation data link up automatically",
        ],
      },
    ],
  },
  {
    period: "2025.09 — 2026.03",
    role: "Product Designer",
    org: "GLN International",
    logo: "/logos/gln.svg",
    groups: [
      {
        heading: "Planning new services that help international customers pay Korean medical bills and tuition",
        bullets: [
          "Planned the flow and designed the UX of MediPay, a medical bill payment service",
          "Designed the UX of EduPay, a tuition payment service",
          "Ran SIT and UAT for MediPay and EduPay",
          "Set up social media channels to grow MediPay",
        ],
      },
      {
        heading: "Improving FAQ content and categories around users' pain points",
        bullets: [
          "Ran frequency analysis and topic modeling in Python on 3,929 customer inquiries",
          "Reclassified the main inquiry types (payment errors, refunds, limits, verification, how-to, and more)",
          "Rebuilt the FAQ from internal jargon into users' own language, rewriting every question and answer",
        ],
      },
    ],
  },
  {
    period: "2024.10 — 2025.07",
    role: "Researcher",
    org: "Hanyang University ERICA Industry-Academic Cooperation Foundation",
    logo: "/logos/hanyang.svg",
    groups: [
      {
        heading:
          "Research lead, Ministry of Culture, Sports and Tourism project — personalized performance and exhibition technology for metaverse trials",
        bullets: [
          "Studied what shapes the digital exhibition experience with principal component analysis (PCA) on 108 participants",
          "Filed a patent for content designed to induce emotional change",
          "Researched UX improvements for Lotte World's SLICK Studio content",
        ],
      },
    ],
  },
  {
    period: "2024.02 — 2024.09",
    role: "UX Manager",
    org: "TmaxCloud",
    logo: "/logos/tmax.svg",
    groups: [
      {
        heading: "Planning a new business service to diversify the business portfolio",
        bullets: [
          "Researched the IA and user flows of 20 competing B2B services",
          "Wrote the functional specification for the migration service",
          "Built a design system (45 components) and its guidelines using Jira and Notion",
          "Won PoC approval and adoption as a new business",
        ],
      },
      {
        heading: "UX planning for the Pre-Sales website to reduce bounce rate",
        bullets: [
          "Introduced Google Analytics and Beusable myself to collect KPIs",
          "Reworked CTA buttons and layout, cutting bounce rate by 38% and lifting conversion by 2.3%p",
          "Wrote and ran 622 integration test scenarios (11% surfaced errors)",
          "Wrote service terms and policy documents to unify terminology and UI",
        ],
      },
    ],
  },
];

export const education = [
  {
    school: "Yonsei University",
    detail: "UX · 2022–2024",
    bullets: [
      "Graduated with honors",
      "Thesis: User responses to takeover requests in autonomous driving",
      "GM Korea industry–academia projects (2), KCI papers (3)",
    ],
  },
  {
    school: "Hanyang University ERICA",
    detail: "Business Administration, Design Technology · 2018–2022",
    bullets: [
      "Vice President, College Student Council",
      "Interdisciplinary design curriculum",
      "Display curvature research (undergraduate researcher)",
    ],
  },
];

export const skills = [
  { group: "Data Analysis", items: ["ADsP", "Python", "R", "SPSS", "Google Analytics", "Beusable", "Tableau"] },
  { group: "UX Design", items: ["Figma", "XD", "Photoshop", "User Flow Design", "UX Guidelines"] },
  { group: "Communication", items: ["Notion", "Jira", "Slack"] },
];

export const awards = [
  { title: "AI Big Data Hackathon, Ideathon — Top Prize", category: "Idea track" },
  { title: "SK Creative Challenge 2022 — Excellence Award", category: "Demo track" },
  { title: "Ringle Service Planning Competition — Excellence Award", category: "Service planning track" },
  { title: "3rd National Assembly Library Hackathon — Excellence Award", category: "Idea track" },
];

export const projects: Project[] = [glnFaq, clasConversion, cloudMigration, gmVoiceUx, gmEvCharging];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
