"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";

const MARK = "절반 이상의 사용자들은 음성 인식 기능을 사용하지 않고 있었습니다.";
const CAUSE_TITLE = "기술적 원인으로 낮아진 AI 스피커 만족도";

// ---- pies ---------------------------------------------------------------------------------------------------------
// Yellow marks what the section is about; everything else stays gray. Labels appear as a toast on hover.
const YELLOW = "#FFE300";
const R = 115;

type Slice = {
  key: string;
  label: string;
  value: number;
  start: number; // % of the circle, clockwise from 12 o'clock
  fill: string;
  ink: string;
  yellow?: boolean;
  lx: number; // label offset from the centre, in radii
  ly: number;
};

const SATISFACTION: Slice[] = [
  { key: "unsat", label: "불만족 ~ 보통", value: 52, start: 0, fill: YELLOW, ink: "#111", yellow: true, lx: 0.4, ly: -0.3 },
  { key: "sat", label: "만족", value: 48, start: 52, fill: "#c8cbd0", ink: "#fff", lx: -0.42, ly: -0.05 },
];
const USAGE: Slice[] = [
  { key: "none", label: "사용 경험 없음", value: 50, start: 0, fill: YELLOW, ink: "#111", yellow: true, lx: 0.46, ly: -0.05 },
  { key: "bt", label: "블루투스 사용", value: 20, start: 50, fill: "#aab1b9", ink: "#111", lx: -0.34, ly: 0.42 },
  { key: "phone", label: "스마트폰으로 사용", value: 20, start: 70, fill: "#c8cbd0", ink: "#111", lx: -0.55, ly: -0.24 },
  { key: "etc", label: "기타", value: 10, start: 90, fill: "#dfe0e3", ink: "#111", lx: -0.22, ly: -0.72 },
];
// reasons for dissatisfaction, drawn as pills over the yellow slice (offsets from the centre)
const REASONS = [
  { text: "부자연스러운 대화", x: 14, y: 8, w: 140 },
  { text: "인식 정확도", x: 18, y: 54, w: 104 },
];

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

type Tip = { text: string; x: number; y: number };

function PieNumber({ s, cx, cy, run, delay }: { s: Slice; cx: number; cy: number; run: boolean; delay: number }) {
  const shown = useCount(s.value, run, delay, 1000);
  return (
    <text className="vb-num" x={cx + s.lx * R} y={cy + s.ly * R + 10} textAnchor="middle" fill={s.ink}>
      {shown}%
    </text>
  );
}

function Pie({
  slices,
  cx,
  cy,
  run,
  hover,
  setHover,
  showTip,
  hideTip,
  children,
}: {
  slices: Slice[];
  cx: number;
  cy: number;
  run: boolean;
  hover: string | null;
  setHover: (k: string | null) => void;
  showTip: (text: string, e: PointerEvent<SVGGElement>) => void;
  hideTip: () => void;
  children?: React.ReactNode;
}) {
  let sweepAt = 0.1;
  return (
    <svg className="vb-pie-svg" viewBox="0 0 300 250" role="img">
      {slices.map((s) => {
        const mid = (((s.start + s.value / 2) / 100) * 360 * Math.PI) / 180;
        const delay = sweepAt;
        sweepAt += (s.value / 100) * 1.2;
        const dim = hover !== null && hover !== s.key;
        return (
          <g
            key={s.key}
            className={`vb-slice${s.yellow ? " is-yellow" : ""}${hover === s.key ? " is-hover" : ""}${dim ? " is-dim" : ""}`}
            style={{ ["--dx" as string]: `${(Math.sin(mid) * 7).toFixed(2)}px`, ["--dy" as string]: `${(-Math.cos(mid) * 7).toFixed(2)}px` } as CSSProperties}
            tabIndex={0}
            aria-label={s.label}
            onPointerEnter={(e) => {
              setHover(s.key);
              showTip(s.label, e);
            }}
            onPointerMove={(e) => showTip(s.label, e)}
            onPointerLeave={() => {
              setHover(null);
              hideTip();
            }}
          >
            <circle
              className="vb-slice-arc"
              cx={cx}
              cy={cy}
              r={R / 2}
              strokeWidth={R}
              stroke={s.fill}
              pathLength={100}
              transform={`rotate(${-90 + s.start * 3.6} ${cx} ${cy})`}
              style={{ ["--len" as string]: s.value, ["--d" as string]: `${delay}s` } as CSSProperties}
            />
          </g>
        );
      })}
      {slices.map((s, i) => (
        <PieNumber key={s.key} s={s} cx={cx} cy={cy} run={run} delay={300 + i * 500} />
      ))}
      {children}
    </svg>
  );
}

// ---- cause -> distrust diagram --------------------------------------------------------------------------------------
const CAUSES = [
  { label: "음성 인식 정확도 부족", pct: 47 },
  { label: "부자연스러운 대화", pct: 33 },
  { label: "외부 소음 영향", pct: 32 },
  { label: "제한적인 기능", pct: 31 },
];
const RESULT = "음성인식 기술에 대한 낮은 신뢰도";

