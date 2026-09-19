"use client";

import { useEffect, useId, useRef, useState } from "react";

// Rows are taken from the reference figure: Pain Point -> Insight -> Design Decision.
const ROWS = [
  { pain: "3-4개월 이상 소요되는 시스템 진단", insight: "수작업으로 복잡한 환경 파악", decision: "설문 기반 자동 진단 도입" },
  { pain: "어려운 마이그레이션 현황 모니터링", insight: "산재된 다양한 툴과 정보", decision: "하나의 화면에서 통합 대시보드 설계" },
  { pain: "복잡한 레거시 시스템과 난해한 용어", insight: "비전문가 대상 서비스 수요 증가", decision: "기술 용어 최소화 및 시각화" },
];
const COLUMNS = ["Pain Point", "Insight", "Design Decision"];

// Same arrow as the GLN FAQ case (gradient line + chevron, nudging), drawn in this project's blue and pointing right.
function Arrow() {
  const gradId = `ms-arrow-grad-${useId().replace(/:/g, "")}`;
  return (
    <span className="ms-arrow" aria-hidden="true">
      <svg width="28" height="34" viewBox="0 0 28 34">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a7fdc" stopOpacity="0" />
            <stop offset="100%" stopColor="#0a7fdc" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M14 0 V20 M5 12 L14 22 L23 12"
          stroke={`url(#${gradId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  );
}

export default function MigrationStrategy({ body }: { body: string }) {
  const calloutRef = useRef<HTMLSpanElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const [calloutOn, setCalloutOn] = useState(false);
  const [flowOn, setFlowOn] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const watch = (el: Element | null, set: (v: boolean) => void, threshold: number, replay: boolean) => {
      if (!el) return () => {};
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) set(true);
          else if (replay) set(false);
        },
        { threshold, rootMargin: "0px 0px -6% 0px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    };
    const stopCallout = watch(calloutRef.current, setCalloutOn, 0.6, false);
    const stopFlow = watch(flowRef.current, setFlowOn, 0.35, true);
    return () => {
      stopCallout();
      stopFlow();
    };
  }, []);

  return (
    <>
      <p className="ms-callout">
        <span ref={calloutRef} className={`ms-mark${calloutOn ? " is-on" : ""}`}>
          {body}
        </span>
      </p>

      <div ref={flowRef} className={`ms${flowOn ? " is-on" : ""}${active !== null ? " has-active" : ""}`}>
        <div className="ms-head" aria-hidden="true">
          {COLUMNS.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        {ROWS.map((row, i) => (
          <div
            key={row.pain}
            className={`ms-row${active === i ? " is-active" : ""}`}
            style={{ ["--row" as string]: i }}
            tabIndex={0}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <div className="ms-box ms-pain">
              <span className="ms-tag">{COLUMNS[0]}</span>
              {row.pain}
            </div>
            <Arrow />
            <div className="ms-box ms-insight">
              <span className="ms-tag">{COLUMNS[1]}</span>
              {row.insight}
            </div>
            <Arrow />
            <div className="ms-box ms-decision">
              <span className="ms-tag">{COLUMNS[2]}</span>
              {row.decision}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
