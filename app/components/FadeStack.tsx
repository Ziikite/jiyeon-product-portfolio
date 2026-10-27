// Three screens stacked like the Cause visual. Bottom = after-1, middle = after-3, front = after-2.
// The middle screen fades out and back in (pure CSS loop), showing the step that disappears.
import type { Locale } from "@/app/lib/i18n";

const W = 1440;
const H = 830;

const WINDOWS = [
  { src: "/projects/detail/clas-conversion-after-1.png", alt: { ko: "개선 후 소개(Pre-Sales) 화면", en: "After: intro (Pre-Sales) screen" }, x: 0, y: 12, w: 1010, cls: "fs-bottom" },
  { src: "/projects/detail/clas-conversion-after-3.png", alt: { ko: "개선 전 중간 단계(Sales) 화면", en: "Before: middle step (Sales) screen" }, x: 185, y: 178, w: 1002, cls: "fs-middle" },
  { src: "/projects/detail/clas-conversion-after-2.png", alt: { ko: "개선 후 콘솔(Console) 화면", en: "After: Console screen" }, x: 360, y: 345, w: 1007, cls: "fs-front" },
];

export default function FadeStack({ locale = "ko" }: { locale?: Locale }) {
  return (
    <div className="fs" style={{ aspectRatio: `${W} / ${H}` }}>
      {WINDOWS.map((win) => (
        <div
          key={win.src}
          className={`fs-window ${win.cls}`}
          style={{ left: `${(win.x / W) * 100}%`, top: `${(win.y / H) * 100}%`, width: `${(win.w / W) * 100}%` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="fs-img" src={win.src} alt={win.alt[locale]} loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}
