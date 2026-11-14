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
  Performance: '성능',
  Reliability: '이벤트와 운영',
}

export default function CaseStudy({ item, index, href, active }: CaseStudyProps) {
  return (
    <article id={item.id} tabIndex={-1} className={`engineering-case${item.compact ? ' engineering-case--compact' : ''}${active ? ' engineering-case--active' : ''}`} aria-labelledby={`${item.id}-title`}>
      <header className="engineering-case__header">
        <p className="engineering-case__meta">
          <span className="num">사례 {index + 1}</span>
          <span>{axisLabels[item.axis]}</span>
          {item.status && <span>{item.status}</span>}
        </p>
        <h3 id={`${item.id}-title`}>{item.title}</h3>
      </header>

      <p className="case-result"><span className="sr-only">결과: </span>{item.outcome.split(' · ').map((clause) => <span key={clause} className="clause">{clause}</span>)}</p>

      <dl className="case-brief">
        <div><dt>문제</dt><dd>{item.summary}</dd></div>
        {item.decision && <div><dt>핵심 판단</dt><dd>{item.decision}</dd></div>}
        {item.verification && <div><dt>검증</dt><dd>{item.verification}</dd></div>}
        <div><dt>내 역할</dt><dd>{item.role}</dd></div>
      </dl>

      {item.evidence && <CaseEvidence evidence={item.evidence} />}

      {(item.scope || item.limits) && <p className="case-scope"><strong>결과의 범위</strong> {item.scope || item.limits}</p>}

      <details className="disclosure case-supporting" open={active || undefined}>
        <summary>구현 과정과 검증 기록</summary>
        <ol className="case-steps">
          {item.steps.map((step, stepIndex) => (
            <li key={step.label}>
              <h4><span className="num" aria-hidden="true">{stepIndex + 1}</span>{step.label}</h4>
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
        {item.scope && item.limits && <div className="case-note"><h4>남은 확인 범위</h4><p>{item.limits}</p></div>}
        {item.learning && <div className="case-note"><h4>회고</h4><p>{item.learning}</p></div>}
        {item.future && <div className="case-note"><h4>현재 검토하는 대안</h4><p>{item.future}</p></div>}
      </details>

      <footer className="case-footer">
        <a className="case-permalink" href={href}>이 사례 주소<span className="sr-only">: {item.title}</span></a>
        {item.source && <a href={item.source.url} target="_blank" rel="noreferrer noopener">{item.source.title}</a>}
      </footer>
    </article>
  )
}
