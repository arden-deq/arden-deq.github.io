import { useId, useState } from 'react'
import type { CaseEvidence as Evidence } from '../assets/data/types'
import './CaseEvidence.css'

function SequenceEvidence({ evidence }: { evidence: Extract<Evidence, { kind: 'sequence' }> }) {
  const [view, setView] = useState<'before' | 'after'>('after')
  const panelId = useId()
  return (
    <>
      <div className="evidence-switch" role="group" aria-label="처리 흐름 비교">
        <button type="button" aria-pressed={view === 'before'} aria-controls={panelId} onClick={() => setView('before')}>변경 전</button>
        <button type="button" aria-pressed={view === 'after'} aria-controls={panelId} onClick={() => setView('after')}>변경 후</button>
      </div>
      <div id={panelId} className={`sequence-evidence sequence-evidence--${view}`} aria-live="polite">
        <ol className="evidence-flow" key={view}>
          {evidence[view].map((step, index) => (
            <li key={step.title}>
              <span className="evidence-flow__number">{String(index + 1).padStart(2, '0')}</span>
              <strong>{step.title}</strong>
              <span>{step.description}</span>
            </li>
          ))}
        </ol>
        <p className="evidence-flow__caption">{view === 'before' ? evidence.beforeNote : evidence.afterNote}</p>
      </div>
    </>
  )
}

function RegradingEvidence({ evidence }: { evidence: Extract<Evidence, { kind: 'regrading' }> }) {
  const [stage, setStage] = useState(2)
  const panelId = useId()
  return (
    <>
      <div className="regrading-stages" role="group" aria-label="재채점 적용 단계">
        {evidence.stages.map((item, index) => (
          <button key={item.title} type="button" aria-pressed={stage === index} aria-controls={panelId} onClick={() => setStage(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span>{item.title}
          </button>
        ))}
      </div>
      <div id={panelId} className="regrading-preview" aria-live="polite">
        <p key={stage}>{evidence.stages[stage].description}</p>
        {stage === 2 ? (
          <table className="evidence-checks">
            <caption className="sr-only">사전 기준과 사후 결과 대조</caption>
            <thead><tr><th scope="col">대조 항목</th><th scope="col">사전 기준</th><th scope="col">사후 결과</th></tr></thead>
            <tbody>{evidence.checks.map((check) => (
              <tr key={check.label}><th scope="row">{check.label}</th><td>{check.expected}</td><td>{check.actual}<span aria-hidden="true"> ✓</span></td></tr>
            ))}</tbody>
          </table>
        ) : <p className="regrading-preview__pending">전체 적용 결과는 마지막 단계에서 확인할 수 있습니다.</p>}
      </div>
    </>
  )
}

function ContractEvidence({ evidence }: { evidence: Extract<Evidence, { kind: 'contract' }> }) {
  const [scenario, setScenario] = useState(1)
  const panelId = useId()
  const current = evidence.scenarios[scenario]
  return (
    <>
      <div className="evidence-switch" role="group" aria-label="Excel 입력 범위 비교">
        {evidence.scenarios.map((item, index) => <button key={item.label} type="button" aria-pressed={scenario === index} aria-controls={panelId} onClick={() => setScenario(index)}>{item.label}</button>)}
      </div>
      <div id={panelId} className="contract-evidence" aria-live="polite">
        <p><span>입력</span>{current.input}</p>
        <dl><div><dt>변경 전</dt><dd>{current.before}</dd></div><div><dt>변경 후</dt><dd>{current.after}</dd></div></dl>
      </div>
    </>
  )
}

export default function CaseEvidence({ evidence }: { evidence: Evidence }) {
  return (
    <figure className="case-evidence">
      <figcaption>{evidence.caption}</figcaption>
      {evidence.kind === 'timing' && (
        <div className="timing-evidence">
          <div className="timing-evidence__row">
            <div><span>적용 전</span><strong>{evidence.beforeMs.toLocaleString('en-US')}<small>ms</small></strong></div>
            <div className="timing-evidence__track"><span className="timing-evidence__bar timing-evidence__bar--before" style={{ width: '100%' }} /></div>
          </div>
          <div className="timing-evidence__row">
            <div><span>적용 후</span><strong>{evidence.afterMs.toLocaleString('en-US')}<small>ms</small></strong></div>
            <div className="timing-evidence__track"><span className="timing-evidence__bar" style={{ width: `${evidence.afterMs / evidence.beforeMs * 100}%` }} /></div>
          </div>
          <p className="timing-evidence__scale">막대 길이: 동일한 시간 비율 · 서비스 전체 응답시간과 구분</p>
        </div>
      )}
      {evidence.kind === 'sequence' && <SequenceEvidence evidence={evidence} />}
      {evidence.kind === 'regrading' && <RegradingEvidence evidence={evidence} />}
      {evidence.kind === 'contract' && <ContractEvidence evidence={evidence} />}
      <p className="case-evidence__note">{evidence.note}</p>
    </figure>
  )
}
