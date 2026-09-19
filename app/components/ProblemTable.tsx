import { findImage } from "@/app/lib/findImage";

// Drop a screenshot named "<base>.<ext>" into public/projects/detail/ and it replaces the placeholder automatically.
export const PROBLEM_IMAGE_SIZE = { w: 1200, h: 675 }; // 16:9

type Page = { title: string; imageBase: string; flow: string[]; bounce: string; conversion: string; problem?: boolean };

const PAGES: Page[] = [
  { title: "소개 페이지", imageBase: "clas-problem-intro", flow: ["상품 정보 확인"], bounce: "86%", conversion: "1.1%", problem: true },
  {
    title: "구매 페이지",
    imageBase: "clas-problem-purchase",
    flow: ["상품 옵션 선택", "결제(신청)", "계정 관리", "추가 구매"],
    bounce: "78%",
    conversion: "1.3%",
  },
  { title: "사용 페이지", imageBase: "clas-problem-use", flow: ["상품 이용"], bounce: "-", conversion: "-" },
];

const ROWS = ["플로우", "이탈률", "전환율"];

function Value({ text }: { text: string }) {
  return <span className={text === "-" ? "pt-value is-empty" : "pt-value"}>{text}</span>;
}

export default function ProblemTable({ body }: { body: string }) {
  // The flow / rate details are in the table now, so only the opening sentence stays as text.
  const cut = body.indexOf(" 소개 페이지(");
  const intro = cut === -1 ? body : body.slice(0, cut);

  return (
    <>
      <p>{intro}</p>
      <div className="pt-scroll">
        <div className="pt-grid">
          {/* header row */}
          <span />
          {PAGES.map((p) => (
            <div key={p.title} className="pt-head">
              {p.title}
            </div>
          ))}

          {/* screenshots */}
          <span />
          {PAGES.map((p) => {
            const src = findImage(p.imageBase);
            return (
              <div key={p.title} className={`pt-cell pt-shot${p.problem ? " is-problem is-first" : ""}`}>
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="pt-img" src={src} alt={`${p.title} 화면`} />
                ) : (
                  <div className="pt-placeholder">
                    <span className="pt-placeholder-name">{p.title} 화면</span>
                    <span className="pt-placeholder-size">
                      {PROBLEM_IMAGE_SIZE.w} × {PROBLEM_IMAGE_SIZE.h}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* flow */}
          <span className="pt-row-label">{ROWS[0]}</span>
          {PAGES.map((p) => (
            <div key={p.title} className={`pt-cell pt-flow${p.problem ? " is-problem" : ""}`}>
              {p.flow.map((step, i) => (
                <span key={step} className="pt-step">
                  {i > 0 && <span className="pt-arrow">→</span>}
                  {step}
                </span>
              ))}
            </div>
          ))}

          {/* bounce rate */}
          <span className="pt-row-label">{ROWS[1]}</span>
          {PAGES.map((p) => (
            <div key={p.title} className={`pt-cell pt-num${p.problem ? " is-problem" : ""}`}>
              <Value text={p.bounce} />
            </div>
          ))}

          {/* conversion rate */}
          <span className="pt-row-label">{ROWS[2]}</span>
          {PAGES.map((p) => (
            <div key={p.title} className={`pt-cell pt-num${p.problem ? " is-problem is-last" : ""}`}>
              <Value text={p.conversion} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
