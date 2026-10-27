"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/app/lib/i18n";

type Tab = "after" | "before";
type Region = "top" | "related" | "banner";

// Both screens are 390px wide; heights are in the same units as the hotspot coordinates below.
const SCREENS = {
  after: { src: "/projects/detail/gln-faq-af-1.svg", w: 390, h: 1044 },
  before: { src: "/projects/detail/gln-faq-bf-1.svg", w: 390, h: 844 },
};

// Area of the improved screen each note talks about (top/height), and where to scroll to bring it into view.
const REGIONS: Record<Region, { top: number; height: number; scrollTo: number }> = {
  top: { top: 118, height: 208, scrollTo: 0 },
  related: { top: 640, height: 226, scrollTo: 520 },
  banner: { top: 884, height: 108, scrollTo: 10000 },
};

const REGION_ORDER: Region[] = ["top", "related", "banner"];

// Tappable areas of the improved screen (390 x 1044 space). The prototype only simulates the response.
const HOTSPOTS = [
  { id: "chip-top", x: 30, y: 185, w: 64, h: 26 },
  { id: "chip-pay", x: 101, y: 185, w: 48, h: 26 },
  { id: "rel-1", x: 20, y: 689, w: 350, h: 64 },
  { id: "rel-2", x: 20, y: 764, w: 350, h: 88 },
  { id: "kakao", x: 20, y: 892, w: 350, h: 92 },
];

type Copy = {
  screens: Record<Tab, string>;
  notes: Record<Region, { title: string; items: string[] }>;
  hotspots: Record<string, { label: string; toast: string }>;
  tabs: string;
  prototype: (screen: string) => string;
  hint: string;
  steps: string;
  empty: string;
};

const COPY: Record<Locale, Copy> = {
  ko: {
    screens: { after: "개선 화면", before: "이전 화면" },
    notes: {
      top: {
        title: "‘1답변 1페이지’ 방식",
        items: [
          "질문 선택 → 개별 답변 페이지 이동",
          "핵심 정보만 구조화하여 배치 → 읽기 부담 감소",
          "정보 탐색 효율 개선",
          "‘내 상황에 맞는 답’을 빠르게 인지",
        ],
      },
      related: {
        title: "연관 질문 + 퀵링크 제공",
        items: [
          "각 답변 하단에 연관 질문 리스트 제공",
          "카카오톡 문의 바로 연결 퀵링크 제공",
          "복잡한 케이스는 즉시 상담으로 전환 가능",
          "사용자 셀프 해결 가능성 확대",
          "불필요한 재검색 감소",
          "CS 연결까지의 마찰 감소",
        ],
      },
      banner: {
        title: "카톡 문의하기 배너 추가",
        items: ["FAQ로 해결되지 않는 경우 즉시 상담 연결이 가능하도록 카카오톡 문의 배너 추가"],
      },
    },
    hotspots: {
      "chip-top": { label: "Top 10", toast: "‘Top 10’ 카테고리 질문으로 이동해요" },
      "chip-pay": { label: "결제", toast: "‘결제’ 카테고리 질문으로 이동해요" },
      "rel-1": { label: "결제 취소나 환불은 어떻게 하나요?", toast: "연관 질문 답변 페이지로 이동해요" },
      "rel-2": { label: "현금 영수증이나 선불전자영수증 발급이 가능한가요?", toast: "연관 질문 답변 페이지로 이동해요" },
      kakao: { label: "카카오톡 문의하기", toast: "카카오톡 문의 채널로 연결돼요" },
    },
    tabs: "화면 비교",
    prototype: (screen) => `${screen} 프로토타입`,
    hint: "화면을 스크롤하고 눌러 보세요",
    steps: "설명 위치로 이동",
    empty: "‘개선 화면’ 탭에서 스크롤에 따라 달라지는 설명을 확인할 수 있어요.",
  },
  en: {
    screens: { after: "Improved", before: "Before" },
    notes: {
      top: {
        title: "‘One answer, one page’",
        items: [
          "Pick a question → go to its own answer page",
          "Only key information, structured → lighter to read",
          "More efficient information search",
          "Quickly spot ‘the answer for my situation’",
        ],
      },
      related: {
        title: "Related questions + quick links",
        items: [
          "A list of related questions under each answer",
          "A quick link straight to KakaoTalk support",
          "Complex cases can switch to a live agent right away",
          "More room for users to solve issues themselves",
          "Fewer unnecessary repeat searches",
          "Less friction on the way to CS",
        ],
      },
      banner: {
        title: "KakaoTalk inquiry banner",
        items: ["Added a KakaoTalk inquiry banner so users can reach an agent right away when the FAQ doesn't solve their issue"],
      },
    },
    hotspots: {
      "chip-top": { label: "Top 10", toast: "Opens questions in the ‘Top 10’ category" },
      "chip-pay": { label: "Payment", toast: "Opens questions in the ‘Payment’ category" },
      "rel-1": { label: "How do I cancel a payment or get a refund?", toast: "Opens the related question's answer page" },
      "rel-2": { label: "Can I get a cash receipt or a prepaid e-receipt?", toast: "Opens the related question's answer page" },
      kakao: { label: "Contact us on KakaoTalk", toast: "Connects you to the KakaoTalk support channel" },
    },
    tabs: "Compare screens",
    prototype: (screen) => `${screen} screen prototype`,
    hint: "Scroll and tap the screen",
    steps: "Jump to each note",
    empty: "Switch to the ‘Improved’ tab to see notes that change as you scroll.",
  },
};

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

