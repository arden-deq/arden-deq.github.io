import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { featuredCases, profile } from '../assets/data/profile'
import './ResumeDialog.css'

export default function ResumeDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return createPortal(
    <dialog className="resume-dialog" ref={dialogRef} aria-labelledby="resume-title" onCancel={(event) => { event.preventDefault(); onClose() }}>
      <div className="resume-dialog__actions">
        <span>이력서 요약 · {profile.careerSummary.asOf} 기준</span>
        <button type="button" onClick={() => window.print()}>인쇄 / PDF 저장</button>
        <button type="button" aria-label="이력서 닫기" onClick={onClose}>닫기 <span aria-hidden="true">×</span></button>
      </div>
      <div className="resume-document">
        <header>
          <p className="eyebrow">Java / Spring · Backend Engineer</p>
          <h2 id="resume-title">남정덕</h2>
          <p>{profile.hero.summary}</p>
          <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
          <div className="resume-document__links"><a href={profile.contact.github} target="_blank" rel="noreferrer noopener">GitHub ↗</a><a href={profile.contact.blog} target="_blank" rel="noreferrer noopener">기술 블로그 ↗</a></div>
        </header>
        <section aria-labelledby="resume-career">
          <h3 id="resume-career">경력 <span>{profile.careerSummary.total}</span></h3>
          {[...profile.career].reverse().map((item) => <article key={item.period}><div className="resume-document__meta"><strong>{item.title}</strong><span>{item.period}</span></div><p>{item.subtitle}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}
          <p className="resume-document__scope">{profile.careerSummary.calculation}</p>
        </section>
        <section aria-labelledby="resume-cases">
          <h3 id="resume-cases">대표 문제 해결</h3>
          {featuredCases.map((item) => <article key={item.caseId}><h4>{item.title} · {item.headline}</h4><p>{item.description}</p><p className="resume-document__scope">{item.scope}</p></article>)}
        </section>
        <section aria-labelledby="resume-skills"><h3 id="resume-skills">기술과 활용</h3><dl>{profile.skills.map((item) => <div key={item.category}><dt>{item.category}</dt><dd>{item.items.join(' · ')}</dd></div>)}</dl></section>
        <section aria-labelledby="resume-education"><h3 id="resume-education">학력</h3>{profile.education.map((item) => <p key={item.title}>{item.title} · {item.subtitle} <span className="resume-document__scope">({item.period})</span></p>)}</section>
        <footer>상세 구현과 검증 범위: <a href="https://arden-deq.github.io/">arden-deq.github.io</a></footer>
      </div>
    </dialog>, document.body,
  )
}
