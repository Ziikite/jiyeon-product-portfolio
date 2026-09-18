import type { Metadata } from "next";
import Header from "@/app/components/Header";
import { strengths, career, education, skills, awards } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "About — 김지연",
};

export default function AboutPage() {
  return (
    <main>
      <Header />

      <section className="block" id="strengths">
        <div className="wrap">
          <div className="block-head">
            <h2>About</h2>
          </div>

          <div className="strength-list">
            {strengths.map((strength, i) => (
              <div className="strength-row" key={strength.title}>
                <div className="strength-index-col">
                  <span className="strength-index">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3>{strength.title}</h3>
                  <ul className="career-bullets">
                    {strength.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
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
