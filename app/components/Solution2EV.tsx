"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    image: "/projects/detail/gm-ev-charging-solution-2.svg",
    w: 2028,
    h: 1183,
    title: "콘텐츠 형태에 맞춰서 장비 취사 선택",
    bullets: ["차량 디스플레이가 시청에 적합하지 않은 경우, 차량 내부에 거치할 수 있는 스크린 추가 대여"],
  },
  {
    image: "/projects/detail/gm-ev-charging-solution-3.svg",
    w: 2025,
    h: 1183,
    title: "충전 시간에 적합한 OTT 콘텐츠 추천",
    bullets: ["누적된 피로도를 대비하여 부담감 없이 즐길 수 있는 스낵 콘텐츠 중심의 추천", "충전 시간에 맞춰진 런타임 중심의 콘텐츠"],
  },
  {
    image: "/projects/detail/gm-ev-charging-solution-4.svg",
    w: 2019,
    h: 1183,
    title: "도착 시간에 맞춰 예약하고, 선결제하여 바로 이용할 수 있는 서비스",
    bullets: ["도착 시간에 맞춰 음식 테이크아웃 시간을 설정", "GM 포인트를 활용하여 서비스 결제에 대한 부담감 감소"],
  },
];

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

function Item({ item, index }: { item: (typeof ITEMS)[number]; index: number }) {
  const [ref, on] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={`s2-item${on ? " is-on" : ""}`}>
      <div className="s2-image-wrap" style={{ aspectRatio: `${item.w} / ${item.h}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="s2-image" src={item.image} alt={item.title} loading="lazy" decoding="async" />
      </div>
      <div className="s1-note">
        <div className="s1-note-head">
          <span className="s1-num">{index + 1}</span>
          <h4>{item.title}</h4>
        </div>
        <ul>
          {item.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Solution2EV() {
  return (
    <div className="s2-items">
      {ITEMS.map((item, i) => (
        <Item key={item.title} item={item} index={i} />
      ))}
    </div>
  );
}
