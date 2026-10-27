import FadeStack from "@/app/components/FadeStack";
import FlowMorph from "@/app/components/FlowMorph";
import type { Locale } from "@/app/lib/i18n";

// Words the original figure highlighted in blue.
const MARKS = {
  ko: [["GNB 통일", "메뉴 간소화"], ["2단계로 축소"]],
  en: [["Unified the GNB", "simplified the navigation menu"], ["to two steps"]],
};
const FLOW_CUT = { ko: " AS-IS :", en: " AS-IS:" };

function Title({ text, marks }: { text: string; marks: string[] }) {
  const pattern = new RegExp(`(${marks.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return (
    <span className="cv-title">
      {text.split(pattern).map((part, i) =>
        marks.includes(part) ? (
          <span key={i} className="sv-mark">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}

function Head({ no, text, marks }: { no: number; text: string; marks: string[] }) {
  return (
    <div className="cv-head">
      <span className="cv-no">{no}</span>
      <Title text={text} marks={marks} />
    </div>
  );
}

export default function SolutionVisual({ body, list, locale = "ko" }: { body: string; list: string[]; locale?: Locale }) {
  // The AS-IS / TO-BE flow text is drawn as the diagram, so only the opening sentence stays.
  const cut = body.indexOf(FLOW_CUT[locale]);
  const intro = cut === -1 ? body : body.slice(0, cut);

  return (
    <>
      <p>{intro}</p>
      {list[0] && (
        <div className="cv-item">
          <Head no={1} text={list[0]} marks={MARKS[locale][0]} />
          <FadeStack locale={locale} />
        </div>
      )}
      {list[1] && (
        <div className="cv-item">
          <Head no={2} text={list[1]} marks={MARKS[locale][1]} />
          <FlowMorph />
        </div>
      )}
    </>
  );
}
