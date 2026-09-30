import { useState } from 'react'
import { profile } from '../assets/data/profile'
import ResumeDialog from './ResumeDialog'
import './Hero.css'

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const career = profile.careerSummary
  return (
    <section id="profile" className="section hero-section" tabIndex={-1} aria-labelledby="profile-title">
      <div className="hero">
        <div className="hero__content">
          <p className="hero__identity"><strong>{profile.hero.name}</strong><span>{profile.hero.title}</span></p>
          <h1 id="profile-title" className="hero__title">{profile.hero.headline}</h1>
          <p className="hero__lead">{profile.hero.summary}</p>
          <ul className="hero-strengths" aria-label="핵심 역량">
            <li><a href="#/project/neotest-maintenance/database-bottleneck">SQL 병목 분석 <span aria-hidden="true">↗</span></a></li>
            <li><a href="#/project/kice/kafka-order">이벤트 순서 <span aria-hidden="true">↗</span></a></li>
            <li><a href="#/project/kice/safe-regrading">데이터 정합성 <span aria-hidden="true">↗</span></a></li>
          </ul>
          <div className="hero__cta">
            <a className="button" href="#cases">대표 사례 보기 <span aria-hidden="true">↓</span></a>
            <button type="button" className="button button--ghost" onClick={() => setResumeOpen(true)}>이력서 보기 <span aria-hidden="true">↗</span></button>
          </div>
        </div>
        <aside className="career-snapshot" aria-label="경력과 현재 역할 요약">
          <div className="career-snapshot__identity">
            <div><p className="eyebrow">At a glance</p><p className="career-snapshot__job">Java / Spring<br />Backend Engineer</p></div>
            <img src={`${import.meta.env.BASE_URL}jdnam4.jpg`} alt="남정덕" width="60" height="80" fetchPriority="high" />
          </div>
          <div className="career-snapshot__total"><span>총 실무경력</span><strong>{career.total}</strong></div>
          <p className="career-snapshot__breakdown">정규직 {career.permanent} + 프리랜서 {career.freelance}</p>
          <div className="career-snapshot__current"><span>현재 역할</span><strong>{career.current}</strong><p>{career.scope}</p></div>
          <a className="career-snapshot__basis" href="#career">{career.asOf} 기준 · 산정 범위 보기 <span aria-hidden="true">↓</span></a>
        </aside>
      </div>
      {resumeOpen && <ResumeDialog onClose={() => setResumeOpen(false)} />}
    </section>
  )
}
