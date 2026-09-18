"use client";

import { Fragment, useEffect, useRef, useState } from "react";

type Tone = "neutral" | "outline" | "solid";

type CascadeCard = {
  label: string;
  text: string;
  tone: Tone;
};

const CARDS: CascadeCard[] = [
  {
    label: "Do",
    text: "제공된 카테고리안에서\n\"내 상황이 어디에 해당하는지\" 판단 어려움",
    tone: "neutral",
  },
  {
    label: "Pain point",
    text: "FAQ에서 찾기 어려운 문제 상황",
    tone: "outline",
  },
  {
    label: "Action",
    text: "FAQ 탐색을 포기하고 CS로 직접 문의",
    tone: "solid",
  },
];

function ProblemCard({ card, index }: { card: CascadeCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const lines = card.text.split("\n");

  return (
    <div
      ref={ref}
      className={`problem-card problem-card-${card.tone}${visible ? " is-visible" : ""}`}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <span className="problem-card-label">{card.label}</span>
      <p className="problem-card-text">
        {lines.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </p>
    </div>
  );
}

export default function ProblemCascade() {
  return (
    <div className="problem-cascade">
      {CARDS.map((card, i) => (
        <ProblemCard key={card.label} card={card} index={i} />
      ))}
    </div>
  );
}
