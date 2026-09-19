import MarketCharts from "@/app/components/MarketCharts";

export default function BackgroundVisual({ body, image }: { body: string; image?: string }) {
  // Only the lead-in sentence stays as text; the market numbers sentence is shown by the charts themselves.
  const marketAt = body.indexOf("글로벌 클라우드 마이그레이션 시장 규모");
  const lead = marketAt === -1 ? body : body.slice(0, marketAt).trim();

  return (
    <>
      <p>{lead}</p>

      <div className="os-block">
        <h4 className="os-title">Market Research</h4>
        <MarketCharts />
      </div>

      {image && (
        <div className="os-block">
          <h4 className="os-title">Data Analysis</h4>
          <figure className="os-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="os-img" src={image} alt="Google 검색 기반 크롤링 워드클라우드" loading="lazy" decoding="async" />
            <figcaption className="inquiry-wordcloud-caption">Google 검색 기반 크롤링</figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
