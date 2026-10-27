"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/app/lib/LocaleContext";

const COPY = {
  ko: {
    headline: "마이그레이션에 필요한 많은 도구들",
    bubbles: ["일관된 관리나 문제 파악이 복잡해진다.", "여러 새로운 툴을 익히는 데 부담된다.", "툴이 다양해서 학습 의욕이 떨어지거나 과로를 느낀다."],
    alt: "마이그레이션에 필요한 여러 도구가 얽힌 아키텍처",
  },
  en: {
    headline: "So many tools just to migrate",
    bubbles: [
      "Keeping things consistent and pinpointing issues gets complicated.",
      "Learning several new tools is a burden.",
      "With so many tools, motivation drops and people feel overworked.",
    ],
    alt: "An architecture tangled with the many tools a migration needs",
  },
};
const BUBBLES = [
  { left: 5, top: 38, tail: "left" },
  { left: 50, top: 30, tail: "right" },
  { left: 24, top: 66, tail: "left" },
] as const;

export default function ToolsProblem({ image }: { image?: string }) {
  const t = COPY[useLocale()];
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
          <img className="tp-bg" src={image} alt={t.alt} loading="lazy" decoding="async" />
        )}
        <div className="tp-dim" />
        <div className="tp-headline">{t.headline}</div>
        {BUBBLES.map((b, i) => (
          <div
            key={i}
            className={`tp-bubble tp-tail-${b.tail}`}
            style={{ left: `${b.left}%`, top: `${b.top}%`, ["--i" as string]: i }}
          >
            {t.bubbles[i]}
          </div>
        ))}
      </div>
      <figcaption className="tp-source">Flexera 2023 State of the Cloud Report</figcaption>
    </figure>
  );
}
