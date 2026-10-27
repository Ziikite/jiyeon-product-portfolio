import OutcomeBars from "@/app/components/OutcomeBars";
import { findImage } from "@/app/lib/findImage";
import type { Locale } from "@/app/lib/i18n";

export const OUTCOME_IMAGE_SIZE = { w: 1600, h: 800 }; // 2:1

const COPY = {
  ko: {
    valuesRe: /이탈률 : 기존 (\d+)% → 개선 후 (\d+)% \/ 전환율 : 기존 ([\d.~]+)% → 개선 후 ([\d.]+)%/,
    opsStart: "분리되었던",
    numbersStart: "이탈률 : 기존",
    resultsTitle: "이탈률 감소 및 평균 전환율 향상",
    opsTitle: "CLAS 웹 서비스 통합 운영 주도권 확보",
    imageAlt: "운영 정책과 매뉴얼 문서",
    placeholder: "운영 정책 · 매뉴얼 이미지",
  },
  en: {
    valuesRe: /Bounce rate: (\d+)% before → (\d+)% after \/ Conversion: ([\d.~]+)% before → ([\d.]+)% after/,
    opsStart: "Merging the once-separate",
    numbersStart: "Bounce rate:",
    resultsTitle: "Lower bounce rate, higher average conversion",
    opsTitle: "Taking ownership of CLAS web service operations",
    imageAlt: "Operating policy and manual documents",
    placeholder: "Operating policy · manual image",
  },
};

export default function OutcomeVisual({ body, locale = "ko" }: { body: string; locale?: Locale }) {
  const t = COPY[locale];
  // The four sentences and the "기존 → 개선 후" numbers are split from the body; the numbers now live in the chart.
  const opsAt = body.indexOf(t.opsStart);
  const numbersAt = body.indexOf(t.numbersStart);
  const results = opsAt === -1 ? body : body.slice(0, opsAt).trim();
  const ops = opsAt === -1 ? "" : body.slice(opsAt, numbersAt === -1 ? undefined : numbersAt).trim();

  const m = t.valuesRe.exec(body);
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
        <h4 className="os-title">{t.resultsTitle}</h4>
        <p>{results}</p>
        {values && <OutcomeBars values={values} />}
      </div>

      <div className="os-block">
        <h4 className="os-title">{t.opsTitle}</h4>
        <p>{ops}</p>
        <figure className="os-figure">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="os-img" src={image} alt={t.imageAlt} loading="lazy" decoding="async" />
          ) : (
            <div className="os-placeholder">
              <span className="os-placeholder-name">{t.placeholder}</span>
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
