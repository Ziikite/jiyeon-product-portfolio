"use client";

import { useState } from "react";

type Slice = {
  label: string;
  value: number;
  color: string;
  exploded?: boolean;
};

const DATA: Slice[] = [
  { label: "기타", value: 44.7, color: "#7000FC", exploded: true },
  { label: "오류/장애", value: 18.4, color: "#c7bdea" },
  { label: "결제/납부", value: 15.4, color: "#d6cef0" },
  { label: "회원/계정", value: 6.3, color: "#e3ddf5" },
  { label: "수수료", value: 4.8, color: "#ece8fa" },
  { label: "그 외", value: 10.4, color: "#f4f1fc" },
];

const SIZE = 320;
const CX = SIZE / 2;
const CY = SIZE / 2;
const BASE_R = 96;
const EXPLODE_R = 138;
const EXPLODE_OFFSET = 10;

function arcPoint(r: number, angleDeg: number, cx: number, cy: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function slicePath(r: number, startAngle: number, endAngle: number, cx: number, cy: number) {
  const p1 = arcPoint(r, startAngle, cx, cy);
  const p2 = arcPoint(r, endAngle, cx, cy);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx},${cy} L ${p1.x},${p1.y} A ${r},${r} 0 ${largeArc} 1 ${p2.x},${p2.y} Z`;
}

export default function InquiryPieChart() {
  const [hover, setHover] = useState<{ label: string; value: number; x: number; y: number } | null>(null);

  let angle = 0;
  const slices = DATA.map((d) => {
    const start = angle;
    const sweep = (d.value / 100) * 360;
    const end = start + sweep;
    angle = end;
    return { ...d, start, end, mid: start + sweep / 2 };
  });

  const exploded = slices.find((s) => s.exploded);
  const explodedCenter = exploded
    ? (() => {
        const rad = ((exploded.mid - 90) * Math.PI) / 180;
        return { x: CX + Math.cos(rad) * EXPLODE_OFFSET, y: CY + Math.sin(rad) * EXPLODE_OFFSET };
      })()
    : { x: CX, y: CY };

  return (
    <div className="inquiry-chart-wrap">
    <div className="inquiry-chart" onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE}>
        {slices.map((s) => {
          const r = s.exploded ? EXPLODE_R : BASE_R;
          const cx = s.exploded ? explodedCenter.x : CX;
          const cy = s.exploded ? explodedCenter.y : CY;
          const d = slicePath(r, s.start, s.end, cx, cy);
          const isHovered = hover?.label === s.label;
          return (
            <path
              key={s.label}
              d={d}
              fill={s.color}
              opacity={!s.exploded && hover && !isHovered ? 0.7 : 1}
              style={{ cursor: s.exploded ? "default" : "pointer", transition: "opacity .15s ease" }}
              onMouseMove={(e) => {
                if (s.exploded) return;
                const rect = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
                setHover({ label: s.label, value: s.value, x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => {
                if (!s.exploded) setHover(null);
              }}
            />
          );
        })}

        {exploded && (
          <g>
            <text
              x={explodedCenter.x + Math.cos(((exploded.mid - 90) * Math.PI) / 180) * (EXPLODE_R * 0.52)}
              y={explodedCenter.y + Math.sin(((exploded.mid - 90) * Math.PI) / 180) * (EXPLODE_R * 0.52) - 6}
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill="#fff"
            >
              기타
            </text>
            <text
              x={explodedCenter.x + Math.cos(((exploded.mid - 90) * Math.PI) / 180) * (EXPLODE_R * 0.52)}
              y={explodedCenter.y + Math.sin(((exploded.mid - 90) * Math.PI) / 180) * (EXPLODE_R * 0.52) + 16}
              textAnchor="middle"
              fontSize="22"
              fontWeight="800"
              fill="#fff"
            >
              44.7%
            </text>
          </g>
        )}
      </svg>

      {hover && (
        <div className="inquiry-toast" style={{ left: hover.x, top: hover.y }}>
          {hover.label} · {hover.value}%
        </div>
      )}
    </div>

    <div className="inquiry-link-arrow" aria-hidden="true">
      <svg width="28" height="34" viewBox="0 0 28 34">
        <defs>
          <linearGradient id="inquiry-arrow-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7000FC" stopOpacity="0" />
            <stop offset="100%" stopColor="#7000FC" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M14 0 V20 M5 12 L14 22 L23 12"
          stroke="url(#inquiry-arrow-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>

    <div className="inquiry-wordcloud">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="inquiry-wordcloud-image"
        src="/projects/detail/gln-faq-wordcloud-1.png"
        alt="기타 44.7%에 해당하는 문의 키워드"
      />
      <p className="inquiry-wordcloud-caption">기타 44.7%에 해당하는 문의 키워드</p>
    </div>
    </div>
  );
}
