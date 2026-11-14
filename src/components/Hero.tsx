import { profile, scorecard } from '../assets/data/profile'
import { keepDuration } from '../utils/text'
import './Hero.css'

function CheckMark({ delay }: { delay: number }) {
  return (
    <svg className="score__check" style={{ animationDelay: `${delay}ms` }} aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path pathLength="1" d="M5 17.5 12.5 25 27 7" />
    </svg>
  )
}

export default function Hero({ onOpenResume }: { onOpenResume: () => void }) {
  return (
    <section id="profile" className="hero" tabIndex={-1} aria-labelledby="profile-title">
      <div className="hero__head">
        <div className="hero__identity">
          <img src={`${import.meta.env.BASE_URL}jdnam4.jpg`} alt="" width="48" height="64" fetchPriority="high" />
          <p><strong>{profile.hero.name}</strong><span>{keepDuration(`${profile.hero.title}, 실무 ${profile.careerSummary.total}, 현재 ${profile.careerSummary.current.replace(' · ', ' ')}`)}</span></p>
        </div>
        <h1 id="profile-title" className="hero__title">{profile.hero.headline}</h1>
      </div>
      <div className="hero__intro">
        <p className="hero__lead">{profile.hero.summary}</p>
        <div className="hero__actions">
          <button type="button" className="button" onClick={onOpenResume}>이력서 보기</button>
          <a className="button button--quiet" href={`mailto:${profile.contact.email}`}><span className="sr-only">메일 보내기: </span>{profile.contact.email}</a>
          <a className="hero__link" href={profile.contact.github} target="_blank" rel="noreferrer noopener">GitHub</a>
        </div>
      </div>

      <ol className="scorecard" aria-label="주요 성과">
        {scorecard.map((item, index) => (
          <li key={item.label} className="score">
            <a href={item.href}>
              <span className="score__value num">{item.value}<small>{item.unit}</small></span>
              <span className="score__text">
                <strong>{item.label}</strong>
                <span className="score__basis">{item.basis.split(' · ').map((clause) => <span key={clause} className="clause">{clause}</span>)}</span>
              </span>
              <CheckMark delay={300 + index * 160} />
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
