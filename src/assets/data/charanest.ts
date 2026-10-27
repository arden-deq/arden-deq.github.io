import type { Project } from './types'

const showcaseUrl = 'https://github.com/arden-deq/CharaNest-showcase'
const pipelinePost = 'https://clsrn4561.tistory.com/31'

export const charanest: Project = {
  slug: 'charanest',
  name: 'CharaNest',
  shortName: 'CharaNest',
  period: '2026 · 개발 기록 5~8월',
  role: '개인 프로젝트 · 제품 기획·설계·개발·평가',
  tech: ['Electron', 'llama.cpp', 'SQLite', 'TypeScript', 'React', 'Python'],
  summary: '내 PC에서 대화하고 기억하는 AI 컴패니언. 로컬 모델을 붙이는 데서 출발해 대화의 계약, 런타임 수명주기와 출시 기준을 다뤘습니다.',
  focus: '로컬 AI · 대화 품질 · 사용자 통제형 기억',
  showcase: {
    category: 'Local AI · Desktop',
    status: '개발 중 · Prototype',
    image: 'projects/charanest-overlay.jpg',
    imageAlt: '데스크톱 위에 픽셀 캐릭터, 대화 로그와 입력창을 띄운 CharaNest 개발 화면',
    caption: '실제 개발 빌드 · 화면 일부에는 이전 프로젝트 명칭이 남아 있습니다.',
    question: '“더 짧게 말해줘”가 왜 검색으로 이어졌을까?',
    quickLink: { title: '설계·화면 보기', url: showcaseUrl },
  },
  context: [
    '픽셀 캐릭터가 데스크톱에 머물며 대화하는 오프라인 우선 AI 컴패니언 프로토타입입니다. Electron 오버레이, 로컬 LLM과 SQLite를 연결하고 Windows·macOS에서 개발·검증했습니다.',
    '2026년 8월 공개 문서 기준, 기본 실행 경로는 외부 검색 백엔드를 시작하지 않습니다. 아래 5~6월의 검색·대화 파이프라인 사례는 이전 실험 기록이며, 최신 정보 검색 실험은 현재 제품 기본 경로와 분리된 평가 환경에 있습니다.',
    '현재 비공개 개발 중으로 다운로드는 제공하지 않습니다. 공개 저장소에는 설계 설명과 개발 화면을 담았으며, 애플리케이션 소스·모델·학습 데이터는 포함하지 않습니다.',
  ],
  flow: {
    summary: '현재 제품의 로컬 실행 구조입니다. UI의 요청은 제한된 IPC를 통과하고, Main process가 저장소와 모델 프로세스를 관리합니다.',
    nodes: [
      { title: 'Desktop UI', description: '투명 오버레이 · 캐릭터 · 대화 입력', contribution: 'Electron · React 화면 개발' },
      { title: 'IPC → Main', description: '허용된 요청과 payload 검증', contribution: '권한 경계 · 대화 흐름 설계' },
      { title: 'Runtime / Memory', description: 'Main → llama-server 추론 / SQLite 저장', contribution: '프로세스 수명주기 · 기억 조회·삭제' },
    ],
    environment: 'Main이 로컬 추론과 기억 저장소를 각각 관리합니다. 모든 응답을 자동으로 학습에 넣지 않으며, 사용자가 승인한 답변 교정만 별도의 SFT/DPO 실험 데이터로 내보냅니다.',
  },
  contributions: [
    { title: 'AI를 일상적인 데스크톱 경험으로', description: '투명 오버레이, 캐릭터 상호작용과 대화 UI를 개발하고 로컬 LLM을 연결했습니다. 기능 동작과 사용자가 느끼는 대화 품질을 함께 검증했습니다.' },
    { title: '대화 의도와 검색 계약 분리', description: '말투·길이 수정 요청이 검색으로 새는 경로를 추적했습니다. 이전 검색 맥락을 현재 요청에 잘못 전달하지 않도록 계약과 실패 진단을 보완했습니다.' },
    { title: '모델 프로세스와 권한 경계', description: 'Main이 sidecar 시작·준비·종료를 소유하도록 구성했습니다. Renderer의 Node 권한을 분리하고 제한된 IPC와 payload 검증을 적용했습니다.' },
    { title: '기억의 통제권과 평가 기준', description: '기억 조회·개별/전체 삭제·내보내기를 제공했습니다. 기능 테스트와 제품 품질 gate를 분리하고 승인된 교정 데이터만 학습 실험으로 연결했습니다.' },
  ],
  cases: [
    {
      id: 'conversation-contract',
      navTitle: '대화 의도와 검색 계약',
      title: '“더 짧게 말해줘”가 검색어가 되고 있었다',
      axis: 'Correctness',
      status: '2026.05~06 실험 기록',
      summary: '작은 모델의 한계로 보였던 대화 오류를 이전 맥락과 현재 요청의 계약 문제로 좁혔습니다.',
      decision: '기존 답변의 스타일 수정은 새 정보 조회와 분리하고, 이전 검색 맥락을 현재 요청에 전달하지 않는 계약을 만들었습니다.',
      role: '대화 흐름 분석, style continuation 계약과 실패 진단 보완, 회귀 평가.',
      steps: [
        { label: '증상 · 초기 가설', paragraphs: ['짧은 후속 요청에서 대화가 어긋났습니다. 처음에는 작은 로컬 모델의 성능을 의심했지만, “더 짧게”라는 요청이 새 검색으로 이어지는 동작은 모델 교체만으로 설명하기 어려웠습니다.'] },
        { label: '조사 · 맥락의 전달 경로', paragraphs: ['직전 답변에 남은 출처 선호와 검색 메타데이터가 현재의 스타일 요청과 합쳐지고 있었습니다. 검색 실패 때도 오류 상태만 남고 제공자·백엔드 진단이 비어 있어, 검색어 문제와 백엔드 장애를 구분하기 어려웠습니다.'] },
        { label: '판단 · 요청의 의미를 먼저 고정', paragraphs: ['기존 답변을 다시 쓰는 요청은 새 정보 조회와 분리했습니다. style continuation은 직접 답변하고, 이전 출처를 검색 기준으로 삼거나 이전 조회 메타데이터를 현재 turn에 붙이지 않는 계약을 만들었습니다.'] },
        { label: '구현 · 실패도 추적 가능하게', paragraphs: ['스타일 수정 요청을 direct 경로로 유지하도록 보완했습니다. 조회 실패 경로에는 제공자, 시도한 검색어와 실패 분류를 남겨 평가 결과에서 원인을 추적할 수 있게 했습니다.'] },
        { label: '검증', paragraphs: ['전체 대화 회귀 평가에서 예상하지 않은 검색, 진단 누락, 언어 혼합과 런타임 오류를 구분해 확인했습니다. 6월 기록의 해당 실행에서는 예상하지 않은 검색과 진단 누락이 0건이었지만, 주제 적합성과 링크 실패 등 품질 과제는 남았습니다.'] },
      ],
      outcome: '스타일 수정 요청을 direct 답변으로 유지하고, 검색 실패의 진단 정보를 보존',
      learning: 'AI 응답의 정확성은 모델뿐 아니라 입력 의도와 맥락을 전달하는 계약에 달려 있습니다. 품질을 개선하려면 실패 원인을 구분할 수 있는 기록부터 필요했습니다.',
      limits: '결과는 6월 블로그에 기록한 회귀 실행 범위입니다. 현재 기본 앱에서 검색을 상시 실행한다거나 제품 전체 품질을 달성했다는 의미는 아닙니다.',
      source: { title: '대화 품질을 제품처럼 검증하기', url: pipelinePost },
    },
    {
      id: 'runtime-quality',
      navTitle: '런타임과 출시 기준',
      title: '테스트는 통과했지만, 출시를 보류했다',
      axis: 'Reliability',
      summary: '로컬 모델의 시작·종료와 실행 환경을 관리하고, 기능 통과와 제품 출시의 기준을 분리했습니다.',
      decision: '실행 환경을 고정해 재현하고, 기능 테스트 통과와 별도로 제품 품질 gate를 적용했습니다.',
      role: '로컬 런타임 통합, OS별 재현 절차와 평가·릴리스 자동화.',
      steps: [
        { label: '문제 정의', paragraphs: ['데스크톱 AI는 모델 파일, native module, GPU/CPU와 자식 프로세스 상태에 영향을 받습니다. 같은 앱이라도 Windows와 macOS에서 응답이 달랐고, 기능 테스트의 통과가 사용자 경험의 완성을 뜻하지 않았습니다.'] },
        { label: '조사 · 재현 변수를 분해', paragraphs: ['OS별 응답 차이를 모델의 랜덤성으로 묶지 않았습니다. 코드, 모델 hash, runtime build, sampler, 사용자 데이터와 기능 flag를 순서대로 고정하고 정책·스트리밍·평가 데이터의 영향을 따로 확인하는 절차를 만들었습니다.'] },
        { label: '판단과 구현', paragraphs: ['모델을 앱이 관리해야 할 프로세스로 다뤘습니다. runtime profile, 준비 확인, 프로세스 소유권과 강제 종료 경로를 분리했습니다. 시작 실패를 다른 모델로 조용히 대체하지 않고 사용자와 진단 로그에 드러내도록 했습니다.'] },
        { label: '검증 · 출시 판단', paragraphs: ['공개 문서에 기록한 Windows 실행에서는 자동화 테스트와 Electron E2E가 통과했습니다. 그러나 별도 제품 품질 gate를 충족하지 못해 출시를 보류했습니다. 사용자 안전, 최종 UI 상태와 fallback의 투명성을 별도의 즉시 실패 기준으로 관리했습니다.'] },
      ],
      outcome: '기능 테스트 통과와 별개로 품질 gate를 적용하고, 프로토타입 상태를 유지',
      learning: '로컬 실행도 운영입니다. 재현 가능한 환경과 실패를 드러내는 진단, 사용자가 실제로 받는 결과를 기준으로 제품 준비 상태를 판단해야 했습니다.',
      limits: '공개 문서는 품질 gate 미충족과 출시 보류를 확인해 주지만, 당시 실패한 세부 항목과 미공개 QA 원문까지 공개하지는 않습니다.',
      source: { title: 'CharaNest 설계·품질 기준', url: showcaseUrl },
    },
  ],
  links: [{ title: 'GitHub · 설계와 화면', url: showcaseUrl }],
  writings: [
    { title: '[로컬 LLM 프로젝트] 대화모델 개선 삽질하기 - 모델 문제가 아니라 파이프라인 문제였을지도', url: 'https://clsrn4561.tistory.com/30', date: '2026.05.20', summary: '모델 교체라는 초기 생각에서 대화 맥락과 파이프라인의 책임으로 조사 범위를 넓힌 기록입니다.' },
    { title: '[로컬 LLM 프로젝트] 이제는 대화 품질을 제품처럼 검증하기', url: pipelinePost, date: '2026.06.07', summary: '불필요한 검색, 비어 있는 실패 진단과 멈춘 평가를 실제로 고치며 검증 기준을 정리했습니다.' },
  ],
}
