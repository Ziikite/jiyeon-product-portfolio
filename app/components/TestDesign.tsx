"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export const TEST_IMAGE_SIZE = { w: 1200, h: 800 }; // 3:2

type Variant = "a" | "b" | "c";
type Scenario = { key: string; label: string; variants: Variant[] };

// Columns of the A/B/C test matrix: which variants exist for each scenario.
const SCENARIOS: Scenario[] = [
  { key: "dest", label: "목적지 설정", variants: ["a", "b", "c"] },
  { key: "route", label: "경로 브리핑", variants: ["a", "b"] },
  { key: "lane", label: "차선 변경", variants: ["a", "b"] },
  { key: "air", label: "공기 청정", variants: ["a", "b", "c"] },
  { key: "overlap", label: "정보 중첩", variants: ["a", "b"] },
  { key: "parking", label: "주차장 변경", variants: ["a", "b"] },
];
const PHASES = [
  { label: "출발 단계", span: 2 },
  { label: "주행 중", span: 3 },
  { label: "도착", span: 1 },
];
const VARIANTS: Variant[] = ["a", "b", "c"];
const INTERVAL = 3600;

// images[`${scenario}-${variant}`] is a public path when a screenshot with that name exists.
export default function TestDesign({ images }: { images: Record<string, string | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Starts when the figure is in view and starts over every time it comes back.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOn(entry.isIntersecting);
        if (entry.isIntersecting) setActive(0);
      },
      { threshold: 0.4, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Steps through the scenarios by itself until the visitor hovers / focuses the figure.
  useEffect(() => {
    if (!on || hovering) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActive((a) => (a + 1) % SCENARIOS.length), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [on, hovering, active]);

  const scenario = SCENARIOS[active];
  const playing = on && !hovering;

  return (
    <div
      ref={ref}
      className={`td${on ? " is-on" : ""}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <div className="td-scroll">
        <div className="td-nav">
          <div className="td-phases">
            {PHASES.map((p, i) => (
              <span key={p.label} className="td-phase" style={{ gridColumn: `span ${p.span}`, ["--i" as string]: i } as CSSProperties}>
                {p.label}
              </span>
            ))}
          </div>
          <div className="td-chips" role="tablist" aria-label="테스트 시나리오">
            {SCENARIOS.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`td-chip${active === i ? " is-active" : ""}`}
                style={{ ["--i" as string]: i } as CSSProperties}
                onClick={() => setActive(i)}
              >
                {s.label}
                {active === i && playing && <i key={`${i}-${active}`} className="td-progress" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={scenario.key} className="td-panel" role="tabpanel">
        {VARIANTS.map((v, i) => {
          const has = scenario.variants.includes(v);
          const src = images[`${scenario.key}-${v}`];
          return (
            <div key={v} className={`td-col${has ? "" : " is-empty"}`} style={{ ["--i" as string]: i } as CSSProperties}>
              <span className="td-tag">{v.toUpperCase()}안</span>
              <div className="td-card">
                {!has ? (
                  <span className="td-none">—</span>
                ) : src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={`${scenario.label} ${v.toUpperCase()}안`} />
                ) : (
                  <div className="td-placeholder">
                    <span className="td-placeholder-name">
                      {scenario.label} · {v.toUpperCase()}안
                    </span>
                    <span className="td-placeholder-size">
                      {TEST_IMAGE_SIZE.w} × {TEST_IMAGE_SIZE.h}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
