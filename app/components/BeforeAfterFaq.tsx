"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Bubble = { q?: string; a: string };
type Pair = {
  before: Bubble;
  after: Bubble;
  emphasis: string;
  notes: string[];
  redPhrase?: string;
  format?: (text: string) => string; // where the After text breaks into lines
};
type Model = { intro: string; principle: string; pairs: Pair[] };
type Kind = "clear" | "approachable" | "focus";

const BODY_RE = /^([\s\S]*?) As-is : "([\s\S]*?)" To-be : "([\s\S]*?)" ([\s\S]*)$/;

function splitBody(body: string) {
  const m = BODY_RE.exec(body);
  if (!m) return null;
  return {
    intro: m[1],
    asIs: m[2],
    toBe: m[3],
    notes: (m[4].match(/[^.]+\./g) ?? [m[4]]).map((n) => n.trim()),
  };
}

function splitChat(raw: string): Bubble | null {
  const at = raw.indexOf(" / A. ");
  if (at === -1) return null;
  return { q: raw.slice(0, at), a: raw.slice(at + 3) };
}

// Solution 1 — one Q/A pair, highlight on the "단, ..." sentence
function parseClear(body: string): Model | null {
  const s = splitBody(body);
  if (!s) return null;
  const before = splitChat(s.asIs);
  const after = splitChat(s.toBe);
  const start = after?.a.indexOf("단, ") ?? -1;
  if (!before || !after || start === -1) return null;
  return {
    intro: s.intro,
    principle: "Clear and Intuitive",
    pairs: [{ before, after, emphasis: after.a.slice(start), notes: s.notes }],
  };
}

// Solution 2 — two answer-only pairs; the three notes are split across them in source order
function parseApproachable(body: string): Model | null {
  const s = splitBody(body);
  if (!s) return null;
  const beforeA = s.asIs.split(" / ").filter((t) => t.startsWith("A. "));
  const afterA = s.toBe.split(" / ");
  const priceEnd = afterA[0]?.indexOf("부과돼요.") ?? -1;
  const limitEmphasis = "* 현지 환율에 따라 한도는 변경될 수 있어요";
  const redPhrase = "현지 파트너사의 환율에 따라";
  if (
    beforeA.length !== 2 ||
    afterA.length !== 2 ||
    s.notes.length !== 3 ||
    priceEnd === -1 ||
    !afterA[1].includes(limitEmphasis) ||
    !beforeA[1].includes(redPhrase)
  ) {
    return null;
  }
  return {
    intro: s.intro,
    principle: "Approachable",
    pairs: [
      {
        before: { a: beforeA[0] },
        after: { a: afterA[0] },
        emphasis: afterA[0].slice(0, priceEnd + "부과돼요.".length),
        notes: [s.notes[0], s.notes[2]],
        format: breakLines,
      },
      {
        before: { a: beforeA[1] },
        after: { a: afterA[1] },
        emphasis: limitEmphasis,
        notes: [s.notes[1]],
        redPhrase,
        format: breakLines,
      },
    ],
  };
}

// Solution 3 — two answer-only pairs; one note per pair
function parseFocus(body: string): Model | null {
  const s = splitBody(body);
  if (!s) return null;
  const answers = (t: string) => t.split(" / ").filter((x) => x.startsWith("A. "));
  const beforeA = answers(s.asIs);
  const afterA = answers(s.toBe);
  const receiptEmphasis = "국세청 소득공제 대상 결제 유형이 아니기 때문이에요. 대신, 결제 영수증은 앱에서 직접 확인할 수 있어요.";
  const contactEmphasis = "* 카카오톡 : https://pf.kakao.com/_dxoixbxj * 이메일 : cs@glninternational.com";
  const redPhrase = "카카오톡/이메일 문의를 통해 GLN에 문의해주시면 저희가 도와드릴게요.";
  if (
    beforeA.length !== 2 ||
    afterA.length !== 2 ||
    s.notes.length !== 2 ||
    !afterA[0].includes(receiptEmphasis) ||
    !afterA[1].includes(contactEmphasis) ||
    !beforeA[1].includes(redPhrase)
  ) {
    return null;
  }
  return {
    intro: s.intro,
    principle: "Focus on Solutions",
    pairs: [
      {
        before: { a: beforeA[0] },
        after: { a: afterA[0] },
        emphasis: receiptEmphasis,
        notes: [s.notes[0]],
        format: receiptBreaks,
      },
      {
        before: { a: beforeA[1] },
        after: { a: afterA[1] },
        emphasis: contactEmphasis,
        notes: [s.notes[1]],
        redPhrase,
        format: breakLines,
      },
    ],
  };
}

