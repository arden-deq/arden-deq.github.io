import type { Project } from '../assets/data/types'

export default function ExplorationCard({ project }: { project: Project }) {
  const showcase = project.showcase
  if (!showcase) return null

  return (
    <article id={`project-${project.slug}`} tabIndex={-1} className="exploration-card" aria-labelledby={`${project.slug}-title`}>
      <div className="exploration-card__media">
        <img src={`${import.meta.env.BASE_URL}${showcase.image}`} alt={showcase.imageAlt} width="1280" height="720" loading="lazy" decoding="async" />
        <span className="exploration-card__status">{showcase.status}</span>
      </div>
      <div className="exploration-card__body">
        <p className="eyebrow">{showcase.category}</p>
        <h3 id={`${project.slug}-title`}>{project.name}</h3>
        <p className="exploration-card__summary">{project.summary}</p>
        <div className="project-card__tech" aria-label="주요 사용 기술">
          {project.tech.slice(0, 4).map((tech) => <span className="chip chip--ghost" key={tech}>{tech}</span>)}
        </div>
        <div className="exploration-card__question">
          <span>개발 중 마주한 질문</span>
          <p>{showcase.question}</p>
        </div>
        <div className="exploration-card__actions">
          {showcase.quickLink && <a className="exploration-card__quick" href={showcase.quickLink.url} target="_blank" rel="noreferrer noopener">{showcase.quickLink.title}<span className="sr-only"> · {project.name}</span><span aria-hidden="true">↗</span></a>}
          <a id={`open-${project.slug}`} className="exploration-card__link" href={`#/project/${project.slug}`}>
            설계와 개발 과정<span className="sr-only"> · {project.name}</span><span aria-hidden="true">↗</span>
          </a>
        </div>
        {project.writings?.length && (
          <a className="exploration-card__journal" href={project.writings[project.writings.length - 1].url} target="_blank" rel="noreferrer noopener">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2V3Z" /><path d="M5 17h14M9 7h6M9 11h5" /></svg>
            <span>블로그에서 읽는 개발 회고<span className="sr-only"> · {project.name}</span></span><span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  )
}
