import OverlapWindows from "@/app/components/OverlapWindows";
import CompareVisuals from "@/app/components/CompareVisuals";
import { findImage } from "@/app/lib/findImage";

const SHOTS = [
  { key: "intro", label: "소개 페이지", base: "clas-problem-intro" },
  { key: "purchase", label: "구매 페이지", base: "clas-problem-purchase" },
  { key: "use", label: "사용 페이지", base: "clas-problem-use" },
];

function ItemHead({ no, text }: { no: number; text: string }) {
  return (
    <div className="cv-head">
      <span className="cv-no">{no}</span>
      <span className="cv-title">{text}</span>
    </div>
  );
}

export default function CauseVisual({ body, list }: { body: string; list: string[] }) {
  const shots = SHOTS.map((s) => ({ key: s.key, label: s.label, src: findImage(s.base) }));

  return (
    <>
      <p>{body}</p>
      {list[0] && (
        <div className="cv-item">
          <ItemHead no={1} text={list[0]} />
          <OverlapWindows shots={shots} />
        </div>
      )}
      {list[1] && (
        <div className="cv-item">
          <ItemHead no={2} text={list[1]} />
          <CompareVisuals />
        </div>
      )}
    </>
  );
}
