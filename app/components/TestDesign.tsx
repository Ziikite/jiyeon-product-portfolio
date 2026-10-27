"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocale } from "@/app/lib/LocaleContext";

export const TEST_IMAGE_SIZE = { w: 1200, h: 800 }; // 3:2

type Variant = "a" | "b" | "c";
type Scenario = { key: string; variants: Variant[] };

// Columns of the A/B/C test matrix: which variants exist for each scenario.
const SCENARIOS: Scenario[] = [
  { key: "dest", variants: ["a", "b", "c"] },
  { key: "route", variants: ["a", "b"] },
  { key: "lane", variants: ["a", "b"] },
  { key: "air", variants: ["a", "b", "c"] },
  { key: "overlap", variants: ["a", "b"] },
  { key: "parking", variants: ["a", "b"] },
];
const PHASE_SPANS = [2, 3, 1];
const INTERVAL = 3600;

// 정보 중첩: transcribed verbatim from the user's reference mockups. Both variants start the same way — the agent's
// route-change announcement gets cut off by a question — then diverge in how the resumed announcement handles it.
// A (불가): resumes by restating the original line from the top, so the restated line visually overlaps/duplicates
// the cut-off one instead of answering the question. B (허용): the reply folds the answer in and continues cleanly.
type OverlapLine = { text: string; tone?: "ghost" | "pink" | "blue" | "bold" };
type OverlapTurn = { speaker: "user" | "agent"; lines: OverlapLine[] };

