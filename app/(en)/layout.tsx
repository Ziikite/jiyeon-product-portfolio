import type { Metadata } from "next";
import RootDocument from "@/app/views/RootDocument";
import "../globals.css";

export const metadata: Metadata = {
  title: "Jiyeon Kim — Service Planner",
  description:
    "Portfolio of Jiyeon Kim, a service planner who connects user data and context to design experiences that ship.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  alternates: { languages: { ko: "/", en: "/en" } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
