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
    headline: '운영 문제를 끝까지 추적하고,\n데이터의 의미를 지킵니다.',
    summary: '문항·시험지·채점 API를 개발하고, 저장 계약·SQL 병목·이벤트 순서를 바로잡는 Java/Spring 백엔드 개발자입니다.',
  },
  careerSummary: {
    asOf: '2026.09',
    total: '약 4년 1개월',
    permanent: '2년 11개월',
    freelance: '1년 2개월',
    current: '퓨쳐누리 · 프리랜서',
    scope: 'KICE 문항·시험지·채점 개발',
    calculation: '2021.10~2024.09와 2025.07~2026.09의 월 차이를 합산했습니다. 일 단위는 미포함이며, 재직 중 프로젝트 기간은 중복 합산하지 않았습니다.',
  },
  projects: [kice, futurenuri, ntcn],
  explorations: [charanest, kracing],
  sideProject,
  career: [
    {
      period: '2021.10~2024.09',
      title: '퓨쳐누리',
      subtitle: '정규직 · Java Backend Engineer · 2년 11개월',
      points: [
        '문제은행·온라인 시험·수련관리 시스템을 개발·운영하며 DB·서버·파일 장애를 분석·복구했습니다.',
        '재직 중 NTCN의 MSA 기반 SaaS 전환에 참여해 QST 문항·시험지·검수 API를 개발하고 데이터 정합성을 보완했습니다.',
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
  { value: '99.6', unit: '%', label: '핵심 SQL 실행시간 단축', basis: '93,051ms → 382ms · 핵심 SQL 1건 기준', href: '#/project/neotest-maintenance/database-bottleneck' },
  { value: '525', unit: '건', label: '재채점 중 수동점수 보존', basis: '175명 재채점 · 실패 0건', href: '#/project/kice/safe-regrading' },
  { value: '314', unit: '건+', label: '운영 요청 처리', basis: '15개 기관 · 16개 시스템', href: '#/project/neotest-maintenance' },
  { value: '4', unit: '년 1개월', label: '총 실무경력', basis: '2026.09 기준 · 정규직과 프리랜서 합산', href: '#experience' },
] as const

export const featuredCases = [
  {
    project: futurenuri, caseId: 'database-bottleneck', visual: 'timing',
    tag: '성능', metric: '382ms', metricNote: '93,051ms에서 단축 · 핵심 SQL 1건의 전후 기록',
    title: '3,062만 건 테이블의 조회 병목을 복합 인덱스로 풀었습니다',
    description: 'DB CPU 100%의 원인을 실제 JOIN 조건으로 좁혀 인덱스를 설계하고, 주변 쿼리까지 전후를 비교했습니다.',
  },
  {
    project: kice, caseId: 'kafka-order', visual: 'sequence',
    tag: '이벤트 순서', metric: '저장 → 채점', metricNote: '정상 흐름의 선후 관계 확인',
    title: '답안 저장보다 먼저 끝나던 채점의 순서를 바로잡았습니다',
    description: '응시 ID별 로그로 순서 역전을 찾고, 동일 Topic·Key와 저장 후 발행을 제안해 구현·검증에 참여했습니다.',
  },
  {
    project: kice, caseId: 'safe-regrading', visual: 'checks',
    tag: '데이터 정합성', metric: '525 / 525', metricNote: '수동점수 보존 · 총점 +844 예상과 일치',
    title: '수동점수를 지키면서 175명을 재채점했습니다',
    description: '바꿀 점수와 지킬 점수를 나누고, 전체 preview와 대표 2명 선실행으로 범위를 확인한 뒤 확대했습니다.',
  },
] as const
