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

export const featuredCases = [
  {
    project: futurenuri, caseId: 'database-bottleneck', axis: 'Performance',
    context: '실무',
    label: 'DB 병목', headline: '93,051 → 382ms', title: '핵심 SQL의 실행시간 단축',
    description: '3,062만 건 테이블의 JOIN 조건을 조사해 복합 인덱스를 적용했습니다. 핵심 SQL의 전후 실행시간을 비교했습니다.',
    scope: '핵심 SQL 1건 · 전후 기록',
  },
  {
    project: kice, caseId: 'kafka-order', axis: 'Reliability',
    context: '실무',
    label: 'Kafka 순서', headline: '저장 먼저, 채점 다음', title: '답안보다 먼저 끝나던 채점',
    description: '이벤트 순서 역전을 로그로 추적했습니다. 동일 Topic·Key와 저장 후 발행을 제안하고 구현·검증에 참여했습니다.',
    scope: '정상 흐름의 선후 관계 확인',
  },
  {
    project: kice, caseId: 'safe-regrading', axis: 'Correctness',
    context: '실무',
    label: '안전한 재채점', headline: '175명 · 525건 보존', title: '수동점수를 보존하는 재채점',
    description: '대표 2명 선실행 후 전체 대상으로 확대했습니다. 수동점수 보존과 예상·실제 총점 변화를 각각 대조했습니다.',
    scope: '단일 운영 작업 · 업무일지 기준',
  },
] as const
