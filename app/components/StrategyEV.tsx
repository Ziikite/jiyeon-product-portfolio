import StrategyPillars from "@/app/components/StrategyPillars";

export default function StrategyEV() {
  return (
    <>
      <StrategyPillars />
      <div className="sf-scroll">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="sf-image" src="/projects/detail/gm-ev-charging-flowchart.svg" alt="충전 서비스 전체 사용자 플로우" />
      </div>
    </>
  );
}
