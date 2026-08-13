import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
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

  return (
    <main>
      <Header />

      <div className="project-header">
        <div className="wrap">
          <Link className="back-link" href="/#work">
            ← 전체 프로젝트
          </Link>
        </div>
      </div>

      <section className="project-hero">
        <div className="wrap">
          <h1>{project.title}</h1>
          <p className="project-byline">
            {project.no} — {project.org} · <span className="domain-tag">{project.domain}</span>
          </p>
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

      <div className="wrap project-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="project-cover-image" src={project.image} alt="" />
      </div>

      <div className="metric-strip">
        {project.metrics.map((metric) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="case-sections">
        <div className="wrap" style={{ padding: 0 }}>
          {project.sections.map((section) => (
            <div className="case-section" key={section.label}>
              <span className="case-label">{section.label}</span>
              <div>
                <h3>{section.heading}</h3>
                <p>{section.body}</p>
                {section.list && (
                  <ul className="case-list">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="case-image" src={section.image} alt="" />
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

      <Footer />
    </main>
  );
}
