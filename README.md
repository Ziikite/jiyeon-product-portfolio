# 김지연 서비스 기획 포트폴리오

사용자 데이터와 맥락을 연결해 실행 가능한 경험을 설계하는 서비스 기획자 김지연의 포트폴리오입니다.

## 주요 구성

- 메인(히어로), 경력, 프로젝트 갤러리로 구성된 단일 홈
- 프로젝트 갤러리 카드를 클릭하면 `/projects/[slug]` 개별 케이스 스터디 페이지로 이동
- 실제 포트폴리오·이력서 PDF 내용을 그대로 반영한 5개 프로젝트(GLN FAQ, CLAS 전환율 개선, 클라우드 신사업, GM 음성 UX, GM 전기차 충전)
- Pretendard 기반 미니멀 타이포그래피, 경력·학력·스킬·수상 요약
- 반응형 레이아웃과 키보드 포커스 지원

## 로컬 실행

```bash
npm install
npm run dev
```

## 배포

`main` 브랜치가 Vercel 프로덕션 배포 기준입니다.

- Production: https://jiyeon-product-portfolio.vercel.app
