"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const CLAIM = "6명 중 5명은";

export type ShadowPath = { d: string; fill: string };
export type ShadowArt = { title: ShadowPath; caption: ShadowPath; people: { body: ShadowPath; head: ShadowPath }[] };

// x of each person's body and y of the head top / body bottom, measured from the supplied SVG (799 x 435).
const SLOTS = [
  { x: 239, y: 133 },
  { x: 361, y: 133 },
  { x: 484, y: 133 },
  { x: 239, y: 246 },
  { x: 362, y: 246 },
  { x: 484, y: 246 },
];
const ROW = { x: 101, y: 125, step: 104 }; // six icons in one horizontal row (viewBox units)
const CAPTION_SHIFT = { x: 5.5, y: -100 };
const IGNORED = 5; // the first five people fill up; the sixth stays gray

// Two balanced lines (preferring a break after "?" or ",") so the bubble hugs its text and both side paddings match.
function balance(text: string): [string, string] | null {
  const mid = text.length / 2;
  let best = -1;
  let bestScore = Infinity;
  for (let i = 1; i < text.length - 1; i++) {
    if (text[i] !== " ") continue;
    const score = Math.abs(i - mid) - (/[?,.]/.test(text[i - 1]) ? 6 : 0);
    if (score < bestScore) {
      bestScore = score;
      best = i;
    }
  }
  return best === -1 ? null : [text.slice(0, best), text.slice(best + 1)];
}

function useWatch(threshold: number, rootMargin = "0px 0px -6% 0px") {
  const ref = useRef<HTMLElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Plays when the block scrolls into view and starts over every time it comes back.
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold, rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
  return [ref, on] as const;
}

export default function ShadowingVisual({ body, quotes, photo, art }: { body: string; quotes: string[]; photo: string; art: ShadowArt }) {
  const [markRef, markOn] = useWatch(0.9, "0px 0px -10% 0px");
  const [photoRef, photoOn] = useWatch(0.45);
  const [ratioRef, ratioOn] = useWatch(0.5);

  const at = body.lastIndexOf(CLAIM);
  const lead = at === -1 ? body : body.slice(0, at);
  const claim = at === -1 ? "" : body.slice(at);

  return (
    <>
      <p>
        {lead}
        {claim && (
          <span ref={markRef as React.RefObject<HTMLSpanElement>} className={`vb-mark${markOn ? " is-on" : ""}`}>
            {claim}
          </span>
        )}
      </p>


      <div ref={ratioRef as React.RefObject<HTMLDivElement>} className={`ig${ratioOn ? " is-on" : ""}`}>
        <svg className="ig-svg" viewBox="80 58 640 242" role="img" aria-label="음성 안내 무시 비율: 6명 중 5명은 음성 안내를 무시하는 모습 확인">
          <defs>
            {SLOTS.slice(0, IGNORED).map((s, i) => (
              <clipPath key={i} id={`ig-clip-${i}`}>
                <rect className="ig-rise" x={s.x - 3} y={s.y - 3} width="84" height="90" style={{ ["--i" as string]: i } as CSSProperties} />
              </clipPath>
            ))}
          </defs>
          <path d={art.title.d} fill={art.title.fill} />

          {art.people.map((p, i) => (
            <g key={i} transform={`translate(${ROW.x + i * ROW.step - SLOTS[i].x} ${ROW.y - SLOTS[i].y})`}>
              {i < IGNORED ? (
                <>
                  <g fill="#DADDE0">
                    <path d={p.body.d} />
                    <path d={p.head.d} />
                  </g>
                  <g clipPath={`url(#ig-clip-${i})`} fill={p.body.fill}>
                    <path d={p.body.d} />
                    <path d={p.head.d} />
                  </g>
                </>
              ) : (
                <g className="ig-rest" fill={p.body.fill}>
                  <path d={p.body.d} />
                  <path d={p.head.d} />
                </g>
              )}
            </g>
          ))}

          <g transform={`translate(${CAPTION_SHIFT.x} ${CAPTION_SHIFT.y})`}>
            <rect className="ig-hl" x="247" y="354" width="228" height="32" rx="4" />
            <path d={art.caption.d} fill={art.caption.fill} />
          </g>
        </svg>
      </div>

      <figure ref={photoRef as React.RefObject<HTMLElement>} className={`sh${photoOn ? " is-on" : ""}`}>
        <div className="sh-stage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sh-photo" src={photo} alt="운전자 쉐도잉 장면" loading="lazy" decoding="async" />
          <div className="sh-bubbles">
            {quotes.map((q, i) => {
              const lines = balance(q);
              return (
                <p key={q} className="sh-bubble" style={{ ["--i" as string]: i } as CSSProperties}>
                  {lines ? (
                    <>
                      {lines[0]}
                      <br />
                      {lines[1]}
                    </>
                  ) : (
                    q
                  )}
                </p>
              );
            })}
          </div>
        </div>
        <figcaption className="sh-caption">운전자 쉐도잉(n=6)</figcaption>
      </figure>
    </>
  );
}
