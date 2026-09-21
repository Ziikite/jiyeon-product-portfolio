"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

type Row = { voc: string; cause: string; insight: string };

// "{voc}" → {cause} → {insight}" per list item.
const ITEM_RE = /^"([^"]+)" → (.+?) → (.+)$/;

function parseList(list: string[]): Row[] | null {
  const rows: Row[] = [];
  for (const item of list) {
    const m = ITEM_RE.exec(item);
    if (!m) return null;
    rows.push({ voc: m[1], cause: m[2], insight: m[3] });
  }
  return rows;
}

// Same arrow as gln-faq's flow diagram (Arrow in StrategySection.tsx), recolored to this project's mint accent.
function Arrow({ variant }: { variant: "voc-cause" | "cause-insight" }) {
  const gradId = `cv-arrow-grad-${useId().replace(/:/g, "")}`;
  return (
    <span className={`cv-arrow cv-arrow-${variant === "voc-cause" ? "1" : "2"}`} aria-hidden="true">
      <svg width="28" height="34" viewBox="0 0 28 34">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d9e6f" stopOpacity="0" />
            <stop offset="100%" stopColor="#0d9e6f" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d="M14 0 V20 M5 12 L14 22 L23 12" stroke={`url(#${gradId})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </span>
  );
}

export default function CauseVisualEV({ body, list }: { body: string; list: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const rows = parseList(list);
  if (!rows) return <p>{body}</p>;

  return (
    <>
      <p>{body}</p>
      <div ref={ref} className={`cv${on ? " is-on" : ""}`}>
        <div className="cv-head">
          <span>VoC</span>
          <span />
          <span>문제 원인</span>
          <span />
          <span>인사이트</span>
        </div>
        {rows.map((row, i) => (
          <div key={row.voc} className="cv-row" style={{ ["--i" as string]: i } as CSSProperties}>
            <p className="cv-card cv-voc" tabIndex={0}>
              “{row.voc}”
            </p>
            <Arrow variant="voc-cause" />
            <p className="cv-card cv-cause" tabIndex={0}>
              {row.cause}
            </p>
            <Arrow variant="cause-insight" />
            <p className="cv-card cv-insight" tabIndex={0}>
              {row.insight}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
