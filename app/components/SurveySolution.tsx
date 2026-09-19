import AnnotatedScreen from "@/app/components/AnnotatedScreen";

// Regions of the survey screen (1194 x 834) that the two notes point at.
export default function SurveySolution({ body, image, labels }: { body: string; image?: string; labels: string[] }) {
  const [progressLabel, writingLabel] = labels;
  return (
    <>
      <p>{body}</p>
      {image && (
        <AnnotatedScreen
          image={image}
          alt="사전 조사 설문 화면"
          width={1194}
          height={834}
          boxes={[
            { x: 240, y: 146, w: 925, h: 54, delay: 0 },
            { x: 262, y: 236, w: 402, h: 218, delay: 1.3 },
            { x: 262, y: 510, w: 636, h: 228, delay: 1.3 },
          ]}
          leaders={[
            { d: "M700 128 V146", delay: 0.5 },
            { d: "M735 356 H664", delay: 1.8 },
            { d: "M960 374 V540 H900", delay: 1.9 },
          ]}
          dots={[
            { cx: 700, cy: 146, delay: 0.8 },
            { cx: 664, cy: 356, delay: 2.1 },
            { cx: 900, cy: 540, delay: 2.3 },
          ]}
          chips={[
            { text: progressLabel, x: 640, y: 92, delay: 0.2 },
            { text: writingLabel, x: 735, y: 336, delay: 1.5 },
          ]}
        />
      )}
    </>
  );
}
