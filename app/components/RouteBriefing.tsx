"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export const ROUTE_UI_SIZE = { w: 1600, h: 650 };

// Phrases the reference figure highlights inside the two voice scripts.
const HIGHLIGHTS = ["현재 주유가 필요한 상태", "경유지로 설정해드릴까요?", "총 4km로, 21분 소요"];
const AXES = ["안전감", "편안함", "매력"] as const; // clockwise from the top
const MAX = 5;

type Guide = { title: string; rules: string[]; script: string };
type Score = { name: string; adopted: number; rejected: number };

const curly = (t: string) => t.replace(/'([^']+)'/g, "‘$1’");

// The section body holds both guidelines, both voice scripts and the test scores as one string; split it back up.
function parseBody(body: string) {
  const long = body.indexOf("가이드라인(장거리 운전) :");
  const short = body.indexOf("가이드라인(단거리 운전) :");
  const test = body.indexOf("Test Result");
  if (long === -1 || short === -1 || test === -1) return null;
  const guide = (title: string, label: string, from: number, to: number): Guide => {
    const t = body.slice(from, to).replace(label, "").trim();
    const q = t.indexOf('"');
    const rules = t
      .slice(0, q)
      .trim()
      .replace(/\.$/, "")
      .split(" / ")
      .map((r) => curly(r.trim()));
    return { title, rules, script: curly(t.slice(q + 1, t.lastIndexOf('"')).trim()) };
  };
  const scores: Score[] = [...body.slice(test).matchAll(/(\S+) ([\d.]+) vs ([\d.]+)/g)].map((m) => ({
    name: m[1],
    adopted: parseFloat(m[2]),
    rejected: parseFloat(m[3]),
  }));
  return {
    guides: [
      guide("장거리 운전", "가이드라인(장거리 운전) :", long, short),
      guide("단거리 운전", "가이드라인(단거리 운전) :", short, test),
    ],
    scores,
  };
}

function useWatch<T extends HTMLElement>(threshold: number) {
  const ref = useRef<T | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Plays when the block scrolls into view and starts over every time it comes back.
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold, rootMargin: "0px 0px -6% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, on] as const;
}

// 0 -> 1 (eased) once `run` turns true; back to 0 when it turns false.
function useProgress(run: boolean, delay: number, duration: number) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!run) {
      setP(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    let raf = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setP(1 - Math.pow(1 - t, 3));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, delay, duration]);
  return p;
}

function Script({ text }: { text: string }) {
  // wrap each highlighted phrase; everything else stays plain text
  const parts: (string | { hl: string })[] = [];
  let rest = text;
  while (rest) {
    const hit = HIGHLIGHTS.map((h) => ({ h, at: rest.indexOf(h) }))
      .filter((x) => x.at !== -1)
      .sort((a, b) => a.at - b.at)[0];
    if (!hit) {
      parts.push(rest);
      break;
    }
    if (hit.at > 0) parts.push(rest.slice(0, hit.at));
    parts.push({ hl: hit.h });
    rest = rest.slice(hit.at + hit.h.length);
  }
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          p
        ) : (
          <mark key={i} className="rb-mark">
            {p.hl}
          </mark>
        )
      )}
    </>
  );
}

// ---- radar --------------------------------------------------------------------------------------------------------------
const CX = 150;
const CY = 168;
const R = 108;
const ang = (i: number) => ((-90 + i * 120) * Math.PI) / 180; // top, bottom right, bottom left
const pt = (i: number, r: number) => `${(CX + Math.cos(ang(i)) * r).toFixed(1)},${(CY + Math.sin(ang(i)) * r).toFixed(1)}`;

