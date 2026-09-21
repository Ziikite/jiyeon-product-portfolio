"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const W = 1400;
const H = 620;

type Kind = "start" | "diamond" | "mint" | "mint-dark" | "white";
type Node = { id: string; x: number; y: number; w: number; h: number; label: string; kind: Kind };

// Coordinates are in a fixed 1400x620 virtual canvas; both the HTML node boxes and the SVG connector
// lines below read off the same NODES table (as percentages of W/H) so they always line up.
const NODES: Node[] = [
  { id: "navStart", x: 40, y: 24, w: 190, h: 46, label: "내비게이션", kind: "start" },
  { id: "dCharge", x: 40, y: 128, w: 190, h: 60, label: "충전소 예약", kind: "diamond" },
  { id: "dFood", x: 270, y: 128, w: 190, h: 60, label: "먹거리 예약", kind: "diamond" },
  { id: "dCinema", x: 500, y: 128, w: 190, h: 60, label: "시네마 서비스 예약", kind: "diamond" },
  { id: "boxCart", x: 734, y: 136, w: 170, h: 44, label: "장바구니", kind: "mint" },
  { id: "boxOrder", x: 944, y: 136, w: 190, h: 44, label: "주문 내역 확인", kind: "mint-dark" },

  { id: "c1", x: 40, y: 220, w: 190, h: 42, label: "충전량 선택", kind: "mint" },
  { id: "c2", x: 40, y: 272, w: 190, h: 42, label: "충전 정보 안내", kind: "mint" },
  { id: "c3", x: 40, y: 324, w: 190, h: 42, label: "충전 구역 설정", kind: "mint" },

  { id: "f1", x: 270, y: 220, w: 190, h: 42, label: "메뉴 목록", kind: "mint" },

  { id: "s1", x: 500, y: 220, w: 190, h: 42, label: "스크린 선택", kind: "white" },
  { id: "s2", x: 500, y: 272, w: 190, h: 42, label: "사용시간 설정", kind: "white" },

  { id: "o1", x: 734, y: 210, w: 170, h: 42, label: "주문서 확인", kind: "white" },
  { id: "o2", x: 734, y: 262, w: 170, h: 42, label: "도착 시간 설정", kind: "white" },

  { id: "p1", x: 944, y: 210, w: 190, h: 42, label: "충전소", kind: "white" },
  { id: "p2", x: 944, y: 262, w: 190, h: 42, label: "시네마 서비스", kind: "white" },
  { id: "p3", x: 944, y: 314, w: 190, h: 42, label: "먹거리", kind: "white" },
  { id: "p4", x: 944, y: 366, w: 190, h: 42, label: "결제", kind: "white" },

  { id: "csStart", x: 1190, y: 24, w: 180, h: 46, label: "충전소 도착", kind: "start" },
  { id: "cs1", x: 1190, y: 96, w: 180, h: 40, label: "충전 구역 이동", kind: "white" },
  { id: "cs2", x: 1190, y: 146, w: 180, h: 40, label: "시네마 서비스 이용", kind: "white" },
  { id: "cs3", x: 1190, y: 196, w: 180, h: 40, label: "라운지 서비스 이용", kind: "white" },
];

const byId: Record<string, Node> = Object.fromEntries(NODES.map((n) => [n.id, n]));
const cx = (n: Node) => n.x + n.w / 2;
const top = (n: Node) => [cx(n), n.y] as const;
const bottom = (n: Node) => [cx(n), n.y + n.h] as const;
const left = (n: Node) => [n.x, n.y + n.h / 2] as const;
const right = (n: Node) => [n.x + n.w, n.y + n.h / 2] as const;

// [fromNode, toNode, fromSide, toSide] for straight edges; elbows are built explicitly below.
const STRAIGHT: [string, string][] = [
  ["navStart", "dCharge"],
  ["dCharge", "dFood"],
  ["dFood", "dCinema"],
  ["dCinema", "boxCart"],
  ["boxCart", "boxOrder"],
  ["boxOrder", "csStart"],
  ["dCharge", "c1"],
  ["c1", "c2"],
  ["c2", "c3"],
  ["dFood", "f1"],
  ["dCinema", "s1"],
  ["s1", "s2"],
  ["boxCart", "o1"],
  ["o1", "o2"],
  ["boxOrder", "p1"],
  ["p1", "p2"],
  ["p2", "p3"],
  ["p3", "p4"],
];

