"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export const PROBLEM_IMAGE_SIZE = { w: 640, h: 480 }; // 4:3

type Column = { title: string; quotes: [string, string]; insight: string };

// "{title} — "{quote1}" "{quote2}"" per list item.
const ITEM_RE = /^(.+?) — "([^"]+)" "([^"]+)"$/;

// The three insight pills, verbatim fragments of the section body (already present there as one
// run-on clause) — the reference layout just splits them one per pain point instead of one paragraph.
const INSIGHTS = [
  "사용자의 핵심 과업은 '충전 상태 확인'이며, 엔터테인먼트는 보조적인 역할",
  "단순한 OTT 제공이 아니라, 충전 경험 전체를 고려한 UX 설계 필요",
  "충전이 원활하게 진행된다는 확신이 없으면, 콘텐츠에 집중이 어려움",
];

function parseList(list: string[]): Column[] | null {
  const columns: Column[] = [];
  for (let i = 0; i < list.length; i++) {
    const m = ITEM_RE.exec(list[i]);
    if (!m) return null;
    columns.push({ title: m[1], quotes: [m[2], m[3]], insight: INSIGHTS[i] });
  }
  return columns;
}

function useInView<T extends HTMLElement>(threshold: number) {
  const ref = useRef<T | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold, rootMargin: "0px 0px -8% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, on] as const;
}

// Shows one quote at a time, crossfading to the next every few seconds instead of stacking both — pauses while off screen.
function QuoteCycler({ quotes, running }: { quotes: [string, string]; running: boolean }) {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!running) {
      setVisible(false);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    setVisible(true);
    let fadeIn = 0;
    const cycle = window.setInterval(() => {
      setVisible(false); // fade the current quote out
      fadeIn = window.setTimeout(() => {
        setI((v) => (v + 1) % quotes.length);
        setVisible(true); // then fade the next one in
      }, 450);
    }, 3400);
    return () => {
      window.clearInterval(cycle);
      window.clearTimeout(fadeIn);
    };
  }, [running, quotes.length]);
  return (
    <div className="pv-quotes">
      <p className={`pv-quote${visible ? " is-visible" : ""}`} tabIndex={0}>
        {quotes[i]}
      </p>
    </div>
  );
}

export default function ProblemEV({ body, list, images }: { body: string; list: string[]; images: Record<string, string | null> }) {
  const [ref, on] = useInView<HTMLDivElement>(0.25);
  const introEnd = body.indexOf("사용자의 핵심 과업은");
  const intro = (introEnd === -1 ? body : body.slice(0, introEnd)).trim();
  const columns = parseList(list);

  if (!columns) return <p>{body}</p>;

  return (
    <>
      <p>{intro}</p>
      <div ref={ref} className={`pv${on ? " is-on" : ""}`}>
        {columns.map((col, i) => {
          const src = images[`${i + 1}`];
          return (
            <div key={col.title} className="pv-col" style={{ ["--i" as string]: i } as CSSProperties}>
              <h4 className="pv-title">{col.title}</h4>
              <div className="pv-row">
                <div className="pv-stage" tabIndex={0}>
                  <div className="pv-photo">
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={col.title} loading="lazy" decoding="async" />
                    ) : (
                      <div className="pv-placeholder">
                        <span>{col.title}</span>
                        <span className="pv-placeholder-size">
                          {PROBLEM_IMAGE_SIZE.w} × {PROBLEM_IMAGE_SIZE.h}
                        </span>
                      </div>
                    )}
                  </div>
                  <QuoteCycler quotes={col.quotes} running={on} />
                </div>
                <svg className="pv-arrow" viewBox="0 0 28 18" aria-hidden="true">
                  <path d="M2 2 L26 2 L14 17 Z" />
                </svg>
                <p className="pv-insight" tabIndex={0}>
                  {col.insight}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
