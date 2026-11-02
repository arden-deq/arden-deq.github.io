import { profile } from '../assets/data/profile'
import './Experience.css'

const roles = [
  { period: '2025.07 ~ 현재', type: '프리랜서', duration: profile.careerSummary.freelance, slugs: ['kice'] },
  { period: '2021.10 ~ 2024.09', type: '정규직', duration: profile.careerSummary.permanent, slugs: ['neotest-maintenance', 'ntcn'] },
]

export default function Experience() {
  return (
    <>
      <div className="roles">
        {roles.map((role) => (
          <section key={role.period} className="role" aria-label={`퓨쳐누리 ${role.type}`}>
            <header className="role__header">
              <h3>퓨쳐누리 <span>{role.type}</span></h3>
              <p className="num">{role.period}</p>
              <p className="role__duration">{role.duration}</p>
            </header>
            <ul className="role__projects">
              {role.slugs.map((slug) => {
                const project = profile.projects.find((item) => item.slug === slug)
                if (!project) return null
                return (
                  <li key={slug} id={`project-${slug}`} tabIndex={-1} className="project-row">
                    <h4><a id={`open-${slug}`} href={`#/project/${slug}`}>{project.name}</a></h4>
                    <p>{project.summary}</p>
                    <p className="project-row__tech">{(project.featuredTech ?? project.tech).join(', ')}</p>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className="experience-foot">
        <dl className="skills">
          {profile.skills.map((skill) => (
            <div key={skill.category}>
              <dt>{skill.category}</dt>
              <dd>{skill.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
        <div className="education">
          {profile.education.map((item) => (
            <p key={item.title}><strong>{item.title}</strong> {item.subtitle}<span className="num">{item.period.replace('~', ' ~ ')}</span></p>
          ))}
          <p className="experience-foot__note">{profile.careerSummary.calculation}</p>
        </div>
      </div>
    </>
  )
}
