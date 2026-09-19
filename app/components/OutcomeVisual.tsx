import OutcomeBars from "@/app/components/OutcomeBars";
import { findImage } from "@/app/lib/findImage";

export const OUTCOME_IMAGE_SIZE = { w: 1600, h: 800 }; // 2:1

const VALUES_RE = /이탈률 : 기존 (\d+)% → 개선 후 (\d+)% \/ 전환율 : 기존 ([\d.~]+)% → 개선 후 ([\d.]+)%/;

export default function OutcomeVisual({ body }: { body: string }) {
  // The four sentences and the "기존 → 개선 후" numbers are split from the body; the numbers now live in the chart.
  const opsAt = body.indexOf("분리되었던");
  const numbersAt = body.indexOf("이탈률 : 기존");
  const results = opsAt === -1 ? body : body.slice(0, opsAt).trim();
  const ops = opsAt === -1 ? "" : body.slice(opsAt, numbersAt === -1 ? undefined : numbersAt).trim();

  const m = VALUES_RE.exec(body);
  const values = m
    ? {
        bounceFrom: Number(m[1]),
        bounceTo: Number(m[2]),
        convFrom: m[3],
        convFromNum: Number(m[3].split("~").pop()) - (m[3].includes("~") ? 0.1 : 0),
        convTo: Number(m[4]),
      }
    : null;

  const image = findImage("clas-outcome-operation");

  return (
    <>
      <div className="os-block">
        <h4 className="os-title">이탈률 감소 및 평균 전환율 향상</h4>
        <p>{results}</p>
        {values && <OutcomeBars values={values} />}
      </div>

      <div className="os-block">
        <h4 className="os-title">CLAS 웹 서비스 통합 운영 주도권 확보</h4>
        <p>{ops}</p>
        <figure className="os-figure">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="os-img" src={image} alt="운영 정책과 매뉴얼 문서" loading="lazy" decoding="async" />
          ) : (
            <div className="os-placeholder">
              <span className="os-placeholder-name">운영 정책 · 매뉴얼 이미지</span>
              <span className="os-placeholder-size">
                {OUTCOME_IMAGE_SIZE.w} × {OUTCOME_IMAGE_SIZE.h}
              </span>
            </div>
          )}
        </figure>
      </div>
    </>
  );
}
