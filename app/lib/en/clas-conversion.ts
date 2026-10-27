import type { Project } from "@/app/lib/data";

export const project: Project = {
  slug: "clas-conversion",
  no: "02",
  org: "TmaxCloud",
  period: "2024.02 — 2024.09",
  role: "Detail page UI 90% · Service UX planning 90%",
  team: ["Project Manager 1", "UX Designer 2", "Frontend Engineer 2", "Backend Engineer 1"],
  domain: "Cloud",
  image: "/projects/clas-conversion.svg",
  coverImage: "/projects/cover/clas-conversion.svg",
  title: "Redesigning an integrated cloud\nservice site to lift conversion",
  summary:
    "I merged intro, purchase, and usage pages that each affiliate had planned separately into one flow — cutting bounce rate by 38% and tripling conversion.",
  heroMetric: { value: "3×", label: "Average conversion lift" },
  metrics: [
    { value: "86%→53%", label: "Intro page bounce rate" },
    { value: "1.1%→3.4%", label: "Average conversion rate" },
    { value: "3→2 steps", label: "Shorter purchase journey" },
  ],
  sections: [
    {
      label: "01 · Service",
      heading: "CLAS, a web service for exploring, buying, and using cloud services",
      body:
        "CLAS offers cloud infrastructure and services together on a single site. Built on Tmax Group's technology, it supports everything companies need — from infrastructure virtualization to automated migration solutions.",
    },
    {
      label: "02 · Problem",
      heading: "Users dropped off because the flow was inconsistent",
      body:
        "Each affiliate planned its own discovery, purchase, and usage pages, so users were constantly sent to new windows, and the mismatched UI and terminology drove high bounce rates and low conversion. Intro page (check product info) → Purchase page (choose options → pay (apply) → manage account → buy more) → Usage page (use the product): bounce / conversion rates were 86% / 1.1% and 78% / 1.3%.",
    },
    {
      label: "03 · Cause",
      heading: "Frequent page jumps and shifting UI left users confused about the service",
      body:
        "To understand a service in detail, users had to move across several pages. Along the way they kept landing in new windows, and every window had a different UI, which left them confused.",
      list: [
        "A new window every time users moved on to purchase or usage",
        "UI and navigation layouts that differed from page to page",
      ],
    },
    {
      label: "04 · Solution",
      heading: "Reworking the user flow so services are easy to compare",
      body:
        "I simplified the flow to minimize page changes and let users see service information right when they arrive. AS-IS: Pre-Sales (check product info) → Sales (choose options → pay (apply) → billing / account / inquiries → buy more) → Post-Sales (use the product). TO-BE: Pre-Sales (check product info, inquire) → Console (choose options → pay (apply) → use the product → buy more)",
      list: [
        "Unified the GNB and simplified the navigation menu to end the jumps into new windows",
        "Cut the three-step flow down to two steps to minimize page changes",
      ],
    },
    {
      label: "05 · Outcome",
      heading: "Bounce rate down 38%, average conversion up 3×",
      body:
        "Bounce rate fell from 86% to 53%, a 38% drop. Average conversion from the product page to the purchase page also tripled. Merging the once-separate intro, purchase, and usage pages also meant setting up new operating policies and manuals. As a result, our team took ownership of running and managing the service. Bounce rate: 86% before → 53% after / Conversion: 1.1~1.3% before → 3.4% after",
    },
  ],
  tags: ["Conversion", "User Flow", "Service Policy"],
};
