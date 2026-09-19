"use client";

import { useEffect, useRef, useState } from "react";

// Before: Pre-Sales -> Sales -> Post-Sales. After: Pre-Sales -> Console.
// One diagram morphs between the two: rows that go away collapse, rows that arrive expand, the Sales header becomes Console
// and the Post-Sales block folds into it. It auto-plays while on screen; the toggle lets you jump to either state.
const HOLD_BEFORE = 2600;
const HOLD_AFTER = 3200;

function Arrow() {
  return (
    <svg className="fm-arrow-svg" width="34" height="62" viewBox="0 0 34 62" aria-hidden="true">
      <path d="M17 1 L31 20 H22 V42 H31 L17 61 L3 42 H12 V20 H3 Z" fill="currentColor" />
    </svg>
  );
}

function Row({ children, kind, badge }: { children: React.ReactNode; kind?: "added" | "removed"; badge?: string }) {
  return (
    <div className={`fm-row${kind ? ` is-${kind}` : ""}`}>
      <div className="fm-row-inner">
        <div className="fm-cell">
          {children}
          {badge && <span className="fm-badge">{badge}</span>}
        </div>
      </div>
    </div>
  );
}

export default function FlowMorph() {
  const ref = useRef<HTMLDivElement>(null);
  const [after, setAfter] = useState(false);
  const [visible, setVisible] = useState(false);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !auto) return;
    const t = window.setTimeout(() => setAfter((v) => !v), after ? HOLD_AFTER : HOLD_BEFORE);
    return () => window.clearTimeout(t);
  }, [visible, auto, after]);

  const choose = (next: boolean) => {
    setAuto(false);
    setAfter(next);
  };

  return (
    <div ref={ref} className={`fm${after ? " is-after" : ""}`}>
      <div className="fm-stage" aria-live="polite">
        <div className="fm-block">
          <div className="fm-head">
            <span>Pre-Sales</span>
          </div>
          <Row>상품 정보 확인</Row>
          <Row kind="added" badge="추가">
            문의
          </Row>
        </div>

        <div className="fm-arrow">
          <Arrow />
        </div>

        <div className="fm-block">
          <div className="fm-head">
            <span className="fm-head-a">Sales</span>
            <span className="fm-head-b">Console</span>
          </div>
          <Row>상품 옵션 선택</Row>
          <Row>결제 (신청)</Row>
          <Row kind="removed">결제/계정/문의관리</Row>
          <Row kind="added" badge="이동">
            상품 이용
          </Row>
          <Row>추가 구매</Row>
        </div>

        <div className="fm-fold">
          <div className="fm-fold-inner">
            <div className="fm-arrow">
              <Arrow />
            </div>
            <div className="fm-block fm-block-post">
              <div className="fm-head">
                <span>Post-Sales</span>
              </div>
              <div className="fm-cell fm-cell-solo">상품 이용</div>
            </div>
          </div>
        </div>
      </div>

      <div className="fm-side">
        <div className="fm-toggle" role="group" aria-label="플로우 비교">
          <button type="button" className={!after ? "is-on" : ""} aria-pressed={!after} onClick={() => choose(false)}>
            Before
          </button>
          <button type="button" className={after ? "is-on" : ""} aria-pressed={after} onClick={() => choose(true)}>
            After
          </button>
        </div>
        <div className="fm-count" aria-hidden="true">
          <span className="fm-count-num">
            <b className="fm-count-a">3</b>
            <b className="fm-count-b">2</b>
          </span>
          <span className="fm-count-unit">단계</span>
        </div>
      </div>
    </div>
  );
}
