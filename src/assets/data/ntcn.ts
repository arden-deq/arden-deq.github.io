import type { Project } from './types'

export const ntcn: Project = {
  slug: 'ntcn',
  name: 'NTCN · 문제은행 클라우드 SaaS 전환',
  shortName: 'NTCN',
  role: 'Java Backend Engineer',
  period: '2023년 · 전환·안정화',
  employment: { company: '퓨쳐누리', type: '정규직' },
  tech: ['Java', 'REST API', 'MSA', 'PostgreSQL', 'MSSQL'],
  featuredTech: ['Java', 'REST API', 'MSA', 'PostgreSQL', 'MSSQL'],
  summary: '사내 문제은행의 MSA 기반 클라우드 SaaS 전환에서 QST 문항·시험지·검수 API 개발에 참여했습니다. 기존 화면·호출과 신규 계약을 연결하고, DB 전환 과정의 문항 추출·등록 안정화에 참여했습니다.',
  focus: '레거시 → QST REST API · 논리삭제 · 집계 기준 · 부모-자식 저장',
  responsibility: 'QST 문항·시험지·검수 API 전환과 정합성 조치에 참여했습니다. 후속 점검 결과는 별도 점검자의 기록으로 확인했습니다.',
  context: [
    '퓨쳐누리 사내 최초 MSA 프로젝트이자 첫 클라우드 성공 전환 사례입니다. 레거시 화면·Controller 중심 기능을 QST·APLY·SYS 경계와 신규 REST API로 옮기는 맥락에서 문제은행 트랙을 담당했습니다.',
    'QST의 문항관리·시험지관리·검수를 담당했습니다. 아래 내용은 전환 매핑표와 수정 체크리스트를 바탕으로 정리했으며, 당시 핵심 소스·Git이 없어 구현 세부를 설명할 수 있는 범위는 제한적입니다.',
  ],
  flow: {
    summary: '기존 화면·호출을 신규 API 계약과 서비스 책임에 연결하는 전환 구조입니다. QST가 제 담당 범위이며, 공통 인증·인프라 전체를 구축한 것은 아닙니다.',
    nodes: [
      { title: '레거시 기능', description: '화면 · Controller · 기존 URI', contribution: '문제은행 트랙의 전환 매핑 참여' },
      { title: 'REST API 계약', description: 'HTTP method · versioned URI · 쿼리 전환', contribution: 'QST 호출·데이터 계약 전환 참여' },
      { title: '서비스 경계', description: 'QST 문항·시험지 / APLY 응시 / SYS 공통', contribution: 'QST 문항·시험지·검수 안정화' },
    ],
    environment: '프로젝트 환경: MSSQL → PostgreSQL, tenant schema 기반 분리, Zuul·Eureka·JWT/Spring Security·Redis·Docker/Registry·Kubernetes/PaaS. 기관별 DB를 분리하는 현재 KICE 구조와 다릅니다.',
  },
  contributions: [
    { title: 'QST 기능의 API 전환', description: '문제은행·문항·시험지·검수 담당으로 기존 호출과 신규 HTTP method·버전 URI·서비스 책임을 연결하는 전환 개발과 매핑에 참여했습니다.' },
    { title: '데이터 의미의 보존과 안정화', description: '자동 문항 추출의 삭제 상태, 정답률의 집계 범위, 일괄 등록의 부모·자식 데이터, 시험지 배분·순서 문제의 분석·조치에 참여했습니다.' },
  ],
  cases: [
    {
      id: 'api-boundary', navTitle: 'QST API 전환',
      title: '기존 화면의 동작을 QST의 REST API로 연결했습니다',
      axis: 'Correctness',
      summary: '문항·시험지·검수 기능의 기존 호출과 신규 HTTP method·URI·서비스 책임을 연결하는 전환 개발과 매핑에 참여했습니다.',
      decision: '기존 화면의 호출을 신규 HTTP method·URI·서비스·쿼리 상태와 연결해 전환 범위를 추적했습니다.',
      role: 'QST 문제은행 트랙의 API 전환 개발·매핑 참여',
      outcome: '기존 호출과 신규 REST 계약, 쿼리 전환 상태를 연결해 추적 가능하게 정리',
      limits: '전체 서비스 경계와 공통 인프라 설계는 담당 범위에 포함하지 않습니다. 개별 메서드 구현과 상세 테스트는 현재 자료로 확인할 수 없습니다.',
      steps: [
        { label: '전환 대상 · 화면과 호출의 연결을 옮겼다', paragraphs: ['레거시 화면·Controller 중심 기능을 QST·APLY·SYS 경계의 REST API로 옮겼습니다. 저는 QST 문항관리·시험지관리·검수의 전환 개발과 매핑에 참여했습니다.'] },
        { label: '작업 단위 · 기존 호출과 신규 계약을 연결했다', paragraphs: ['전환 매핑표에서 기존 Controller·URI를 신규 Controller·HTTP method·버전 URI·메뉴·서비스·쿼리 전환 상태와 연결했습니다. 같은 화면 동작이 어느 서비스와 데이터 처리로 이어지는지 추적했습니다.'] },
      ],
    },
    {
      id: 'deleted-candidates', navTitle: '삭제 문항의 추출 제외', compact: true,
      title: '자동 추출에서 삭제 문항을 제외하는 조치에 참여했습니다',
      axis: 'Correctness',
      summary: 'MSSQL에서 PostgreSQL로 전환한 뒤 자동 문항 추출의 요청 수와 결과 수가 달라, 삭제 상태 조건 보정에 참여했습니다.',
      decision: '삭제 상태인 문항은 유효 후보 집합에 들어가지 않도록 조건을 보정했습니다.',
      role: '자동 추출 조건 보정 참여',
      outcome: '별도 점검자의 후속 점검에서 분류·난이도별 추출 정상 동작 확인',
      limits: '실제 수정 파일·메서드와 개인 검증 절차는 현재 자료로 확인할 수 없습니다.',
      steps: [
        { label: '조사와 조치', paragraphs: ['자동 추출 stored logic과 삭제 상태 조건을 점검했습니다. 삭제 문항이 유효 후보 집합에 포함되지 않도록 조건을 보정하는 조치에 참여했습니다.'] },
      ],
    },
    {
      id: 'response-rate', navTitle: '정답률의 집계 범위', compact: true, status: '분석 사례',
      title: '두 정답률이 사용하는 분모의 차이를 분석했습니다',
      axis: 'Correctness',
      summary: '문항 목록과 기출이력의 정답률 차이에서 전체 출제·응시 이력과 특정 유효 시험의 집계 범위를 구분했습니다.',
      decision: '계산식보다 먼저 두 화면이 사용하는 분모와 유효 시험의 범위를 비교했습니다.',
      role: '정답률 불일치 건의 집계 범위 분석 참여',
      outcome: '계산 오류와 집계 기준 차이를 구분',
      limits: '체크리스트의 완료 상태와 최종 UI·정책 합의, 이후 적용 결과는 미확인입니다.',
      steps: [
        { label: '분석', paragraphs: ['두 화면이 같은 데이터를 같은 기준으로 계산하는지 비교했습니다. 전체 출제·응시 이력과 특정 유효 시험의 분모 차이로 값이 달라질 수 있는 정상 동작으로 분석됐습니다.'] },
      ],
    },
    {
      id: 'bulk-consistency', navTitle: '문항·답안의 부분 저장', compact: true,
      title: '문항과 답안이 함께 등록되도록 결함 조치에 참여했습니다',
      axis: 'Correctness',
      summary: '서술형 문항 일괄 등록에서 부모 문항만 남고 답안이 누락되는 문제를 다뤘습니다.',
      decision: '부모 문항 생성만으로 성공을 판단하지 않고, 답안 등록까지 확인하는 기준으로 조치에 참여했습니다.',
      role: '일괄 등록 결함 조치 참여',
      outcome: '별도 점검자의 후속 점검에서 문항과 서술형 답안의 동시 등록 확인',
      limits: '당시 원인을 좁힌 코드 계층, 트랜잭션 경계와 rollback 정책은 현재 자료로 확인할 수 없습니다.',
      steps: [
        { label: '문제와 조치', paragraphs: ['부모 문항 생성만으로 등록 성공을 판단하면 답안 누락을 놓칠 수 있었습니다. 문항과 답안이 함께 등록되도록 조치에 참여했고, 후속 점검에서 답안 등록까지 확인됐습니다.'] },
      ],
    },
  ],
}
