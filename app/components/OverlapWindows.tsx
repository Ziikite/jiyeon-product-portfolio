"use client";

import { useEffect, useRef, useState } from "react";

type Shot = { key: string; label: string; src: string | null };

// Window layout and arrow geometry share one 1440 x 912 space.
const W = 1440;
const H = 912;
const WINDOWS = [
  { x: 0, y: 12, w: 1010 },
  { x: 185, y: 178, w: 1002 },
  { x: 360, y: 345, w: 1007 },
];

// Arrow line traced from the reference artwork: an arc over the top, a corner, a long curve down, and a short branch with a head.
// One shared timeline (see .ow-p1..3 keyframes): stroke 1 draws, stroke 2 starts where it ends, the branch starts where it leaves stroke 2,
// the head appears last; everything holds, fades out together, and repeats.
const STROKES = [
  {
    d: "M1033 10 C1037.5 9.2 1048.8 6.7 1060 5 C1071.2 3.3 1088.3 0.3 1100 0 C1111.7 -0.3 1121.7 1.3 1130 3 C1138.3 4.7 1143.3 6.8 1150 10 C1156.7 13.2 1163.8 16.2 1170 22 C1176.2 27.8 1183 37 1187 45 C1191 53 1192.3 61.7 1194 70 C1195.7 78.3 1197 86.7 1197 95 C1197 103.3 1195.3 111.7 1194 120 C1192.7 128.3 1190 139 1189 145 C1188 151 1188.2 154.2 1188 156",
    cls: "ow-p1",
  },
  {
    d: "M1190 153 C1193.3 152.7 1201.7 151.7 1210 151 C1218.3 150.3 1230.8 149.2 1240 149 C1249.2 148.8 1256.7 149 1265 150 C1273.3 151 1281.7 152.3 1290 155 C1298.3 157.7 1307.5 161.3 1315 166 C1322.5 170.7 1329.3 175.7 1335 183 C1340.7 190.3 1345.7 200.5 1349 210 C1352.3 219.5 1353.8 230 1355 240 C1356.2 250 1356.2 260 1356 270 C1355.8 280 1355 292.2 1354 300 C1353 307.8 1350.7 314.2 1350 317",
    cls: "ow-p2",
  },
  {
    d: "M1356 290 C1358 287.7 1363.3 280.7 1368 276 C1372.7 271.3 1378 265.8 1384 262 C1390 258.2 1397.7 254.8 1404 253 C1410.3 251.2 1417.2 251.5 1422 251 C1426.8 250.5 1431.2 250.2 1433 250",
    head: "M1418 238 L1434 250 L1420 264",
    cls: "ow-p3",
  },
];

export default function OverlapWindows({ shots }: { shots: Shot[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ow${visible ? " is-visible" : ""}`} style={{ aspectRatio: `${W} / ${H}` }}>
      {shots.map((shot, i) => {
        const win = WINDOWS[i];
        return (
          <div
            key={shot.key}
            className={`ow-window${i < shots.length - 1 ? " is-back" : ""}`}
            style={{ left: `${(win.x / W) * 100}%`, top: `${(win.y / H) * 100}%`, width: `${(win.w / W) * 100}%`, zIndex: i + 1 }}
          >
            {shot.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="ow-img" src={shot.src} alt={shot.label} loading="lazy" decoding="async" />
            ) : (
              <div className="ow-placeholder">{shot.label}</div>
            )}
          </div>
        );
      })}

      <svg className="ow-arrows" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {STROKES.map((stroke) => (
          <g key={stroke.cls}>
            <path d={stroke.d} pathLength={1} className={`ow-line ${stroke.cls}`} />
            {stroke.head && <path d={stroke.head} className="ow-head" />}
          </g>
        ))}
      </svg>
    </div>
  );
}
