"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/app/lib/LocaleContext";

const TEXTS = {
  ko: "정의되지 않은 문제를 사용자 리서치와 데이터로 구조화해 서비스 개선으로 연결하는 기획자",
  en: "A service planner who structures ill-defined problems with user research and data, and turns them into better services",
};

export default function TypingTagline() {
  const TEXT = TEXTS[useLocale()];
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
