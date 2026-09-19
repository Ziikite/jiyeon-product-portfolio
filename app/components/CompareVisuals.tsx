// Two panels of identical size. Each cross-fades between its variants (pure CSS):
//  - 상이한 UI: the product card is cropped to the price + button area and enlarged; a box follows the 구매하기 button.
//  - 내비게이션 레이아웃: the header is cropped to logo + menu; dashed guide lines show its height.
const CARDS = [
  { src: "/projects/detail/clas-conversion-cmp-1.svg", alt: "구매하기 버튼이 알약형인 상품 카드", tag: "42px" },
  { src: "/projects/detail/clas-conversion-cmp-2.svg", alt: "구매하기 버튼이 각진 형태인 상품 카드", tag: "56px" },
];

const HEADERS = [
  { src: "/projects/detail/clas-conversion-cmp-3.png", alt: "소개 페이지 헤더", tag: "80px" },
  { src: "/projects/detail/clas-conversion-cmp-4.png", alt: "구매 페이지 헤더", tag: "70px" },
  { src: "/projects/detail/clas-conversion-cmp-5.png", alt: "사용 페이지 헤더", tag: "70px" },
];

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

export default function CompareVisuals() {
  return (
    <div className="cmp">
      <figure className="cmp-panel" aria-label="상이한 UI: 페이지마다 다른 구매하기 버튼">
        <figcaption className="cmp-title">상이한 UI</figcaption>
        <div className="cmp-stage">
          {CARDS.map((c, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={c.src} className={`cmp-card-img cmp-card-${i + 1}`} src={c.src} alt={c.alt} decoding="async" />
          ))}
          <i className="cmp-box" aria-hidden="true" />
          {CARDS.map((c, i) => (
            <span key={c.tag} className={`cmp-tag cmp-card-${i + 1}`} aria-hidden="true">
              구매하기 버튼 {c.tag}
            </span>
          ))}
        </div>
        <Dots prefix="card" count={CARDS.length} anim="cmp-card-" />
      </figure>

      <figure className="cmp-panel" aria-label="내비게이션 레이아웃: 페이지마다 다른 헤더">
        <figcaption className="cmp-title">내비게이션 레이아웃</figcaption>
        <div className="cmp-stage">
          {HEADERS.map((h, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={h.src} className={`cmp-nav-img cmp-nav-${i + 1}`} src={h.src} alt={h.alt} decoding="async" />
          ))}
          <i className="cmp-guide cmp-guide-top" aria-hidden="true" />
          <i className="cmp-guide cmp-guide-bottom" aria-hidden="true" />
          {HEADERS.map((h, i) => (
            <span key={h.src} className={`cmp-tag cmp-tag-nav cmp-nav-${i + 1}`} aria-hidden="true">
              헤더 높이 {h.tag}
            </span>
          ))}
        </div>
        <Dots prefix="nav" count={HEADERS.length} anim="cmp-nav-" />
      </figure>
    </div>
  );
}
