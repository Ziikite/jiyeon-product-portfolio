"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  no: string;
  company: string;
  domain: string;
  year: string;
  title: string;
  summary: string;
  role: string;
  metric: string;
  metricLabel: string;
  accent: string;
  problem: string;
  evidence: string[];
  decision: string;
  outcome: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: "gln-faq",
    no: "01",
    company: "GLN International",
    domain: "Fintech",
    year: "2025–26",
    title: "고객의 불안을 줄이는\nFAQ 경험 재설계",
    summary: "3,929건의 문의 데이터를 분석해 ‘찾기 어려운 답변’이 아니라 ‘내 상황을 판단하기 어려운 구조’가 문제임을 발견했습니다.",
    role: "UX Research · Service Planning · UI · 90%",
    metric: "−59%",
    metricLabel: "문의량 최대 감소",
    accent: "violet",
    problem: "FAQ에 이미 있는 질문도 고객센터로 다시 유입되고 있었습니다. 특히 전체 문의의 44.7%가 ‘기타’로 분류돼 사용자가 자신의 상황을 어느 카테고리에서 찾아야 할지 판단하기 어려웠습니다.",
    evidence: ["문의 데이터 3,929건 빈도 분석", "운영 담당자 2명 심층 인터뷰", "워드클라우드·토픽 모델링"],
    decision: "실패 상황에서 사용자가 궁금해하는 ‘가능 여부·돈의 행방·예상 대기시간’을 답변의 최상단에 배치했습니다. 전문 용어와 계산식을 일상 언어로 바꾸고, 불가능 사유 뒤에는 즉시 실행 가능한 대안을 연결했습니다.",
    outcome: "Clear & Intuitive, Approachable, Focus on Solutions의 3가지 작성 원칙과 실패 유형별 메시지 플로우를 만들었습니다. 반영 한 달 후 결제 실패 문의 17%, ATM 실패 문의 27%, 환율·수수료 문의 59% 감소를 확인했습니다.",
    tags: ["VOC Analysis", "UX Writing", "Topic Modeling"],
  },
  {
    id: "clas",
    no: "02",
    company: "TmaxCloud",
    domain: "Cloud",
    year: "2024",
    title: "흩어진 클라우드 경험을\n하나의 구매 여정으로",
    summary: "계열사마다 달랐던 탐색·구매·이용 화면을 연결하고, 3단계 플로우를 2단계로 줄였습니다.",
    role: "Service UX Planning · UI · 70%",
    metric: "3×",
    metricLabel: "평균 전환율",
    accent: "blue",
    problem: "상품 확인, 구매, 이용 단계마다 새 창이 열리고 UI와 용어가 달라졌습니다. 소개 페이지 이탈률은 86%, 구매 페이지 이탈률은 78%에 달했습니다.",
    evidence: ["퍼널별 이탈·전환 데이터", "서비스별 플로우 비교", "내비게이션·용어 전수 점검"],
    decision: "GNB와 내비게이션을 통일하고 Pre-Sales와 Sales를 연결했습니다. 상품 카드에서 주요 정보를 비교한 뒤 같은 맥락 안에서 바로 문의·구매로 이동하도록 여정을 3단계에서 2단계로 단축했습니다.",
    outcome: "이탈률을 86%에서 53%로 낮추고 평균 전환율을 1.1%에서 3.4%로 높였습니다. 통합 이후 운영 정책과 매뉴얼까지 수립해 팀이 서비스 운영 주도권을 확보했습니다.",
    tags: ["Conversion", "User Flow", "Service Policy"],
  },
  {
    id: "migration",
    no: "03",
    company: "TmaxCloud",
    domain: "B2B SaaS",
    year: "2024",
    title: "전문가의 마이그레이션을\n초보자의 하루로",
    summary: "수작업 진단과 산재된 도구를 설문 기반 자동 진단과 통합 대시보드로 재구성했습니다.",
    role: "Service UX Planning · UI · 70%",
    metric: "1 day",
    metricLabel: "환경 진단 목표",
    accent: "cyan",
    problem: "클라우드 전환은 초기 시스템 진단에만 1–2개월이 걸리고, 여러 서드파티 도구와 난해한 용어 때문에 비전문가가 시작하기 어려웠습니다.",
    evidence: ["시장·경쟁사 리서치", "도입 담당자 Pain point 분석", "기술 제약·업무 프로세스 정리"],
    decision: "코드 설치 대신 설문으로 레거시 환경을 파악하고, As-Is와 To-Be를 한 화면에서 비교하도록 설계했습니다. 숫자와 그래프를 먼저 보여주고 기술 용어는 보조 설명으로 낮췄습니다.",
    outcome: "복잡한 마이그레이션 과정을 ‘진단–분석–계획–실행–모니터링’의 일관된 흐름으로 정의했습니다. 기능정의서, WBS, 통합 테스트 시나리오까지 연결해 실행 가능한 신사업 기획안으로 구체화했습니다.",
    tags: ["New Business", "B2B UX", "Dashboard"],
  },
  {
    id: "voice",
    no: "04",
    company: "GM Korea",
    domain: "Mobility",
    year: "2022–23",
    title: "운전 맥락을 이해하는\n음성 UX 가이드",
    summary: "반복 안내의 양이 아니라 ‘왜 지금 말하는지’가 신뢰를 좌우한다는 사실을 주행 관찰과 A/B 테스트로 검증했습니다.",
    role: "UX Research 90% · Service Planning 90%",
    metric: "+51%",
    metricLabel: "목표 달성률",
    accent: "yellow",
    problem: "차량 음성 기능은 안전을 위해 제공되지만 절반 이상의 사용자가 사용하지 않았습니다. 6명 운전자 쉐도잉에서 83%가 안내를 무시하거나 화면을 다시 확인했습니다.",
    evidence: ["운전자 쉐도잉 6명", "사용자 조사 200명", "6개 주행 상황 A/B 테스트"],
    decision: "정보의 양을 늘리는 대신 안내 이유와 상황 맥락을 함께 말하도록 했습니다. 장거리·차선 변경·정보 중첩 등 실제 주행 장면별로 안전감, 편안함, 매력을 높이는 발화 원칙을 정의했습니다.",
    outcome: "개선안은 편안함 14.0%, 안전감 29.5%, 매력 38.4% 향상을 보였고, 시나리오 목표 달성률은 최대 51% 높아졌습니다. 결과를 현지화 음성 UX 가이드라인으로 체계화했습니다.",
    tags: ["Shadowing", "A/B Test", "Voice UX"],
  },
  {
    id: "ev",
    no: "05",
    company: "GM Korea",
    domain: "Mobility",
    year: "2022",
    title: "기다림보다 확실함을 주는\n전기차 충전 경험",
    summary: "OTT 중심의 초기 가설을 뒤집고, 예약·실시간 상태·라운지를 잇는 종합 충전 여정을 제안했습니다.",
    role: "UX Research 90% · Planning 90% · UI 100%",
    metric: "1st",
    metricLabel: "현지화 전략 평가",
    accent: "mint",
    problem: "초기 기획은 충전 중 OTT 시청에 집중했지만, 사용자에게 더 중요한 것은 콘텐츠가 아니라 충전 가능 여부와 완료 시간의 확실성이었습니다.",
    evidence: ["전기차 운전자 5명 인터뷰", "충전 전·중·후 여정 분석", "기존 기획안 가설 검증"],
    decision: "충전소 예약, 실시간 상태, 자동 결제, 짧은 콘텐츠, 라운지를 하나의 플로우로 묶었습니다. 도착 시간과 원하는 충전량을 기준으로 이용 가능한 구역을 미리 선택하게 했습니다.",
    outcome: "사용자 불안을 먼저 해결하면서 엔터테인먼트를 자연스럽게 연결한 전략으로 CEO·임원진 발표에서 커넥티드카 현지화 전략 1위를 달성했습니다.",
    tags: ["Concept Validation", "Journey Map", "Service Design"],
  },
];

