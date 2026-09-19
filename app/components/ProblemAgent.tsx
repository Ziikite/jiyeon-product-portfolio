"use client";

import { useEffect, useRef, useState } from "react";
import AgentTerminal from "@/app/components/AgentTerminal";

const PAIN = "평균 1~2개월의 시간";

export default function ProblemAgent({ body }: { body: string }) {
  const markRef = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = markRef.current;
    if (!el) return;
    // Same idea as the "bad" highlight in the GLN FAQ case: it sweeps in when the sentence is on screen.
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), {
      threshold: 0.9,
      rootMargin: "0px 0px -10% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const at = body.indexOf(PAIN);

  return (
    <>
      <p>
        {at === -1 ? (
          body
        ) : (
          <>
            {body.slice(0, at)}
            <span ref={markRef} className={`neg-mark${on ? " is-on" : ""}`}>
              {PAIN}
            </span>
            {body.slice(at + PAIN.length)}
          </>
        )}
      </p>
      <div className="os-figure">
        <AgentTerminal />
      </div>
    </>
  );
}
