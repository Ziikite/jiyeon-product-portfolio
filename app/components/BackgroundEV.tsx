"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/app/lib/i18n";

const ARTICLE_SRCS = ["/projects/detail/gm-ev-charging-article-1.png", "/projects/detail/gm-ev-charging-article-2.png"];

const COPY = {
  ko: {
    captions: [
      "지디넷코리아, 車안이 영화관?…현대차 OTT, 테슬라와 차별점은, 2023",
      "뉴시스, \"전기차에서 OTT 본다\"…웨이브, 현대차와 '차량용 OTT' 제휴, 2022",
    ],
    badge: "엔터테인먼트 중심의 UX",
    positive: "충전은 귀찮지만 경제성이 주는 만족이 크다",
    negative: "전기차 충전은 번거롭고 귀찮은 일이다",
    aria: "전기차 충전에 대한 긍정 89%, 부정 11% 응답 비율",
    posLabel: "긍정",
    negLabel: "부정",
    note: "긍정이든 부정이든, 충전에 대한 불편함은 항상 존재합니다.",
    source: "컨슈머인사이트, 연례 자동차 조사, 전기차 운행 특성 응답률 (n = 729), 2022",
  },
  en: {
    captions: [
      "ZDNet Korea, “A movie theater in your car?… How Hyundai's OTT differs from Tesla's,” 2023",
      "Newsis, “Watching OTT in an EV”… Wavve partners with Hyundai on in-car OTT, 2022",
    ],
    badge: "Entertainment-centered UX",
    positive: "A hassle, but the savings are worth it",
    negative: "EV charging is a chore",
    aria: "EV charging responses: 89% positive, 11% negative",
    posLabel: "Positive",
    negLabel: "Negative",
    note: "Positive or negative, the inconvenience of charging is always there.",
    source: "Consumer Insight, Annual Automobile Survey — EV usage response rate (n = 729), 2022",
  },
};

type Copy = (typeof COPY)[Locale];

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

function EntertainmentUX({ t }: { t: Copy }) {
  const [ref, on] = useInView<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={`eux${on ? " is-on" : ""}`}>
      <span className="eux-badge">{t.badge}</span>
      <div className="eux-figures">
        {ARTICLE_SRCS.map((src, i) => (
          <figure key={src} className="eux-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={t.captions[i]} loading="lazy" decoding="async" />
            <figcaption>{t.captions[i]}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

// Reproduced from the reference chart: two overlapping domes sized to the 긍정/부정 split, each with the
// respondent's own words — the point being that "귀찮음" shows up in both, not just the negative side.
const POSITIVE = { pct: 89 };
const NEGATIVE = { pct: 11 };

// Bubble radii are area-proportional (r ∝ √percent), the honest way to size a bubble chart.
const BUBBLE_K = 15.9;
const posR = Math.round(BUBBLE_K * Math.sqrt(POSITIVE.pct));
const negR = Math.round(BUBBLE_K * Math.sqrt(NEGATIVE.pct));
const posCx = 175;
const negCx = 430;
const VIEW_W = 560;
const VIEW_H = 420; // enough headroom above the bubbles for their quote callouts, and margin below the big circle
const cy = 100 + posR; // 100px of headroom above the largest circle
const posBubbleTop = 60; // dips into the top of the positive circle so it visibly overlaps
const negBubbleTop = 150; // dips into the top of the negative circle

function ChargingDiscomfortChart({ t }: { t: Copy }) {
  const [ref, on] = useInView<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={`cd${on ? " is-on" : ""}`}>
      <div className="cd-chart">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="cd-svg" role="img" aria-label={t.aria}>
          <circle className="cd-bubble-circle cd-bubble-pos-circle" cx={posCx} cy={cy} r={posR} />
          <circle className="cd-bubble-circle cd-bubble-neg-circle" cx={negCx} cy={cy} r={negR} />
          <text x={posCx} y={cy - 8} textAnchor="middle" className="cd-circle-value">
            {POSITIVE.pct}%
          </text>
          <text x={posCx} y={cy + 16} textAnchor="middle" className="cd-circle-label">
            {t.posLabel}
          </text>
          <text x={negCx} y={cy - 2} textAnchor="middle" className="cd-circle-value cd-circle-value-neg">
            {NEGATIVE.pct}%
          </text>
          <text x={negCx} y={cy + 14} textAnchor="middle" className="cd-circle-label cd-circle-label-neg">
            {t.negLabel}
          </text>
        </svg>
        <p
          className="cd-bubble cd-bubble-pos"
          style={{ left: `${((posCx - posR) / VIEW_W) * 100}%`, top: `${(posBubbleTop / VIEW_H) * 100}%` }}
        >
          {t.positive}
        </p>
        <p
          className="cd-bubble cd-bubble-neg"
          style={{ left: `${((negCx - 70) / VIEW_W) * 100}%`, top: `${(negBubbleTop / VIEW_H) * 100}%` }}
        >
          {t.negative}
        </p>
      </div>
      <p className="cd-note">{t.note}</p>
      <p className="cd-source">{t.source}</p>
    </div>
  );
}

export default function BackgroundEV({ body, locale = "ko" }: { body: string; locale?: Locale }) {
  const t = COPY[locale];
  return (
    <>
      <p>{body}</p>
      <EntertainmentUX t={t} />
      <ChargingDiscomfortChart t={t} />
    </>
  );
}
