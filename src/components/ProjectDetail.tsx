import { useState } from 'react'
import type { Project } from '../assets/data/profile'
import ProjectDiagram from './ProjectDiagram'
import CaseStudy from './CaseStudy'

interface ProjectDetailProps {
  project: Project
  section?: string
  backHref: string
}

export default function ProjectDetail({ project, section, backHref }: ProjectDetailProps) {
  const [mobileTocOpen, setMobileTocOpen] = useState(false)
  const href = (id: string) => `#/project/${project.slug}/${id}`
  const sections = [
    { id: 'project-overview', label: '프로젝트 개요' },
    ...(project.flow ? [{ id: 'architecture', label: '업무 흐름' }] : []),
    { id: 'contributions', label: '담당한 개발' },
    ...project.cases.map((item, index) => ({
      id: item.id,
      label: `${String(index + 1).padStart(2, '0')}. ${item.navTitle || item.title}`,
    })),
    ...(project.notes?.length ? [{ id: 'more-cases', label: '추가 개발 기록' }] : []),
    ...(project.writings?.length ? [{ id: 'dev-notes', label: '개발 회고' }] : []),
  ]
  const tocLinks = (
    <ol className="detail-toc__list">
      {sections.map((item) => (
        <li key={item.id}>
          <a href={href(item.id)} aria-current={(section || 'project-overview') === item.id ? 'location' : undefined}
            onClick={() => setMobileTocOpen(false)}>{item.label}</a>
        </li>
      ))}
    </ol>
  )

  return (
    <div className="detail">
      <div className="detail-mobile-toc">
        <button type="button" aria-expanded={mobileTocOpen} aria-controls="mobile-toc-content"
          onClick={() => setMobileTocOpen((value) => !value)}>
          목차 · {project.shortName}
          <span aria-hidden="true">{mobileTocOpen ? '−' : '+'}</span>
        </button>
        <nav id="mobile-toc-content" hidden={!mobileTocOpen} aria-label="이 페이지 목차">{tocLinks}</nav>
      </div>
      <div className="detail-layout">
        <aside className="detail-sidebar">
          <nav className="detail-toc" aria-label="이 페이지 목차">
            <p className="eyebrow">{project.shortName}</p>
            {tocLinks}
            <a className="detail__back" href={backHref}>← 포트폴리오로</a>
          </nav>
        </aside>
        <div className="detail-content">
          {section && !sections.some((item) => item.id === section) && (
            <p className="detail-notice" role="status">선택한 항목을 찾을 수 없어 프로젝트 전체를 보여드립니다.</p>
          )}
          <section id="project-overview" tabIndex={-1} className="detail__block" aria-labelledby="project-title">
            <header className="detail__header">
              <p className="eyebrow">{project.period}</p>
              {project.employment && <p className="detail__employment">{project.employment.company} · {project.employment.type}</p>}
              <h1 id="project-title" className="detail__title">{project.name}</h1>
              <p className="detail__role">{project.role}</p>
              <p className="detail__tagline">{project.summary}</p>
              {project.responsibility && <p className="detail__responsibility"><strong>책임·협업 범위</strong>{project.responsibility}</p>}
              <div className="detail__tech" aria-label="사용 기술과 아키텍처">
                {project.tech.map((stack) => <span key={stack} className="chip">{stack}</span>)}
              </div>
            </header>
            {project.showcase && (
              <figure className="detail-cover">
                <img src={`${import.meta.env.BASE_URL}${project.showcase.image}`} alt={project.showcase.imageAlt} width="1280" height="720" decoding="async" />
                <figcaption><span>{project.showcase.status}</span>{project.showcase.caption}</figcaption>
              </figure>
            )}
            {project.cases.length > 0 && <nav className="project-case-index" aria-label="이 프로젝트의 문제 해결 사례">{project.cases.map((item) => <a key={item.id} href={href(item.id)}>{item.navTitle || item.title}<span aria-hidden="true">↓</span></a>)}</nav>}
            <details className="project-background">
              <summary>프로젝트 배경과 공통 범위</summary>
              {project.context.map((paragraph) => <p key={paragraph} className="detail__paragraph">{paragraph}</p>)}
            </details>
            {project.links && (
              <div className="detail__links">
                {project.links.map((link) => <a key={link.title} href={link.url} target="_blank" rel="noreferrer noopener">{link.title} ↗</a>)}
              </div>
            )}
          </section>

          {project.flow && (
            <section id="architecture" tabIndex={-1} className="detail__block" aria-labelledby="architecture-title">
              <p className="eyebrow">Architecture / Data flow</p>
              <h2 id="architecture-title" className="detail__block-title">시스템의 흐름과 개인 기여</h2>
              <ProjectDiagram flow={project.flow} />
            </section>
          )}

          <section id="contributions" tabIndex={-1} className="detail__block" aria-labelledby="contributions-title">
            <p className="eyebrow">My contribution</p>
            <h2 id="contributions-title" className="detail__block-title">직접 수행한 기여</h2>
            <div className="contribution-list">
              {project.contributions.map((item) => (
                <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>
              ))}
            </div>
          </section>

          {project.cases.length > 0 && (
            <section aria-labelledby="challenges-title">
              <header className="case-section-header">
                <p className="eyebrow">Engineering challenges</p>
                <h2 id="challenges-title" className="detail__block-title">구현과 문제 해결</h2>
                <p>문제를 정의하고, 변경 범위를 정하고, 결과를 확인한 과정입니다.</p>
              </header>
              {project.cases.map((item, index) => (
                <CaseStudy key={item.id} item={item} index={index} href={href(item.id)} active={section === item.id} />
              ))}
            </section>
          )}

          {project.notes && (
            <section id="more-cases" tabIndex={-1} className="detail__block" aria-labelledby="more-cases-title">
              <h2 id="more-cases-title" className="detail__block-title">추가 개발·진단 기록</h2>
              <div className="detail-notes">
                {project.notes.map((note) => <details key={note.title}><summary>{note.title}</summary><p>{note.text}</p></details>)}
              </div>
            </section>
          )}
          {!!project.writings?.length && (
            <section id="dev-notes" tabIndex={-1} className="detail__block" aria-labelledby="dev-notes-title">
              <p className="eyebrow">Behind the build</p>
              <h2 id="dev-notes-title" className="detail__block-title">판단이 바뀐 순간을 기록했습니다</h2>
              <div className="dev-notes">
                {project.writings.map((post) => (
                  <a className="dev-note" key={post.url} href={post.url} target="_blank" rel="noreferrer noopener">
                    <span className="dev-note__date">{post.date} · Development journal <span aria-hidden="true">↗</span></span>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                  </a>
                ))}
              </div>
            </section>
          )}
          <div className="detail-end">
            <p>다른 문제 해결 과정도 살펴보세요.</p>
            <a className="button button--ghost" href={backHref}>← 목록의 읽던 위치로</a>
            <a href={href('project-overview')}>프로젝트 처음으로 ↑</a>
          </div>
        </div>
      </div>
    </div>
  )
}
