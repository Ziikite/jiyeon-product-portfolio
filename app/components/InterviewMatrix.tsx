import type { CSSProperties } from "react";

// Laid out on a 1000 x 900 grid and rendered as percentages so it fits the text column
// (~580px at its narrowest) while keeping 12px+ type. Card widths follow their text.
const W = 1000;
const H = 900;
const pctX = (v: number) => `${(v / W) * 100}%`;
const pctY = (v: number) => `${(v / H) * 100}%`;

type Card = { x: number; y: number; lines: string[]; anchor?: "right"; mid?: boolean };

// x is the left edge (or the right edge when anchor is "right"); y is the top edge (or the centre when mid is set).
const CARDS: Card[] = [
  { x: 150, y: 120, lines: ["돈의 행방이 불안해", "전화"] },
  { x: 150, y: 245, lines: ["수수료/출금 실패", "→ 확인/검증 문의 다수"] },
  { x: 150, y: 545, lines: ["송금 관련 전화 문의", "다수"] },
  { x: 270, y: 655, lines: ["빠른 해결을 원해", "카톡 문의"] },
  { x: 150, y: 765, lines: ["취소 후 알림 부재", "→ 추가 확인 문의"] },
  { x: 535, y: 125, lines: ["ATM: 자동으로 해결할", "수 있는 부분 다수 존재"] },
  { x: 850, y: 450, lines: ["앱을 좀 더 살펴보면", "해결될 수 있는 내용"], anchor: "right", mid: true },
  { x: 535, y: 610, lines: ["환급 버튼 찾기 힘들어", "환급 문의가 많음"] },
  { x: 850, y: 725, lines: ["이미 충분한 양의 FAQ"], anchor: "right" },
];

function box(x: number, y: number, w: number, h: number): CSSProperties {
  return { left: pctX(x), top: pctY(y), width: pctX(w), height: pctY(h) };
}

function cardBox(card: Card): CSSProperties {
  const edge = card.anchor === "right" ? { right: pctX(W - card.x) } : { left: pctX(card.x) };
  return { ...edge, top: pctY(card.y), transform: card.mid ? "translateY(-50%)" : undefined };
}

function AxisLabel({ x, y, w, h, lines, align, valign = "center" }: { x: number; y: number; w: number; h: number; lines: string[]; align: "center" | "left" | "right"; valign?: "flex-start" | "center" | "flex-end" }) {
  return (
    <div className="matrix-axis-label" style={{ ...box(x, y, w, h), textAlign: align, justifyContent: valign }}>
      {lines.map((line, i) => (
        <span key={i}>{line}</span>
      ))}
    </div>
  );
}

export default function InterviewMatrix() {
  return (
    <figure className="interview-matrix">
      <div className="matrix-scroll">
        <div className="matrix-canvas" style={{ aspectRatio: `${W} / ${H}` }}>
          <span className="matrix-line matrix-line-v" style={box(500, 80, 0, 740)} />
          <span className="matrix-line matrix-line-h" style={box(132, 450, 730, 0)} />

          <AxisLabel x={350} y={0} w={300} h={72} lines={["사용자 불확실성", "높음"]} align="center" valign="flex-end" />
          <AxisLabel x={350} y={828} w={300} h={72} lines={["사용자 불확실성", "낮음"]} align="center" valign="flex-start" />
          <AxisLabel x={0} y={385} w={130} h={130} lines={["사용자 주도적", "해결가능성", "낮음"]} align="left" />
          <AxisLabel x={872} y={385} w={125} h={130} lines={["사용자 주도적", "해결가능성", "높음"]} align="left" />

          <div className="matrix-region-title" style={box(515, 22, 347, 70)}>
            <span>FAQ 콘텐츠 개선으로</span>
            <span>해결 가능한 영역</span>
          </div>
          <div className="matrix-region" style={box(515, 100, 347, 715)} />

          {CARDS.map((card) => (
            <div key={card.lines.join()} className="matrix-card" style={cardBox(card)}>
              <span>
                {card.lines.map((line, i) => (
                  <span key={i} className="matrix-card-line">
                    {line}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="inquiry-wordcloud-caption">운영부 인터뷰 결과</figcaption>
    </figure>
  );
}
