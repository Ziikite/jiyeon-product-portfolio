"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

// The monitoring dashboard (1194 x 834) rebuilt as layers of the same screenshot: every card is its own clipped copy of the
// image, so cards can rise in one by one, lift on hover, and the gauges / counters / gantt bars can be redrawn over it.
const W = 1194;
const H = 834;
const DEFAULT_IMG = "/projects/detail/cloud-migration-solution-2.svg";

type Rect = { x: number; y: number; w: number; h: number };

const rr = ({ x, y, w, h }: Rect, r = 16) =>
  `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
const box = ({ x, y, w, h }: Rect) => `M${x} ${y}H${x + w}V${y + h}H${x}Z`;

const PROGRESS: Rect = { x: 250, y: 190, w: 904, h: 335 };
const GAUGE_CARDS: Rect[] = [
  { x: 250, y: 536, w: 294, h: 190 },
  { x: 555, y: 536, w: 294, h: 190 },
  { x: 860, y: 536, w: 294, h: 190 },
];
const CHART_CARDS: Rect[] = [
  { x: 250, y: 736, w: 294, h: 260 },
  { x: 555, y: 736, w: 294, h: 260 },
  { x: 860, y: 736, w: 294, h: 260 },
];

// Gantt bar column (rows sit between the 1px row borders) and the three table rows.
const GANTT_ROWS: Rect[] = [365, 399, 433, 467].map((y) => ({ x: 413, y, w: 705, h: 33 }));
const TABLE_ROWS = [273.5, 298.5, 323.5];

const GAUGES = [
  { cx: 391, value: 11, color: "#0EBA56", label: "CPU 사용량" },
  { cx: 702, value: 64, color: "#FFB800", label: "메모리 사용량" },
  { cx: 1012, value: 87.3, color: "#FF5546", label: "CPU 로드" },
];
const GAUGE_Y = 648;
const GAUGE_R = 50;

// Status counters: badge centre x and value.
const COUNTERS = [
  { x: 889.5, value: 0 },
  { x: 949.5, value: 2 },
  { x: 1017, value: 5 },
  { x: 1083.5, value: 3 },
];

function useCount(target: number, run: boolean, delay: number, duration: number, replay: number, decimals = 0) {
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
    const f = 10 ** decimals;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3)) * f) / f);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, run, delay, duration, replay, decimals]);
  return value;
}

function Gauge({ g, index, on, replay, delay }: { g: (typeof GAUGES)[number]; index: number; on: boolean; replay: number; delay: number }) {
  const decimals = Number.isInteger(g.value) ? 0 : 1;
  const shown = useCount(g.value, on, delay * 1000 + 250, 1200, replay, decimals);
  const label = decimals ? shown.toFixed(1) : `${shown}%`;
  return (
    <g>
      {/* white patch hides the ring + number baked into the screenshot */}
      <circle cx={g.cx} cy={GAUGE_Y} r={GAUGE_R + 8} fill="#fff" />
      <circle cx={g.cx} cy={GAUGE_Y} r={GAUGE_R} fill="none" stroke="#F3F4F6" strokeWidth="8" />
      <circle
        key={`${index}-${replay}`}
        className="md-arc"
        cx={g.cx}
        cy={GAUGE_Y}
        r={GAUGE_R}
        fill="none"
        stroke={g.color}
        strokeWidth="8"
        pathLength={100}
        transform={`rotate(-90 ${g.cx} ${GAUGE_Y})`}
        style={{ ["--len" as string]: g.value, ["--d" as string]: `${delay + 0.25}s` } as CSSProperties}
      />
      <text className="md-num md-num-gauge" x={g.cx} y={GAUGE_Y + 12} textAnchor="middle" fill={g.color}>
        {label}
      </text>
    </g>
  );
}

function Counter({ c, on, delay }: { c: (typeof COUNTERS)[number]; on: boolean; delay: number }) {
  const shown = useCount(c.value, on, delay * 1000, 900, 0);
  return (
    <text className="md-num md-num-count" x={c.x} y={327} textAnchor="middle">
      {shown}
    </text>
  );
}

export default function MonitorDashboard({ image = DEFAULT_IMG }: { image?: string }) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [replays, setReplays] = useState([0, 0, 0]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Plays when the screen is well in view and starts over every time it scrolls back in.
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), {
      threshold: 0.5,
      rootMargin: "0px 0px -6% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const replay = (i: number) => setReplays((r) => r.map((v, k) => (k === i ? v + 1 : v)));

  const cardClip = (id: string, rect: Rect, holes: Rect[] = []) => (
    <clipPath key={id} id={`${uid}-${id}`}>
      <path clipRule="evenodd" d={rr(rect) + holes.map(box).join("")} />
    </clipPath>
  );
  const url = (id: string) => `url(#${uid}-${id})`;
  const layer = (id: string) => (
    <g clipPath={url(id)}>
      <image href={image} width={W} height={H} />
    </g>
  );
  const at = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

  return (
    <div ref={ref} className={`md${on ? " is-on" : ""}`} style={{ aspectRatio: `${W} / ${H}` }}>
      <svg className="md-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="마이그레이션 모니터링 대시보드 화면">
        <defs>
          <clipPath id={`${uid}-base`}>
            <path
              clipRule="evenodd"
              d={box({ x: 0, y: 0, w: W, h: H }) + [PROGRESS, ...GAUGE_CARDS, ...CHART_CARDS].map((r) => rr(r)).join("")}
            />
          </clipPath>
          {cardClip("progress", PROGRESS, GANTT_ROWS)}
          {GAUGE_CARDS.map((r, i) => cardClip(`g${i}`, r))}
          {CHART_CARDS.map((r, i) => cardClip(`c${i}`, r))}
          <clipPath id={`${uid}-gantt`}>
            {GANTT_ROWS.map((r) => (
              <rect key={r.y} className="md-wipe" x={r.x} y={r.y} width={r.w} height={r.h} />
            ))}
          </clipPath>
        </defs>

        {/* sidebar, header and page background stay put */}
        <g clipPath={url("base")}>
          <image href={image} width={W} height={H} />
        </g>

        {/* progress card: table, status counters, gantt */}
        <g className="md-card" style={at(0)}>
          <g className="md-lift">
            {layer("progress")}
            <g clipPath={url("gantt")}>
              <image href={image} width={W} height={H} />
            </g>
            {TABLE_ROWS.map((y) => (
              <rect key={y} className="md-row" x="285.5" y={y} width="532" height="25" />
            ))}
            <rect x="864" y="290" width="246" height="46" fill="#fff" />
            {COUNTERS.map((c, i) => (
              <Counter key={c.x} c={c} on={on} delay={0.7 + i * 0.12} />
            ))}
            <circle className="md-alert" cx="962" cy="299" r="3" />
            <rect className="md-outline" x={PROGRESS.x + 0.5} y={PROGRESS.y + 0.5} width={PROGRESS.w - 1} height={PROGRESS.h - 1} rx="15.5" />
          </g>
        </g>

        {/* gauges */}
        {GAUGE_CARDS.map((r, i) => (
          <g key={r.x} className="md-card" style={at(i + 1)} onMouseEnter={() => replay(i)}>
            <g className="md-lift">
              {layer(`g${i}`)}
              <Gauge g={GAUGES[i]} index={i} on={on} replay={replays[i]} delay={0.5 + i * 0.15} />
              <rect className="md-outline" x={r.x + 0.5} y={r.y + 0.5} width={r.w - 1} height={r.h - 1} rx="15.5" />
            </g>
          </g>
        ))}

        {/* charts (only their top is in the screenshot) */}
        {CHART_CARDS.map((r, i) => (
          <g key={r.x} className="md-card" style={at(i + 4)}>
            <g className="md-lift">
              {layer(`c${i}`)}
              <rect className="md-outline" x={r.x + 0.5} y={r.y + 0.5} width={r.w - 1} height={r.h - 1} rx="15.5" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