// Line breaks are kept exactly where the sentences/bullets end.
function breakLines(text: string) {
  return text
    .replace(/\s*\(중략\)\s*/g, "\n(중략)\n")
    .replace(/\.\s+/g, ".\n")
    .replace(/\s+\* /g, "\n* ")
    .trim();
}

// Receipt answer: blank lines between the reason, the alternative and the path; the path's ":" starts its own line.
function receiptBreaks(text: string) {
  return breakLines(text)
    .replace(/\.\n(대신,)/, ".\n\n$1")
    .replace(/\.\n(영수증 확인 경로)/, ".\n\n$1")
    .replace(/(영수증 확인 경로) : /, "$1\n: ");
}

// "Q. text" -> bold marker + text (the visible characters stay identical to the source)
function Line({ text, mark, markClass }: { text: string; mark?: string; markClass?: string }) {
  const m = /^([QA]\.) ([\s\S]*)$/.exec(text);
  const rest = m ? m[2] : text;
  const at = mark ? rest.indexOf(mark) : -1;
  return (
    <>
      {m && (
        <>
          <b className="ba-qa">{m[1]}</b>{" "}
        </>
      )}
      {at === -1 ? (
        rest
      ) : (
        <>
          {rest.slice(0, at)}
          <span className={markClass}>{mark}</span>
          {rest.slice(at + (mark?.length ?? 0))}
        </>
      )}
    </>
  );
}

function AnswerAfter({
  text,
  emphasis,
  active,
  hlRef,
  format,
}: {
  text: string;
  emphasis: string;
  active: boolean;
  hlRef: React.RefObject<HTMLSpanElement | null>;
  format: (text: string) => string;
}) {
  // The "A." marker is split off first so line-break rules never mistake it for a sentence end.
  const pm = /^([QA]\.) ([\s\S]*)$/.exec(text);
  const shown = format(pm ? pm[2] : text);
  const emph = format(emphasis);
  const at = shown.indexOf(emph);
  return (
    <>
      {pm && (
        <>
          <b className="ba-qa">{pm[1]}</b>{" "}
        </>
      )}
      {at === -1 ? (
        shown
      ) : (
        <>
          {shown.slice(0, at)}
          <span ref={hlRef} className={`scroll-highlight${active ? " is-active" : ""}`}>
            {emph}
          </span>
          {shown.slice(at + emph.length)}
        </>
      )}
    </>
  );
}

type Rail = { x: number; y1: number; y2: number; noteLeft: number };

