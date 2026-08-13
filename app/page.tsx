import Link from "next/link";
import Header from "@/app/components/Header";
import { profile, career, education, skills, awards, projects } from "@/app/lib/data";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero" id="top">
        <h1>{profile.name}</h1>
        <div className="hero-foot">
          <p>{profile.about}</p>
          <a className="pill-link" href="#work">
            프로젝트 보기 ↓
          </a>
        </div>
      </section>

      <section className="block" id="career">
        <div className="wrap">
          <div className="block-head">
            <h2>Career</h2>
          </div>

          <div className="career-list">
            {career.map((entry) => (
              <div className="career-row" key={`${entry.org}-${entry.period}`}>
                <div className="career-org">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="career-logo" src={entry.logo} alt={entry.org} />
                </div>
                <div>
                  <div className="career-role">
                    <h3>{entry.role}</h3>
                    <span>{entry.period}</span>
                  </div>
                  <div className="career-groups">
                    {entry.groups.map((group) => (
                      <div className="career-group" key={group.heading}>
                        <p className="career-group-heading">{group.heading}</p>
                        <ul className="career-bullets">
                          {group.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="edu-skill-grid">
            <div>
              <h4>Education</h4>
              {education.map((edu) => (
                <div className="edu-item" key={edu.school}>
                  <strong>{edu.school}</strong>
                  <span>{edu.detail}</span>
                  <ul>
                    {edu.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <h4 style={{ marginTop: 40 }}>Awards</h4>
              <ul className="award-list">
                {awards.map((award) => (
                  <li key={award.title}>
                    {award.title}
                    <span>{award.category}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Skills</h4>
              {skills.map((group) => (
                <div className="skill-group" key={group.group}>
                  <p>{group.group}</p>
                  <div className="skill-tags">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="block" id="work">
        <div className="wrap">
          <div className="block-head">
            <h2>Project</h2>
          </div>

          <div className="gallery-grid">
            {projects.map((project) => (
              <Link className="gallery-card" href={`/projects/${project.slug}`} key={project.slug}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="gallery-image" src={project.image} alt="" />
                <div className="gallery-caption">
                  <h3>{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
