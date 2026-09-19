"use client";

import { useId, useState } from "react";

export default function VocAccordion() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="voc-accordion">
      <button
        type="button"
        className="voc-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        실패 유형 VoC 보기
        <svg className="voc-chevron" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3.5 6 L8 10.5 L12.5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div id={panelId} className={`voc-panel${open ? " is-open" : ""}`} inert={!open}>
        <div className="voc-panel-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="voc-image"
            src="/projects/detail/gln-faq-wordcloud-2.png"
            alt="'실패' 유형 문의 키워드 워드클라우드"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
