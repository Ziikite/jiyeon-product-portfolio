"use client";

import { useEffect, useId, useRef, useState } from "react";

type Principle = { name: string; step: string; details: string[]; goal: string };

// "Name — step (detail, detail) → Goal : goal"
const PRINCIPLE_RE = /^(.+?) — (.+?) \((.+)\) → Goal : (.+)$/;

function parsePrinciples(list: string[]): Principle[] | null {
  const parsed: Principle[] = [];
  for (const item of list) {
    const m = PRINCIPLE_RE.exec(item);
    if (!m) return null;
    parsed.push({ name: m[1], step: m[2], details: m[3].split(", "), goal: m[4] });
  }
  return parsed;
}

function useReveal<T extends HTMLElement>(threshold: number) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// Same arrow as the Background section (inquiry-link-arrow); rotated to point right on desktop.
function Arrow() {
  const gradId = `flow-arrow-grad-${useId().replace(/:/g, "")}`;
  return (
    <span className="flow-arrow" aria-hidden="true">
      <svg width="28" height="34" viewBox="0 0 28 34">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7000FC" stopOpacity="0" />
            <stop offset="100%" stopColor="#7000FC" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M14 0 V20 M5 12 L14 22 L23 12"
          stroke={`url(#${gradId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  );
}

function FlowRow({ principle, index }: { principle: Principle; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);

  return (
    <div ref={ref} className={`flow-row${visible ? " is-visible" : ""}`}>
      <div className="flow-row-title">
        <span className="flow-row-no">{index + 1}</span>
        {principle.name}
      </div>
      <div className="flow-row-body">
        <div className="flow-card flow-step">{principle.step}</div>
        <Arrow />
        <ul className="flow-card flow-details">
          {principle.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <Arrow />
        <div className="flow-card flow-goal">
          <span className="flow-goal-label">Goal</span>
          <span className="flow-goal-text">{principle.goal}</span>
        </div>
      </div>
    </div>
  );
}

const TERMS = ["(1) 실패 상황의 명확성 강화", "(2) 사용자 불안 완화", "(3) 자발적 해결 가능성 확대"];

export default function StrategySection({
  body,
  highlight,
  list,
}: {
  body: string;
  highlight: string;
  list: string[];
}) {
  const principles = parsePrinciples(list);
  const { ref, visible } = useReveal<HTMLSpanElement>(0.6);

  const idx = body.indexOf(highlight);
  const before = idx === -1 ? body : body.slice(0, idx);
  const after = idx === -1 ? "" : body.slice(idx + highlight.length);

  // Split the highlighted sentence around the three numbered terms so each can carry a hover label.
  const nodes: React.ReactNode[] = [];
  let rest = idx === -1 ? "" : highlight;
  TERMS.forEach((term, i) => {
    const at = rest.indexOf(term);
    if (at === -1) return;
    if (at > 0) nodes.push(rest.slice(0, at));
    nodes.push(
      <span key={term} className="strategy-term" data-label={principles?.[i]?.name} tabIndex={0}>
        {term}
      </span>
    );
    rest = rest.slice(at + term.length);
  });
  nodes.push(rest);

  return (
    <>
      <p>
        {before}
        {idx !== -1 && (
          <span ref={ref} className={`scroll-highlight${visible ? " is-active" : ""}`}>
            {nodes}
          </span>
        )}
        {after}
      </p>
      {principles ? (
        <div className="strategy-flow">
          {principles.map((p, i) => (
            <FlowRow key={p.name} principle={p} index={i} />
          ))}
        </div>
      ) : (
        <ul className="case-list">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}