function straightPoints(fromId: string, toId: string) {
  const a = byId[fromId];
  const b = byId[toId];
  // vertical chain (b below a, same column) vs horizontal hop (b to the right, same row)
  if (Math.abs(cx(a) - cx(b)) < 4) return [bottom(a), top(b)];
  return [right(a), left(b)];
}

// A detail chain's last step feeds forward into the next stage's bottom edge, merging with the main path.
function elbowPoints(fromId: string, toId: string) {
  const a = byId[fromId];
  const b = byId[toId];
  const [sx, sy] = bottom(a);
  const midY = sy + 34;
  const [ex] = bottom(b);
  return [
    [sx, sy],
    [sx, midY],
    [ex, midY],
    [ex, b.y + b.h],
  ] as const;
}

const ELBOWS: [string, string][] = [
  ["c3", "boxCart"],
  ["o2", "boxOrder"],
  ["p4", "csStart"],
];

function toPath(points: readonly (readonly [number, number])[]) {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
}

function useInView<T extends HTMLElement>(threshold: number) {
  const ref = useRef<T | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold, rootMargin: "0px 0px -8% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, on] as const;
}

export default function StrategyFlow() {
  const [ref, on] = useInView<HTMLDivElement>(0.15);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div ref={ref} className={`sf${on ? " is-on" : ""}`}>
    <div className="sf-scroll">
    <div className="sf-inner" style={{ aspectRatio: `${W} / ${H}` }}>
      <div className="sf-lane sf-lane-nav" style={{ left: "1.1%", top: "0%", width: `${(1155 / W) * 100}%`, height: `${(430 / H) * 100}%` }}>
        <span>내비게이션</span>
      </div>
      <div className="sf-lane sf-lane-station" style={{ left: `${(1175 / W) * 100}%`, top: "0%", width: `${((W - 1175 - 20) / W) * 100}%`, height: `${(255 / H) * 100}%` }}>
        <span>충전소</span>
      </div>

      <svg className="sf-svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {STRAIGHT.map(([a, b], i) => (
          <path
            key={`${a}-${b}`}
            className={`sf-edge${hover === a || hover === b ? " is-active" : ""}`}
            d={toPath(straightPoints(a, b))}
            style={{ ["--i" as string]: i } as CSSProperties}
            markerEnd="url(#sf-arrow)"
          />
        ))}
        {ELBOWS.map(([a, b], i) => (
          <path
            key={`${a}-${b}`}
            className={`sf-edge sf-edge-elbow${hover === a || hover === b ? " is-active" : ""}`}
            d={toPath(elbowPoints(a, b))}
            style={{ ["--i" as string]: STRAIGHT.length + i } as CSSProperties}
            fill="none"
            markerEnd="url(#sf-arrow)"
          />
        ))}
        <defs>
          <marker id="sf-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#0d9e6f" />
          </marker>
        </defs>
      </svg>

      {NODES.map((n, i) => (
        <div
          key={n.id}
          className={`sf-node sf-node-${n.kind}${hover === n.id ? " is-hover" : ""}`}
          style={
            {
              left: `${(n.x / W) * 100}%`,
              top: `${(n.y / H) * 100}%`,
              width: `${(n.w / W) * 100}%`,
              height: `${(n.h / H) * 100}%`,
              ["--i" as string]: i,
            } as CSSProperties
          }
          tabIndex={0}
          onMouseEnter={() => setHover(n.id)}
          onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(n.id)}
          onBlur={() => setHover(null)}
        >
          {n.kind === "diamond" && <span className="sf-diamond-shape" aria-hidden="true" />}
          <span className="sf-node-label">
            {n.kind === "start" && (
              <svg className="sf-play" width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M1 0 L10 5 L1 10 Z" fill="#e5484d" />
              </svg>
            )}
            {n.label}
          </span>
        </div>
      ))}
    </div>
    </div>
    </div>
  );
}
