"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/app/lib/i18n";

const COPY = {
  ko: {
    title: "팝업 형태로 브랜드 프로모션이 가능한 충전소",
    bullets: [
      "휴식 공간으로, 충전 중 피로를 풀 수 있는 휴게 공간 제공",
      "브랜드 팝업 존으로, 한국 GM 브랜드를 홍보할 수 있는 프로모션 공간 제공",
      "충전 중 휴식 외에도 새로운 관광 요소로써 체험할 수 있는 UX",
    ],
  },
  en: {
    title: "A charging station that doubles as a pop-up for brand promotion",
    bullets: [
      "As a rest area, a lounge where drivers can shake off fatigue while charging",
      "As a brand pop-up zone, a promotional space for the GM Korea brand",
      "A UX that turns charging into a new destination to experience, not just a break",
    ],
  },
};

export default function Solution3EV({ locale = "ko" }: { locale?: Locale }) {
  const { title: TITLE, bullets: BULLETS } = COPY[locale];
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold: 0.3, rootMargin: "0px 0px -8% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`s2-item${on ? " is-on" : ""}`}>
      <div className="s2-image-wrap" style={{ aspectRatio: "2464 / 1343" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="s2-image" src="/projects/detail/gm-ev-charging-solution-5.svg" alt={TITLE} loading="lazy" decoding="async" />
      </div>
      <div className="s1-note s1-note-plain">
        <h4>{TITLE}</h4>
        <ul>
          {BULLETS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
