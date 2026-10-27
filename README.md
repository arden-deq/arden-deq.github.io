# 남정덕 · Backend Engineer 포트폴리오

Java/Spring 기반 문제은행·온라인 시험 경험을 기술 사례로 소개하는 React + TypeScript + Vite 사이트입니다. 기존 색상·테마·카드·타임라인을 유지하면서 데이터 정합성, DB 병목, 이벤트 처리와 운영 복구 경험을 중심으로 구성했습니다.

## 내용과 화면

- 첫 화면 → 대표 사례 3개 (DB 성능 개선·Kafka 이벤트 순서·서버 기록 검증) → 경력 → 주요 프로젝트 → 기술 사용 맥락 → Lab (CharaNest·K-Racing) → 확장 앱·학력 → 연락처
- 주요 프로젝트는 모두 퓨쳐누리에서 수행: KICE는 프리랜서, 기관별 개발·운영과 NTCN은 정규직 재직 당시 업무
- 경력은 퓨쳐누리 정규직·프리랜서 두 기간으로 구분하고, NTCN은 정규직 기간의 프로젝트로 설명
- 프로젝트 카드와 상세 헤더에 `employment`를 같은 형식으로 표시. 카드의 `featuredTech`는 실제 사용 기술·아키텍처 중 대표 항목을 선택하고, 상세에는 전체 `tech` 표시
- 개인 프로젝트: CharaNest (로컬 AI 프로토타입), K-Racing (공개 웹 게임), Keep Your Focus (스토어 배포 확장 앱)
- 상단 메뉴는 영문, 상세 목차는 사례를 구분할 수 있는 짧은 한글 제목, 테마는 접근 가능한 해·달 아이콘 버튼
- 상세: 개요 → 업무 흐름 → 담당한 개발 → 사례별 판단·결과·확인 범위 → 구현·검증. 비교표와 선택적인 회고로 세부 내용을 보완
- 데스크톱 측면 목차, 모바일 접이식 고정 목차, 사례 고유 링크와 목록 위치·포커스 복귀
- 콘텐츠는 처음부터 표시됩니다. 긴 섹션의 노출 여부를 스크롤 애니메이션에 의존하지 않습니다.

## 파일 구조

| 파일 | 역할 |
| --- | --- |
| `src/assets/data/profile.ts` | 첫 화면, 대표 사례, 경력, 기술, 개인 프로젝트, 연락처 |
| `src/assets/data/kice.ts` | KICE 기여·기술 사례 |
| `src/assets/data/futurenuri.ts` | 퓨쳐누리 개발·운영 사례 |
| `src/assets/data/ntcn.ts` | NTCN 전환·안정화 사례 |
| `src/assets/data/charanest.ts`, `kracing.ts` | 개인 프로젝트·기술 사례·개발 회고와 출처 |
| `src/assets/data/types.ts` | 프로젝트·기술 사례·흐름 데이터 타입 |
| `src/hooks/usePortfolioNavigation.ts` | 해시 경로, 사례 이동, 목록 위치·포커스 복귀 |
| `src/components/CaseStudy.tsx` | 결과·보장 범위·본문·비교표·접이식 보조 사례의 공통 렌더링 |
| `src/components/` | 기존 공통 UI와 대표 사례·상세·흐름 컴포넌트 |
| `src/App.css` | 공통 테마, 반응형·인쇄·포커스 스타일 |
| `docs/` | Vite가 직접 생성하는 GitHub Pages 산출물 |

## 실행과 검증

Node.js 20.19+ 또는 22.12+ 환경에서 실행합니다.

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

`build`는 타입 검사와 Vite 빌드 후 `docs/index.html`을 `docs/404.html`로 복제합니다. 복제 단계는 Windows와 Linux에서 동일하게 동작합니다. `dist/`를 별도로 복사하지 않습니다.

브라우저 확인 항목:

- 모바일·태블릿·데스크톱에서 헤더 겹침과 가로 넘침이 없는지
- 대표 사례 → 해당 사례 → 목록 복귀와 포커스
- 상세 목차, 기존 프로젝트 주소, 사례 주소 직접 진입·새로고침
- 라이트·다크 테마, 접힌 추가 기록, 키보드 포커스와 본문 건너뛰기

## 주소 규칙

기존 프로젝트 주소를 유지합니다.

- `#/project/kice`
- `#/project/neotest-maintenance`
- `#/project/ntcn`
- `#/project/keep-your-focus`
- `#/project/charanest`
- `#/project/k-racing`

사례는 `#/project/{slug}/{case-id}`로 직접 연결합니다. 예: `#/project/kice/kafka-order`. 개요·구조·기여도 같은 경로의 `project-overview`, `architecture`, `contributions`로 연결할 수 있습니다.

## 경력 내용 수정 원칙

사실 기준은 비공개 Resume 자료의 프로젝트별 소스 마스터 → 증거색인 → 개인기여 상세근거입니다. 원본 자료·내부 소스·실데이터·운영 SQL을 이 저장소나 빌드 산출물에 복사하지 않습니다.

