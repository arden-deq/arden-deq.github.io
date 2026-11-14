import { useEffect, useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Section from './components/Section'
import ProjectDetail from './components/ProjectDetail'
import FeaturedCases from './components/FeaturedCases'
import Experience from './components/Experience'
import ExplorationCard from './components/ExplorationCard'
import Hero from './components/Hero'
import ResumeDialog from './components/ResumeDialog'
import usePortfolioNavigation from './hooks/usePortfolioNavigation'
import useColorScheme from './hooks/useColorScheme'
import { profile } from './assets/data/profile'
import { keepDuration } from './utils/text'

function App() {
  const { scheme, toggle } = useColorScheme()
  const { route, backHref } = usePortfolioNavigation()
  const [resumeOpen, setResumeOpen] = useState(false)
  const projects = [...profile.projects, ...profile.explorations, profile.sideProject]
  const activeProject = route ? projects.find((project) => project.slug === route.slug) : undefined

  useEffect(() => {
    const activeCase = activeProject?.cases.find((item) => item.id === route?.section)
    document.title = activeProject
      ? `${activeCase?.title || activeProject.name} | 남정덕 · ${profile.hero.title}`
      : `남정덕 | ${profile.hero.title}`
  }, [activeProject, route?.section])

  const themeButton = (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={scheme === 'dark' ? '밝은 화면으로 전환' : '어두운 화면으로 전환'}
      title={scheme === 'dark' ? '밝은 화면' : '어두운 화면'}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {scheme === 'dark' ? (
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
      <Nav detail={!!route} backHref={backHref} themeButton={themeButton} onOpenResume={() => setResumeOpen(true)} />
      <main id="main-content" tabIndex={-1} className={`page${route ? ' page--detail' : ''}`}>
        {route ? (
          activeProject ? (
            <ProjectDetail project={activeProject} section={route.section} backHref={backHref} />
          ) : (
            <section className="not-found">
              <h1>프로젝트를 찾을 수 없습니다</h1>
              <p>주소가 바뀌었을 수 있습니다. 목록에서 다시 선택해 주세요.</p>
              <a className="button" href="#experience">프로젝트 목록으로</a>
            </section>
          )
        ) : (
          <>
            <Hero onOpenResume={() => setResumeOpen(true)} />

            <Section id="cases" title="대표 사례" intro="운영 데이터를 바꾸기 전에 예상값을 정해 두고 대조한 채점 사례 2건과, 조회 시간을 줄인 사례 2건입니다. 위 채점표와 같은 순서입니다.">
              <FeaturedCases />
            </Section>

            <Section id="experience" title="경력과 프로젝트" intro={keepDuration(`퓨쳐누리에서 정규직 ${profile.careerSummary.permanent}, 프리랜서 ${profile.careerSummary.freelance}을 일했습니다. 총 실무경력은 ${profile.careerSummary.total}이며(${profile.careerSummary.asOf} 기준), 재직 중 프로젝트 기간은 겹쳐 세지 않았습니다.`)}>
              <Experience />
            </Section>

            <Section id="lab" title="개인 프로젝트" intro="웹에 공개해 실제 이용자가 있는 K-Racing과 온천, 그리고 저사양 로컬 AI를 시험한 CharaNest입니다. 이용 기록은 각 프로젝트 아래에 있습니다.">
              <div className="lab-list">
                {profile.explorations.map((project) => <ExplorationCard key={project.slug} project={project} />)}
              </div>
              <article id="project-keep-your-focus" tabIndex={-1} className="lab-mini">
                <h3><a id="side-project-link" href="#/project/keep-your-focus">{profile.sideProject.name}</a></h3>
                <p>{profile.sideProject.summary}</p>
                <p className="lab-mini__meta num">{profile.sideProject.period}</p>
              </article>
            </Section>

            <Section id="contact" title="Java/Spring 백엔드 자리를 찾고 있습니다" intro="아래 메일로 연락 주세요. 이력서 요약은 열어서 인쇄하거나 PDF로 저장할 수 있습니다.">
              <div className="contact">
                <a className="contact__email" href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
                <ul className="contact__links">
                  <li><button type="button" className="button button--blue" onClick={() => setResumeOpen(true)}>이력서 보기</button></li>
                  <li><a href={profile.contact.github} target="_blank" rel="noreferrer noopener">GitHub</a></li>
                  <li><a href={profile.contact.blog} target="_blank" rel="noreferrer noopener">기술 블로그</a></li>
                </ul>
              </div>
            </Section>
          </>
        )}
      </main>
      <footer className="site-footer">
        <span>남정덕, {profile.hero.title}</span>
        <span>경력 정보 {profile.careerSummary.asOf} 기준</span>
      </footer>
      {resumeOpen && <ResumeDialog onClose={() => setResumeOpen(false)} />}
    </div>
  )
}

export default App
