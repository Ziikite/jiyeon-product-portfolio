"use client";

import { useEffect, useRef, useState } from "react";

export default function HighlightOnScroll({ text, highlight }: { text: string; highlight: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const idx = text.indexOf(highlight);
  if (idx === -1) return <p>{text}</p>;

  const before = text.slice(0, idx);
  const after = text.slice(idx + highlight.length);

  return (
    <p>
      {before}
      <span ref={ref} className={`scroll-highlight${active ? " is-active" : ""}`}>
        {highlight}
      </span>
      {after}
    </p>
  );
}
