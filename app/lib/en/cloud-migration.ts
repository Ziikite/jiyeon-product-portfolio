import type { Project } from "@/app/lib/data";

export const project: Project = {
  slug: "cloud-migration",
  no: "03",
  org: "TmaxCloud",
  period: "2024.06 — 2024.09",
  role: "Detail page UI 100% · Service UX planning 90%",
  team: ["Project Manager 1", "UX Designer 1", "Frontend Engineer 2", "Backend Engineer 2"],
  domain: "B2B SaaS",
  image: "/projects/cloud-migration.svg",
  coverImage: "/projects/cover/cloud-migration.svg",
  title: "Lowering the barrier to entry:\na new cloud migration service",
  summary:
    "I redesigned migration assessment — which took 1–2 months without experts — around a survey-based automated assessment and an integrated dashboard, so it can be done in a day.",
  heroMetric: { value: "1 day", label: "Target time for environment assessment" },
  metrics: [
    { value: "$4.511B", label: "Projected market size in 2028" },
    { value: "78%", label: "Cite a lack of skilled staff and expertise" },
    { value: "45", label: "Design system components built" },
  ],
  sections: [
    {
      label: "01 · Background",
      heading: "Cloud migration is growing fast, but complexity, difficulty, and limited resources keep the barrier high",
      body:
        "Cloud migration technology helps move legacy systems to the cloud, and demand has climbed with the rise of AI — yet technical and psychological barriers make it hard to adopt. The global cloud migration market is projected to grow from $0.92 billion in 2021 to $4.511 billion in 2028, a growth rate of 25.5%. Among IT initiatives that companies and institutions are pursuing, cloud migration stands at 79%, AI adoption at 56%, data analytics at 33%, and information security at 22%.",
      image: "/projects/detail/cloud-migration-1.png",
    },
    {
      label: "02 · Strategy",
      heading: "Setting the strategy",
      body: "A migration system that lowers the technical burden so even beginners can use it",
      list: [
        "Pain Point — System assessments that take 3–4+ months, complex environments mapped by hand → Insight — Introduce a survey-based automated assessment",
        "Pain Point — Migration progress that's hard to monitor, tools and information scattered everywhere → Insight — Design one integrated dashboard on a single screen",
        "Pain Point — Complex legacy systems and obscure jargon, growing demand from non-experts → Insight — Minimize technical terms and visualize",
      ],
    },
    {
      label: "03 · Problem 1",
      heading: "Complex legacy environments mapped by hand",
      body:
        "Most competitors start a migration by having experts install agents and analyze the environment manually. That requires dedicated specialists, and even when outsourced, it takes 1–2 months on average.",
    },
    {
      label: "04 · Solution 1",
      heading: "See your legacy environment in a day, based on a survey",
      body:
        "I proposed a feature that maps the legacy environment through a survey. Unlike competitors, it keeps complex terms like servers and frameworks to a minimum so that even beginners can follow along.",
      list: ["Step-by-step progress bar", "Plain-language UX writing"],
      image: "/projects/detail/cloud-migration-solution-1.svg",
    },
    {
      label: "05 · Problem 2",
      heading: "Scattered tools and information",
      body:
        "Running a migration means juggling several third-party tools. This drags out timelines and weighs on the people doing the work.",
    },
    {
      label: "06 · Solution 2",
      heading: "A migration you can run from a single screen",
      body:
        "To compare the various tools at a glance, I placed As-Is and To-Be side by side, and added explanations of the analysis results so users don't have to learn yet another migration tool.",
      list: ["Comparison table", "Analysis & review notes"],
      image: "/projects/detail/cloud-migration-solution-3.svg",
    },
    {
      label: "07 · Problem 3",
      heading: "Growing demand from non-experts",
      body:
        "Organizations faced a shortage of skilled people and expertise to use the technology. Existing migration monitoring services were also hard to follow because of terms like waves and integration testing.",
    },
    {
      label: "08 · Solution 3",
      heading: "Minimal jargon, more visuals",
      body:
        "The monitoring screen leads with numbers and charts, easing the burden of technical terminology.",
      image: "/projects/detail/cloud-migration-solution-2.svg",
    },
  ],
  tags: ["New Business", "B2B UX", "Dashboard"],
};
