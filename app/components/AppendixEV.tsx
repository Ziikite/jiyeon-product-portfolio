"use client";

import { useEffect, useRef, useState } from "react";

const IMAGES = [
  { src: "/projects/detail/gm-ev-charging-appendix-1.svg", w: 1920, h: 891, caption: "사용자 여정 지도" },
  { src: "/projects/detail/gm-ev-charging-appendix-2.svg", w: 1571, h: 757, caption: "Information Architecture" },
];

function Figure({ img }: { img: (typeof IMAGES)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`s2-item${on ? " is-on" : ""}`}>
      <div className="s2-image-wrap" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="s2-image" src={img.src} alt={img.caption} loading="lazy" decoding="async" />
      </div>
      <p className="sh-caption">{img.caption}</p>
    </div>
  );
}

export default function AppendixEV({ body }: { body: string }) {
  return (
    <>
      <p>{body}</p>
      <div className="s2-items">
        {IMAGES.map((img) => (
          <Figure key={img.src} img={img} />
        ))}
      </div>
    </>
  );
}
