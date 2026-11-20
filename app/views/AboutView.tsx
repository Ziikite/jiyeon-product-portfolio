import Header from "@/app/components/Header";
import { getContent } from "@/app/lib/content";
import type { Locale } from "@/app/lib/i18n";

const COPY = {
  ko: { career: "경력", education: "학력", awards: "수상", skills: "스킬" },
  en: { career: "Where I've worked", education: "Where I studied", awards: "Recognition", skills: "Tools I use" },
};

function SectionHeading({ num, title, sub }: { num: string; title: string; sub: string }) {
  return (
    <div className="about-section-heading">
      <p className="about-section-num">{num}.</p>
      <h2 id={`about-h-${num}`}>{title}</h2>
      <p className="about-section-sub">{sub}</p>
    </div>
  );
}

export default function AboutView({ locale }: { locale: Locale }) {
  const t = COPY[locale];
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
              <SectionHeading num={section.num} title={section.title} sub={section.sub} />
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

          <section className="about-section" id="career" aria-labelledby="about-h-03">
            <SectionHeading num="03" title="Career" sub={t.career} />
            <div className="about-section-content">
              <ol className="about-list">
                {career.map((entry) => (
                  <li className="about-item" key={`${entry.org}-${entry.period}`}>
                    <p className="about-item-period">{entry.period}</p>
                    <div>
                      <h3 className="about-item-title">{entry.org}</h3>
                      <p className="about-item-sub">{entry.role}</p>
                      <div className="about-item-groups">
                        {entry.groups.map((group) => (
                          <div key={group.heading}>
                            <p className="about-item-heading">{group.heading}</p>
                            <ul className="about-bullets">
                              {group.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="about-section" aria-labelledby="about-h-04">
            <SectionHeading num="04" title="Education" sub={t.education} />
            <div className="about-section-content">
              <ol className="about-list">
                {education.map((edu) => (
                  <li className="about-item" key={edu.school}>
                    <p className="about-item-period">{edu.detail.split(" · ").pop()}</p>
                    <div>
                      <h3 className="about-item-title">{edu.school}</h3>
                      <p className="about-item-sub">{edu.detail.split(" · ").slice(0, -1).join(" · ")}</p>
                      <ul className="about-bullets">
                        {edu.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="about-section" aria-labelledby="about-h-05">
            <SectionHeading num="05" title="Awards" sub={t.awards} />
            <div className="about-section-content">
              <ul className="about-awards">
                {awards.map((award) => (
                  <li key={award.title}>
                    <span>{award.title}</span>
                    <span className="about-item-sub">{award.category}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="about-section" aria-labelledby="about-h-06">
            <SectionHeading num="06" title="Skills" sub={t.skills} />
            <div className="about-section-content">
              <div className="about-skills">
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
          </section>
        </div>
      </section>
    </main>
  );
}
