import { profile } from '../assets/data/profile'
import { keepMiddleDot } from '../utils/text'
import './Experience.css'

const roles = [
  { period: '2025.07~현재', type: '프리랜서', duration: profile.careerSummary.freelance, slugs: ['kice'], note: '퓨쳐누리 시절 팀장이던 현 PL의 요청으로 다시 합류했습니다.' },
  { period: '2021.10~2024.09', type: '정규직', duration: profile.careerSummary.permanent, slugs: ['neotest-maintenance', 'ntcn'] },
]

// 프로젝트 전체의 규모이며 개인 담당 범위는 각 상세에서 구분합니다.
const projectScale: Record<string, string> = {
  kice: '플랫폼 전체 규모: 2026년 3~4월 시행에 약 176만 명 응시, 하루 최대 15만 명 이상(시행 결과보고 기준). 응시를 마치면 바로 채점하며, 기관(테넌트)별로 DB 스키마를 나눕니다.',
}

// 실무에서 AI 도구를 쓴 방식. 내용은 각 프로젝트 상세의 기여 항목과 같습니다.
const projectPractice: Record<string, string> = {
  kice: 'AI 코딩 에이전트는 DB 읽기 전용 권한으로 쓰고, 빌드 검사와 테스트를 통과한 것만 병합했습니다. 통과 기준과 운영 반영은 직접 판단했습니다.',
}

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
              {role.note && <p className="role__note">{role.note}</p>}
            </header>
            <ul className="role__projects">
              {role.slugs.map((slug) => {
                const project = profile.projects.find((item) => item.slug === slug)
                if (!project) return null
                return (
                  <li key={slug} id={`project-${slug}`} tabIndex={-1} className="project-row">
                    <h4><a id={`open-${slug}`} href={`#/project/${slug}`}>{keepMiddleDot(project.name)}</a></h4>
                    <p>{project.summary}</p>
                    {projectScale[slug] && <p className="project-row__scale">{projectScale[slug]}</p>}
                    {projectPractice[slug] && <p className="project-row__scale">{projectPractice[slug]}</p>}
                    <p className="project-row__tech">{(project.featuredTech ?? project.tech).join(', ')}</p>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
      <p className="roles__between">
        두 기간 사이인 <span className="num">2025.01~2025.02</span>에는 Chrome 확장 <a href="#/project/keep-your-focus">Keep Your Focus</a>를 만들어 스토어에 배포했습니다.
      </p>

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
            <p key={item.title}><strong>{item.title}</strong> {item.subtitle}<span className="num">{item.period}</span></p>
          ))}
        </div>
      </div>
    </>
  )
}