function PairView({
  pair,
  index,
  total,
  principle,
  current,
  showAfter,
  showNote,
}: {
  pair: Pair;
  index: number;
  total: number;
  principle: string;
  current: boolean;
  showAfter: boolean;
  showNote: boolean;
}) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const hlRef = useRef<HTMLSpanElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const [rail, setRail] = useState<Rail | null>(null);

  // Dotted rail: starts beside the highlighted line, runs down the bubble's left gutter to the note.
  const measure = useCallback(() => {
    const bubble = bubbleRef.current;
    const hl = hlRef.current;
    const note = noteRef.current;
    if (!bubble || !hl || !note) return;
    const lineH = parseFloat(getComputedStyle(bubble).lineHeight) || 24;
    const next: Rail = {
      x: bubble.offsetLeft + 9,
      y1: bubble.offsetTop + hl.offsetTop + lineH / 2,
      y2: note.offsetTop + 9,
      noteLeft: bubble.offsetLeft,
    };
    setRail((prev) =>
      prev && prev.x === next.x && prev.y1 === next.y1 && prev.y2 === next.y2 && prev.noteLeft === next.noteLeft
        ? prev
        : next
    );
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble) return;
    const ro = new ResizeObserver(measure);
    ro.observe(bubble);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Bold highlight reflows the bubble while it transitions; measure again once it settles.
  useEffect(() => {
    if (!showNote) return;
    measure();
    const t = window.setTimeout(measure, 700);
    return () => window.clearTimeout(t);
  }, [showNote, measure]);

  const cls = `ba-pair${current ? " is-current" : ""}${showAfter ? " is-after" : ""}${showNote ? " is-note" : ""}`;

  return (
    <div className={cls} aria-hidden={!current}>
      <div className="ba-tags" aria-hidden="true">
        <span className="ba-tag-swap">
          <span className="ba-tag ba-tag-before">Before</span>
          <span className="ba-tag ba-tag-after">After</span>
        </span>
        {total > 1 && (
          <span className="ba-count">
            {index + 1} / {total}
          </span>
        )}
      </div>

      <div className="ba-chat">
        {pair.before.q && pair.after.q && (
          <div className="ba-slot ba-slot-q">
            <div className="ba-bubble ba-bubble-q ba-before" aria-hidden={showAfter}>
              <Line text={pair.before.q} />
            </div>
            <div className="ba-bubble ba-bubble-q ba-after" aria-hidden={!showAfter}>
              <Line text={pair.after.q} />
            </div>
          </div>
        )}

        <div className="ba-slot ba-slot-a">
          <div className="ba-bubble ba-bubble-a ba-before" aria-hidden={showAfter}>
            <Line text={pair.before.a} mark={pair.redPhrase} markClass="ba-red" />
          </div>
          <div ref={bubbleRef} className="ba-bubble ba-bubble-a ba-after" aria-hidden={!showAfter}>
            <AnswerAfter
              text={pair.after.a}
              emphasis={pair.emphasis}
              active={showNote}
              hlRef={hlRef}
              format={pair.format ?? identity}
            />
          </div>
        </div>
      </div>

      {rail && (
        <i className="ba-rail" aria-hidden="true" style={{ left: rail.x, top: rail.y1, height: Math.max(0, rail.y2 - rail.y1) }} />
      )}

      <div ref={noteRef} className="ba-note" aria-hidden={!showNote} style={{ marginLeft: rail?.noteLeft }}>
        <span className="ba-note-tag">{principle}</span>
        <ul>
          {pair.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const identity = (t: string) => t;

// Each pair gets an equal share of the pinned scroll; thresholds are fractions of that share.
const PHASE_AFTER = 0.28;
const PHASE_NOTE = 0.62;

export default function BeforeAfterFaq({ body, kind }: { body: string; kind: Kind }) {
  const model = kind === "clear" ? parseClear(body) : kind === "approachable" ? parseApproachable(body) : parseFocus(body);
  const count = model?.pairs.length ?? 1;
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  // -1: nothing is pinned, show every pair in its finished state. Otherwise pairIndex * 3 + phase (0 before, 1 after, 2 note).
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const stageEl = stageRef.current;
    if (!track || !stageEl) return;

    let raf = 0;
    const toStage = (p: number) => {
      const clamped = Math.min(1, Math.max(0, p));
      const seg = Math.min(count - 1, Math.floor(clamped * count));
      const local = clamped * count - seg;
      setStage(seg * 3 + (local < PHASE_AFTER ? 0 : local < PHASE_NOTE ? 1 : 2));
    };
    const update = () => {
      raf = 0;
      // Wide + tall viewports pin the whole section (label, heading, text stay put while the bubbles change);
      // otherwise only the stage is pinned; very short viewports pin nothing.
      const section = track.closest<HTMLElement>(".case-section");
      const wrap = track.closest<HTMLElement>(".case-section > div");
      if (getComputedStyle(stageEl).position === "sticky") {
        const rect = track.getBoundingClientRect();
        const stickyTop = parseFloat(getComputedStyle(stageEl).top) || 0;
        const range = rect.height - stageEl.offsetHeight;
        if (range <= 0) return setStage(-1);
        toStage((stickyTop - rect.top) / range);
      } else if (section && wrap && getComputedStyle(wrap).position === "sticky") {
        const sc = getComputedStyle(section);
        const rect = section.getBoundingClientRect();
        const padTop = parseFloat(sc.paddingTop) || 0;
        const padBottom = parseFloat(sc.paddingBottom) || 0;
        const stickyTop = parseFloat(getComputedStyle(wrap).top) || 0;
        const range = rect.height - padTop - padBottom - wrap.offsetHeight;
        if (range <= 0) return setStage(-1);
        toStage((stickyTop - (rect.top + padTop)) / range);
      } else {
        setStage(-1);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count]);

  if (!model) return <p>{body}</p>;

  const all = stage < 0;
  const seg = Math.floor(stage / 3);
  const phase = stage % 3;

  return (
    <>
      <p>{model.intro}</p>
      <div ref={trackRef} className="ba-track">
        <div ref={stageRef} className="ba-stage">
          <div className="ba-pairs">
            {model.pairs.map((pair, i) => (
              <PairView
                key={i}
                pair={pair}
                index={i}
                total={count}
                principle={model.principle}
                current={all || i === seg}
                showAfter={all || (i === seg && phase >= 1)}
                showNote={all || (i === seg && phase >= 2)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
