"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/app/lib/LocaleContext";

type Values = { bounceFrom: number; bounceTo: number; convFrom: string; convFromNum: number; convTo: number };

const COPY = {
  ko: { bounce: "이탈률", down: "% 감소 ▼", conv: "전환율", up: "3배 향상 ▲", before: "기존", after: "개선 후" },
  en: { bounce: "Bounce rate", down: "% lower ▼", conv: "Conversion", up: "3× higher ▲", before: "Before", after: "After" },
};

const BAR_MAX = 180; // px for 100% of a chart's scale
const TOP = 52; // room above the bars for value labels and the arrow

function useCount(from: number, to: number, run: boolean, delay: number, duration: number, digits: number) {
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!run) {
      setValue(from); // back to the starting number while off screen, so it counts again on re-entry
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Number((from + (to - from) * eased).toFixed(digits)));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, from, to, delay, duration, digits]);
  return value;
}

export default function OutcomeBars({ values }: { values: Values }) {
  const t = COPY[useLocale()];
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Plays when the charts are well inside the viewport and replays every time they scroll back into view.
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.6,
      rootMargin: "0px 0px -8% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { bounceFrom, bounceTo, convFrom, convFromNum, convTo } = values;
  const reduction = Math.round((1 - bounceTo / bounceFrom) * 100);

  // Bounce: both bars start at the old height, the new one shrinks. Conversion: the new one grows from the old height.
  const bounceOld = BAR_MAX;
  const bounceNew = (bounceTo / bounceFrom) * BAR_MAX;
  const convNew = BAR_MAX;
  const convOld = (convFromNum / convTo) * BAR_MAX;

  const bounceNumber = useCount(bounceFrom, bounceTo, visible, 500, 1300, 0);
  const convNumber = useCount(convFromNum, convTo, visible, 500, 1300, 1);

  return (
    <div ref={ref} className={`ob${visible ? " is-visible" : ""}`}>
      <div className="ob-chart">
        <div className="ob-title">
          {t.bounce}<span className="ob-chip ob-chip-down">{reduction}{t.down}</span>
        </div>
        <div className="ob-plot" style={{ height: TOP + BAR_MAX }}>
          <div className="ob-col ob-col-old">
            <span className="ob-value ob-value-old" style={{ bottom: bounceOld + 8 }}>
              {bounceFrom}%
            </span>
            <div className="ob-bar ob-bar-old" style={{ height: bounceOld }} />
          </div>
          <div className="ob-col ob-col-new">
            <span
              className="ob-value ob-value-new"
              style={{ ["--from" as string]: `${bounceOld + 8}px`, ["--to" as string]: `${bounceNew + 8}px` }}
            >
              {bounceNumber}%
            </span>
            <div
              className="ob-bar ob-bar-new"
              style={{ ["--from" as string]: `${bounceOld}px`, ["--to" as string]: `${bounceNew}px` }}
            />
          </div>
        </div>
        <div className="ob-labels">
          <span>{t.before}</span>
          <span className="is-new">{t.after}</span>
        </div>
      </div>

      <div className="ob-chart">
        <div className="ob-title">
          {t.conv}<span className="ob-chip ob-chip-up">{t.up}</span>
        </div>
        <div className="ob-plot" style={{ height: TOP + BAR_MAX }}>
          <div className="ob-col ob-col-old">
            <span className="ob-value ob-value-old" style={{ bottom: convOld + 8 }}>
              {convFrom}%
            </span>
            <div className="ob-bar ob-bar-old" style={{ height: convOld }} />
          </div>
          <div className="ob-col ob-col-new">
            <span
              className="ob-value ob-value-new"
              style={{ ["--from" as string]: `${convOld + 8}px`, ["--to" as string]: `${convNew + 8}px` }}
            >
              {convNumber.toFixed(1)}%
            </span>
            <div
              className="ob-bar ob-bar-new"
              style={{ ["--from" as string]: `${convOld}px`, ["--to" as string]: `${convNew}px` }}
            />
          </div>
        </div>
        <div className="ob-labels">
          <span>{t.before}</span>
          <span className="is-new">{t.after}</span>
        </div>
      </div>
    </div>
  );
}
