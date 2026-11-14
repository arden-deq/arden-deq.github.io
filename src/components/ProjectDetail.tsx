import { useState } from 'react'
import type { Project } from '../assets/data/profile'
import ProjectDiagram from './ProjectDiagram'
import CaseStudy from './CaseStudy'
import { keepMiddleDot } from '../utils/text'

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
          {project.shortName} 목차
          <span aria-hidden="true">{mobileTocOpen ? '닫기' : '열기'}</span>
        </button>
        <nav id="mobile-toc-content" hidden={!mobileTocOpen} aria-label="이 페이지 목차">{tocLinks}</nav>
      </div>
      <div className="detail-layout">
        <aside className="detail-sidebar">
          <nav className="detail-toc" aria-label="이 페이지 목차">
            <p className="detail-toc__title">{project.shortName}</p>
            {tocLinks}
            <a className="detail-toc__back" href={backHref}>포트폴리오로 돌아가기</a>
          </nav>
        </aside>
        <div className="detail-content">
          {section && !sections.some((item) => item.id === section) && (
            <p className="detail-notice" role="status">선택한 항목을 찾을 수 없어 프로젝트 전체를 보여드립니다.</p>
          )}
          <section id="project-overview" tabIndex={-1} className="detail__block" aria-labelledby="project-title">
            <header className="detail__header">
              <p className="detail__meta">{project.employment ? `${project.employment.company} ${project.employment.type}, ` : ''}{project.period}</p>
              <h1 id="project-title" className="detail__title">{keepMiddleDot(project.name)}</h1>
              <p className="detail__tagline">{project.summary}</p>
            </header>
            <dl className="detail__facts">
              <div><dt>역할</dt><dd>{project.role}</dd></div>
              {project.responsibility && <div><dt>책임 범위</dt><dd>{project.responsibility}</dd></div>}
              {project.tech.length > 0 && <div><dt>기술</dt><dd>{project.tech.join(', ')}</dd></div>}
            </dl>
            {project.showcase && (
              <figure className="detail-cover">
                <img src={`${import.meta.env.BASE_URL}${project.showcase.image}`} alt={project.showcase.imageAlt} width="1280" height="720" decoding="async" />
                <figcaption>{project.showcase.status}. {project.showcase.caption}</figcaption>
              </figure>
            )}
            {project.cases.length > 0 && <nav className="project-case-index" aria-label="이 프로젝트의 문제 해결 사례">{project.cases.map((item) => <a key={item.id} href={href(item.id)}>{item.navTitle || item.title}{item.status && <span>{item.status}</span>}</a>)}</nav>}
            {project.results && (
              <section className="detail-results" aria-labelledby="results-title">
                <h2 id="results-title" className="detail__block-title">{project.results.title}</h2>
                <dl className="lab__results">
                  {project.results.items.map((item) => (
                    <div key={item.label}><dt>{item.label}</dt><dd className="num">{item.value}<small>{item.unit}</small></dd></div>
                  ))}
                </dl>
                <p className="detail__lead">{project.results.basis}</p>
                {project.results.note && <p className="detail__lead">{project.results.note}</p>}
                {project.results.table && (
                  <table className="results-table">
                    <caption className="sr-only">{project.name} 일별 이용 기록</caption>
                    <thead><tr>{project.results.table.head.map((cell) => <th key={cell} scope="col">{cell}</th>)}</tr></thead>
                    <tbody>{project.results.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={index} scope="row">{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody>
                  </table>
                )}
              </section>
            )}
            <details className="disclosure">
              <summary>프로젝트 배경과 공통 범위</summary>
              {project.context.map((paragraph) => <p key={paragraph} className="detail__paragraph">{paragraph}</p>)}
            </details>
            {project.links && (
              <div className="detail__links">
                {project.links.map((link) => <a key={link.title} href={link.url} target="_blank" rel="noreferrer noopener">{link.title}</a>)}
              </div>
            )}
          </section>

          {project.flow && (
            <section id="architecture" tabIndex={-1} className="detail__block" aria-labelledby="architecture-title">
              <h2 id="architecture-title" className="detail__block-title">시스템의 흐름과 개인 기여</h2>
              <ProjectDiagram flow={project.flow} />
            </section>
          )}

          <section id="contributions" tabIndex={-1} className="detail__block" aria-labelledby="contributions-title">
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
                <h2 id="challenges-title" className="detail__block-title">구현과 문제 해결</h2>
                <p className="detail__lead">각 사례는 결과와 판단을 먼저 보여주고, 구현 과정은 접어 두었습니다.</p>
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
              <h2 id="dev-notes-title" className="detail__block-title">판단이 바뀐 순간을 기록했습니다</h2>
              <div className="dev-notes">
                {project.writings.map((post) => (
                  <a className="dev-note" key={post.url} href={post.url} target="_blank" rel="noreferrer noopener">
                    <span className="dev-note__date num">{post.date} 블로그 회고</span>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                  </a>
                ))}
              </div>
            </section>
          )}
          <div className="detail-end">
            <a className="button" href={backHref}>읽던 위치로 돌아가기</a>
            <a href={href('project-overview')}>이 프로젝트 처음으로</a>
          </div>
        </div>
      </div>
    </div>
  )
}
