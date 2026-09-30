import { featuredCases } from '../assets/data/profile'
import CaseEvidence from './CaseEvidence'
import './FeaturedCases.css'

interface FeaturedCasesProps {
  selectedIndex: number
  onSelectCase: (index: number) => void
}

export default function FeaturedCases({ selectedIndex, onSelectCase }: FeaturedCasesProps) {
  const selected = featuredCases[selectedIndex]
  const selectedCase = selected.project.cases.find((item) => item.id === selected.caseId)
  const selectCase = (index: number) => {
    onSelectCase(index)
    if (window.matchMedia('(max-width: 760px)').matches) {
      requestAnimationFrame(() => {
        const panel = document.getElementById('featured-insight')
        panel?.scrollIntoView({ block: 'start', behavior: 'instant' })
        panel?.focus({ preventScroll: true })
      })
    }
  }
  return (
    <>
      <div className="featured-grid">
        {featuredCases.map((item, index) => (
          <article className={`featured-card${selectedIndex === index ? ' featured-card--selected' : ''}`} key={item.caseId}>
            <div className="featured-card__eyebrow">
              <span className="featured-card__number">0{index + 1}</span><span>{item.label}</span><span className="featured-card__project">{item.project.shortName}</span>
            </div>
            <p className="featured-card__signal">{item.headline}</p>
            <p className="featured-card__scope">{item.scope}</p>
            <h3>{item.title}</h3>
            <p className="featured-card__description">{item.description}</p>
            <div className="featured-card__actions">
              <button id={`preview-${item.caseId}`} type="button" aria-pressed={selectedIndex === index} aria-controls="featured-insight" onClick={() => selectCase(index)}>
                판단·검증 보기<span className="sr-only">: {item.label}</span><span aria-hidden="true">{selectedIndex === index ? '✓' : '↓'}</span>
              </button>
              <a id={`featured-${item.caseId}`} href={`#/project/${item.project.slug}/${item.caseId}`}>상세 <span className="sr-only">{item.title}</span><span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{selected.label}의 판단과 검증을 선택했습니다.</p>
      {selectedCase && (
        <section id="featured-insight" tabIndex={-1} className="featured-insight" aria-labelledby="featured-insight-title">
          <div className="featured-insight__decision">
            <p className="eyebrow">Inside the decision · 0{selectedIndex + 1}</p>
            <h3 id="featured-insight-title">{selected.label}의 핵심 판단</h3>
            <p className="featured-insight__judgment">{selectedCase.decision}</p>
            <p className="featured-insight__role"><strong>내 역할</strong>{selectedCase.role}</p>
            <a id={`insight-${selected.caseId}`} href={`#/project/${selected.project.slug}/${selected.caseId}`}>구현 과정과 확인 범위 읽기 <span aria-hidden="true">→</span></a>
          </div>
          <div className="featured-insight__evidence" key={selected.caseId}>
            {selectedCase.evidence && <CaseEvidence evidence={selectedCase.evidence} />}
          </div>
        </section>
      )}
      <a className="additional-case" href="#/project/kice/excel-contract"><span>또 하나의 저장 계약</span><strong>Excel에 없는 값은 삭제 요청이 아니다</strong><span aria-hidden="true">↗</span></a>
    </>
  )
}
