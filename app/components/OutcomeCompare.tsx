"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const METRICS = ["편안함", "안전", "매력"] as const;
const BAR_MAX = 150; // px for a 5-point scale
const TOP = 44; // room above the bars for the value label
const SCALE = 5;

type Result = { from: number; to: number; pct: number };

// Body: an intro sentence, six quoted user quotes (two per metric, in the 편안함/안전/매력 order the heading states),
// then "정량 결과(기존 → 개선 후) : X → Y (Z%↑), ..." — three results in that same metric order.
function parseBody(body: string) {
  const firstQuoteAt = body.indexOf('"');
  const resultsAt = body.indexOf("정량 결과");
  if (firstQuoteAt === -1 || resultsAt === -1) return null;
  const intro = body.slice(0, firstQuoteAt).trim();
  const quotes = [...body.slice(firstQuoteAt, resultsAt).matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const results: Result[] = [...body.slice(resultsAt).matchAll(/([\d.]+) *→ *([\d.]+) *\(([\d.]+)%↑\)/g)].map((m) => ({
    from: parseFloat(m[1]),
    to: parseFloat(m[2]),
    pct: parseFloat(m[3]),
  }));
  if (quotes.length < METRICS.length * 2 || results.length < METRICS.length) return null;
  return { intro, quotes, results };
}

function useCount(from: number, to: number, run: boolean, delay: number, duration: number) {
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!run) {
      setValue(from); // resets so it counts up again on re-entry
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(Number((from + (to - from) * (1 - Math.pow(1 - t, 3))).toFixed(2)));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, from, to, delay, duration]);
  return value;
}

function OutcomeRow({ name, result, quotes, visible }: { name: string; result: Result; quotes: [string, string]; visible: boolean }) {
  const oldH = (result.from / SCALE) * BAR_MAX;
  const newH = (result.to / SCALE) * BAR_MAX;
  const value = useCount(result.from, result.to, visible, 500, 1300);

  return (
    <div className="vo-row">
      <div className="vo-chart">
        <div className="vo-title">
          {name}
          <span className="vo-chip">{result.pct}%↑</span>
        </div>
        <div className="vo-plot" style={{ height: TOP + BAR_MAX }}>
          <div className="vo-col vo-col-old">
            <span className="vo-value vo-value-old" style={{ bottom: oldH + 8 }}>
              {result.from.toFixed(2)}
            </span>
            <div className="vo-bar vo-bar-old" style={{ height: oldH }} />
          </div>
          <div className="vo-col vo-col-new">
            <span
              className="vo-value vo-value-new"
              style={{ ["--from" as string]: `${oldH + 8}px`, ["--to" as string]: `${newH + 8}px` }}
            >
              {value.toFixed(2)}
            </span>
            <div className="vo-bar vo-bar-new" style={{ ["--from" as string]: `${oldH}px`, ["--to" as string]: `${newH}px` }} />
          </div>
        </div>
        <div className="vo-labels">
          <span>기존</span>
          <span className="is-new">개선 후</span>
        </div>
      </div>
      <div className="vo-quotes">
        {quotes.map((q, i) => (
          <p key={i} className="vo-quote" style={{ ["--i" as string]: i } as CSSProperties}>
            {q}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function OutcomeCompare({ body }: { body: string }) {
  const parsed = parseBody(body);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Plays once the charts are well inside the viewport and replays every time they scroll back into view.
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.5,
      rootMargin: "0px 0px -8% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!parsed) return <p>{body}</p>;

  return (
    <>
      {parsed.intro && <p>{parsed.intro}</p>}
      <div ref={ref} className={`vo${visible ? " is-visible" : ""}`}>
        {METRICS.map((name, i) => (
          <OutcomeRow
            key={name}
            name={name}
            result={parsed.results[i]}
            quotes={[parsed.quotes[i * 2], parsed.quotes[i * 2 + 1]]}
            visible={visible}
          />
        ))}
      </div>
    </>
  );
}
