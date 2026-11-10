import { useEffect } from 'react'
import './App.css'
import Nav from './components/Nav'
import Section from './components/Section'
import ProjectDetail from './components/ProjectDetail'
import FeaturedCases from './components/FeaturedCases'
import Experience from './components/Experience'
import ExplorationCard from './components/ExplorationCard'
import Hero from './components/Hero'
import usePortfolioNavigation from './hooks/usePortfolioNavigation'
import useColorScheme from './hooks/useColorScheme'
import { profile } from './assets/data/profile'

function App() {
  const { scheme, toggle } = useColorScheme()
  const { route, backHref } = usePortfolioNavigation()
  const projects = [...profile.projects, ...profile.explorations, profile.sideProject]
  const activeProject = route ? projects.find((project) => project.slug === route.slug) : undefined

  useEffect(() => {
    const activeCase = activeProject?.cases.find((item) => item.id === route?.section)
    document.title = activeProject
      ? `${activeCase?.title || activeProject.name} | 남정덕 · Backend Engineer`
      : '남정덕 | Java·Spring Backend Engineer'
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
      <Nav detail={!!route} backHref={backHref} themeButton={themeButton} />
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
            <Hero />

            <Section id="cases" title="대표 사례" intro="병목은 조회 조건으로 좁히고, 채점 변경은 반영 전에 대조하고, 수동점수는 지켰습니다.">
              <FeaturedCases />
            </Section>

            <Section id="experience" title="경력과 프로젝트" intro={`퓨쳐누리에서 정규직 ${profile.careerSummary.permanent}, 프리랜서 ${profile.careerSummary.freelance}을 일했습니다. 총 실무경력 ${profile.careerSummary.total}, ${profile.careerSummary.asOf} 기준입니다.`}>
              <Experience />
            </Section>

            <Section id="lab" title="개인 프로젝트" intro="K-Racing은 AI 도구를 코드 작성·분석·테스트에 쓰면서 조작감과 완료 기준을 직접 정해 웹에 공개했습니다. CharaNest는 직접 세운 품질 기준에 따라 출시를 보류한 로컬 AI 프로토타입입니다.">
              <div className="lab-list">
                {profile.explorations.map((project) => <ExplorationCard key={project.slug} project={project} />)}
              </div>
              <article id="project-keep-your-focus" tabIndex={-1} className="lab-mini">
                <h3><a id="side-project-link" href="#/project/keep-your-focus">{profile.sideProject.name}</a></h3>
                <p>{profile.sideProject.summary}</p>
                <p className="lab-mini__meta num">{profile.sideProject.period}</p>
              </article>
            </Section>

            <Section id="contact" title="함께 일할 기회를 찾고 있습니다" intro="데이터와 운영의 정확성을 함께 고민할 Java/Spring 백엔드 팀이라면 연락 주세요.">
              <div className="contact">
                <a className="contact__email" href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
                <ul className="contact__links">
                  <li><a href={profile.contact.github} target="_blank" rel="noreferrer noopener">GitHub</a></li>
                  <li><a href={profile.contact.blog} target="_blank" rel="noreferrer noopener">기술 블로그</a></li>
                </ul>
              </div>
            </Section>
          </>
        )}
      </main>
      <footer className="site-footer">
        <span>남정덕, Java/Spring Backend Engineer</span>
        <span>경력 정보 {profile.careerSummary.asOf} 기준</span>
      </footer>
    </div>
  )
}

export default App
