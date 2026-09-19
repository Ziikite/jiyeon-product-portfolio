"use client";

import { useEffect, useRef, useState } from "react";

const HEADLINE = "마이그레이션에 필요한 많은 도구들";
const BUBBLES = [
  { text: "일관된 관리나 문제 파악이 복잡해진다.", left: 5, top: 38, tail: "left" },
  { text: "여러 새로운 툴을 익히는 데 부담된다.", left: 50, top: 30, tail: "right" },
  { text: "툴이 다양해서 학습 의욕이 떨어지거나 과로를 느낀다.", left: 24, top: 66, tail: "left" },
] as const;

export default function ToolsProblem({ image }: { image?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The bubbles pop in when the scene is well in view and pop in again every time it scrolls back.
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), {
      threshold: 0.5,
      rootMargin: "0px 0px -6% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="tp-figure">
      <div ref={ref} className={`tp${on ? " is-on" : ""}`}>
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="tp-bg" src={image} alt="마이그레이션에 필요한 여러 도구가 얽힌 아키텍처" loading="lazy" decoding="async" />
        )}
        <div className="tp-dim" />
        <div className="tp-headline">{HEADLINE}</div>
        {BUBBLES.map((b, i) => (
          <div
            key={b.text}
            className={`tp-bubble tp-tail-${b.tail}`}
            style={{ left: `${b.left}%`, top: `${b.top}%`, ["--i" as string]: i }}
          >
            {b.text}
          </div>
        ))}
      </div>
      <figcaption className="tp-source">Flexera 2023 State of the Cloud Report</figcaption>
    </figure>
  );
}
