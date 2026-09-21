import AnnotatedScreen from "@/app/components/AnnotatedScreen";

// Two notes about the same 충전하기 screen (gm-ev-charging-solution-1.svg, 2028x1183), pointed at with
// boxes/leaders/chips the same way cloud-migration's SurveySolution/ToolSolution do via AnnotatedScreen.
const NOTES = [
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
];

export default function Solution1EV() {
  return (
    <>
      <AnnotatedScreen
        image="/projects/detail/gm-ev-charging-solution-1.svg"
        alt="충전하기 화면 — 배터리 시각화와 충전 구역 확인·예약"
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
          { text: "① 배터리 시각화", x: 400, y: 30, delay: 0.2 },
          { text: "② 구역 확인·예약", x: 1300, y: 200, delay: 1.5 },
        ]}
      />
      <div className="s1-notes">
        {NOTES.map((n, i) => (
          <div key={n.title} className="s1-note">
            <h4>
              {i + 1}. {n.title}
            </h4>
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