const COPY = {
  ko: {
    scenarios: {
      dest: "목적지 설정",
      route: "경로 브리핑",
      lane: "차선 변경",
      air: "공기 청정",
      overlap: "정보 중첩",
      parking: "주차장 변경",
    } as Record<string, string>,
    phases: ["출발 단계", "주행 중", "도착"],
    variant: (v: Variant) => `${v.toUpperCase()}안`,
    tabsLabel: "테스트 시나리오",
    parkingScreen: "주차장 변경 화면",
    screen: "화면",
    // One line under every card explaining what that variant tested.
    captions: {
      "dest-a": "번호로 설정",
      "dest-b": "목적지 명으로 설정",
      "dest-c": "최근 목적지 강조",
      "route-a": "설정한 경로의 주요 특징, 소요 시간, 교통 상황 등 간단하게 안내",
      "route-b": "상세 브리핑 및 추가적으로 주유정보(잔여/소모량, 주유시기 등) 추가 안내",
      "lane-a": "요약된 정보만 제공",
      "lane-b": "상황 맥락을 포함한 정보 제공",
      "air-a": "음성 없이 텍스트로만 안내",
      "air-b": "음성으로만 제공",
      "air-c": "음성 및 그래픽 동시 제공",
      "overlap-a": "정보중첩 불가",
      "overlap-b": "정보중첩 허용",
      "parking-a": "경로변경 이유 간단 설명",
      "parking-b": "경로변경 이유 상세 설명",
    } as Record<string, string>,
    // 경로 브리핑: the variant is a voice script, not a screen — show the full text itself (verbatim from the Solution 1 guideline scripts) instead of a cropped UI screenshot.
    routeText: {
      a: "경로를 브리핑해 드리겠습니다. 현 위치에서 목적지 한국GM까지는 총 4km로, 21분 소요로 예상됩니다. 모든 구간 교통량은 현재 원활합니다. 안전한 운전 되십시오.",
      b: "경로를 브리핑해 드리겠습니다. 목적지 하이원리조트까지는 총 209km로 2시간 27분 예상됩니다. (중략) 현재 주유가 필요한 상태이며 ‘용인 휴게소’에서 주유하시는 것을 추천드립니다. 용인휴게소를 경유지로 설정해드릴까요?",
    } as Record<string, string>,
    // Same phrases Solution 1's own guideline script highlights (app/components/RouteBriefing.tsx).
    routeHighlights: ["현재 주유가 필요한 상태", "경유지로 설정해드릴까요?", "총 4km로, 21분 소요"],
    overlapTurns: {
      a: [
        { speaker: "agent", lines: [{ text: "주행 경로를 변경합니다. 기존 주행 경로에..." }] },
        { speaker: "user", lines: [{ text: "오늘 오후에 비 와?" }] },
        {
          speaker: "agent",
          lines: [
            { text: "주행 경로를 변경합니다. 기존 주행 경로에...", tone: "ghost" },
            { text: "주행 경로를 변경합니다. 기존 주행 경로에서", tone: "pink" },
            { text: "300미터 앞 좌회전입니다.", tone: "blue" },
          ],
        },
      ],
      b: [
        { speaker: "agent", lines: [{ text: "주행 경로를 변경합니다. 기존 주행 경로에..." }] },
        { speaker: "user", lines: [{ text: "오늘 오후에 비 와?" }] },
        {
          speaker: "agent",
          lines: [
            { text: "60%로 비 예보가 있습니다.", tone: "blue" },
            { text: "기존 주행 경로에서 300미터 앞 좌회전입니다.", tone: "bold" },
          ],
        },
      ],
    } as Record<string, OverlapTurn[]>,
    // 주차장 변경: the real in-car screen (gm-voice-ux-test-parking-a/b) plus the voice line read over it.
    parkingBubble: {
      a: "현재 지하주차장이 가득 찼습니다. 지상 주차장으로 경로를 변경할까요?",
      b: "현재 지하주차장이 가득 찼습니다. 지상 주차장으로 이동하시면 원래 목적지보다 약 6분 더 소요됩니다. 지상주차장으로 경로를 변경할까요?",
    } as Record<string, string>,
    parkingHighlight: {
      a: "현재 지하주차장이 가득 찼습니다. 지상 주차장으로 경로를",
      b: "지상 주차장으로 이동하시면 원래 목적지보다 약 6분 더 소요됩니다. 지상주차장으로 경로를",
    } as Record<string, string>,
  },
  en: {
    scenarios: {
      dest: "Destination",
      route: "Route briefing",
      lane: "Lane change",
      air: "Air purifier",
      overlap: "Info overlap",
      parking: "Parking change",
    } as Record<string, string>,
    phases: ["Departure", "Driving", "Arrival"],
    variant: (v: Variant) => `Option ${v.toUpperCase()}`,
    tabsLabel: "Test scenarios",
    parkingScreen: "Parking change screen",
    screen: "screen",
    captions: {
      "dest-a": "Set by number",
      "dest-b": "Set by destination name",
      "dest-c": "Recent destinations emphasized",
      "route-a": "Brief overview of the route’s key features, travel time, and traffic",
      "route-b": "Detailed briefing plus fuel information (fuel left, consumption, when to refuel)",
      "lane-a": "Summary information only",
      "lane-b": "Information with situational context",
      "air-a": "Text only, no voice",
      "air-b": "Voice only",
      "air-c": "Voice and graphics together",
      "overlap-a": "Overlap not allowed",
      "overlap-b": "Overlap allowed",
      "parking-a": "Brief reason for the reroute",
      "parking-b": "Detailed reason for the reroute",
    } as Record<string, string>,
    // Same scripts as Solution 1 in the English project data (app/lib/en/gm-voice-ux.ts).
    routeText: {
      a: "Here’s your route briefing. GM Korea is 4 km from your current location, about 21 minutes. Traffic is light the whole way. Drive safely.",
      b: "Here’s your route briefing. High1 Resort is 209 km away, about 2 hours 27 minutes. (…) You’re low on fuel, so I recommend refueling at ‘Yongin Rest Area.’ Would you like me to add Yongin Rest Area as a stop?",
    } as Record<string, string>,
    routeHighlights: ["You’re low on fuel", "add Yongin Rest Area as a stop?", "4 km from your current location, about 21 minutes"],
    overlapTurns: {
      a: [
        { speaker: "agent", lines: [{ text: "Changing your route. On your current route..." }] },
        { speaker: "user", lines: [{ text: "Will it rain this afternoon?" }] },
        {
          speaker: "agent",
          lines: [
            { text: "Changing your route. On your current route...", tone: "ghost" },
            { text: "Changing your route. On your current route,", tone: "pink" },
            { text: "turn left in 300 meters.", tone: "blue" },
          ],
        },
      ],
      b: [
        { speaker: "agent", lines: [{ text: "Changing your route. On your current route..." }] },
        { speaker: "user", lines: [{ text: "Will it rain this afternoon?" }] },
        {
          speaker: "agent",
          lines: [
            { text: "There’s a 60% chance of rain.", tone: "blue" },
            { text: "On your current route, turn left in 300 meters.", tone: "bold" },
          ],
        },
      ],
    } as Record<string, OverlapTurn[]>,
    parkingBubble: {
      a: "The underground parking lot is full. Should I reroute you to the outdoor lot?",
      b: "The underground parking lot is full. Going to the outdoor lot will take about 6 minutes longer than your original destination. Should I reroute you to the outdoor lot?",
    } as Record<string, string>,
    parkingHighlight: {
      a: "The underground parking lot is full. Should I reroute you",
      b: "Going to the outdoor lot will take about 6 minutes longer than your original destination. Should I reroute you",
    } as Record<string, string>,
  },
};
type Copy = (typeof COPY)["ko"];

function highlightText(text: string, highlights: string[]) {
  const parts: (string | { hl: string })[] = [];
  let rest = text;
  while (rest) {
    const hit = highlights
      .map((h) => ({ h, at: rest.indexOf(h) }))
      .filter((x) => x.at !== -1)
      .sort((a, b) => a.at - b.at)[0];
    if (!hit) {
      parts.push(rest);
      break;
    }
    if (hit.at > 0) parts.push(rest.slice(0, hit.at));
    parts.push({ hl: hit.h });
    rest = rest.slice(hit.at + hit.h.length);
  }
  return parts.map((p, i) =>
    typeof p === "string" ? (
      p
    ) : (
      <mark key={i} className="rb-mark">
        {p.hl}
      </mark>
    )
  );
}