function Radar({ scores, run }: { scores: Score[]; run: boolean }) {
  const p = useProgress(run, 200, 1400);
  const [focus, setFocus] = useState<"adopted" | "rejected" | null>(null);
  // order the scores to match the axes drawn (안전감 top, 편안함 bottom right, 매력 bottom left)
  const byAxis = AXES.map((a) => scores.find((s) => s.name === a));
  if (byAxis.some((s) => !s)) return null;
  const poly = (key: "adopted" | "rejected") => byAxis.map((s, i) => pt(i, (s![key] / MAX) * R * p)).join(" ");
  const labelPos = [
    { x: CX, y: 34, anchor: "middle" as const },
    { x: 262, y: 262, anchor: "end" as const },
    { x: 38, y: 262, anchor: "start" as const },
  ];
  return (
    <div className="rb-radar">
      <div className="rb-head">
        <b>Test Result</b>
        <span>n = 38, p &lt; .05</span>
      </div>
      <div className="rb-legend">
        <button type="button" onMouseEnter={() => setFocus("adopted")} onMouseLeave={() => setFocus(null)} onFocus={() => setFocus("adopted")} onBlur={() => setFocus(null)}>
          <i className="is-adopted" />
          채택안
        </button>
        <button type="button" onMouseEnter={() => setFocus("rejected")} onMouseLeave={() => setFocus(null)} onFocus={() => setFocus("rejected")} onBlur={() => setFocus(null)}>
          <i className="is-rejected" />
          기각안
        </button>
      </div>
      <svg viewBox="0 0 300 290" role="img" aria-label="채택안과 기각안의 안전감, 편안함, 매력 점수 비교">
        {[1, 2, 3, 4, 5].map((k) => (
          <polygon key={k} className="rb-ring" points={[0, 1, 2].map((i) => pt(i, (k / MAX) * R)).join(" ")} />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={i} className="rb-axis" x1={CX} y1={CY} x2={pt(i, R).split(",")[0]} y2={pt(i, R).split(",")[1]} />
        ))}
        <polygon className={`rb-poly is-rejected${focus === "adopted" ? " is-dim" : ""}`} points={poly("rejected")} />
        <polygon className={`rb-poly is-adopted${focus === "rejected" ? " is-dim" : ""}`} points={poly("adopted")} />
        {byAxis.map((s, i) => (
          <text key={s!.name} className="rb-axis-label" x={labelPos[i].x} y={labelPos[i].y} textAnchor={labelPos[i].anchor}>
            <tspan x={labelPos[i].x}>{s!.name}</tspan>
            <tspan x={labelPos[i].x} dy="17" className="rb-score">
              <tspan className="is-adopted">{(s!.adopted * p).toFixed(2)}</tspan>
              <tspan className="is-rejected"> vs {(s!.rejected * p).toFixed(2)}</tspan>
            </tspan>
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function RouteBriefing({ body, quotes, uiImage }: { body: string; quotes: string[]; uiImage: string | null }) {
  const parsed = parseBody(body);
  const [guideRef, guideOn] = useWatch<HTMLDivElement>(0.3);
  const [dataRef, dataOn] = useWatch<HTMLDivElement>(0.3);
  const [focus, setFocus] = useState<number | null>(null);
  if (!parsed) return <p>{body}</p>;

  return (
    <div className="rb">
      <div ref={guideRef} className={`rb-guides${guideOn ? " is-on" : ""}${focus !== null ? " has-focus" : ""}`}>
        <span className="rb-pill">가이드라인</span>
        <div className="rb-cols">
          {parsed.guides.map((g, gi) => (
            <div
              key={g.title}
              className={`rb-col${focus === gi ? " is-focus" : ""}`}
              style={{ ["--i" as string]: gi } as CSSProperties}
              tabIndex={0}
              onMouseEnter={() => setFocus(gi)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(gi)}
              onBlur={() => setFocus(null)}
            >
              <div className="rb-card">
                <h4>{g.title}</h4>
                <ol>
                  {g.rules.map((r, ri) => (
                    <li key={r} style={{ ["--r" as string]: ri } as CSSProperties}>
                      {r}
                    </li>
                  ))}
                </ol>
              </div>
              <p className="rb-script">
                <span className="rb-wave" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <Script text={g.script} />
              </p>
            </div>
          ))}
        </div>
      </div>

      <figure className="rb-ui">
        {uiImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={uiImage} alt="경로 브리핑 차량 화면" loading="lazy" decoding="async" />
        ) : (
          <div className="rb-placeholder">
            <span className="rb-placeholder-name">경로 브리핑 차량 화면</span>
            <span className="rb-placeholder-size">
              {ROUTE_UI_SIZE.w} × {ROUTE_UI_SIZE.h}
            </span>
          </div>
        )}
      </figure>

      <div ref={dataRef} className={`rb-data${dataOn ? " is-on" : ""}`}>
        <Radar scores={parsed.scores} run={dataOn} />
        <div className="rb-interview">
          <div className="rb-head">
            <b>User Interview</b>
            <span>n = 18</span>
          </div>
          <div className="rb-quotes">
            {quotes.map((q, i) => (
              <p key={q} className="rb-quote" style={{ ["--i" as string]: i } as CSSProperties}>
                {q.replace(/^(P\d+) : /, "$1: ")}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
