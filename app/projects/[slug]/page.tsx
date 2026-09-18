import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/app/components/Header";
import ProjectToc from "@/app/components/ProjectToc";
import InquiryPieChart from "@/app/components/InquiryPieChart";
import HighlightOnScroll from "@/app/components/HighlightOnScroll";
import ProblemCascade from "@/app/components/ProblemCascade";
import { projects, getProject } from "@/app/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title.replace("\n", " ")} — 김지연`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const tocItems = project.sections.map((section, i) => ({
    id: `section-${i}`,
    label: section.label.includes("·") ? section.label.split("·")[1].trim() : section.label,
  }));

  return (
    <main>
      <Header />
      <ProjectToc items={tocItems} />
      <Link className="back-link" href="/#work">
        ← 전체 프로젝트
      </Link>

      <div className="project-body">
      <div className="wrap project-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="project-cover-image" src={project.coverImage} alt="" />
      </div>

      <section className="project-hero">
        <div className="wrap">
          <p className="project-byline">
            {project.no} — {project.org} · <span className="domain-tag">{project.domain}</span>
          </p>
          <h1>{project.title}</h1>
          <p className="summary">{project.summary}</p>

          <div className="project-facts">
            <div>
              <p>Role</p>
              <span>{project.role}</span>
            </div>
            {project.team && (
              <div>
                <p>Team</p>
                <span>{project.team.join(" · ")}</span>
              </div>
            )}
            <div>
              <p>Period</p>
              <span>{project.period}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="case-sections">
        <div className="wrap" style={{ padding: 0 }}>
          {project.sections.map((section, i) => (
            <div className="case-section" id={`section-${i}`} key={section.label}>
              <span className="case-label">{section.label}</span>
              <div>
                <h3>{section.heading}</h3>
                {project.slug === "gln-faq" && i === 0 ? (
                  <HighlightOnScroll
                    text={section.body}
                    highlight="오류, 환불, 한도 초과 등의 문제를 찾기 어려워 고객센터를 찾는 경우가 많았습니다."
                  />
                ) : (
                  <p>{section.body}</p>
                )}
                {section.list && (
                  <ul className="case-list">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {project.slug === "gln-faq" && i === 0 ? (
                  <InquiryPieChart />
                ) : project.slug === "gln-faq" && section.label === "02 · Problem" ? (
                  <ProblemCascade />
                ) : (
                  section.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="case-image" src={section.image} alt="" />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap" style={{ padding: 0 }}>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <nav className="project-pager" aria-label="다른 프로젝트">
        <Link href={`/projects/${prev.slug}`}>
          <p>← Previous</p>
          <h4>{prev.title.replace("\n", " ")}</h4>
        </Link>
        <Link className="next" href={`/projects/${next.slug}`}>
          <p>Next →</p>
          <h4>{next.title.replace("\n", " ")}</h4>
        </Link>
      </nav>
      </div>
    </main>
  );
}
