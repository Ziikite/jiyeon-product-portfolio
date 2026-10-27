import type { Metadata } from "next";
import AboutView from "@/app/views/AboutView";

export const metadata: Metadata = {
  title: "About — Jiyeon Kim",
  alternates: { languages: { ko: "/about", en: "/en/about" } },
};

export default function AboutPage() {
  return <AboutView locale="en" />;
}
