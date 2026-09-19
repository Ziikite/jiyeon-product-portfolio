"use client";

import { useId, useState } from "react";

const BEFORE_CATEGORIES = ["전체", "결제", "출금", "계정/보안", "시스템", "기타"];
const AFTER_CATEGORIES = ["Top 10", "결제", "출금", "오류", "기타"];

const COLUMNS = ["No", "비중", "주요 키워드 요약", "해석된 문의 유형", "토픽 네이밍", "카테고리 개선"];

type Row = { no: number; share: string; keywords: string; type: string; name: string; category: string };

const ROWS: Row[] = [
  {
    no: 1,
    share: "15.86%",
    keywords: "결제, 환불, 실패, 라오스, 베트남, 페이, 이벤트, 코드, 태국, 네이버, 돼요, 시간, 점검, 취소, 일본",
    type: "결제 실패 및 환불 관련 문의",
    name: "결제오류/환불",
    category: "결제",
  },
  {
    no: 2,
    share: "13.95%",
    keywords: "기타, 가입, 계좌, 불가, 스캔, 인증, 자동, 등록, 번호, 신규, 토스, 탈퇴, 된다, 해외, 충전",
    type: "회원가입, 인증, 계정 등록 관련 문의",
    name: "가입/인증/계정",
    category: "기타",
  },
  {
    no: 3,
    share: "20.49%",
    keywords: "사용, 환급, 머니, 충전, 일본, 방법, 여부, 금액, 잔액, 카드, 해야, 은행, 설정, 대만, 토스",
    type: "충전/환급 및 서비스 사용 방법 문의",
    name: "충전/환급 사용법",
    category: "결제, 출금",
  },
  {
    no: 4,
    share: "21.49%",
    keywords: "기타, 환급, 오류, 머니, 한도, 내역, 베트남, 트래픽, 송금, 라오스, 거래, 방법, 세부, 이용, 서비스",
    type: "환급 처리, 거래 오류, 한도/내역 관련 문의",
    name: "환급/오류/내역",
    category: "결제, 출금",
  },
  {
    no: 5,
    share: "9.11%",
    keywords: "계좌, 수수료, 이벤트, 변경, 연결, 출금, 사용, 바트, 건가요, 환전, 통장, 외화, 오픈, 뱅킹, 원화",
    type: "계좌 연결, 수수료, 환전·출금 관련 문의",
    name: "수수료/계좌연결/출금",
    category: "결제, 출금",
  },
  {
    no: 6,
    share: "5.3%",
    keywords: "오류, 컬쳐, 내용, 답변, 캐시, 전환, 랜드, 필리핀, 화면, 시도, 에러, 등록, 다음, 가맹점, 발생",
    type: "제휴 캐시 전환 오류 및 콘텐츠 이용 오류 문의",
    name: "제휴캐시 오류",
    category: "기타",
  },
  {
    no: 7,
    share: "13.8%",
    keywords: "실패, 태국, 출금, 환율, 결제, 인식, 일본, 처리, 바트, 라오스, 현금, 버튼, 토스, 나왔, 진행",
    type: "해외 출금 실패, 환율·결제 처리 관련 문의",
    name: "해외출금/환율",
    category: "결제, 출금",
  },
];

// Bubble geometry measured from the original intertopic distance map (1000 x 1145 space).
const BUBBLES = [
  { no: 1, cx: 834.2, cy: 517.4, r: 105.3, ly: 524.0 },
  { no: 2, cx: 192.8, cy: 361.1, r: 98.3, ly: 367.3 },
  { no: 3, cx: 199.9, cy: 193.2, r: 107.0, ly: 199.8 },
  { no: 4, cx: 102.0, cy: 521.6, r: 102.0, ly: 528.2 },
  { no: 5, cx: 462.3, cy: 135.6, r: 84.2, ly: 141.8 },
  { no: 6, cx: 379.8, cy: 934.5, r: 71.3, ly: 941.1 },
  { no: 7, cx: 895.5, cy: 340.8, r: 93.7, ly: 347.4 },
];

