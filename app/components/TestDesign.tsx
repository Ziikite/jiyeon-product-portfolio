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

// One line under every card explaining what that variant tested.
const CAPTIONS: Record<string, string> = {
  "dest-a": "번호로 설정",
  "dest-b": "목적지 명으로 설정",
  "dest-c": "최근 목적지 강조",
  "route-a": "설정한 경로의 주요 특징, 소요 시간, 교통 상황 등 간단하게 안내",
  "route-b": "상세 브리핑 및 추가적으로 주유정보(잔여/소모량, 주유시기 등) 추가 안내",
  "lane-a": "요약된 정보만 제공",
  "lane-b": "상황 맥락을 포함한 정보 제공",
  "air-a": "음성 없이 텍스트로만 안내",
  "air-b": "음성으로만 제공",
  "air-c": "음성 및 그래픽 동시 제공",
  "overlap-a": "정보중첩 불가",
  "overlap-b": "정보중첩 허용",
  "parking-a": "경로변경 이유 간단 설명",
  "parking-b": "경로변경 이유 상세 설명",
};

// 경로 브리핑: the variant is a voice script, not a screen — show the text itself instead of a cropped UI screenshot.
const ROUTE_TEXT: Record<string, string> = {
  a: "총 42km, 38분 소요됩니다. 3km 구간에서 정체가 있어요.",
  b: "총 42km, 38분 소요되며 3km 구간 정체가 있어요. 연료 잔량 18%로 주유가 필요해요. 300m 앞 주유소를 경유지로 설정해드릴까요?",
};

function RouteText({ variant }: { variant: Variant }) {
  return (
    <div className="td-route">
      <span className="td-route-avatar" aria-hidden="true">
        🚗
      </span>
      <p className="td-route-bubble">{ROUTE_TEXT[variant]}</p>
    </div>
  );
}

// 정보 중첩: two announcement timelines, either run back-to-back (A) or deliberately overlapping (B).
function OverlapDiagram({ variant }: { variant: Variant }) {
  const overlap = variant === "b";
  const bar1 = overlap ? { x: 46, w: 120 } : { x: 46, w: 96 };
  const bar2 = overlap ? { x: 110, w: 96 } : { x: 150, w: 56 };
  return (
    <svg className="td-diagram" viewBox="0 0 220 140" role="img" aria-label={overlap ? "정보 중첩 허용 다이어그램" : "정보 중첩 불가 다이어그램"}>
      <text x="8" y="48" className="td-diagram-label">
        안내1
      </text>
      <text x="8" y="94" className="td-diagram-label">
        안내2
      </text>
      <rect x={bar1.x} y="38" width={bar1.w} height="14" rx="7" className="td-bar td-bar-1" />
      <rect x={bar2.x} y="84" width={bar2.w} height="14" rx="7" className="td-bar td-bar-2" />
      {overlap && (
        <>
          <rect x={bar2.x} y="30" width={bar1.x + bar1.w - bar2.x} height="76" className="td-overlap-zone" />
          <text x={(bar2.x + bar1.x + bar1.w) / 2} y="126" textAnchor="middle" className="td-diagram-note">
            중첩 구간
          </text>
        </>
      )}
    </svg>
  );
}

// 주차장 변경: reroute from the original (crossed-out) spot to the new one, with a reason bubble of varying detail.
const PARKING_TEXT: Record<string, string[]> = {
  a: ["인근 주차장으로 경로를 변경했어요"],
  b: ["OO주차장이 만차라 인근 XX주차장으로 변경했어요.", "도보 3분 · 요금 시간당 2,000원"],
};

function ParkingDiagram({ variant }: { variant: Variant }) {
  const lines = PARKING_TEXT[variant];
  const tall = lines.length > 1;
  return (
    <svg className="td-diagram" viewBox="0 0 220 140" role="img" aria-label={variant === "a" ? "경로변경 이유 간단 설명 다이어그램" : "경로변경 이유 상세 설명 다이어그램"}>
      <circle cx="26" cy="34" r="6" className="td-node-start" />
      <text x="26" y="18" textAnchor="middle" className="td-diagram-label">
        출발
      </text>
      <line x1="32" y1="34" x2="94" y2="34" className="td-diagram-axis td-dash" />
      <g transform="translate(104,34)">
        <path d="M0 -14 C8 -14 14 -8 14 0 C14 10 0 24 0 24 C0 24 -14 10 -14 0 C-14 -8 -8 -14 0 -14Z" className="td-node-old" />
        <line x1="-5" y1="-5" x2="5" y2="5" className="td-x-mark" />
        <line x1="5" y1="-5" x2="-5" y2="5" className="td-x-mark" />
      </g>
      <path d="M112 40 C128 58 148 58 162 40" fill="none" className="td-diagram-axis td-reroute" />
      <g transform="translate(172,34)">
        <path d="M0 -14 C8 -14 14 -8 14 0 C14 10 0 24 0 24 C0 24 -14 10 -14 0 C-14 -8 -8 -14 0 -14Z" className="td-node-new" />
        <path d="M-5 0 L-1 5 L6 -6" fill="none" className="td-check-mark" />
      </g>
      <rect x="14" y="78" width="192" height={tall ? 46 : 32} rx="10" className="td-bubble" />
      {lines.map((l, i) => (
        <text key={l} x="110" y={tall ? 98 + i * 18 : 98} textAnchor="middle" className="td-bubble-text">
          {l}
        </text>
      ))}
    </svg>
  );
}

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
          const isDiagram = scenario.key === "overlap" || scenario.key === "parking";
          return (
            <div key={v} className={`td-col${has ? "" : " is-empty"}`} style={{ ["--i" as string]: i } as CSSProperties}>
              <span className="td-tag">{v.toUpperCase()}안</span>
              <div className={`td-card${isDiagram ? " td-card--diagram" : ""}`}>
                {!has ? (
                  <span className="td-none">—</span>
                ) : scenario.key === "route" ? (
                  <RouteText variant={v} />
                ) : scenario.key === "overlap" ? (
                  <OverlapDiagram variant={v} />
                ) : scenario.key === "parking" ? (
                  <ParkingDiagram variant={v} />
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
              {has && CAPTIONS[`${scenario.key}-${v}`] && <p className="td-caption">{CAPTIONS[`${scenario.key}-${v}`]}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