export default function LessonPrototype({ locale = "ko" }: { locale?: Locale }) {
  const t = COPY[locale];
  const [tab, setTab] = useState<Tab>("after");
  const [region, setRegion] = useState<Region>("top");
  const [toast, setToast] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const afterScreen = SCREENS.after;

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || tab !== "after") return;
    const scale = el.clientWidth / afterScreen.w;
    const viewBottom = (el.scrollTop + el.clientHeight) / scale;
    setRegion(viewBottom >= 1000 ? "banner" : viewBottom >= 700 ? "related" : "top");
  }, [tab, afterScreen.w]);

  const switchTab = (next: Tab) => {
    setTab(next);
    setRegion("top");
    setToast(null);
    scrollerRef.current?.scrollTo({ top: 0 });
  };

  const jumpTo = (target: Region) => {
    const el = scrollerRef.current;
    if (!el) return;
    const scale = el.clientWidth / afterScreen.w;
    el.scrollTo({ top: REGIONS[target].scrollTo * scale, behavior: "smooth" });
  };

  const tap = (text: string) => {
    setToast(text);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1800);
  };

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const screen = SCREENS[tab];
  const screenAlt = t.screens[tab];

  return (
    <div className="lp">
      <div className="lp-device">
        <div className="lp-tabs" role="tablist" aria-label={t.tabs}>
          {(["before", "after"] as Tab[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              className={`lp-tab${tab === key ? " is-on" : ""}`}
              onClick={() => switchTab(key)}
            >
              {t.screens[key]}
            </button>
          ))}
        </div>

        <div className={`lp-phone${tab === "before" ? " is-before" : ""}`}>
          <div className="lp-screen">
            <div ref={scrollerRef} className="lp-scroll" onScroll={onScroll} tabIndex={0} aria-label={t.prototype(screenAlt)}>
              <div className="lp-page">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="lp-img" src={screen.src} width={screen.w} height={screen.h} alt={screenAlt} draggable={false} />

                {tab === "after" && (
                  <>
                    {REGION_ORDER.map((key) => (
                      <i
                        key={key}
                        className={`lp-hl${region === key ? " is-on" : ""}`}
                        aria-hidden="true"
                        style={{ top: pct(REGIONS[key].top, afterScreen.h), height: pct(REGIONS[key].height, afterScreen.h) }}
                      />
                    ))}
                    {HOTSPOTS.map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        className="lp-hot"
                        aria-label={t.hotspots[h.id].label}
                        onClick={() => tap(t.hotspots[h.id].toast)}
                        style={{
                          left: pct(h.x, afterScreen.w),
                          top: pct(h.y, afterScreen.h),
                          width: pct(h.w, afterScreen.w),
                          height: pct(h.h, afterScreen.h),
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className={`lp-toast${toast ? " is-on" : ""}`} role="status">
              {toast}
            </div>
          </div>
        </div>

        <p className="lp-hint" aria-hidden={tab !== "after"}>
          {tab === "after" ? t.hint : " "}
        </p>
      </div>

      <div className="lp-side">
        {tab === "after" ? (
          <>
            <div className="lp-notes" aria-live="polite">
              {REGION_ORDER.map((key) => (
                <div key={key} className={`lp-note${region === key ? " is-on" : ""}`} aria-hidden={region !== key}>
                  <span className="lp-note-title">{t.notes[key].title}</span>
                  <ul>
                    {t.notes[key].items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="lp-steps" role="group" aria-label={t.steps}>
              {REGION_ORDER.map((key, i) => (
                <button
                  key={key}
                  type="button"
                  className={`lp-step${region === key ? " is-on" : ""}`}
                  aria-label={t.notes[key].title}
                  aria-current={region === key}
                  onClick={() => jumpTo(key)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="lp-side-empty">{t.empty}</p>
        )}
      </div>
    </div>
  );
}