function RouteText({ variant, t }: { variant: Variant; t: Copy }) {
  return (
    <div className="td-route">
      <span className="td-route-avatar" aria-hidden="true">
        🚗
      </span>
      <p className="td-route-bubble">{highlightText(t.routeText[variant], t.routeHighlights)}</p>
    </div>
  );
}

function OverlapText({ variant, t }: { variant: Variant; t: Copy }) {
  return (
    <div className="td-chat">
      {t.overlapTurns[variant].map((turn, i) => (
        <div key={i} className={`td-row td-row-${turn.speaker}`}>
          {turn.speaker === "user" && (
            <span className="td-row-avatar" aria-hidden="true">
              👤
            </span>
          )}
          <div className="td-row-bubble">
            {turn.lines.map((l, li) => (
              <p key={li} className={l.tone ? `td-line-${l.tone}` : undefined}>
                {l.text}
              </p>
            ))}
          </div>
          {turn.speaker === "agent" && (
            <span className="td-row-avatar" aria-hidden="true">
              🚗
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function ParkingCard({ variant, src, t }: { variant: Variant; src: string | null; t: Copy }) {
  return (
    <div className="td-parking">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="td-parking-img" src={src} alt={`${t.scenarios.parking} ${t.variant(variant)} ${t.screen}`} />
      ) : (
        <div className="td-placeholder td-parking-placeholder">
          <span className="td-placeholder-name">
            {t.parkingScreen} · {t.variant(variant)}
          </span>
        </div>
      )}
      <p className="td-route-bubble">{highlightText(t.parkingBubble[variant], [t.parkingHighlight[variant]])}</p>
    </div>
  );
}

// images[`${scenario}-${variant}`] is a public path when a screenshot with that name exists.
export default function TestDesign({ images }: { images: Record<string, string | null> }) {
  const t = COPY[useLocale()];
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Starts when the figure is in view and starts over every time it comes back.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOn(entry.isIntersecting);
        if (entry.isIntersecting) setActive(0);
      },
      { threshold: 0.4, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Steps through the scenarios by itself until the visitor hovers / focuses the figure.
  useEffect(() => {
    if (!on || hovering) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActive((a) => (a + 1) % SCENARIOS.length), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [on, hovering, active]);

  const scenario = SCENARIOS[active];
  const label = t.scenarios[scenario.key];
  const playing = on && !hovering;

  return (
    <div
      ref={ref}
      className={`td${on ? " is-on" : ""}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <div className="td-scroll">
        <div className="td-nav">
          <div className="td-phases">
            {t.phases.map((p, i) => (
              <span key={p} className="td-phase" style={{ gridColumn: `span ${PHASE_SPANS[i]}`, ["--i" as string]: i } as CSSProperties}>
                {p}
              </span>
            ))}
          </div>
          <div className="td-chips" role="tablist" aria-label={t.tabsLabel}>
            {SCENARIOS.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`td-chip${active === i ? " is-active" : ""}`}
                style={{ ["--i" as string]: i } as CSSProperties}
                onClick={() => setActive(i)}
              >
                {t.scenarios[s.key]}
                {active === i && playing && <i key={`${i}-${active}`} className="td-progress" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        key={scenario.key}
        className="td-panel"
        role="tabpanel"
        style={{ gridTemplateColumns: `repeat(${scenario.variants.length}, minmax(0, 1fr))` }}
      >
        {scenario.variants.map((v, i) => {
          const src = images[`${scenario.key}-${v}`];
          const isText = scenario.key === "route" || scenario.key === "overlap" || scenario.key === "parking";
          return (
            <div key={v} className="td-col" style={{ ["--i" as string]: i } as CSSProperties}>
              <span className="td-tag">{t.variant(v)}</span>
              <div className={`td-card${isText ? " td-card--text" : ""}`}>
                {scenario.key === "route" ? (
                  <RouteText variant={v} t={t} />
                ) : scenario.key === "overlap" ? (
                  <OverlapText variant={v} t={t} />
                ) : scenario.key === "parking" ? (
                  <ParkingCard variant={v} src={src} t={t} />
                ) : src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={`${label} ${t.variant(v)}`} />
                ) : (
                  <div className="td-placeholder">
                    <span className="td-placeholder-name">
                      {label} · {t.variant(v)}
                    </span>
                    <span className="td-placeholder-size">
                      {TEST_IMAGE_SIZE.w} × {TEST_IMAGE_SIZE.h}
                    </span>
                  </div>
                )}
              </div>
              {t.captions[`${scenario.key}-${v}`] && <p className="td-caption">{t.captions[`${scenario.key}-${v}`]}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
