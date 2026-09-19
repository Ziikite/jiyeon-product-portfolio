import AnnotatedScreen from "@/app/components/AnnotatedScreen";

// Solution 2: the analysis-result screen (1194 x 834): 수정 필요 스펙 + 상세 비교 (one card) + 리스크 분석/검토 의견 cards. Leaders run down the right margin.
export default function ToolSolution({ body, image, labels }: { body: string; image?: string; labels: string[] }) {
  const [tableLabel, analysisLabel] = labels;
  return (
    <>
      <p>{body}</p>
      {image && (
        <AnnotatedScreen
          image={image}
          alt="마이그레이션 분석 결과 화면 (상세 비교, 리스크 분석 결과, 검토 의견)"
          width={1194}
          height={834}
          topRoom={54}
          boxes={[
            { x: 242, y: 161, w: 737, h: 449, delay: 0.2 },
            { x: 242, y: 620, w: 739, h: 212, delay: 1.5 },
          ]}
          leaders={[
            { d: "M660 -14 V161", delay: 0.6 },
            { d: "M1100 -14 V-4 H1176 V725 H981", delay: 1.9 },
          ]}
          dots={[
            { cx: 660, cy: 161, delay: 0.9 },
            { cx: 981, cy: 725, delay: 2.5 },
          ]}
          chips={[
            { text: tableLabel, x: 560, y: -52, delay: 0.1 },
            { text: analysisLabel, x: 880, y: -52, delay: 1.4 },
          ]}
        />
      )}
    </>
  );
}
