import TopicModeling from "@/app/components/TopicModeling";
import LessonPrototype from "@/app/components/LessonPrototype";
import type { Locale } from "@/app/lib/i18n";

const WORDCLOUD_SRCS = [3, 4, 5, 6, 7, 8, 9].map((n) => `/projects/detail/gln-faq-wordcloud-${n}.svg`);

const COPY = {
  ko: {
    captions: ["전체 빈도분석", "결제/납부 빈도분석", "기타 빈도분석", "로그인/인증 빈도분석", "사용방법/가이드 빈도분석", "수수료/환율 빈도분석", "오류/장애 빈도분석"],
    wordcloudAlt: (caption: string) => `${caption} 워드클라우드`,
    titles: ["워드클라우드", "토픽모델링", "화면 추가 개선안 - front", "화면 추가 개선안 - admin"],
    frontMarker: "화면 추가 개선안(목록 개선)",
    adminMarker: "화면 추가 기획안(admin 기획)",
    adminSplit: " 또한, 기존 GLN admin 포털에서는 게시글 등록시",
    lesson:
      "시간 제약으로 화면 전면 개편과 카테고리 구조 재설계까지는 진행하지 못한 점이 아쉬웠습니다. 다만 이를 통해 한정된 일정 안에서 데이터 기반으로 우선순위를 설정하는 것의 중요성을 배웠습니다. 향후에는 FAQ를 ‘하나의 답변당 하나의 페이지’로 분리해 가독성을 높이고, 연관 질문과 카카오톡 문의 퀵링크를 제공해 문제 해결 범위를 확장하는 방향으로 개선하고자 합니다.",
    adminAlts: ["안내게시글 채널을 체크박스로 변경한 admin 검색 화면", "채널/채널유형 구분을 제거한 admin 게시글 등록 화면"],
  },
  en: {
    captions: ["Full corpus frequency", "Payments frequency", "Other frequency", "Login/verification frequency", "How-to/guides frequency", "Fees/exchange rates frequency", "Errors/outages frequency"],
    wordcloudAlt: (caption: string) => `${caption} word cloud`,
    titles: ["Word clouds", "Topic modeling", "More screen improvements - front", "More screen improvements - admin"],
    frontMarker: "Additional screen improvement (list)",
    adminMarker: "Additional screen proposal (admin)",
    adminSplit: " Also, in the existing GLN admin portal, registering a post",
    lesson:
      "Time constraints kept us from fully redesigning the screens and restructuring the categories, which I regret. But it taught me how important it is to set priorities based on data within a limited schedule. Next, I'd like to split the FAQ into 'one page per answer' for readability, and add related questions and a KakaoTalk quick link to widen what users can solve on their own.",
    adminAlts: ["Admin search screen with the notice channel filter changed to checkboxes", "Admin post registration screen without the channel/channel type split"],
  },
};

const ADMIN_SRCS = ["/projects/detail/gln-faq-admin-1.svg", "/projects/detail/gln-faq-admin-2.svg"];

function SubHeading({ no, title }: { no: string; title: string }) {
  return (
    <div className="ap-sub-head">
      <span className="ap-sub-no">{no}</span>
      <h4 className="ap-sub-title">{title}</h4>
    </div>
  );
}

export default function AppendixSection({ body, locale = "ko" }: { body: string; locale?: Locale }) {
  const t = COPY[locale];
  // The front / admin proposals come straight from the section body, verbatim.
  const frontAt = body.indexOf(t.frontMarker);
  const adminAt = body.indexOf(t.adminMarker);
  const front = frontAt !== -1 && adminAt > frontAt ? body.slice(frontAt, adminAt).trim() : "";
  const admin = adminAt !== -1 ? body.slice(adminAt).trim() : "";
  const splitAt = admin.indexOf(t.adminSplit);
  const adminParagraphs = (splitAt === -1 ? [admin] : [admin.slice(0, splitAt), admin.slice(splitAt + 1)]).map((p) =>
    p.replace(`${t.adminMarker} : `, "")
  );

  if (!front || !admin) return <p>{body}</p>;

  return (
    <div className="ap">
      <section className="ap-sub">
        <SubHeading no="09-01" title={t.titles[0]} />
        <div className="ap-wc-grid">
          {WORDCLOUD_SRCS.map((src, i) => (
            <figure key={src} className={`ap-wc${i === 0 ? " ap-wc-wide" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ap-wc-img" src={src} alt={t.wordcloudAlt(t.captions[i])} loading="lazy" decoding="async" />
              <figcaption className="inquiry-wordcloud-caption">{t.captions[i]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="ap-sub">
        <SubHeading no="09-02" title={t.titles[1]} />
        <TopicModeling locale={locale} />
      </section>

      <section className="ap-sub">
        <SubHeading no="09-03" title={t.titles[2]} />
        <p>{front}</p>
        <p>{t.lesson}</p>
        <LessonPrototype locale={locale} />
      </section>

      <section className="ap-sub">
        <SubHeading no="09-04" title={t.titles[3]} />
        {adminParagraphs.map((p, i) => (
          <div key={p} className="ap-admin-block">
            <p>{p}</p>
            {ADMIN_SRCS[i] && (
              <figure className="ap-fig">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ap-fig-img" src={ADMIN_SRCS[i]} alt={t.adminAlts[i]} loading="lazy" decoding="async" />
              </figure>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
