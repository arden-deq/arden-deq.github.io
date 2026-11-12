import { kice } from './kice'
import { futurenuri } from './futurenuri'
import { ntcn } from './ntcn'
import { charanest } from './charanest'
import { kracing } from './kracing'
import type { Project, SkillCategory } from './types'
export type { Project, SkillCategory } from './types'

const sideProject: Project = {
  slug: 'keep-your-focus',
  name: 'Keep Your Focus',
  shortName: 'Keep Your Focus',
  period: '2025.01~2025.02',
  role: '개인 프로젝트 · 기획·개발·배포',
  tech: ['TypeScript', 'Chrome Extensions (MV3)', 'Vite'],
  summary: '집중 타이머와 사이트 차단을 제공하는 Chrome 확장 앱을 만들어 스토어에 배포했습니다.',
  focus: '개인의 생산성 문제를 사용 가능한 제품으로',
  context: ['작업 중 주의가 분산되는 문제에서 출발한 개인 프로젝트입니다. 집중 시간을 설정하고 특정 사이트 또는 허용 목록 외 사이트를 차단할 수 있습니다.'],
  contributions: [
    { title: '브라우저 확장 앱 개발·배포', description: '옵션 화면과 사이트 차단·집중 타이머를 구성하고 Chrome Web Store에 배포했습니다.' },
  ],
  cases: [],
  links: [{ title: 'Chrome Web Store에서 보기', url: 'https://chromewebstore.google.com/detail/keep-your-focus/oijcceoleoibbniknolbkhcocggnckgp' }],
}

export const profile = {
  hero: {
    name: '남정덕',
    title: 'Backend Engineer · Java / Spring',
    headline: '담당 경계와 상관없이,\n제품의 문제를 끝까지 풉니다.',
    summary: '문항·시험지·채점 API를 개발하고, SQL 병목과 채점 오류를 데이터로 대조해 바로잡는 Java/Spring 백엔드 개발자입니다.',
  },
  careerSummary: {
    asOf: '2026.11',
    total: '약 4년 3개월',
    permanent: '3년',
    freelance: '1년 3개월',
    current: '퓨쳐누리 · 프리랜서',
    scope: 'KICE 문항·시험지·채점 개발',
    calculation: '정규직 2021.10.01~2024.09.30(3년)과 프리랜서 2025.07 하순~2026.11(1년 3개월)을 합산했습니다. 재직 중 프로젝트 기간은 중복 합산하지 않았습니다.',
  },
  projects: [kice, futurenuri, ntcn],
  explorations: [kracing, charanest],
  sideProject,
  career: [
    {
      period: '2021.10~2024.09',
      title: '퓨쳐누리',
      subtitle: '정규직 · Java Backend Engineer · 3년',
      points: [
        '문제은행·온라인 시험·수련관리 시스템을 개발·운영하며 DB·서버·파일 장애를 분석·복구했습니다.',
        '재직 중 NTCN의 MSA 기반 SaaS 전환에서 문제은행(QST) 트랙을 맡아 화면-API 전환 매핑표를 작성하고, 문항·시험지·검수 API 전환과 안정화에 참여했습니다.',
        '재직 중 타 팀 요청으로 한국교육과정평가원 학업성취도 자율평가 이전 시스템에 투입돼 장학사 통계 화면과 인력풀 API 연계를 개발했습니다.',
      ],
    },
    {
      period: '2025.07~현재',
      title: '퓨쳐누리',
      subtitle: '프리랜서 · Java Backend Engineer',
      points: ['KICE AI 기반 학력진단 시스템에 참여해 문항·시험지·채점을 개발하고, MSA 환경의 서비스 연동과 Kafka 채점 이벤트를 다룹니다.'],
    },
  ],
  education: [
    { period: '2015.03~2021.02', title: '계명대학교', subtitle: '문헌정보학 학사' },
    { period: '2021', title: '한국IT교육원', subtitle: 'Java 과정 수료' },
  ],
  skills: [
    { category: '도메인과 API 구현', items: ['Java 17', 'Spring Boot', 'MyBatis', 'OpenFeign'], context: '문항·시험지 API, 유형별 저장과 변환, 서비스 간 호출을 구현했습니다.', href: '#/project/kice/excel-contract' },
    { category: 'SQL과 데이터 정합성', items: ['PostgreSQL', 'MSSQL', 'Oracle', 'SQL'], context: 'MyBatis 쿼리 작성, 복합 인덱스 적용, 기관별 통계와 운영 데이터 대조에 사용했습니다.', href: '#/project/neotest-maintenance/database-bottleneck' },
    { category: '이벤트와 운영 신뢰성', items: ['Kafka', 'Redis', 'Tomcat', 'Docker'], context: 'Kafka 채점 Consumer와 Redis 캐시를 다루고, Tomcat·컨테이너 환경의 운영 문제를 조사했습니다.', href: '#/project/kice/kafka-order' },
    { category: '검증과 서비스 연결', items: ['ArchUnit', 'Jasypt', 'JavaScript', 'TypeScript'], context: 'ArchUnit 계층 검사와 Jasypt 설정 암호화를 적용하고, 관리자 화면과 검증 도구를 연결했습니다.', href: '#/project/kice' },
  ] satisfies SkillCategory[],
  contact: {
    email: 'jdnam1996@gmail.com',
    github: 'https://github.com/arden-deq',
    blog: 'https://clsrn4561.tistory.com',
  },
}

