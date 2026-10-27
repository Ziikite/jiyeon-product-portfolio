import AnnotatedScreen from "@/app/components/AnnotatedScreen";
import type { Locale } from "@/app/lib/i18n";

// Two notes about the same 충전하기 screen (gm-ev-charging-solution-1.svg, 2028x1183), pointed at with
// boxes/leaders/chips the same way cloud-migration's SurveySolution/ToolSolution do via AnnotatedScreen.
const COPY = {
  ko: {
    alt: "충전하기 화면 — 배터리 시각화와 충전 구역 확인·예약",
    chips: ["① 배터리 시각화", "② 구역 확인·예약"],
    notes: [
      {
        title: "현재 배터리를 그래프로 시각화하여, 원하는 용량을 손쉽게 설정",
        bullets: [
          "충전 단위의 복잡함을 줄이기 위해, 충전량 변화에 맞춰 그래프로 충전 용량 시각화",
          "%로 배터리 용량을 보여주어, 충전 단위에 대한 거부감 완화",
        ],
      },
      {
        title: "도착 시간에 맞춰, 충전 가능한 구역 확인 및 예약",
        bullets: [
          "충전 가능한 구역은 파란색, 도착시간에 맞춰서 충전이 완료되는 차량은 초록색으로 표시",
          "다른 차량의 잔여 충전 시간을 안내하여, 도착 시 충전 중인 상황에 대한 예측 가능",
        ],
      },
    ],
  },
  en: {
    alt: "Charging screen — battery visualization and checking and reserving a charging bay",
    chips: ["① Battery graph", "② Book a bay"],
    notes: [
      {
        title: "Visualize the current battery as a graph so drivers can easily set the amount they want",
        bullets: [
          "To cut the complexity of charging units, the graph shows capacity as the charge amount changes",
          "Battery level is shown in % to ease resistance to unfamiliar units",
        ],
      },
      {
        title: "Check and reserve an available bay that fits the arrival time",
        bullets: [
          "Available bays are shown in blue, and vehicles that will finish charging by the arrival time in green",
          "The remaining charging time of other vehicles is shown, so drivers can anticipate who will still be charging when they arrive",
        ],
      },
    ],
  },
};

export default function Solution1EV({ locale = "ko" }: { locale?: Locale }) {
  const t = COPY[locale];
  return (
    <>
      <AnnotatedScreen
        image="/projects/detail/gm-ev-charging-solution-1.svg"
        alt={t.alt}
        width={2028}
        height={1183}
        boxes={[
          { x: 180, y: 110, w: 700, h: 1000, delay: 0 },
          { x: 1000, y: 280, w: 880, h: 830, delay: 1.3 },
        ]}
        leaders={[
          { d: "M530 60 V110", delay: 0.5 },
          { d: "M1440 230 V280", delay: 1.8 },
        ]}
        dots={[
          { cx: 530, cy: 110, delay: 0.8 },
          { cx: 1440, cy: 280, delay: 2.1 },
        ]}
        chips={[
          { text: t.chips[0], x: 400, y: 30, delay: 0.2 },
          { text: t.chips[1], x: 1300, y: 200, delay: 1.5 },
        ]}
      />
      <div className="s1-notes">
        {t.notes.map((n, i) => (
          <div key={n.title} className="s1-note">
            <div className="s1-note-head">
              <span className="s1-num">{i + 1}</span>
              <h4>{n.title}</h4>
            </div>
            <ul>
              {n.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