function CauseCard({ c, run, index }: { c: (typeof CAUSES)[number]; run: boolean; index: number }) {
  const shown = useCount(c.pct, run, 350 + index * 150, 900);
  return (
    <div className="vb-card" style={{ ["--i" as string]: index, ["--pct" as string]: c.pct / 100 } as CSSProperties} tabIndex={0}>
      <span>
        {c.label}({shown}%)
      </span>
      <i className="vb-meter" aria-hidden="true" />
    </div>
  );
}

function YellowArrow() {
  const gradId = `vb-arrow-grad-${useId().replace(/:/g, "")}`;
  return (
    <span className="vb-arrow" aria-hidden="true">
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

export default function VoiceBackground({ body }: { body: string }) {
  const markRef = useRef<HTMLSpanElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const causeRef = useRef<HTMLDivElement>(null);
  const [markOn, setMarkOn] = useState(false);
  const [chartsOn, setChartsOn] = useState(false);
  const [causeOn, setCauseOn] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [tip, setTip] = useState<Tip | null>(null);

  useEffect(() => {
    const watch = (el: Element | null, set: (v: boolean) => void, threshold: number) => {
      if (!el) return () => {};
      const o = new IntersectionObserver(([e]) => set(e.isIntersecting), { threshold, rootMargin: "0px 0px -6% 0px" });
      o.observe(el);
      return () => o.disconnect();
    };
    const stops = [
      watch(markRef.current, setMarkOn, 0.9),
      watch(chartsRef.current, setChartsOn, 0.5),
      watch(causeRef.current, setCauseOn, 0.5),
    ];
    return () => stops.forEach((stop) => stop());
  }, []);

  // Only the opening paragraph stays as text; the numbers now live in the charts below.
  const cut = body.indexOf(CAUSE_TITLE);
  const intro = (cut === -1 ? body : body.slice(0, cut)).trim();
  const at = intro.indexOf(MARK);

  const showTip = (text: string, e: PointerEvent<SVGGElement>) => {
    const card = chartsRef.current?.getBoundingClientRect();
    if (!card) return;
    setTip({ text, x: e.clientX - card.left, y: e.clientY - card.top });
  };
  const hideTip = () => setTip(null);

  return (
    <>
      <p>
        {at === -1 ? (
          intro
        ) : (
          <>
            {intro.slice(0, at)}
            <span ref={markRef} className={`vb-mark${markOn ? " is-on" : ""}`}>
              {MARK}
            </span>
            {intro.slice(at + MARK.length)}
          </>
        )}
      </p>

      <div ref={chartsRef} className={`vb${chartsOn ? " is-on" : ""}`}>
        <div className="vb-grid">
          <figure className="vb-chart">
            <div className="vb-title">AI 스피커 만족도 및 불만족 이유</div>
            <Pie slices={SATISFACTION} cx={125} cy={125} run={chartsOn} hover={hover} setHover={setHover} showTip={showTip} hideTip={hideTip}>
              <g className="vb-reasons">
                {REASONS.map((r, i) => (
                  <g key={r.text} className="vb-reason" style={{ ["--i" as string]: i } as CSSProperties} pointerEvents="none">
                    <rect x={125 + r.x} y={125 + r.y} width={r.w} height="38" rx="19" />
                    <text x={125 + r.x + r.w / 2} y={125 + r.y + 24.5} textAnchor="middle">
                      {r.text}
                    </text>
                  </g>
                ))}
              </g>
            </Pie>
            <figcaption className="dc-source">컨슈머인사이트, 2019~2020 AI스피커 이용현황-만족도 비교</figcaption>
          </figure>

          <figure className="vb-chart">
            <div className="vb-title">차량 내 음성 인식 기능 활용 현황</div>
            <Pie slices={USAGE} cx={150} cy={125} run={chartsOn} hover={hover} setHover={setHover} showTip={showTip} hideTip={hideTip} />
            <figcaption className="dc-source">Voicebot, Voice Assistant Consumer Adoption Report 2018</figcaption>
          </figure>
        </div>
        {tip && (
          <div className="vb-toast" role="status" style={{ left: tip.x, top: tip.y }}>
            {tip.text}
          </div>
        )}
      </div>

      <div ref={causeRef} className={`vb-flow${causeOn ? " is-on" : ""}`}>
        <div className="vb-title">{CAUSE_TITLE}</div>
        <div className="vb-cards">
          {CAUSES.map((c, i) => (
            <CauseCard key={c.label} c={c} run={causeOn} index={i} />
          ))}
        </div>
        <YellowArrow />
        <div className="vb-result" tabIndex={0}>
          <span>{RESULT}</span>
        </div>
      </div>
    </>
  );
}
