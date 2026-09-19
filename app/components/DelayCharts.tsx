"use client";

import { useEffect, useRef, useState } from "react";

// Grey tones on purpose: these charts are the pain point (McKinsey 2022 figures).
const BAR = [
  { key: "late3", label: "3분기 이상", value: 13, fill: "#566b7d", ink: "#fff" },
  { key: "late1", label: "3분기 이하", value: 25, fill: "#8a9ea9", ink: "#fff" },
  { key: "ontime", label: "예정대로", value: 43, fill: "#d2d6da", ink: "#6b6f74" },
  { key: "early", label: "앞당김", value: 20, fill: "#b0c6d1", ink: "#5d6f7a" },
] as const;
const BAR_H = 320;

const PIE = [
  { key: "change", label: "변경 관리", value: 45, fill: "#4a5f73", ink: "#fff" },
  { key: "system", label: "시스템\n통합 비용", value: 37, fill: "#7d909f", ink: "#fff" },
  { key: "etc", label: "기타", value: 18, fill: "#d0d4d8", ink: "#22262b" },
] as const;
const R = 120;
const CIRC = 2 * Math.PI * (R / 2);

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
  }, [run, target, delay, duration]);
  return value;
}

export default function DelayCharts() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoverBar, setHoverBar] = useState<string | null>(null);
  const [hoverPie, setHoverPie] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.5,
      rootMargin: "0px 0px -6% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayed = useCount(38, visible, 1500, 900);

  // pie slices: start angle (deg, clockwise from 12 o'clock) and label position
  let acc = 0;
  const slices = PIE.map((p) => {
    const start = acc;
    acc += p.value;
    const mid = ((start + p.value / 2) / 100) * 2 * Math.PI;
    return { ...p, start, mid, lx: 125 + Math.sin(mid) * R * 0.6, ly: 125 - Math.cos(mid) * R * 0.6 };
  });

  return (
    <figure ref={ref} className={`dc${visible ? " is-visible" : ""}`}>
      <div className="dc-grid">
        <div className="dc-chart">
          <div className="dc-title">마이그레이션 지연 비중</div>
          <div className={`dc-bar${hoverBar ? " has-hover" : ""}`} style={{ height: BAR_H }}>
            <div className="dc-stack">
              {BAR.map((b, i) => (
                <div
                  key={b.key}
                  className={`dc-seg${hoverBar === b.key ? " is-hover" : ""}`}
                  style={{ height: (b.value / 100) * BAR_H, background: b.fill, color: b.ink, ["--i" as string]: BAR.length - 1 - i }}
                  onMouseEnter={() => setHoverBar(b.key)}
                  onMouseLeave={() => setHoverBar(null)}
                >
                  <span>{b.value}%</span>
                </div>
              ))}
            </div>
            <div className="dc-labels">
              {BAR.map((b) => (
                <span key={b.key} style={{ height: (b.value / 100) * BAR_H }}>
                  {b.label}
                </span>
              ))}
            </div>
            <div className="dc-bracket" style={{ height: ((BAR[0].value + BAR[1].value) / 100) * BAR_H }}>
              <i />
              <div className="dc-bracket-text">
                <b>{delayed}%</b>
                <span>지연</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dc-chart">
          <div className="dc-title">예산 초과 항목</div>
          <div className={`dc-pie${hoverPie ? " has-hover" : ""}`}>
            <svg viewBox="0 0 250 250" role="img" aria-label="예산 초과 항목: 변경 관리 45%, 시스템 통합 비용 37%, 기타 18%">
              <g transform="rotate(-90 125 125)">
                {slices.map((s, i) => (
                  <circle
                    key={s.key}
                    className={`dc-slice${hoverPie === s.key ? " is-hover" : ""}`}
                    cx="125"
                    cy="125"
                    r={R / 2}
                    fill="none"
                    stroke={s.fill}
                    strokeWidth={R}
                    strokeDasharray={`${(s.value / 100) * CIRC} ${CIRC}`}
                    strokeDashoffset={-(s.start / 100) * CIRC}
                    style={{ ["--i" as string]: i, ["--len" as string]: (s.value / 100) * CIRC }}
                    onMouseEnter={() => setHoverPie(s.key)}
                    onMouseLeave={() => setHoverPie(null)}
                  />
                ))}
              </g>
            </svg>
            {slices.map((s, i) => (
              <div
                key={s.key}
                className="dc-slice-label"
                style={{ left: `${(s.lx / 250) * 100}%`, top: `${(s.ly / 250) * 100}%`, color: s.ink, ["--i" as string]: i }}
              >
                <span>{s.label}</span>
                <b>{s.value}%</b>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="dc-source">McKinsey 2022, Cloud migration cost overruns are mounting</figcaption>
    </figure>
  );
}
