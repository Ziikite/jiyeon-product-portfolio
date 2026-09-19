"use client";

import { useEffect, useRef, useState } from "react";

// Numbers come from the reference chart (TTA 2022.09 / IT 데일리 2024.01).
const SIZE = { from: 9.2, to: 45.11 };
const BAR_MAX = 210; // px for the tallest bar

// Bubble diameters follow sqrt(value) so the areas are proportional; positions are hand-placed inside a 320 x 340 box.
const K = 190 / Math.sqrt(79);
const BUBBLES = [
  { value: 79, label: "클라우드 전환", x: 0, y: 20, tone: "main" },
  { value: 22, label: "정보보안", x: 205, y: 60, tone: "gray" },
  { value: 56, label: "AI 구축", x: 150, y: 170, tone: "light" },
  { value: 33, label: "데이터 분석\n시스템 구축", x: 10, y: 215, tone: "gray" },
] as const;

function useCount(target: number, run: boolean, delay: number, duration: number, digits: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) {
      setValue(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(Number((target * (1 - Math.pow(1 - t, 3))).toFixed(digits)));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, target, delay, duration, digits]);
  return value;
}

export default function MarketCharts() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoverBar, setHoverBar] = useState<number | null>(null);
  const [hoverBubble, setHoverBubble] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Plays when the charts are well inside the viewport and replays each time they scroll back into view.
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.5,
      rootMargin: "0px 0px -6% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fromShown = useCount(SIZE.from, visible, 400, 900, 1);
  const toShown = useCount(SIZE.to, visible, 1000, 1300, 2);
  const growthShown = useCount(25.5, visible, 1700, 1000, 1);
  const fromH = (SIZE.from / SIZE.to) * BAR_MAX;

  return (
    <div ref={ref} className={`mc${visible ? " is-visible" : ""}`}>
      <figure className="mc-chart">
        <figcaption className="mc-title">글로벌 클라우드 마이그레이션 시장 규모 (10억달러)</figcaption>
        <div className={`mc-bars${hoverBar !== null ? " has-hover" : ""}`}>
          <div className="mc-plot" style={{ height: BAR_MAX + 56 }}>
            {[
              { year: "2021", value: fromShown.toFixed(1), h: fromH, left: 40 },
              { year: "2028", value: toShown.toFixed(2), h: BAR_MAX, left: 216 },
            ].map((b, i) => (
              <div
                key={b.year}
                className={`mc-col${hoverBar === i ? " is-hover" : ""}`}
                style={{ left: b.left, ["--h" as string]: `${b.h}px`, ["--delay" as string]: i === 0 ? "0.4s" : "1s" }}
                onMouseEnter={() => setHoverBar(i)}
                onMouseLeave={() => setHoverBar(null)}
              >
                <span className="mc-bar-value">{b.value}</span>
                <div className="mc-bar" />
              </div>
            ))}
            <svg className="mc-growth" viewBox="0 0 320 266" aria-hidden="true">
              <defs>
                <linearGradient id="mc-arrow-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#d4d4d4" stopOpacity="0" />
                  <stop offset="65%" stopColor="#d4d4d4" stopOpacity=".9" />
                  <stop offset="100%" stopColor="#c9c9c9" stopOpacity="1" />
                </linearGradient>
                <clipPath id="mc-arrow-clip" clipPathUnits="userSpaceOnUse">
                  <rect className="mc-arrow-reveal" x="0" y="-40" width="170" height="80" />
                </clipPath>
              </defs>
              {/* Drawn along +x, then rotated to point up and to the right (about 50 degrees) */}
              <g transform="translate(100 192) rotate(-50.4)">
                <g clipPath="url(#mc-arrow-clip)">
                  <g className="mc-arrow-move">
                    <path className="mc-arrow-shape" d="M0 -3 L120 -14 L120 -31 L166 0 L120 31 L120 14 L0 3 Z" fill="url(#mc-arrow-grad)" />
                  </g>
                </g>
              </g>
            </svg>
            <div className="mc-growth-label">
              <span>성장률</span>
              <b>{growthShown.toFixed(1)}%</b>
            </div>
          </div>
          <div className="mc-axis" />
          <div className="mc-years">
            <span style={{ left: 40 }}>2021</span>
            <span style={{ left: 216 }}>2028</span>
          </div>
        </div>
        <p className="mc-source">한국정보통신기술협회(TTA), 2022.09, 클라우드 마이그레이션 산업 및 기술 동향</p>
      </figure>

      <figure className="mc-chart">
        <figcaption className="mc-title">현재 회사 및 기관에서 추진 중인 IT 관련 사업</figcaption>
        <div className={`mc-bubbles${hoverBubble !== null ? " has-hover" : ""}`}>
          {BUBBLES.map((b, i) => {
            const d = K * Math.sqrt(b.value);
            const cq = (v: number) => `${((v / 320) * 100).toFixed(2)}cqw`;
            return (
              <div
                key={b.value}
                className={`mc-bubble mc-bubble-${b.tone}${hoverBubble === i ? " is-hover" : ""}`}
                style={{
                  width: cq(d),
                  height: cq(d),
                  left: cq(b.x),
                  top: cq(b.y),
                  ["--i" as string]: i,
                  ["--font" as string]: cq(d * 0.21),
                }}
                onMouseEnter={() => setHoverBubble(i)}
                onMouseLeave={() => setHoverBubble(null)}
              >
                <span className="mc-bubble-inner">
                  <b>{b.value}%</b>
                  <span>{b.label}</span>
                </span>
              </div>
            );
          })}
        </div>
        <p className="mc-source">IT 데일리, 2024.01, “AI 구축 프로젝트 비중 41%… 클라우드 시장에도 AI바람이 분다”</p>
      </figure>
    </div>
  );
}
