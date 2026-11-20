import type { AboutSection, CareerEntry, Project } from "@/app/lib/data";
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

export const aboutIntro = [
  "I'm someone who is curious about why people behave the way they do.",
  "Looking at the same screen, some people pass by and others stop. To me, planning is less about deciding what to build and more about understanding who stops, where, and why. Once you know why, what needs to be built naturally narrows down.",
  "Across fintech, cloud, mobility, commerce, and delivery, I've analyzed qualitative data from more than 366 users and turned it into solutions that fit their real context.",
  "From new-business service planning at TmaxCloud to payment-service UX at GLN International and user research at Woowa Brothers, I've taken on very different kinds of work. Here is what I've come to value along the way, and how I work today.",
];

export const aboutSections: AboutSection[] = [
  {
    num: "01",
    title: "What Matters",
    sub: "What I value",
    essays: [
      {
        title: "Data is another language for understanding people.",
        paragraphs: [
          "I'm not good at reading people's feelings from the mood or by instinct. Because I dig into causes first, I've been told I come across as cold, or that I probe too much. For a long time, I thought it was something I had to fix.",
          "Work changed my mind. Thousands of inquiries and click logs recorded exactly where people felt anxious and where they gave up. What I couldn't sense by instinct, I could understand through data.",
          "So when I look at numbers, I also ask, \"What didn't this person know at that moment?\" To me, numbers aren't conclusions — they're clues that lead me closer to people.",
        ],
      },
      {
        title: "With the fundamentals, you can make it down an unfamiliar slope.",
        paragraphs: [
          "As a child, I once went up a black-diamond ski run for the first time. I had no fancy technique, but I made it all the way down with just the basics I'd learned. My parents didn't take me down that slope; they waited at the bottom until I got there on my own.",
          "Since then, unfamiliar situations haven't scared me much. Even facing a new domain or a tool I've never used, I believe I can find my way by going back to the basics — defining the problem and checking with users. That's probably why I often hear, \"You always seem to be the first to try something new.\"",
        ],
      },
    ],
  },
  {
    num: "02",
    title: "In Practice",
    sub: "How I work",
    essays: [
      {
        title: "I set the hypothesis and how to check it first.",
        paragraphs: [
          "When improving Woowa Brothers' group-order service, I started from the data: 63.1% of hosts used it once and never came back.",
          "I built hypotheses around a four-step journey — entry, checking status, completing the order, and splitting the bill — and designed two rounds of usability tests with four hosts and four participants. What we observed was cross-checked against 310,000 group-order attempts.",
          "Two problems came up consistently: hosts failed to enter because they didn't know the feature existed, and participants didn't understand the term \"confirm menu.\"",
        ],
      },
      {
        title: "I confirm before I'm convinced.",
        paragraphs: [
          "Even when a hypothesis I've set seems right, I keep it as a hypothesis. When I actually meet users, my initial assumptions get overturned more often than I'd expect.",
          "The same goes for interpreting results. If a number improves, I look separately at how much of it was really the effect of my work. Rather than talking up results, separating what I've confirmed from what I still don't know helps more with the next decision.",
        ],
      },
      {
        title: "I build first, then judge.",
        paragraphs: [
          "If the tool I need doesn't exist, I build it myself. Lately, building dashboards and automating operations with AI has greatly cut the time it takes to test an idea.",
          "But the faster the tools get, the more it matters to decide what to build and what to measure. Even when I hand off the implementation, that judgment stays with me.",
        ],
      },
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
