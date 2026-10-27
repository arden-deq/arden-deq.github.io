import { useEffect, useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Section from './components/Section'
import Timeline from './components/Timeline'
import ProjectCard from './components/ProjectCard'
import ProjectDetail from './components/ProjectDetail'
import FeaturedCases from './components/FeaturedCases'
import SkillsGrid from './components/SkillsGrid'
import ExplorationCard from './components/ExplorationCard'
import Hero from './components/Hero'
import usePortfolioNavigation from './hooks/usePortfolioNavigation'
import { profile } from './assets/data/profile'

function App() {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0)
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') === 'light' ? 'light' : 'dark' }
    catch { return 'dark' }
  })
  const { route, backHref } = usePortfolioNavigation()
  const projects = [...profile.projects, ...profile.explorations, profile.sideProject]
  const activeProject = route ? projects.find((project) => project.slug === route.slug) : undefined

  useEffect(() => {
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
    try { localStorage.setItem('theme', theme) } catch { /* The theme still works without storage. */ }
  }, [theme])

  useEffect(() => {
    const activeCase = activeProject?.cases.find((item) => item.id === route?.section)
    document.title = activeProject
      ? `${activeCase?.title || activeProject.name} | 남정덕 · Backend Engineer`
      : '남정덕 | Java·Spring Backend Engineer'
  }, [activeProject, route?.section])

  const themeButton = (
    <button
      type="button"
      onClick={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')}
      className="theme-toggle-button"
      aria-label={theme === 'dark' ? '라이트 테마로 전환' : '다크 테마로 전환'}
      title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
    >
      <svg key={theme} className="theme-toggle-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
        {theme === 'dark' ? (
          <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M19.07 4.93l-1.42 1.42M6.35 17.65l-1.42 1.42" /></>
        ) : (
          <path d="M20.5 13.3A8.7 8.7 0 0 1 10.7 3.5a8.7 8.7 0 1 0 9.8 9.8Z" />
        )}
      </svg>
    </button>
  )

  return (
    <div className="app-shell">
      <a className="skip-link" href={route ? `#/project/${route.slug}/project-overview` : '#main-content'}>본문으로 건너뛰기</a>
      <Nav detail={!!route} backHref={backHref} themeButton={themeButton} />
      <main id="main-content" tabIndex={-1} className={`portfolio-container${route ? ' portfolio-container--detail' : ''}`}>
        {route ? (
          activeProject ? (
            <ProjectDetail project={activeProject} section={route.section} backHref={backHref} />
          ) : (
            <section className="not-found">
              <p className="eyebrow">PAGE NOT FOUND</p>
              <h1>프로젝트를 찾을 수 없습니다.</h1>
              <p>프로젝트 목록에서 사례를 다시 선택해 주세요.</p>
              <a className="button" href="#projects">프로젝트 목록으로</a>
            </section>
          )
        ) : (
          <>
            <Hero />

            <Section id="cases" title="운영 문제를 해결한 세 가지 판단" subtitle="Selected work · 01 — 03" intro="병목은 조회 조건으로 좁히고, 이벤트는 순서를 맞추고, 수동점수는 보존했습니다.">
              <FeaturedCases selectedIndex={selectedCaseIndex} onSelectCase={setSelectedCaseIndex} />
            </Section>

            <Section id="career" title="개발과 운영을 이어온 경력" subtitle={`Career · ${profile.careerSummary.asOf} 기준`}>
              <Timeline items={[...profile.career].reverse()} variant="career" />
              <p className="career-calculation"><strong>총 실무경력 {profile.careerSummary.total}.</strong> {profile.careerSummary.calculation}</p>
            </Section>

            <Section id="projects" title="프로젝트와 담당 범위" subtitle="Projects" intro="퓨쳐누리에서 정규직과 프리랜서로 수행한 프로젝트입니다.">
              <div className="projects-grid">
                {profile.projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
              </div>
            </Section>

            <Section id="skills" title="기술을 사용한 맥락" subtitle="Technical skills">
              <SkillsGrid categories={profile.skills} />
            </Section>

            <Section id="lab" title="관심을 실제로 동작하는 제품으로" subtitle="Independent projects · AI & interactive systems" intro="로컬 AI의 대화 품질과 실시간 게임의 조작감을 직접 정의하고, 동작하는 제품으로 구현합니다.">
              <div className="explorations-grid">
                {profile.explorations.map((project) => <ExplorationCard key={project.slug} project={project} />)}
              </div>
            </Section>

            <Section id="more" title="그 밖의 경험" subtitle="Beyond backend">
              <div className="more-grid">
                <article id="project-keep-your-focus" tabIndex={-1} className="side-project">
                  <p className="eyebrow">SIDE PROJECT · {profile.sideProject.period}</p>
                  <h3>{profile.sideProject.name}</h3>
                  <p>{profile.sideProject.summary}</p>
                  <a id="side-project-link" href="#/project/keep-your-focus">개인 프로젝트 보기 <span aria-hidden="true">↗</span></a>
                </article>
                <div className="education">
                  <p className="eyebrow">EDUCATION</p>
                  <Timeline items={profile.education} />
                </div>
              </div>
            </Section>

            <Section id="contact" title="함께 일할 기회를 기다립니다" subtitle="Contact" intro="Java/Spring 백엔드에서 데이터와 운영의 정확성을 함께 고민하고 싶습니다.">
              <ul className="contact-list">
                <li><span>이메일</span><a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></li>
                <li><span>GitHub</span><a href={profile.contact.github} target="_blank" rel="noreferrer noopener">arden-deq <span aria-hidden="true">↗</span></a></li>
                <li><span>기술 블로그</span><a href={profile.contact.blog} target="_blank" rel="noreferrer noopener">개발 기록 <span aria-hidden="true">↗</span></a></li>
              </ul>
            </Section>
          </>
        )}
      </main>
      <footer className="site-footer">남정덕 · Backend Engineer<span>경력 내용 기준 {profile.careerSummary.asOf}</span></footer>
    </div>
  )
}

export default App
