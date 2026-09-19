import TopicModeling from "@/app/components/TopicModeling";
import LessonPrototype from "@/app/components/LessonPrototype";

const WORDCLOUDS = [
  { src: "/projects/detail/gln-faq-wordcloud-3.svg", caption: "전체 빈도분석", wide: true },
  { src: "/projects/detail/gln-faq-wordcloud-4.svg", caption: "결제/납부 빈도분석" },
  { src: "/projects/detail/gln-faq-wordcloud-5.svg", caption: "기타 빈도분석" },
  { src: "/projects/detail/gln-faq-wordcloud-6.svg", caption: "로그인/인증 빈도분석" },
  { src: "/projects/detail/gln-faq-wordcloud-7.svg", caption: "사용방법/가이드 빈도분석" },
  { src: "/projects/detail/gln-faq-wordcloud-8.svg", caption: "수수료/환율 빈도분석" },
  { src: "/projects/detail/gln-faq-wordcloud-9.svg", caption: "오류/장애 빈도분석" },
];

const LESSON_TEXT =
  "시간 제약으로 화면 전면 개편과 카테고리 구조 재설계까지는 진행하지 못한 점이 아쉬웠습니다. 다만 이를 통해 한정된 일정 안에서 데이터 기반으로 우선순위를 설정하는 것의 중요성을 배웠습니다. 향후에는 FAQ를 ‘하나의 답변당 하나의 페이지’로 분리해 가독성을 높이고, 연관 질문과 카카오톡 문의 퀵링크를 제공해 문제 해결 범위를 확장하는 방향으로 개선하고자 합니다.";

const ADMIN_IMAGES = [
  { src: "/projects/detail/gln-faq-admin-1.svg", alt: "안내게시글 채널을 체크박스로 변경한 admin 검색 화면" },
  { src: "/projects/detail/gln-faq-admin-2.svg", alt: "채널/채널유형 구분을 제거한 admin 게시글 등록 화면" },
];

function SubHeading({ no, title }: { no: string; title: string }) {
  return (
    <div className="ap-sub-head">
      <span className="ap-sub-no">{no}</span>
      <h4 className="ap-sub-title">{title}</h4>
    </div>
  );
}

export default function AppendixSection({ body }: { body: string }) {
  // The front / admin proposals come straight from the section body, verbatim.
  const frontAt = body.indexOf("화면 추가 개선안(목록 개선)");
  const adminAt = body.indexOf("화면 추가 기획안(admin 기획)");
  const front = frontAt !== -1 && adminAt > frontAt ? body.slice(frontAt, adminAt).trim() : "";
  const admin = adminAt !== -1 ? body.slice(adminAt).trim() : "";
  const splitAt = admin.indexOf(" 또한, 기존 GLN admin 포털에서는 게시글 등록시");
  const adminParagraphs = (splitAt === -1 ? [admin] : [admin.slice(0, splitAt), admin.slice(splitAt + 1)]).map((t) =>
    t.replace("화면 추가 기획안(admin 기획) : ", "")
  );

  if (!front || !admin) return <p>{body}</p>;

  return (
    <div className="ap">
      <section className="ap-sub">
        <SubHeading no="09-01" title="워드클라우드" />
        <div className="ap-wc-grid">
          {WORDCLOUDS.map((w) => (
            <figure key={w.src} className={`ap-wc${w.wide ? " ap-wc-wide" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ap-wc-img" src={w.src} alt={`${w.caption} 워드클라우드`} loading="lazy" decoding="async" />
              <figcaption className="inquiry-wordcloud-caption">{w.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="ap-sub">
        <SubHeading no="09-02" title="토픽모델링" />
        <TopicModeling />
      </section>

      <section className="ap-sub">
        <SubHeading no="09-03" title="화면 추가 개선안 - front" />
        <p>{front}</p>
        <p>{LESSON_TEXT}</p>
        <LessonPrototype />
      </section>

      <section className="ap-sub">
        <SubHeading no="09-04" title="화면 추가 개선안 - admin" />
        {adminParagraphs.map((p, i) => (
          <div key={p} className="ap-admin-block">
            <p>{p}</p>
            {ADMIN_IMAGES[i] && (
              <figure className="ap-fig">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ap-fig-img" src={ADMIN_IMAGES[i].src} alt={ADMIN_IMAGES[i].alt} loading="lazy" decoding="async" />
              </figure>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
