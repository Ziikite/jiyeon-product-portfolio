"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// "시스템 품질 관점 — 안전감 : 핵심 정보만 제공하여 사용자의 혼선 감소" -> { view, title, desc }
function parse(item: string) {
  const [view, rest = ""] = item.split(" — ");
  const [title, ...desc] = rest.split(" : ");
  return { view: view.trim(), title: title.trim(), desc: desc.join(" : ").trim() };
}

export default function UxFactors({ body, list }: { body: string; list: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Plays when the figure scrolls into view and starts over every time it comes back.
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold: 0.4, rootMargin: "0px 0px -6% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const factors = list.map(parse);

  return (
    <>
      <p>{body}</p>
      <div ref={ref} className={`uf${on ? " is-on" : ""}${active !== null ? " has-active" : ""}`}>
        {factors.map((f, i) => (
          <div
            key={f.title}
            className={`uf-item${active === i ? " is-active" : ""}`}
            style={{ ["--i" as string]: i } as CSSProperties}
            tabIndex={0}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <span className="uf-view">{f.view}</span>
            <div className="uf-circle">
              <i className="uf-ring" aria-hidden="true" />
              <b>{f.title}</b>
            </div>
            <p className="uf-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
