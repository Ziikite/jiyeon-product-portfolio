import Header from "@/app/components/Header";
import { getContent } from "@/app/lib/content";
import type { Locale } from "@/app/lib/i18n";

export default function AboutView({ locale }: { locale: Locale }) {
  const { profile, aboutIntro, aboutSections, career, education, skills, awards } = getContent(locale);
  return (
    <main>
      <Header locale={locale} />

      <section className="block about-block" id="about">
        <div className="wrap">
          <div className="about-intro">
            <p className="about-label">About</p>
            <div className="about-intro-body">
              <h1>
                {profile.nameKo} · {profile.name}
              </h1>
              <p className="about-intro-role">{profile.role}</p>
              <div className="about-intro-text">
                {aboutIntro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          {aboutSections.map((section) => (
            <section className="about-section" key={section.num} aria-labelledby={`about-h-${section.num}`}>
              <div className="about-section-heading">
                <p className="about-section-num">{section.num}.</p>
                <h2 id={`about-h-${section.num}`}>{section.title}</h2>
                <p className="about-section-sub">{section.sub}</p>
              </div>
              <div className="about-section-content">
                {section.essays.map((essay) => (
                  <article className="about-essay" key={essay.title}>
                    <h3>{essay.title}</h3>
                    {essay.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </article>
                ))}
              </div>
            </section>
          ))}
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
    </main>
  );
}
