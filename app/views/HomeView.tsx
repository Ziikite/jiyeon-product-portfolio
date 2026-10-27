import Link from "next/link";
import Header from "@/app/components/Header";
import TypingTagline from "@/app/components/TypingTagline";
import { getContent } from "@/app/lib/content";
import { localePath, ui, type Locale } from "@/app/lib/i18n";

export default function HomeView({ locale }: { locale: Locale }) {
  const { profile, projects } = getContent(locale);
  return (
    <main>
      <Header locale={locale} />

      <section className="hero" id="top">
        <h1>{profile.name}</h1>
        <TypingTagline />
        <div className="hero-foot">
          <p>{profile.about}</p>
          <a className="pill-link" href="#work">
            {ui[locale].viewProjects}
          </a>
        </div>
      </section>

      <section className="block" id="work">
        <div className="wrap">
          <div className="block-head">
            <h2>Project</h2>
          </div>

          <div className="gallery-grid">
            {projects.map((project) => (
              <Link className="gallery-card" href={localePath(locale, `/projects/${project.slug}`)} key={project.slug}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="gallery-image" src={project.image} alt="" />
                <div className="gallery-caption">
                  <h3>{project.title}</h3>
                  <p className="gallery-meta">
                    {project.org} · {project.domain}
                  </p>
                  <div className="gallery-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
