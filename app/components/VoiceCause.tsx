"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { balance } from "@/app/components/ShadowingVisual";

const MARK = "정보의 의도와 맥락이 설계되지 않은 점이 신뢰도를 낮추는 것을 발견했습니다.";
const YELLOW = "#FFE300";

// Rows of the interview figure: VoC -> problem -> insight.
const COLUMNS = ["VoC", "문제 상황", "인사이트"];
const ROWS = [
  { voc: "“했던 말 또 말하고... 그냥 무시해도 돼요.”", problem: "동일한 메시지가 상황과 무관하게 반복", insight: "상황 인식 없는 안내는 신뢰를 낮춤" },
  { voc: "“무슨 말인지 몰라요. 그냥 화면 봐요.”", problem: "안내의 이유 및 설명 없이 반복", insight: "목적 없는 정보는 인지 부하 유발" },
  { voc: "“다음에 뭐하란 말인지 모르겠어요.”", problem: "앞뒤 문맥 없이 단일 문장만 재생", insight: "사용자 플로우와 단절되면 소음으로 인식" },
];

// Same arrow as the GLN / cloud cases (gradient line + chevron, nudging), in yellow and pointing right.
function Arrow() {
  const gradId = `cz-arrow-grad-${useId().replace(/:/g, "")}`;
  return (
    <span className="cz-arrow" aria-hidden="true">
      <svg width="28" height="34" viewBox="0 0 28 34">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={YELLOW} stopOpacity="0" />
            <stop offset="100%" stopColor="#F2B600" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d="M14 0 V20 M5 12 L14 22 L23 12" stroke={`url(#${gradId})`} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </span>
  );
}

function useWatch<T extends HTMLElement>(threshold: number, rootMargin = "0px 0px -6% 0px") {
  const ref = useRef<T | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Plays when the block scrolls into view and starts over every time it comes back.
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold, rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
  return [ref, on] as const;
}

export default function VoiceCause({ body, quotes, photo }: { body: string; quotes: string[]; photo: string }) {
  const [markRef, markOn] = useWatch<HTMLSpanElement>(0.9, "0px 0px -10% 0px");
  const [flowRef, flowOn] = useWatch<HTMLDivElement>(0.35);
  const [photoRef, photoOn] = useWatch<HTMLElement>(0.45);
  const [active, setActive] = useState<number | null>(null);

  const at = body.indexOf(MARK);
  const lead = at === -1 ? body : body.slice(0, at);

  return (
    <>
      <p>
        {lead}
        {at !== -1 && (
          <span ref={markRef} className={`vb-mark${markOn ? " is-on" : ""}`}>
            {MARK}
          </span>
        )}
      </p>

      <div ref={flowRef} className={`cz${flowOn ? " is-on" : ""}${active !== null ? " has-active" : ""}`}>
        <div className="cz-title">
          운전자 인터뷰 <span>(n = 6)</span>
        </div>
        <div className="cz-head" aria-hidden="true">
          {COLUMNS.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        {ROWS.map((row, i) => (
          <div
            key={row.voc}
            className={`cz-row${active === i ? " is-active" : ""}`}
            style={{ ["--row" as string]: i } as CSSProperties}
            tabIndex={0}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <div className="cz-box cz-voc">
              <span className="cz-tag">{COLUMNS[0]}</span>
              {row.voc}
            </div>
            <Arrow />
            <div className="cz-box cz-problem">
              <span className="cz-tag">{COLUMNS[1]}</span>
              {row.problem}
            </div>
            <Arrow />
            <div className="cz-box cz-insight">
              <span className="cz-tag">{COLUMNS[2]}</span>
              {row.insight}
            </div>
          </div>
        ))}
      </div>

      <figure ref={photoRef} className={`sh${photoOn ? " is-on" : ""}`}>
        <div className="sh-stage sh-stage-interview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sh-photo" src={photo} alt="운전자 인터뷰 장면" loading="lazy" decoding="async" />
          <div className="sh-bubbles">
            {quotes.map((q, i) => {
              const lines = balance(q);
              return (
                <p key={q} className="sh-bubble" style={{ ["--i" as string]: i } as CSSProperties}>
                  {lines ? (
                    <>
                      {lines[0]}
                      <br />
                      {lines[1]}
                    </>
                  ) : (
                    q
                  )}
                </p>
              );
            })}
          </div>
        </div>
      </figure>
    </>
  );
}
