"use client";

import { useEffect, useRef, useState } from "react";

const PAIN = "전문 인력/역량이 부족한 문제";

// Pie geometry (viewBox units). Slices are stroked circles whose stroke-width equals the radius, so they can sweep in.
const CX = 200;
const CY = 205;
const R = 180;
const SHARE = 78;
const REST = 100 - SHARE;
const REST_DEG = (REST / 100) * 360;
const midOf = (startDeg: number, sweepDeg: number) => {
  const a = ((startDeg + sweepDeg / 2) * Math.PI) / 180;
  return { x: Math.sin(a), y: -Math.cos(a) };
};

function useCount(target: number, run: boolean, delay: number, duration: number) {
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
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, run, delay, duration]);
  return value;
}

export default function ExpertGapProblem({ body }: { body: string }) {
  const markRef = useRef<HTMLSpanElement>(null);
  const chartRef = useRef<HTMLElement>(null);
  const [markOn, setMarkOn] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState<"main" | "rest" | null>(null);

  useEffect(() => {
    const mark = markRef.current;
    const chart = chartRef.current;
    const observers: IntersectionObserver[] = [];
    if (mark) {
      // Same sweep as the "bad" highlight in the other problem sections: it fires when the sentence is on screen.
      const o = new IntersectionObserver(([e]) => setMarkOn(e.isIntersecting), { threshold: 0.9, rootMargin: "0px 0px -10% 0px" });
      o.observe(mark);
      observers.push(o);
    }
    if (chart) {
      const o = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5, rootMargin: "0px 0px -6% 0px" });
      o.observe(chart);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const count = useCount(SHARE, visible, 200, 1300);
  const restMid = midOf(0, REST_DEG);
  const mainMid = midOf(REST_DEG, 360 - REST_DEG);
  const at = body.indexOf(PAIN);

  return (
    <>
      <p>
        {at === -1 ? (
          body
        ) : (
          <>
            {body.slice(0, at)}
            <span ref={markRef} className={`neg-mark${markOn ? " is-on" : ""}`}>
              {PAIN}
            </span>
            {body.slice(at + PAIN.length)}
          </>
        )}
      </p>

      <figure ref={chartRef} className={`eg${visible ? " is-visible" : ""}`}>
        <div className="eg-card">
          <div className="dc-title">마이그레이션 도입 시 주요 과제</div>
          <svg className="eg-svg" viewBox="0 0 560 410" role="img" aria-label="마이그레이션 도입 시 주요 과제: 전문 인력/역량 부족 78%">
            <defs>
              <filter id="eg-shadow" x="-30%" y="-40%" width="160%" height="200%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1f2a37" floodOpacity="0.16" />
              </filter>
            </defs>

            {/* 78% : the one the section is about, so it is pulled out of the pie and stays saturated */}
            <g
              className={`eg-main${hover === "rest" ? " is-dim" : ""}`}
              style={{ ["--dx" as string]: `${mainMid.x * 8}px`, ["--dy" as string]: `${mainMid.y * 8}px` }}
              onMouseEnter={() => setHover("main")}
              onMouseLeave={() => setHover(null)}
            >
              <circle
                className="eg-slice eg-slice-main"
                cx={CX}
                cy={CY}
                r={R / 2}
                strokeWidth={R}
                pathLength={100}
                transform={`rotate(${-90 + REST_DEG} ${CX} ${CY})`}
                style={{ ["--len" as string]: SHARE }}
              />
            </g>

            <g
              className={`eg-rest${hover === "rest" ? " is-hover" : ""}`}
              style={{ ["--dx" as string]: `${restMid.x * 8}px`, ["--dy" as string]: `${restMid.y * 8}px` }}
              onMouseEnter={() => setHover("rest")}
              onMouseLeave={() => setHover(null)}
            >
              <circle
                className="eg-slice eg-slice-rest"
                cx={CX}
                cy={CY}
                r={R / 2}
                strokeWidth={R}
                pathLength={100}
                transform={`rotate(-90 ${CX} ${CY})`}
                style={{ ["--len" as string]: REST }}
              />
              <text className="eg-rest-label" x={CX + restMid.x * R * 0.62} y={CY + restMid.y * R * 0.62 + 8} textAnchor="middle">
                {REST}%
              </text>
            </g>

            <text className="eg-big" x={CX - 70} y={CY + 78} textAnchor="middle">
              {count}%
            </text>

            <g className="eg-bubble-wrap">
              <g className="eg-bubble">
                <rect x={CX + 26} y={CY + 4} width="252" height="70" rx="26" filter="url(#eg-shadow)" />
                <text x={CX + 152} y={CY + 47} textAnchor="middle">
                  전문 인력/역량 부족
                </text>
              </g>
            </g>
          </svg>
        </div>
        <figcaption className="dc-source">Flexera 2023 State of the Cloud Report</figcaption>
      </figure>
    </>
  );
}