export const scorecard = [
  { value: '1.3', unit: '초', label: '문항 검색 API p95 응답시간', basis: '13.2초에서 단축 · 3초 넘는 요청 20.8% → 0.2%', href: '#/project/kice/search-latency' },
  { value: '175', unit: '명', label: '운영 재채점, 실패 0건', basis: '수동점수 525건 보존 · 총점 변화가 사전 예상과 일치', href: '#/project/kice/safe-regrading' },
  { value: '1,447', unit: '건', label: '내 변경을 결과 공개 전에 전수 검수', basis: '판정 674건을 스스로 찾아 정정 · 승인 후 재채점 반영', href: '#/project/kice/hotspot-preview' },
  { value: '99.6', unit: '%', label: '핵심 SQL 실행시간 단축', basis: '93,051ms → 382ms · 핵심 SQL 1건 기준', href: '#/project/neotest-maintenance/database-bottleneck' },
] as const

// 홈의 대표 사례 아래에 한 줄씩 보여주는 사례. 수치의 범위는 각 상세의 기록을 그대로 따릅니다.
export const moreCases = [
  { tag: '담당 범위 밖', title: '담당이 아닌 채점 순서 문제를 분석해 해법을 제안', note: '실제 응시 부하에서 드러난 문제 · 동일 Topic·Key와 멱등성 키를 제안해 검수 후 반영', href: '#/project/kice/kafka-order' },
  { tag: '조회 성능', title: '문항 검색 API p95 응답시간 13.2초 → 1.3초', note: '후보 키 페이징과 상세 조회를 분리 · 3초 넘는 요청 20.8% → 0.2% (운영 APM 기준)', href: '#/project/kice/search-latency' },
  { tag: '성능 시험', title: '외부 업체 성능 시험 전 JMeter 사전 점검', note: '기준은 동시접속 10,000·평균 4,500 TPS·응답 3초, 외부 업체 시험 통과', href: '#/project/ntcn/contributions' },
  { tag: '저장 계약', title: 'Excel에 없는 값은 삭제 요청이 아니다', note: '전체 교체를 식별 Key 기반 갱신으로 변경', href: '#/project/kice/excel-contract' },
] as const

export const featuredCases = [
  {
    project: kice, caseId: 'safe-regrading', visual: 'checks',
    tag: '데이터 정합성', metric: '525 / 525', metricNote: '수동점수 보존 · 총점 +844 예상과 일치',
    title: '수동점수를 지키면서 175명을 재채점했습니다',
    description: '실행 전에 절차서를 써서 검토를 받았습니다. 바꿀 점수와 지킬 점수를 나누고, 백업과 복구 훈련, 대표 2명 선실행을 거쳐 한 건씩 확대했습니다.',
  },
  {
    project: kice, caseId: 'hotspot-preview', visual: 'checks',
    tag: '반영 전 검증', metric: '674건', metricNote: '오답→정답 661 · 정답→오답 13 · 자동판정 1,446건 기대값 일치',
    title: '운영 답안 1,447건을 대조해, 결과가 나가기 전에 판정 674건을 바로잡았습니다',
    description: '시험 1주일 전에 제가 추가한 문항 유형의 채점을 운영 데이터로 직접 검수해 결함을 찾았습니다. 실제 요청 반례로 보완하고, 저장된 답안 전체를 새 기준으로 먼저 판정했습니다.',
  },
  {
    project: futurenuri, caseId: 'database-bottleneck', visual: 'timing',
    tag: '성능', metric: '382ms', metricNote: '93,051ms에서 단축 · 핵심 SQL 1건의 전후 기록',
    title: '3,062만 건 테이블의 조회 병목을 복합 인덱스로 풀었습니다',
    description: 'DB CPU 100%의 원인을 실제 JOIN 조건으로 좁혀 인덱스를 설계하고, 주변 쿼리까지 전후를 비교했습니다.',
  },
] as const
