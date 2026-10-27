import StrategyPillars from "@/app/components/StrategyPillars";
import type { Locale } from "@/app/lib/i18n";

const ALT = { ko: "충전 서비스 전체 사용자 플로우", en: "End-to-end user flow of the charging service" };

export default function StrategyEV({ locale = "ko" }: { locale?: Locale }) {
  return (
    <>
      <StrategyPillars locale={locale} />
      <div className="sf-scroll">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="sf-image" src="/projects/detail/gm-ev-charging-flowchart.svg" alt={ALT[locale]} />
      </div>
    </>
  );
}
