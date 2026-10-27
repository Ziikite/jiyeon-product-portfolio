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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // On narrow screens a chip anchored near the right edge would run past the column: pull it back inside,
    // and if that lands it on an earlier chip, lift it above that one (with extra room reserved at the top).
    const fit = () => {
      const placed: { left: number; right: number; top: number; bottom: number }[] = [];
      let lift = 0;
      el.querySelectorAll<HTMLElement>(".sv-chip").forEach((chip) => {
        chip.style.marginLeft = "";
        chip.style.marginTop = "";
        const overflow = chip.offsetLeft + chip.offsetWidth - el.clientWidth;
        const shift = overflow > 0 ? overflow : 0;
        const r = { left: chip.offsetLeft - shift, right: chip.offsetLeft - shift + chip.offsetWidth, top: chip.offsetTop, bottom: chip.offsetTop + chip.offsetHeight };
        const hit = placed.find((p) => r.left < p.right + 6 && r.right > p.left - 6 && r.top < p.bottom && r.bottom > p.top);
        if (shift) chip.style.marginLeft = `${-shift}px`;
        if (hit) {
          const up = r.bottom - hit.top + 6;
          chip.style.marginTop = `${-up}px`;
          r.top -= up;
          r.bottom -= up;
          lift = Math.max(lift, -r.top - topRoom);
        }
        placed.push(r);
      });
      (el.parentElement as HTMLElement).style.paddingTop = `${topRoom + Math.max(0, lift)}px`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => observer.disconnect();
  }, [chips, topRoom]);

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
