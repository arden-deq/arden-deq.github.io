import type { Project } from '../assets/data/types'

export default function ExplorationCard({ project }: { project: Project }) {
  const showcase = project.showcase
  if (!showcase) return null
  const journal = project.writings?.at(-1)

  return (
    <article id={`project-${project.slug}`} tabIndex={-1} className="lab" aria-labelledby={`${project.slug}-title`}>
      <figure className="lab__media">
        <img src={`${import.meta.env.BASE_URL}${showcase.image}`} alt={showcase.imageAlt} width="1280" height="720" loading="lazy" decoding="async" />
      </figure>
      <div className="lab__body">
        <p className="lab__meta">{showcase.category}, {showcase.status}</p>
        <h3 id={`${project.slug}-title`}><a id={`open-${project.slug}`} href={`#/project/${project.slug}`}>{project.name}</a></h3>
        <p>{project.summary}</p>
        <blockquote className="lab__question">{showcase.question}</blockquote>
        {project.results && (
          <dl className="lab__results" aria-label={`${project.name} ${project.results.title}`}>
            {project.results.items.map((item) => (
              <div key={item.label}><dt>{item.label}</dt><dd className="num">{item.value}<small>{item.unit}</small></dd></div>
            ))}
          </dl>
        )}
        {project.results && <p className="lab__results-note">{project.results.short}</p>}
        {project.tech.length > 0 && <p className="lab__tech">{project.tech.slice(0, 4).join(', ')}</p>}
        <ul className="lab__links">
          {showcase.quickLink && <li><a href={showcase.quickLink.url} target="_blank" rel="noreferrer noopener">{showcase.quickLink.title}<span className="sr-only"> · {project.name}</span></a></li>}
          {journal && <li><a href={journal.url} target="_blank" rel="noreferrer noopener">개발 회고<span className="sr-only"> · {project.name}</span></a></li>}
        </ul>
      </div>
    </article>
  )
}
