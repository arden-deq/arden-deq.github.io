import type { EngineeringCase } from '../assets/data/types'
import CaseEvidence from './CaseEvidence'
import './CaseStudy.css'

interface CaseStudyProps {
  item: EngineeringCase
  index: number
  href: string
  active: boolean
}

const axisLabels = {
  Correctness: '데이터와 도메인',
  Performance: '성능 개선',
  Reliability: '이벤트와 운영',
}

export default function CaseStudy({ item, index, href, active }: CaseStudyProps) {
  const body = (
    <>
      <ol className="case-steps">
        {item.steps.map((step, stepIndex) => (
          <li key={step.label}>
            <h4><span aria-hidden="true">{String(stepIndex + 1).padStart(2, '0')}</span>{step.label}</h4>
            {step.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </li>
        ))}
      </ol>
      {item.comparison && (
        <div className="case-comparison">
          <table>
            <caption>{item.comparison.caption}</caption>
            <thead><tr><th scope="col">항목</th><th scope="col">{item.comparison.beforeLabel}</th><th scope="col">{item.comparison.afterLabel}</th></tr></thead>
            <tbody>{item.comparison.rows.map((row) => (
              <tr key={row.label}><th scope="row">{row.label}</th><td>{row.before}</td><td>{row.after}</td></tr>
            ))}</tbody>
          </table>
          {item.comparison.note && <p className="case-comparison__note">{item.comparison.note}</p>}
        </div>
      )}
      {item.scope && item.limits && <div className="case-verification-scope"><h4>검증 범위와 남은 확인</h4><p>{item.limits}</p></div>}
      {(item.learning || item.future) && (
        <details className="case-reflection">
          <summary>판단의 기준과 회고</summary>
          {item.learning && <p>{item.learning}</p>}
          {item.future && <div><h4>현재 검토하는 대안</h4><p>{item.future}</p></div>}
        </details>
      )}
    </>
  )

  return (
    <article id={item.id} tabIndex={-1} className={`engineering-case${item.compact ? ' engineering-case--compact' : ''}${active ? ' engineering-case--active' : ''}`} aria-labelledby={`${item.id}-title`}>
      <header className="engineering-case__header">
        <div className="engineering-case__meta">
          <span className="case-number">CASE {String(index + 1).padStart(2, '0')}</span>
          <span>{axisLabels[item.axis]}</span>
          {item.status && <span className="case-status">{item.status}</span>}
        </div>
        <h3 id={`${item.id}-title`}>{item.title}</h3>
      </header>
      <div className="case-result"><span>결과</span><p>{item.outcome}</p></div>
      {(item.scope || item.limits) && <p className="case-scope"><strong>결과의 범위</strong>{item.scope || item.limits}</p>}
      <dl className="case-brief">
        <div><dt>문제</dt><dd>{item.summary}</dd></div>
        <div><dt>내 역할</dt><dd>{item.role}</dd></div>
        {item.decision && <div><dt>핵심 판단</dt><dd>{item.decision}</dd></div>}
        {item.verification && <div><dt>검증</dt><dd>{item.verification}</dd></div>}
      </dl>
      {item.evidence && <CaseEvidence evidence={item.evidence} />}
      <details className="case-supporting">
        <summary><span>구현 과정과 검증 기록</span><span className="case-supporting__hint" aria-hidden="true">펼쳐 읽기 +</span></summary>
        {body}
      </details>
      <footer className="case-footer">
        <a className="case-permalink" href={href}>사례 바로가기<span className="sr-only">: {item.title}</span><span aria-hidden="true">↗</span></a>
        {item.source && <a className="case-source" href={item.source.url} target="_blank" rel="noreferrer noopener">{item.source.title} <span aria-hidden="true">↗</span></a>}
      </footer>
    </article>
  )
}