const filters = ["All", "Fintech", "Cloud", "Mobility"];

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = projects.filter((p) => filter === "All" || (filter === "Cloud" ? ["Cloud", "B2B SaaS"].includes(p.domain) : p.domain === filter));

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <main>
      <nav className="nav" aria-label="주요 메뉴">
        <a className="wordmark" href="#top" aria-label="홈으로">JY<span>·</span></a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a className="nav-contact" href="mailto:thingzwell@gmail.com">Let&apos;s talk ↗</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-kicker"><span className="status-dot" />Available for new opportunities · Seoul</div>
        <h1>
          복잡한 문제에서<br />
          <span className="serif">사용자의 맥락</span>을 찾고,<br />
          실행 가능한 경험으로 만듭니다.
        </h1>
        <div className="hero-bottom">
          <p>정량 데이터와 사용자의 목소리를 연결해<br className="desktop" /> 서비스의 다음 장면을 설계하는 기획자 김지연입니다.</p>
          <a className="round-link" href="#work" aria-label="프로젝트 보기"><span>↓</span></a>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit-label one">RESEARCH</span>
          <span className="orbit-label two">STRATEGY</span>
          <span className="orbit-label three">EXECUTION</span>
          <div className="orbit-core">Why<br /><i>→</i><br />What</div>
        </div>
      </section>

      <section className="signal-strip" aria-label="핵심 역량">
        <div><b>3,929</b><span>VOC 분석</span></div>
        <div><b>5</b><span>Selected projects</span></div>
        <div><b>3×</b><span>전환율 개선</span></div>
        <div><b>End-to-end</b><span>Research to launch</span></div>
      </section>

      <section className="work-section" id="work">
        <div className="section-head">
          <div><p className="eyebrow">Selected work · 2022–2026</p><h2>문제를 푼 방식으로<br />말하는 프로젝트</h2></div>
          <p className="section-intro">화면보다 먼저 문제를 정의하고,<br />근거가 있는 판단을 설계합니다.</p>
        </div>

        <div className="filters" role="group" aria-label="프로젝트 필터">
          {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
        </div>

        <div className="project-list">
          {visible.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.id}>
              <button className="project-button" onClick={() => setSelected(project)} aria-label={`${project.title.replace("\n", " ")} 상세 보기`}>
                <div className="project-meta"><span>{project.no}</span><span>{project.company}</span><span>{project.year}</span></div>
                <div className="project-main">
                  <div>
                    <p className="domain">{project.domain}</p>
                    <h3>{project.title.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}</h3>
                    <p className="summary">{project.summary}</p>
                  </div>
                  <div className="metric-visual" aria-hidden="true">
                    <div className="metric-ring"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
                    <span className="open-arrow">↗</span>
                  </div>
                </div>
                <div className="project-foot"><span>{project.role}</span><span>View case study</span></div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="approach" id="about">
        <div className="approach-copy">
          <p className="eyebrow">How I work</p>
          <h2>데이터를 읽고,<br /><span className="serif">맥락을 연결하고,</span><br />끝까지 실행합니다.</h2>
        </div>
        <div className="approach-list">
          <div><span>01</span><h3>Evidence first</h3><p>감으로 결론내리지 않습니다. 행동 데이터와 사용자의 언어를 함께 보며 문제의 크기와 원인을 분리합니다.</p></div>
          <div><span>02</span><h3>Context matters</h3><p>기능보다 사용되는 순간을 봅니다. Who, When, Why를 연결해 서비스가 개입해야 할 지점을 찾습니다.</p></div>
          <div><span>03</span><h3>Make it shippable</h3><p>아이디어를 정책, 플로우, 기능정의서와 테스트 시나리오로 구체화해 팀이 실제로 움직일 수 있게 합니다.</p></div>
        </div>
      </section>

      <section className="toolbox">
        <p className="eyebrow">Toolbox</p>
        <div className="tool-cloud"><span>Figma</span><span>SPSS</span><span>Google Analytics</span><span>Beusable</span><span>Python</span><span>UX Research</span><span>Policy Design</span><span>QA</span></div>
      </section>

      <section className="experience" id="experience">
        <div className="experience-title">
          <p className="eyebrow">Experience · 2022–2026</p>
          <h2>리서치에서 정책과<br />출시 가능한 화면까지.</h2>
        </div>
        <div className="timeline">
          <article>
            <span className="period">2025.09 — 2026.03</span>
            <div><h3>GLN International</h3><p>Product Designer</p></div>
            <p>외국인 대상 의료비·등록금 결제 서비스의 전체 플로우와 20개 이상 화면을 설계하고, 3,929건 VOC를 기반으로 FAQ와 운영 어드민을 개선했습니다.</p>
          </article>
          <article>
            <span className="period">2024.02 — 2024.09</span>
            <div><h3>TmaxCloud</h3><p>UX Manager</p></div>
            <p>클라우드 서비스의 탐색–구매–이용 구조를 통합하고, 신사업 마이그레이션 서비스의 IA·기능명세·대시보드를 기획했습니다.</p>
          </article>
          <article>
            <span className="period">2022.03 — 2023.08</span>
            <div><h3>GM Korea × University Lab</h3><p>PM · Researcher</p></div>
            <p>차량 음성 UX와 전기차 충전 경험을 연구해 인터뷰, 설문, A/B 테스트의 발견을 현지화 전략과 서비스 콘셉트로 연결했습니다.</p>
          </article>
        </div>
      </section>

      <footer>
        <p>좋은 질문에서<br /><span className="serif">좋은 서비스가 시작됩니다.</span></p>
        <div className="footer-row"><a href="mailto:thingzwell@gmail.com">thingzwell@gmail.com ↗</a><span>Jiyeon Kim · Service Planner</span><span>© 2026</span></div>
      </footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}>
          <section className={`case-modal ${selected.accent}`} role="dialog" aria-modal="true" aria-labelledby="case-title">
            <button className="close" onClick={() => setSelected(null)} aria-label="상세 닫기">×</button>
            <header className="case-header">
              <div className="case-meta"><span>{selected.no}</span><span>{selected.company}</span><span>{selected.year}</span></div>
              <p className="domain">{selected.domain}</p>
              <h2 id="case-title">{selected.title.replace("\n", " ")}</h2>
              <div className="case-stat"><strong>{selected.metric}</strong><span>{selected.metricLabel}</span></div>
            </header>
            <div className="case-body">
              <div className="case-section"><span className="case-label">01 · Problem</span><h3>화면을 그리기 전에<br />문제를 다시 정의했습니다.</h3><p>{selected.problem}</p></div>
              <div className="case-section evidence"><span className="case-label">02 · Evidence</span><h3>판단의 근거</h3><ul>{selected.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="case-section"><span className="case-label">03 · Design decision</span><h3>그래서 이렇게 설계했습니다.</h3><p>{selected.decision}</p></div>
              <div className="case-section outcome"><span className="case-label">04 · Outcome</span><h3>결과와 배운 점</h3><p>{selected.outcome}</p><div className="tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
