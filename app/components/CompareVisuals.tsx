// Two panels of identical size. Each cross-fades between its variants (pure CSS):
//  - 상이한 UI: the product card is cropped to the price + button area and enlarged; a box follows the 구매하기 button.
//  - 내비게이션 레이아웃: the header is cropped to logo + menu; dashed guide lines show its height.
import type { Locale } from "@/app/lib/i18n";

const CARDS = [
  { src: "/projects/detail/clas-conversion-cmp-1.svg", alt: { ko: "구매하기 버튼이 알약형인 상품 카드", en: "Product card with a pill-shaped Buy button" }, tag: "42px" },
  { src: "/projects/detail/clas-conversion-cmp-2.svg", alt: { ko: "구매하기 버튼이 각진 형태인 상품 카드", en: "Product card with a square-cornered Buy button" }, tag: "56px" },
];

const HEADERS = [
  { src: "/projects/detail/clas-conversion-cmp-3.png", alt: { ko: "소개 페이지 헤더", en: "Intro page header" }, tag: "80px" },
  { src: "/projects/detail/clas-conversion-cmp-4.png", alt: { ko: "구매 페이지 헤더", en: "Purchase page header" }, tag: "70px" },
  { src: "/projects/detail/clas-conversion-cmp-5.png", alt: { ko: "사용 페이지 헤더", en: "Usage page header" }, tag: "70px" },
];

const COPY = {
  ko: {
    uiLabel: "상이한 UI: 페이지마다 다른 구매하기 버튼",
    uiTitle: "상이한 UI",
    button: "구매하기 버튼",
    navLabel: "내비게이션 레이아웃: 페이지마다 다른 헤더",
    navTitle: "내비게이션 레이아웃",
    header: "헤더 높이",
  },
  en: {
    uiLabel: "Inconsistent UI: a different Buy button on every page",
    uiTitle: "Inconsistent UI",
    button: "Buy button",
    navLabel: "Navigation layout: a different header on every page",
    navTitle: "Navigation layout",
    header: "Header height",
  },
};

function Dots({ prefix, count, anim }: { prefix: string; count: number; anim: string }) {
  return (
    <div className="cmp-dots" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="cmp-dot">
          <i className={`${anim}${i + 1}`} data-prefix={prefix} />
        </span>
      ))}
    </div>
  );
}

export default function CompareVisuals({ locale = "ko" }: { locale?: Locale }) {
  const t = COPY[locale];
  return (
    <div className="cmp">
      <figure className="cmp-panel" aria-label={t.uiLabel}>
        <figcaption className="cmp-title">{t.uiTitle}</figcaption>
        <div className="cmp-stage">
          {CARDS.map((c, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={c.src} className={`cmp-card-img cmp-card-${i + 1}`} src={c.src} alt={c.alt[locale]} decoding="async" />
          ))}
          <i className="cmp-box" aria-hidden="true" />
          {CARDS.map((c, i) => (
            <span key={c.tag} className={`cmp-tag cmp-card-${i + 1}`} aria-hidden="true">
              {t.button} {c.tag}
            </span>
          ))}
        </div>
        <Dots prefix="card" count={CARDS.length} anim="cmp-card-" />
      </figure>

      <figure className="cmp-panel" aria-label={t.navLabel}>
        <figcaption className="cmp-title">{t.navTitle}</figcaption>
        <div className="cmp-stage">
          {HEADERS.map((h, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={h.src} className={`cmp-nav-img cmp-nav-${i + 1}`} src={h.src} alt={h.alt[locale]} decoding="async" />
          ))}
          <i className="cmp-guide cmp-guide-top" aria-hidden="true" />
          <i className="cmp-guide cmp-guide-bottom" aria-hidden="true" />
          {HEADERS.map((h, i) => (
            <span key={h.src} className={`cmp-tag cmp-tag-nav cmp-nav-${i + 1}`} aria-hidden="true">
              {t.header} {h.tag}
            </span>
          ))}
        </div>
        <Dots prefix="nav" count={HEADERS.length} anim="cmp-nav-" />
      </figure>
    </div>
  );
}
