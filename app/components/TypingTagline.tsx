"use client";

import { useEffect, useState } from "react";

const TEXT = "정의되지 않은 문제를 사용자 리서치와 데이터로 구조화해 서비스 개선으로 연결하는 기획자";

export default function TypingTagline() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= TEXT.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), 45);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <p className="hero-tagline">
      <span aria-hidden="true">{TEXT.slice(0, count)}</span>
      <span className="cursor" aria-hidden="true" />
      <span className="sr-only">{TEXT}</span>
    </p>
  );
}
