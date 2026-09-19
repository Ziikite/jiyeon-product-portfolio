"use client";

import { useEffect, useRef, useState } from "react";

// A screenshot with blue boxes, leader lines and label chips drawn over it in the image's own coordinate space.
// Coordinates may go outside the image (negative y / x beyond width): the container leaves room above for chips.
export type Box = { x: number; y: number; w: number; h: number; delay: number };
export type Leader = { d: string; delay: number };
export type Dot = { cx: number; cy: number; delay: number };
export type Chip = { text: string; x: number; y: number; delay: number };

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

export default function AnnotatedScreen({
  image,
  alt,
  width,
  height,
  boxes,
  leaders,
  dots,
  chips,
  topRoom = 0,
}: {
  image: string;
  alt: string;
  width: number;
  height: number;
  boxes: Box[];
  leaders: Leader[];
  dots: Dot[];
  chips: Chip[];
  topRoom?: number; // px of empty space kept above the image for chips placed at negative y
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Drawn when the screen is well in view and redrawn every time it scrolls back in.
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), {
      threshold: 0.5,
      rootMargin: "0px 0px -6% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delay = (s: number) => ({ ["--d" as string]: `${s}s` });

  return (
    <div className="sv-wrap" style={{ paddingTop: topRoom }}>
      <div ref={ref} className={`sv${on ? " is-on" : ""}`} style={{ aspectRatio: `${width} / ${height}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="sv-img" src={image} alt={alt} loading="lazy" decoding="async" />

        <svg className="sv-lines" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
          {boxes.map((b, i) => (
            <rect key={i} className="sv-box" x={b.x} y={b.y} width={b.w} height={b.h} rx="10" pathLength={1} style={delay(b.delay)} />
          ))}
          {leaders.map((l, i) => (
            <path key={i} className="sv-leader" pathLength={1} d={l.d} style={delay(l.delay)} />
          ))}
          {dots.map((d, i) => (
            <circle key={i} className="sv-dot" cx={d.cx} cy={d.cy} r="6" style={delay(d.delay)} />
          ))}
        </svg>

        {chips.map((c, i) => (
          <span key={i} className="sv-chip" style={{ left: pct(c.x, width), top: pct(c.y, height), ...delay(c.delay) }}>
            {c.text}
          </span>
        ))}
      </div>
    </div>
  );
}
