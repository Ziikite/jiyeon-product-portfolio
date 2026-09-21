"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const INTRO =
  "충전 예약 및 엔터테인먼트 경험을 개선에 더하여 충전소도 팝업 스토어처럼 즐기다 갈 수 있는 공간이 될 수 있도록 기획한 최종 UX 디자인을 CEO 및 임원진 대상으로 발표하였습니다.";

const BOXES = [
  {
    title: "기존 기획안에서 업그레이드하는 방법",
    text: "기존 기획안은 OTT 서비스를 중점적으로 구성되어 사용자의 실제 니즈를 충분히 반영하지 못하고 있었음을 인터뷰를 통해 발견하였습니다. 처음부터 기획안을 다시 쓰지 않고, 기존 기획안에서 발전할 수 있는 형태로 팀원들과 충전 전, 충전 후로 플로우를 나누어 업무 범위를 나누어 진행하여, 보다 디벨롭된 UX를 기획할 수 있었습니다.",
  },
  {
    title: "새로운 서비스에 대한 인터뷰는 몰입감있는 서비스로 하는 것이 키 포인트",
    text: "low-fi 프로토타입으로 인터뷰를 진행하였을 때에는 서비스가 잘 상상되지 않는다는 피드백이 있었습니다. 이를 개선하기 위해 스케치와 3D 프로토타입과 영상을 제작하여 인터뷰를 진행하였습니다. 그 결과, 서비스에 집중된다는 피드백과 함께 직접 경험한 것 같은 입장에서 보다 몰입된 피드백을 받을 수 있었습니다.",
  },
];

export default function OutcomeEV({ quotes }: { quotes: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <p>{INTRO}</p>
      <div className="s2-image-wrap" style={{ aspectRatio: "1139 / 541", marginTop: 22, maxWidth: 640 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="s2-image" src="/projects/detail/gm-ev-charging-outcome.svg" alt="최종 UX 디자인 발표 화면" loading="lazy" decoding="async" />
      </div>
      <div className="oe-boxes">
        {BOXES.map((b) => (
          <div key={b.title} className="oe-box">
            <h4>{b.title}</h4>
            <p>{b.text}</p>
          </div>
        ))}
      </div>
      <div ref={ref} className={`oe-quotes${on ? " is-on" : ""}`}>
        {quotes.map((q, i) => (
          <p key={q} className="oe-quote" style={{ ["--i" as string]: i } as CSSProperties}>
            {q}
          </p>
        ))}
      </div>
    </>
  );
}
