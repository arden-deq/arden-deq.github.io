import { featuredCases, moreCases } from '../assets/data/profile'
import type { CaseEvidence } from '../assets/data/types'
import { keepMiddleDot } from '../utils/text'
import './FeaturedCases.css'

// 홈에서는 초 단위로 읽히게 하고, 정확한 ms 값은 상세의 표에 둡니다.
const seconds = (ms: number) => `${(ms / 1000).toFixed(ms >= 1000 ? 1 : 2)}초`

function MiniVisual({ evidence }: { evidence?: CaseEvidence }) {
  if (!evidence) return null
  if (evidence.kind === 'timing') {
    const ratio = evidence.afterMs / evidence.beforeMs * 100
    return (
      <div className="mini mini--timing" aria-hidden="true">
        <div><span>적용 전</span><i style={{ width: '100%' }} /><b className="num">{seconds(evidence.beforeMs)}</b></div>
        <div><span>적용 후</span><i className="mini__bar--after" style={{ width: `max(${ratio}%, 3px)` }} /><b className="num">{seconds(evidence.afterMs)}</b></div>
      </div>
    )
  }
  if (evidence.kind === 'sequence') {
    return (
      <div className="mini mini--sequence" aria-hidden="true">
        <ol className="mini__before">{evidence.before.map((step) => <li key={step.title}>{step.title}</li>)}</ol>
        <ol className="mini__after">{evidence.after.map((step) => <li key={step.title}>{step.title}</li>)}</ol>
      </div>
    )
  }
  if (evidence.kind === 'regrading') {
    return (
      <table className="mini mini--checks" aria-hidden="true">
        <tbody>{evidence.checks.map((check) => (
          <tr key={check.label}><th>{check.label}</th><td className="num">{check.actual}</td><td className="mini__tick">✓</td></tr>
        ))}</tbody>
      </table>
    )
  }
  return null
}

export default function FeaturedCases() {
  return (
    <>
      <ol className="cases">
        {featuredCases.map((item) => {
          const engineeringCase = item.project.cases.find((entry) => entry.id === item.caseId)
          const href = `#/project/${item.project.slug}/${item.caseId}`
          return (
            <li key={item.caseId} className="case-row">
              <div className="case-row__metric">
                <span className="case-row__tag">{item.tag}</span>
                <strong className="num">{item.metric}</strong>
                <span className="case-row__note">{item.metricNote.split(' · ').map((clause) => <span key={clause} className="clause">{clause}</span>)}</span>
              </div>
              <div className="case-row__body">
                <h3><a id={`featured-${item.caseId}`} href={href}>{item.title}</a></h3>
                <p>{item.description}</p>
                <p className="case-row__project">{keepMiddleDot(`${item.project.employment?.company} ${item.project.employment?.type}, ${item.project.shortName} ${item.project.period}`)}</p>
              </div>
              <MiniVisual evidence={engineeringCase?.evidence} />
            </li>
          )
        })}
      </ol>
      <h3 className="cases__more-title">그 밖의 사례</h3>
      <ul className="cases__more">
        {moreCases.map((item) => (
          <li key={item.href}>
            <span className="cases__more-tag">{item.tag}</span>
            <a href={item.href}>{keepMiddleDot(item.title)}</a>
            <span className="cases__more-note">{keepMiddleDot(item.note)}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
