import FadeStack from "@/app/components/FadeStack";
import FlowMorph from "@/app/components/FlowMorph";

// Words the original figure highlighted in blue.
const MARKS = [["GNB 통일", "메뉴 간소화"], ["2단계로 축소"]];

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

export default function SolutionVisual({ body, list }: { body: string; list: string[] }) {
  // The AS-IS / TO-BE flow text is drawn as the diagram, so only the opening sentence stays.
  const cut = body.indexOf(" AS-IS :");
  const intro = cut === -1 ? body : body.slice(0, cut);

  return (
    <>
      <p>{intro}</p>
      {list[0] && (
        <div className="cv-item">
          <Head no={1} text={list[0]} marks={MARKS[0]} />
          <FadeStack />
        </div>
      )}
      {list[1] && (
        <div className="cv-item">
          <Head no={2} text={list[1]} marks={MARKS[1]} />
          <FlowMorph />
        </div>
      )}
    </>
  );
}
