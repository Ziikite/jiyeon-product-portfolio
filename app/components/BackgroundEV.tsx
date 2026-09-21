"use client";

import { useEffect, useRef, useState } from "react";

const ARTICLES = [
  {
    src: "/projects/detail/gm-ev-charging-article-1.png",
    caption: "지디넷코리아, 車안이 영화관?…현대차 OTT, 테슬라와 차별점은, 2023",
  },
  {
    src: "/projects/detail/gm-ev-charging-article-2.png",
    caption: "뉴시스, \"전기차에서 OTT 본다\"…웨이브, 현대차와 '차량용 OTT' 제휴, 2022",
  },
];

function useInView<T extends HTMLElement>(threshold: number) {
  const ref = useRef<T | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Plays when the block scrolls into view and replays every time it comes back.
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold, rootMargin: "0px 0px -8% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, on] as const;
}

function EntertainmentUX() {
  const [ref, on] = useInView<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={`eux${on ? " is-on" : ""}`}>
      <span className="eux-badge">엔터테인먼트 중심의 UX</span>
      <div className="eux-figures">
        {ARTICLES.map((a) => (
          <figure key={a.src} className="eux-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.src} alt={a.caption} loading="lazy" decoding="async" />
            <figcaption>{a.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

// Reproduced from the reference chart: two overlapping domes sized to the 긍정/부정 split, each with the
// respondent's own words — the point being that "귀찮음" shows up in both, not just the negative side.
const POSITIVE = { pct: 89, quote: "충전은 귀찮지만 경제성이 주는 만족이 크다" };
const NEGATIVE = { pct: 11, quote: "전기차 충전은 번거롭고 귀찮은 일이다" };

// Bubble radii are area-proportional (r ∝ √percent), the honest way to size a bubble chart.
const BUBBLE_K = 15.9;
const posR = Math.round(BUBBLE_K * Math.sqrt(POSITIVE.pct));
const negR = Math.round(BUBBLE_K * Math.sqrt(NEGATIVE.pct));
const posCx = 175;
const negCx = 430;
const VIEW_W = 560;
const VIEW_H = 420; // enough headroom above the bubbles for their quote callouts, and margin below the big circle
const cy = 100 + posR; // 100px of headroom above the largest circle
const posBubbleTop = 10;
const negBubbleTop = 110;

function ChargingDiscomfortChart() {
  const [ref, on] = useInView<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={`cd${on ? " is-on" : ""}`}>
      <div className="cd-chart">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="cd-svg" role="img" aria-label="전기차 충전에 대한 긍정 89%, 부정 11% 응답 비율">
          <circle className="cd-bubble-circle cd-bubble-pos-circle" cx={posCx} cy={cy} r={posR} />
          <circle className="cd-bubble-circle cd-bubble-neg-circle" cx={negCx} cy={cy} r={negR} />
          <text x={posCx} y={cy - 8} textAnchor="middle" className="cd-circle-value">
            {POSITIVE.pct}%
          </text>
          <text x={posCx} y={cy + 16} textAnchor="middle" className="cd-circle-label">
            긍정
          </text>
          <text x={negCx} y={cy - 2} textAnchor="middle" className="cd-circle-value cd-circle-value-neg">
            {NEGATIVE.pct}%
          </text>
          <text x={negCx} y={cy + 14} textAnchor="middle" className="cd-circle-label cd-circle-label-neg">
            부정
          </text>
        </svg>
        <p
          className="cd-bubble cd-bubble-pos"
          style={{ left: `${((posCx - posR) / VIEW_W) * 100}%`, top: `${(posBubbleTop / VIEW_H) * 100}%` }}
        >
          {POSITIVE.quote}
        </p>
        <p
          className="cd-bubble cd-bubble-neg"
          style={{ left: `${((negCx - 70) / VIEW_W) * 100}%`, top: `${(negBubbleTop / VIEW_H) * 100}%` }}
        >
          {NEGATIVE.quote}
        </p>
      </div>
      <p className="cd-note">긍정이든 부정이든, 충전에 대한 불편함은 항상 존재합니다.</p>
      <p className="cd-source">컨슈머인사이트, 연례 자동차 조사, 전기차 운행 특성 응답률 (n = 729), 2022</p>
    </div>
  );
}

export default function BackgroundEV({ body }: { body: string }) {
  return (
    <>
      <p>{body}</p>
      <EntertainmentUX />
      <ChargingDiscomfortChart />
    </>
  );
}
