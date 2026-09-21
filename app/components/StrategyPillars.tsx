"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Verbatim phrases from the section's own list items, regrouped to match the reference's 3-pillar layout
// (the list itself groups them differently — this is presentational recombination, not new copy).
const PILLARS = [
  { title: "효율적인 충전 시간", items: ["짧고 가벼운 콘텐츠 추천 시스템", "실시간 모니터링 가능한 UI"] },
  { title: "충전소 예약으로 대기 시간 최소화", items: ["충전소 사전 예약 시스템", "실시간 충전소 상태 정보", "자동 충전 설정 및 결제 기능"] },
  { title: "피로를 풀 수 있는 환경", items: ["먹거리 및 편의시설 사전 예약 시스템", "휴식 라운지 제공"] },
];

export default function StrategyPillars() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`sp${on ? " is-on" : ""}`}>
      {PILLARS.map((pillar, i) => (
        <div key={pillar.title} className="sp-col" style={{ ["--i" as string]: i } as CSSProperties}>
          <p className="sp-head" tabIndex={0}>
            {pillar.title}
          </p>
          {pillar.items.map((item, ri) => (
            <p key={item} className="sp-item" style={{ ["--r" as string]: ri } as CSSProperties} tabIndex={0}>
              {item}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