- A: 직접 구현·수정·설계가 연결된 확인 범위에서 능동형 사용
- B: 수행·참여와 기록의 한계를 구분. 확인된 직접 수행을 불필요하게 축소하지 않음
- C: 프로젝트 환경과 전체 구조에만 사용
- D: 공개하지 않음. 당시 가설은 가설로, 현재 개선안은 별도 필드로 구분
- 커밋·매핑·체크리스트 건수를 개인 기능 수나 KPI로 변환하지 않음
- DB 개선 수치는 핵심 쿼리에 한정하며 주변 쿼리의 미개선도 함께 표기
- NTCN tenant schema와 KICE 기관별 DB 분리를 혼용하지 않음

`steps`에는 자료로 확인되는 사고 흐름만 추가합니다. 확인되지 않은 조사·대안·검증을 채우지 말고 `limits`에 추가 확인 사항을 적습니다. 현재 관점의 개선은 `future`에 기록합니다.

## 아티클 구성과 가독성

- 대표 사례는 실무의 DB 조회 개선·Kafka 이벤트 순서와 개인 프로젝트 K-Racing의 서버 입력 재생·기록 검증입니다. 각 카드에 실무·개인 프로젝트를 표시하고 데스크톱 3열, 모바일 1열로 배치합니다. Excel 저장 계약과 수동점수 보존 재채점은 KICE 상세의 보조 근거로 유지합니다.
- KICE의 Kafka·OpenFeign·MSA 표기는 채점 Consumer와 서비스 연동 경험에 연결합니다. 전체 아키텍처 설계나 장애 시 전달 보장까지의 성과로 확대하지 않습니다.
- KICE의 답안 정규화·채점 규칙은 기존 기여 내용을 기능 개발 사례로 재구성했습니다. 새로운 성과 수치나 확인되지 않은 설계를 추가하지 않았습니다.
- `comparison`은 기존 설명과 측정값을 정리한 표입니다. 원본 증거를 새로 확보한 것으로 표현하지 않습니다.
- `compact` 사례는 요약·담당·결과·한계를 먼저 보여주고 본문을 접습니다. 해당 사례 주소로 이동하면 본문이 열립니다. 기존 사례 ID를 유지합니다.
- `limits`는 결과 옆에 항상 표시합니다. `learning`과 `future`는 선택적인 회고로 구분합니다.
- 본문은 단일 열로 읽히며 데스크톱 17px, 모바일 16px를 기준으로 합니다. 제목·소제목·보조 문구의 크기와 간격을 구분하고 한국어 줄바꿈을 확인합니다.

참고한 디자인 문서:

- [GOV.UK Layout](https://design-system.service.gov.uk/styles/layout/): 읽을 수 있는 본문 폭과 열 구성
- [Carbon Typography style strategies](https://carbondesignsystem.com/elements/typography/style-strategies/): 긴 글의 읽기와 탐색을 위한 제목·본문 위계
- [USWDS Typography](https://designsystem.digital.gov/components/typography/): 글줄 길이와 행간의 역할

현재 배경색·강조색·카드·테마는 유지하며 원칙을 적용했습니다. 영문 글자 수 권장치를 한글에 그대로 적용하지 않습니다.

## 개인 프로젝트 출처

2026.09.05에 공개 쇼케이스와 본인 블로그를 대조했습니다. 공개된 설명·회고에 근거하며, 비공개 애플리케이션의 소스 감사나 테스트 재실행 결과로 표현하지 않습니다.

- [CharaNest 쇼케이스](https://github.com/arden-deq/CharaNest-showcase): 8월 기준 로컬 우선 실행, 프로토타입·다운로드 미제공, 역할·권한·기억·품질 기준
- [5월 대화모델 회고](https://clsrn4561.tistory.com/30), [6월 대화 품질 검증](https://clsrn4561.tistory.com/31): 당시 검색 파이프라인 실험과 현재 기본 앱 경로를 구분
- [K-Racing 쇼케이스](https://github.com/arden-deq/K-Racing-showcase), [기술 설계](https://github.com/arden-deq/K-Racing-showcase/blob/main/docs/TECHNICAL_NOTES.md), [8월 회고](https://clsrn4561.tistory.com/33): 초기 서버 권위 방식의 장애와 현재 호스트 Worker·WebRTC 구조를 구분. AI 도구 활용과 본인의 판단·검증 역할 명시
- `public/projects/charanest-overlay.jpg`: CharaNest 쇼케이스의 `docs/screenshots/main-overlay.jpg`
- `public/projects/k-racing-race.png`: K-Racing 쇼케이스의 `assets/k-racing-race.png`

화면은 소유자의 포트폴리오 반영 요청에 따라 공개 원본을 변형 없이 사용했습니다. 각 저장소의 원래 이용 조건을 유지하며 별도 재배포 허가를 부여하지 않습니다.

## GitHub Pages

`.github/workflows/main-ci.yml`은 main에 push하면 의존성 설치 → lint → build → `docs/` artifact 업로드 → Pages 배포를 수행합니다. 로컬 변경이나 build만으로는 공개 사이트가 바뀌지 않습니다.
