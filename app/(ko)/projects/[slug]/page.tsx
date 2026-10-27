import type { Metadata } from "next";
import ProjectView from "@/app/views/ProjectView";
import { getContent } from "@/app/lib/content";
import { ui } from "@/app/lib/i18n";

const LOCALE = "ko";

export function generateStaticParams() {
  return getContent(LOCALE).projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getContent(LOCALE).getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title.replace("\n", " ")} — ${ui[LOCALE].nameSuffix}`,
    description: project.summary,
    alternates: { languages: { ko: `/projects/${slug}`, en: `/en/projects/${slug}` } },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectView slug={slug} locale={LOCALE} />;
}
