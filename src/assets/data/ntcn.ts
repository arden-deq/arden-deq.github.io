import type { Project } from './types'

export const ntcn: Project = {
  slug: 'ntcn',
  name: 'NTCN · 문제은행 클라우드 SaaS 전환',
  shortName: 'NTCN',
  role: 'Java Backend Engineer',
  period: '2023년 · 전환·안정화',
  employment: { company: '퓨쳐누리', type: '정규직' },
  tech: ['Java', 'REST API', 'MSA', 'PostgreSQL', 'MSSQL', 'JMeter'],
  featuredTech: ['Java', 'REST API', 'MSA', 'PostgreSQL', 'MSSQL'],
  summary: '사내 첫 MSA 클라우드 SaaS 전환에서 문제은행(QST) 트랙을 맡아, 기존 화면 호출과 신규 REST API를 잇는 전환 매핑표를 작성하고 문항·시험지·검수 API 전환과 DB 전환 후 안정화에 참여했습니다.',
  focus: '레거시 → QST REST API · 논리삭제 · 집계 기준 · 부모-자식 저장',
  responsibility: 'QST 문항·시험지·검수 API 전환과 정합성 조치에 참여했습니다. 후속 점검 결과는 별도 점검자의 기록으로 확인했습니다.',
  context: [
    '퓨쳐누리 사내 첫 MSA·클라우드 SaaS 전환 프로젝트입니다. 레거시 화면·Controller 중심 기능을 QST·APLY·SYS 경계와 신규 REST API로 옮기는 맥락에서 문제은행 트랙을 담당했습니다.',
    'QST의 문항관리·시험지관리·검수를 담당했습니다. 아래 내용은 전환 매핑표와 수정 체크리스트를 바탕으로 정리했으며, 당시 핵심 소스·Git이 없어 구현 세부를 설명할 수 있는 범위는 제한적입니다.',
  ],
  flow: {
    summary: '기존 화면·호출을 신규 API 계약과 서비스 책임에 연결하는 전환 구조입니다. QST가 제 담당 범위이며, 공통 인증·인프라 전체를 구축한 것은 아닙니다.',
    nodes: [
      { title: '레거시 기능', description: '화면 · Controller · 기존 URI', contribution: '문제은행 트랙의 전환 매핑표 작성' },
      { title: 'REST API 계약', description: 'HTTP method · versioned URI · 쿼리 전환', contribution: 'QST 호출·데이터 계약 전환 참여' },
      { title: '서비스 경계', description: 'QST 문항·시험지 / APLY 응시 / SYS 공통', contribution: 'QST 문항·시험지·검수 안정화' },
    ],
    environment: '프로젝트 환경: MSSQL → PostgreSQL, tenant schema 기반 분리, Zuul·Eureka·JWT/Spring Security·Redis·Docker/Registry·Kubernetes/PaaS.',
  },
  contributions: [
    { title: 'QST 기능의 API 전환', description: '문제은행·문항·시험지·검수 담당으로 기존 호출과 신규 HTTP method·버전 URI·서비스 책임을 연결하는 전환 매핑표를 작성하고 전환 개발에 참여했습니다.' },
    { title: '데이터 의미의 보존과 안정화', description: '자동 문항 추출의 삭제 상태, 정답률의 집계 범위, 일괄 등록의 부모·자식 데이터, 시험지 배분·순서 문제의 분석·조치에 참여했습니다. 추출과 일괄 등록은 별도 점검자의 후속 점검에서 정상 동작이 확인됐습니다.' },
    { title: '성능 시험 대비', description: '시험절차서의 성능 기준(동시접속 10,000·평균 4,500 TPS·응답 3초) 작성·검증에 참여했습니다. 외부 업체 성능 시험 전에 JMeter로 사전 점검했고, 외부 업체 시험은 통과했습니다.' },
  ],
  cases: [
    {
      id: 'api-boundary', navTitle: 'QST API 전환', compact: true,
      title: '기존 화면의 동작을 QST의 REST API로 연결했습니다',
      axis: 'Correctness',
      summary: '문항·시험지·검수 기능의 기존 호출과 신규 HTTP method·URI·서비스 책임을 연결하는 전환 매핑표를 작성하고 전환 개발에 참여했습니다.',
      decision: '기존 화면의 호출을 신규 HTTP method·URI·서비스·쿼리 상태와 연결해 전환 범위를 추적했습니다.',
      role: 'QST 문제은행 트랙의 전환 매핑표 작성, API 전환 개발 참여',
      outcome: '기존 호출과 신규 REST 계약, 쿼리 전환 상태를 연결해 추적 가능하게 정리',
      limits: '전체 서비스 경계와 공통 인프라 설계는 담당 범위에 포함하지 않습니다.',
      steps: [
        { label: '전환 대상 · 화면과 호출의 연결을 옮겼다', paragraphs: ['레거시 화면·Controller 중심 기능을 QST·APLY·SYS 경계의 REST API로 옮겼습니다. 저는 QST 문항관리·시험지관리·검수의 전환 매핑표를 작성하고 전환 개발에 참여했습니다.'] },
        { label: '작업 단위 · 기존 호출과 신규 계약을 연결했다', paragraphs: ['전환 매핑표에서 기존 Controller·URI를 신규 Controller·HTTP method·버전 URI·메뉴·서비스·쿼리 전환 상태와 연결했습니다. 같은 화면 동작이 어느 서비스와 데이터 처리로 이어지는지 추적했습니다.'] },
      ],
    },
  ],
}