// Marginal topic distribution legend: nested circles sharing their top point, with leader lines.
const LEGEND = [
  { label: "2%", r: 35.2, leaderY: 1044.5, labelY: 1044.8 },
  { label: "5%", r: 55.6, leaderY: 1085.5, labelY: 1085.4 },
  { label: "10%", r: 78.6, leaderY: 1131.4, labelY: 1131.0 },
];

function CategoryArrow() {
  const gradId = `tm-arrow-grad-${useId().replace(/:/g, "")}`;
  return (
    <span className="tm-arrow" aria-hidden="true">
      <svg width="28" height="34" viewBox="0 0 28 34">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7000FC" stopOpacity="0" />
            <stop offset="100%" stopColor="#7000FC" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M14 0 V20 M5 12 L14 22 L23 12"
          stroke={`url(#${gradId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  );
}

function TopicMap({ active, onHover }: { active: number | null; onHover: (no: number | null) => void }) {
  return (
    <svg className="tm-map-svg" viewBox="0 40 1000 1105" role="img" aria-label="intertopic distance map">
      {BUBBLES.map((b) => {
        const state = active === null ? "" : active === b.no ? " is-active" : " is-dim";
        return (
          <g
            key={b.no}
            className={`tm-bubble${state}`}
            tabIndex={0}
            aria-label={`토픽 ${b.no}`}
            onMouseEnter={() => onHover(b.no)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(b.no)}
            onBlur={() => onHover(null)}
          >
            <circle cx={b.cx} cy={b.cy} r={b.r} className="tm-bubble-shape" />
          </g>
        );
      })}

      <line x1="60" y1="535.2" x2="937" y2="535.2" className="tm-map-axis" />
      <line x1="498.8" y1="95" x2="498.8" y2="975" className="tm-map-axis" />
      <text x="61.4" y="525.7" fontSize="16" className="tm-map-pc">PC1</text>
      <text x="509.1" y="106.1" fontSize="16" className="tm-map-pc">PC2</text>

      {BUBBLES.map((b) => {
        const state = active === null ? "" : active === b.no ? " is-active" : " is-dim";
        return (
          <text key={b.no} x={b.cx} y={b.ly} textAnchor="middle" fontSize="18" className={`tm-bubble-no${state}`}>
            {b.no}
          </text>
        );
      })}

      <text x="77.9" y="956" fontSize="16" textLength="198" lengthAdjust="spacingAndGlyphs" className="tm-map-legend-title">
        Marginal topic distribution
      </text>
      {LEGEND.map((l) => {
        const cy = l.leaderY - l.r;
        return (
          <g key={l.label}>
            <circle cx="154.9" cy={cy} r={l.r} className="tm-map-legend-circle" />
            <line x1="154.9" y1={l.leaderY} x2="272" y2={l.leaderY} className="tm-map-leader" />
            <text x="290" y={l.labelY} fontSize="17" className="tm-map-legend-label">
              {l.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function TopicModeling() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="tm">
      <div className="tm-flow">
        <div className="tm-group">
          <span className="tm-group-label">기존 카테고리</span>
          <div className="tm-chips">
            {BEFORE_CATEGORIES.map((c) => (
              <span key={c} className="tm-chip">
                {c}
              </span>
            ))}
          </div>
        </div>
        <CategoryArrow />
        <div className="tm-group tm-group-after">
          <span className="tm-group-label">개선 카테고리</span>
          <div className="tm-chips">
            {AFTER_CATEGORIES.map((c) => (
              <span key={c} className="tm-chip">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="tm-table-wrap">
        <table className="tm-table">
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr
                key={r.no}
                className={active === r.no ? "is-active" : undefined}
                tabIndex={0}
                onMouseEnter={() => setActive(r.no)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(r.no)}
                onBlur={() => setActive(null)}
              >
                <td className="tm-no">{r.no}</td>
                <td className="tm-share">{r.share}</td>
                <td>{r.keywords}</td>
                <td>{r.type}</td>
                <td className="tm-name">{r.name}</td>
                <td>{r.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figure className="tm-map">
        <TopicMap active={active} onHover={setActive} />
        <figcaption className="inquiry-wordcloud-caption">intertopic distance map</figcaption>
      </figure>
    </div>
  );
}
