import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/app/components/Header";
import ProjectToc from "@/app/components/ProjectToc";
import InquiryPieChart from "@/app/components/InquiryPieChart";
import HighlightOnScroll from "@/app/components/HighlightOnScroll";
import ProblemCascade from "@/app/components/ProblemCascade";
import VocAccordion from "@/app/components/VocAccordion";
import InterviewMatrix from "@/app/components/InterviewMatrix";
import StrategySection from "@/app/components/StrategySection";
import BeforeAfterFaq from "@/app/components/BeforeAfterFaq";
import OutcomeCharts from "@/app/components/OutcomeCharts";
import AppendixSection from "@/app/components/AppendixSection";
import ServiceCards from "@/app/components/ServiceCards";
import ProblemTable from "@/app/components/ProblemTable";
import CauseVisual from "@/app/components/CauseVisual";
import SolutionVisual from "@/app/components/SolutionVisual";
import OutcomeVisual from "@/app/components/OutcomeVisual";
import BackgroundVisual from "@/app/components/BackgroundVisual";
import MigrationStrategy from "@/app/components/MigrationStrategy";
import ProblemAgent from "@/app/components/ProblemAgent";
import SurveySolution from "@/app/components/SurveySolution";
import ToolsProblemBlock from "@/app/components/ToolsProblemBlock";
import ToolSolution from "@/app/components/ToolSolution";
import ExpertGapProblem from "@/app/components/ExpertGapProblem";
import MonitorSolution from "@/app/components/MonitorSolution";
import VoiceBackground from "@/app/components/VoiceBackground";
import ShadowingProblem from "@/app/components/ShadowingProblem";
import CauseSection from "@/app/components/CauseSection";
import UxFactors from "@/app/components/UxFactors";
import TestDesignBlock from "@/app/components/TestDesignBlock";
import RouteBriefingBlock from "@/app/components/RouteBriefingBlock";
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
          {project.sections.map((section, i) => {
            const pinnedFaq =
              project.slug !== "gln-faq"
                ? null
                : section.label === "05 · Solution 1"
                  ? "clear"
                  : section.label === "06 · Solution 2"
                    ? "approachable"
                    : section.label === "07 · Solution 3"
                      ? "focus"
                      : null;
            return (
            <div
              className={`case-section${pinnedFaq ? " case-section-pinned" : ""}`}
              style={pinnedFaq ? ({ "--ba-n": pinnedFaq === "clear" ? 1 : 2 } as React.CSSProperties) : undefined}
              id={`section-${i}`}
              key={section.label}
            >
              <span className="case-label">{section.label}</span>
              <div>
                <h3>{section.heading}</h3>
                {project.slug === "gln-faq" && section.label === "04 · Strategy" && section.list ? (
                  <StrategySection
                    body={section.body}
                    highlight="(1) 실패 상황의 명확성 강화, (2) 사용자 불안 완화, (3) 자발적 해결 가능성 확대를 달성하고자 하였습니다."
                    list={section.list}
                  />
                ) : project.slug === "clas-conversion" && section.label === "02 · Problem" ? (
                  <ProblemTable body={section.body} />
                ) : project.slug === "clas-conversion" && section.label === "03 · Cause" && section.list ? (
                  <CauseVisual body={section.body} list={section.list} />
                ) : project.slug === "clas-conversion" && section.label === "04 · Solution" && section.list ? (
                  <SolutionVisual body={section.body} list={section.list} />
                ) : project.slug === "clas-conversion" && section.label === "05 · Outcome" ? (
                  <OutcomeVisual body={section.body} />
                ) : project.slug === "gm-voice-ux" && section.label === "06 · Solution 1" && section.list ? (
                  <RouteBriefingBlock body={section.body} list={section.list} />
                ) : project.slug === "gm-voice-ux" && section.label === "05 · Test Design" ? (
                  <TestDesignBlock body={section.body} />
                ) : project.slug === "gm-voice-ux" && section.label === "04 · Strategy" && section.list ? (
                  <UxFactors body={section.body} list={section.list} />
                ) : project.slug === "gm-voice-ux" && section.label === "03 · Cause" && section.list && section.image ? (
                  <CauseSection body={section.body} list={section.list} image={section.image} />
                ) : project.slug === "gm-voice-ux" && section.label === "02 · Problem" && section.list ? (
                  <ShadowingProblem body={section.body} quotes={section.list} />
                ) : project.slug === "gm-voice-ux" && section.label === "01 · Background" ? (
                  <VoiceBackground body={section.body} />
                ) : project.slug === "cloud-migration" && section.label === "07 · Problem 3" ? (
                  <ExpertGapProblem body={section.body} />
                ) : project.slug === "cloud-migration" && section.label === "08 · Solution 3" ? (
                  <MonitorSolution body={section.body} image={section.image} />
                ) : project.slug === "cloud-migration" && section.label === "05 · Problem 2" ? (
                  <ToolsProblemBlock body={section.body} />
                ) : project.slug === "cloud-migration" && section.label === "06 · Solution 2" && section.list ? (
                  <ToolSolution body={section.body} image={section.image} labels={section.list} />
                ) : project.slug === "cloud-migration" && section.label === "03 · Problem 1" ? (
                  <ProblemAgent body={section.body} />
                ) : project.slug === "cloud-migration" && section.label === "04 · Solution 1" && section.list ? (
                  <SurveySolution body={section.body} image={section.image} labels={section.list} />
                ) : project.slug === "cloud-migration" && section.label === "02 · Strategy" ? (
                  <MigrationStrategy body={section.body} />
                ) : project.slug === "cloud-migration" && section.label === "01 · Background" ? (
                  <BackgroundVisual body={section.body} image={section.image} />
                ) : project.slug === "clas-conversion" && section.label === "01 · Service" ? (
                  <>
                    <p>{section.body}</p>
                    <ServiceCards />
                  </>
                ) : project.slug === "gln-faq" && section.label === "09 · Appendix" ? (
                  <AppendixSection body={section.body} />
                ) : project.slug === "gln-faq" && section.label === "08 · Outcome" && section.list ? (
                  <OutcomeCharts body={section.body} list={section.list} />
                ) : (
                  <>
                    {project.slug === "gln-faq" && section.label === "02 · Problem" ? (
                      <HighlightOnScroll
                        text={section.body}
                        highlight="FAQ에서 찾기 어려운 문제 상황으로 이어져 결국 FAQ 탐색을 포기하고 CS로 직접 문의하게 만들었습니다."
                      />
                    ) : pinnedFaq ? (
                      <BeforeAfterFaq body={section.body} kind={pinnedFaq} />
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
                    ) : project.slug === "gln-faq" && section.label === "03 · Cause" ? (
                      <>
                        <VocAccordion />
                        <InterviewMatrix />
                      </>
                    ) : (
                      section.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="case-image" src={section.image} alt="" />
                      )
                    )}
                  </>
                )}
              </div>
            </div>
            );
          })}
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
