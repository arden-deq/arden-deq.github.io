import { kice } from './kice'
import { futurenuri } from './futurenuri'
import { ntcn } from './ntcn'
import { charanest } from './charanest'
import { kracing } from './kracing'
import { onsen } from './onsen'
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
  focus: '집중 타이머·사이트 차단 확장 앱',
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
    title: 'Java/Spring 백엔드 개발자',
    headline: '약 176만 명이 응시한 학력진단 플랫폼의\n채점 서비스를 처음부터 만들어 맡고 있습니다.',
    summary: '문항·시험지·채점 API를 개발합니다. 느린 SQL은 실제 조회 조건에서 원인을 찾고, 채점 변경은 반영 전에 운영 데이터와 대조합니다.',
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
  explorations: [kracing, onsen, charanest],
  sideProject,
  career: [
    {
      period: '2021.10~2024.09',
      title: '퓨쳐누리',
      subtitle: '정규직 · 백엔드 개발자 · 3년',
      points: [
        '문제은행·온라인 시험·수련관리 시스템을 개발·운영하며 DB·서버·파일 장애를 분석·복구했습니다.',
        '재직 중 NTCN의 MSA 기반 SaaS 전환에서 문제은행(QST) 트랙을 맡아 화면-API 전환 매핑표를 작성하고, 문항·시험지·검수 API 전환과 안정화에 참여했습니다.',
        '재직 중 타 팀 요청으로 한국교육과정평가원의 기존 학업성취도 자율평가 시스템에 투입돼 장학사 통계 화면과 인력풀 API 연계를 개발했습니다.',
      ],
    },
    {
      period: '2025.07~현재',
      title: '퓨쳐누리',
      subtitle: '프리랜서 · 백엔드 개발자 · 1년 3개월',
      points: [
        '한국교육과정평가원 AI 기반 학력진단 시스템(2026년 3~4월 시행에 약 176만 명 응시, 플랫폼 전체)에서 문항·시험지·채점을 개발합니다.',
        '채점 서비스의 자동채점을 처음부터 설계·구현했고(2025.11~12), 이후 부분·수동·재채점 규칙을 더했습니다. 2026.07에는 175명을 운영 재채점했고, 2026.10에는 핫스팟 입력형 채점을 추가했습니다.',
        'MSA 환경의 서비스 연동과 Kafka 채점 이벤트를 다룹니다.',
        '퓨쳐누리 시절 팀장이던 현 PL의 요청으로 다시 합류했습니다.',
      ],
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

// 채점표와 대표 사례는 같은 사례를 같은 순서, 같은 대표 수치로 보여줍니다.
export const scorecard = [
  { value: '525', unit: '건', label: '사람이 매긴 수동점수를 모두 지킨 재채점', basis: '33개 학교 175명 · 실패 0건 · 총점 변화가 사전 예상과 일치', href: '#/project/kice/safe-regrading' },
  { value: '674', unit: '건', label: '결과 공개 전에 찾아낸 잘못된 판정', basis: '제가 추가한 채점 · 운영 답안 1,447건 전수 대조 · PL·평가원 승인 후 재채점으로 반영됨', href: '#/project/kice/hotspot-preview' },
  { value: '1.3', unit: '초', label: '문항 검색 API 응답시간(p95)', basis: '요청의 95%가 약 1.3초 안에 응답 · 적용 전 13.2초, 운영 APM 기준', href: '#/project/kice/search-latency' },
  { value: '99.6', unit: '%', label: '핵심 SQL 실행시간 단축', basis: '93.1초 → 0.38초 · 핵심 SQL 1건, 각 1회 측정', href: '#/project/neotest-maintenance/database-bottleneck' },
] as const

// 홈의 대표 사례 아래에 한 줄씩 보여주는 사례. 수치의 범위는 각 상세의 기록을 그대로 따릅니다.
export const moreCases = [
  { tag: '담당 범위 밖', title: 'Kafka 채점 순서 역전 원인 분석·해법 제안', note: '실제 응시 부하에서 드러난 문제 · 로그 근거를 PL·시행팀에 공유 · 같은 Topic·Key와 멱등성 키를 제안해 검수 후 시행팀이 반영', href: '#/project/kice/kafka-order' },
  { tag: '성능 시험', title: 'NTCN 전환(2023) · 성능 시험 전 JMeter 사전 점검', note: '시험절차서의 성능 기준은 동시접속 10,000·평균 4,500 TPS·응답 3초 · JMeter 사전 점검 뒤 외부 업체 시험 통과', href: '#/project/ntcn/contributions' },
  { tag: '데이터 보존', title: 'Excel 업로드 때 기존 보정자료가 지워지던 문제 수정', note: '전체 교체를 식별 Key 기반 갱신으로 변경', href: '#/project/kice/excel-contract' },
] as const

export const featuredCases = [
  {
    project: kice, caseId: 'safe-regrading', visual: 'checks',
    tag: '데이터 정합성', metric: '525건', metricNote: '수동점수 보존 · 33개 학교 175명',
    title: '수동점수 525건을 지키면서 175명을 재채점했습니다',
    description: '자동채점이 불일치한 2문항을 다시 계산했습니다. 절차서를 써서 검토를 받고, 백업과 복구 훈련 뒤 대표 2명을 먼저 실행하고 나머지 173명을 한 건씩 재채점했습니다. 성취수준이 바뀐 28명도 식별했습니다.',
  },
  {
    project: kice, caseId: 'hotspot-preview', visual: 'checks',
    tag: '반영 전 검증', metric: '674건', metricNote: '오답→정답 661 · 정답→오답 13',
    title: '결과 공개 전에 운영 답안 1,447건을 전수 대조해 잘못된 판정 674건을 찾아냈습니다',
    description: '시험 1주일 전에 제가 추가한 문항 유형의 채점을 운영 데이터로 직접 확인하다 결함을 찾았습니다. 실제 요청 반례로 보완하고 저장된 답안 전체를 새 기준으로 먼저 판정했습니다. 674건은 PL·평가원 승인 뒤 전체 재채점으로 반영됐습니다.',
  },
  {
    project: kice, caseId: 'search-latency', visual: 'timing',
    tag: '조회 성능', metric: '1.3초', metricNote: 'p95 응답시간, 적용 전 13.2초 · 3초 넘는 요청 20.8% → 0.2% · 운영 APM 적용 전 12일·후 9일',
    title: '문항 검색 API의 p95 응답시간을 13.2초에서 1.3초로 줄였습니다',
    description: '응답시간의 99%가 SQL 시간이었습니다. 조건에 맞는 문항의 키만 먼저 페이징하고 그 페이지만 상세를 조회하도록 쿼리를 나눴고, 테스트 397개와 DEV 결과 비교를 거쳐 운영에 반영했습니다.',
  },
  {
    project: futurenuri, caseId: 'database-bottleneck', visual: 'timing',
    tag: '조회 성능', metric: '99.6%', metricNote: '93.1초 → 0.38초 · 핵심 SQL 1건, 각 1회 측정',
    title: '3,062만 건 테이블의 조회 병목을 복합 인덱스로 풀었습니다',
    description: 'DB CPU 100%의 원인을 실제 JOIN 조건으로 좁혀 인덱스를 설계했습니다. 주변 쿼리도 전후를 비교했고, 일부는 효과가 없거나 느려져 개선 수치는 핵심 SQL 1건으로 한정했습니다.',
  },
] as const
