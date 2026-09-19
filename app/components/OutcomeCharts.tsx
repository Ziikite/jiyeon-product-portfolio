"use client";

import { useEffect, useId, useRef, useState } from "react";

type Metric = { name: string; percent: number; note?: string };

// "결제 실패 문의 17% ▼ (1월 30일자 9pay 오류 메시지 개선건 반영)"
const METRIC_RE = /^(.+?) (\d+)% ▼(?: \((.+)\))?$/;

function parseMetrics(list: string[]): Metric[] | null {
  const metrics: Metric[] = [];
  for (const item of list) {
    const m = METRIC_RE.exec(item);
    if (!m) return null;
    metrics.push({ name: m[1], percent: Number(m[2]), note: m[3] });
  }
  return metrics;
}

// "결과 분석" copy per metric, in the same order as the list. The dated note (if any) comes from the list itself.
const ANALYSIS: string[][] = [
  [
    '기존 FAQ는 "실패했을 때 문의하세요" 수준이었으나, 개선 후 "3분 이내 자동환불 → 3분 초과 시 문의"라는 조건 분기형 행동 지침을 제시',
    "고객이 스스로 상황을 판단할 수 있는 의사결정 흐름이 생긴 것",
  ],
  [
    "ATM 실패는 네트워크/기술 오류 발생이 많아 기존 FAQ는 이를 원인 불명 상태로 안내\n→ 실패 원인 안내 + 해결책을 제공하여 고객이 자신의 상황을 직접 대입할 수 있도록 구조화",
  ],
  [
    '기존 FAQ가 용어 중심 나열 방식이어서 "내야 하는 금액이 얼마인지"를 바로 파악하기 어려움',
    "개선 후 결제 수수료 / 출금 수수료를 케이스별로 분리 + 예시 제공",
  ],
];

const PERSONAL_INSIGHT =
  "고객은 돈의 흐름에 대한 정보를 빨리 얻고 싶어합니다. 기존 FAQ는 실패했을 때 문의하세요. 정도였지만, 상황 별 행동 경로를 FAQ 안에서 제공해야 문의가 줄어들 수 있다는 것을 데이터로 확인한 기회였습니다. FAQ가 문제 진단 도구 역할을 할 수 있다면 CS 유입 전 단계에서 해결 가능한 경우가 늘어날 수 있습니다. 즉 FAQ에서 사용자의 질문 의도를 역추적하여 구조를 짜는 것이 핵심이었습니다.";

function useCountUp(target: number, run: boolean, delay: number, duration: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, target, delay, duration]);

  return value;
}

function MetricColumn({ metric, notes }: { metric: Metric; notes: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const shown = useCountUp(metric.percent, visible, 500, 1300);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.45 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`oc-col${visible ? " is-visible" : ""}`}>
      <div className="oc-title">{metric.name}</div>

      <div
        className="oc-chart"
        style={{ "--after": `${100 - metric.percent}%` } as React.CSSProperties}
        role="img"
        aria-label={`${metric.name} 기존 대비 ${metric.percent}% 감소`}
      >
        <div className="oc-cell">
          <div className="oc-bar oc-bar-before" />
        </div>
        <div className="oc-cell">
          <div className="oc-ghost" />
          <div className="oc-bar oc-bar-after" />
        </div>
        <div className="oc-cell oc-cell-badge">
          <span className="oc-badge">
            {shown}%
            <svg width="11" height="10" viewBox="0 0 11 10" aria-hidden="true">
              <path d="M0.5 0.5 H10.5 L5.5 9.5 Z" fill="currentColor" />
            </svg>
          </span>
        </div>
        <span className="oc-x">기존</span>
        <span className="oc-x oc-x-after">개선 후</span>
      </div>

      <div className="oc-acc">
        <button
          type="button"
          className="voc-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          결과 분석
          <svg className="voc-chevron" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.5 6 L8 10.5 L12.5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div id={panelId} className={`voc-panel${open ? " is-open" : ""}`} inert={!open}>
          <div className="voc-panel-inner">
            <ul className="oc-notes">
              {notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OutcomeCharts({ body, list }: { body: string; list: string[] }) {
  const metrics = parseMetrics(list);

  // The per-metric analysis now lives in the accordions; the paragraph keeps only its opening.
  const introEnd = body.indexOf("향상되었습니다.");
  const intro = introEnd === -1 ? body : body.slice(0, introEnd + "향상되었습니다.".length);

  if (!metrics || metrics.length !== ANALYSIS.length) {
    return (
      <>
        <p>{body}</p>
        <ul className="case-list">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <p>{intro}</p>
      <div className="oc-grid">
        {metrics.map((metric, i) => (
          <MetricColumn key={metric.name} metric={metric} notes={[...(metric.note ? [metric.note] : []), ...ANALYSIS[i]]} />
        ))}
      </div>
      <aside className="oc-insight">
        <span className="oc-insight-label">Personal Insight</span>
        <p>{PERSONAL_INSIGHT}</p>
      </aside>
    </>
  );
}
