export type Axis = 'Correctness' | 'Performance' | 'Reliability'

export interface CaseStep {
  label: string
  paragraphs: string[]
}

export type CaseEvidence = {
  caption: string
  note: string
} & (
  | { kind: 'timing'; beforeMs: number; afterMs: number }
  | {
    kind: 'sequence'
    before: { title: string; description: string }[]
    after: { title: string; description: string }[]
    beforeNote: string
    afterNote: string
  }
  | {
    kind: 'regrading'
    stages: { title: string; description: string }[]
    checks: { label: string; expected: string; actual: string }[]
  }
  | {
    kind: 'contract'
    scenarios: { label: string; input: string; before: string; after: string }[]
  }
)

export interface EngineeringCase {
  id: string
  navTitle?: string
  title: string
  axis: Axis
  summary: string
  decision?: string
  verification?: string
  scope?: string
  evidence?: CaseEvidence
  role: string
  outcome: string
  steps: CaseStep[]
  learning?: string
  limits?: string
  future?: string
  status?: string
  compact?: boolean
  comparison?: {
    caption: string
    beforeLabel: string
    afterLabel: string
    rows: { label: string; before: string; after: string }[]
    note?: string
  }
  source?: { title: string; url: string }
}

export interface ProjectFlow {
  summary: string
  nodes: { title: string; description: string; contribution?: string }[]
  environment: string
}

export interface Project {
  slug: string
  name: string
  shortName: string
  role: string
  period: string
  employment?: { company: string; type: '정규직' | '프리랜서' }
  tech: string[]
  featuredTech?: string[]
  summary: string
  focus: string
  responsibility?: string
  context: string[]
  contributions: { title: string; description: string }[]
  flow?: ProjectFlow
  cases: EngineeringCase[]
  notes?: { title: string; text: string }[]
  links?: { title: string; url: string }[]
  showcase?: {
    category: string
    status: string
    image: string
    imageAlt: string
    caption: string
    question: string
    quickLink?: { title: string; url: string }
  }
  writings?: { title: string; url: string; date: string; summary: string }[]
}

export interface SkillCategory {
  category: string
  items: string[]
  context: string
  href: string
}
