import { featuredCases, profile, scorecard } from '../assets/data/profile'
import type { CaseEvidence, EngineeringCase, Project } from '../assets/data/types'

const site = 'https://arden-deq.github.io/'
const axisLabels = { Correctness: '데이터와 도메인', Performance: '성능', Reliability: '이벤트와 운영' }
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
const bareUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')
const pad = (index: number) => String(index + 1).padStart(2, '0')

const roles = [
  { period: '2025.07 ~ 현재', type: '프리랜서', duration: profile.careerSummary.freelance, projects: [profile.projects[0]] },
  { period: '2021.10 ~ 2024.09', type: '정규직', duration: profile.careerSummary.permanent, projects: [profile.projects[1], profile.projects[2]] },
]

function Evidence({ evidence }: { evidence: CaseEvidence }) {
  return (
    <figure className="p-evidence">
      <figcaption>{evidence.caption}</figcaption>
      {evidence.kind === 'timing' && (
        <div className="p-timing">
          {[['적용 전', evidence.beforeMs], ['적용 후', evidence.afterMs]].map(([label, ms]) => (
            <div key={label} className="p-timing__row">
              <span>{label}</span>
              <strong className="num">{ms.toLocaleString('en-US')}ms</strong>
              <span className="p-timing__track"><span style={{ width: `${Number(ms) / evidence.beforeMs * 100}%` }} /></span>
            </div>
          ))}
        </div>
      )}
      {evidence.kind === 'sequence' && (
        <div className="p-sequence">
          {(['before', 'after'] as const).map((view) => (
            <div key={view}>
              <p className="p-sequence__label">{view === 'before' ? '변경 전' : '변경 후'}</p>
              <ol>{evidence[view].map((step) => <li key={step.title}><strong>{step.title}</strong> {step.description}</li>)}</ol>
              <p className="p-small">{view === 'before' ? evidence.beforeNote : evidence.afterNote}</p>
            </div>
          ))}
        </div>
      )}
      {evidence.kind === 'regrading' && (
        <>
          <ol className="p-stages">
            {evidence.stages.map((stage, index) => <li key={stage.title}><span className="num">{pad(index)}</span><strong>{stage.title}</strong><span>{stage.description}</span></li>)}
          </ol>
          <table className="p-table">
            <thead><tr><th scope="col">대조 항목</th><th scope="col">사전 기준</th><th scope="col">사후 결과</th></tr></thead>
            <tbody>{evidence.checks.map((check) => (
              <tr key={check.label}><th scope="row">{check.label}</th><td>{check.expected}</td><td className="p-check">{check.actual}</td></tr>
            ))}</tbody>
          </table>
        </>
      )}
      {evidence.kind === 'contract' && (
        <table className="p-table">
          <thead><tr><th scope="col">경우</th><th scope="col">입력</th><th scope="col">변경 전</th><th scope="col">변경 후</th></tr></thead>
          <tbody>{evidence.scenarios.map((row) => (
            <tr key={row.label}><th scope="row">{row.label}</th><td>{row.input}</td><td>{row.before}</td><td>{row.after}</td></tr>
          ))}</tbody>
        </table>
      )}
      <p className="p-small">{evidence.note}</p>
    </figure>
  )
}

function Case({ item, index }: { item: EngineeringCase; index: number }) {
  return (
    <article className={`p-case${item.compact ? ' p-case--compact' : ''}`}>
      <header className="p-case__header">
        <p className="p-case__meta"><span className="num">사례 {pad(index)}</span><span>{axisLabels[item.axis]}</span>{item.status && <span>{item.status}</span>}</p>
        <h3>{item.title}</h3>
        <p className="p-case__result">{item.outcome}</p>
      </header>
      <dl className="p-brief">
        <div><dt>상황</dt><dd>{item.summary}</dd></div>
        {item.decision && <div><dt>해결 방향</dt><dd>{item.decision}</dd></div>}
        {item.verification && <div><dt>검증</dt><dd>{item.verification}</dd></div>}
        <div><dt>맡은 일</dt><dd>{item.role}</dd></div>
      </dl>
      {!item.compact && item.evidence && <Evidence evidence={item.evidence} />}
      {!item.compact && (
        <ol className="p-steps">
          {item.steps.map((step) => <li key={step.label}><h4>{step.label}</h4>{step.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</li>)}
        </ol>
      )}
      {!item.compact && !item.evidence && item.comparison && (
        <table className="p-table">
          <caption>{item.comparison.caption}</caption>
          <thead><tr><th scope="col">항목</th><th scope="col">{item.comparison.beforeLabel}</th><th scope="col">{item.comparison.afterLabel}</th></tr></thead>
          <tbody>{item.comparison.rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.before}</td><td>{row.after}</td></tr>)}</tbody>
        </table>
      )}
      {(item.scope || item.limits) && <p className="p-note"><strong>범위</strong>{item.scope || item.limits}</p>}
      {!item.compact && item.learning && <p className="p-note"><strong>회고</strong>{item.learning}</p>}
      {item.source && <p className="p-small">참고 · <a href={item.source.url}>{item.source.title}</a></p>}
    </article>
  )
}

function Chapter({ project, number }: { project: Project; number: string }) {
  return (
    <section className="p-chapter">
      <header className="p-chapter__header">
        <p className="p-chapter__meta"><span className="num">{number}</span>{project.employment ? `${project.employment.company} ${project.employment.type} · ` : ''}{project.period}</p>
        <h2>{project.name}</h2>
        <p className="p-lead">{project.summary}</p>
      </header>
      <dl className="p-facts">
        <div><dt>역할</dt><dd>{project.role}</dd></div>
        {project.responsibility && <div><dt>책임 범위</dt><dd>{project.responsibility}</dd></div>}
        <div><dt>기술</dt><dd>{project.tech.join(', ')}</dd></div>
        <div><dt>웹 상세</dt><dd><a href={`${site}#/project/${project.slug}`}>{bareUrl(site)}/#/project/{project.slug}</a></dd></div>
      </dl>

      {project.flow && (
        <figure className="p-flow">
          <figcaption>업무 흐름과 개인 기여</figcaption>
          <ol>
            {project.flow.nodes.map((node) => (
              <li key={node.title}>
                <strong>{node.title}</strong>
                <span>{node.description}</span>
                {node.contribution && <em>{node.contribution}</em>}
              </li>
            ))}
          </ol>
          <p className="p-small">{project.flow.environment}</p>
        </figure>
      )}

      <h3 className="p-subhead">직접 수행한 기여</h3>
      <div className="p-contrib">
        {project.contributions.map((item) => <div key={item.title}><h4>{item.title}</h4><p>{item.description}</p></div>)}
      </div>

      <h3 className="p-subhead">구현과 문제 해결</h3>
      {project.cases.map((item, index) => <Case key={item.id} item={item} index={index} />)}

      {project.notes && (
        <>
          <h3 className="p-subhead">추가 개발·진단 기록</h3>
          <ul className="p-notes">{project.notes.map((note) => <li key={note.title}><strong>{note.title}</strong><p>{note.text}</p></li>)}</ul>
        </>
      )}
    </section>
  )
}

function LabProject({ project }: { project: Project }) {
  const showcase = project.showcase!
  return (
    <article className="p-lab">
      <img src={asset(showcase.image)} alt={showcase.imageAlt} />
      <div>
        <p className="p-chapter__meta">{showcase.category} · {showcase.status} · {project.period}</p>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <p className="p-small">{project.tech.join(', ')}</p>
      </div>
      <ul className="p-lab__cases">
        {project.cases.map((item) => <li key={item.id}><strong>{item.title}</strong><p>{item.summary} {item.outcome}.</p></li>)}
      </ul>
      <p className="p-lab__links">{project.links?.map((link) => <a key={link.url} href={link.url}>{link.title} · {bareUrl(link.url)}</a>)}</p>
    </article>
  )
}

export default function PrintPortfolio() {
  const { hero, careerSummary, contact } = profile
  return (
    <main className="p-doc">
      <section className="p-cover">
        <header className="p-cover__header">
          <p className="p-cover__role">{hero.title}</p>
          <h1>{hero.name}</h1>
          <p className="p-cover__headline">{hero.headline.replace('\n', ' ')}</p>
          <p className="p-lead">{hero.summary}</p>
          <p className="p-contact">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.github}>{bareUrl(contact.github)}</a>
            <a href={contact.blog}>{bareUrl(contact.blog)}</a>
            <a href={site}>{bareUrl(site)}</a>
          </p>
        </header>

        <ol className="p-score">
          {scorecard.map((item) => (
            <li key={item.label}>
              <strong className="num">{item.value}<small>{item.unit}</small></strong>
              <span>{item.label}</span>
              <span className="p-small">{item.basis}</span>
            </li>
          ))}
        </ol>

        <h2 className="p-section-title">대표 사례</h2>
        <ol className="p-featured">
          {featuredCases.map((item) => (
            <li key={item.caseId}>
              <p className="p-featured__metric num">{item.metric}</p>
              <div>
                <p className="p-chapter__meta">{item.tag} · {item.project.shortName}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className="p-small">{item.metricNote}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="p-chapter p-career">
        <h2 className="p-section-title">경력과 기술</h2>
        <p className="p-lead">
          퓨쳐누리에서 정규직으로 3년 일한 뒤 9개월 동안 프론트엔드를 공부하며 Chrome 확장 Keep Your Focus와 업무 자동화 프로그램을 만들었고, 2025.07부터는 퓨쳐누리 시절 팀장이던 현 PL의 요청으로 프리랜서로 합류해 평가원 신규 플랫폼을 개발하고 있습니다. 총 실무경력 {careerSummary.total}, {careerSummary.asOf} 기준입니다.
        </p>
        {roles.map((role) => (
          <div key={role.period} className="p-role">
            <div className="p-role__head">
              <h3>퓨쳐누리 <span>{role.type}</span></h3>
              <p className="num">{role.period}</p>
              <p className="p-small">{role.duration}</p>
            </div>
            <ul>
              {role.projects.map((project) => (
                <li key={project.slug}>
                  <h4>{project.name}</h4>
                  <p>{project.summary}</p>
                  <p className="p-small">{(project.featuredTech ?? project.tech).join(', ')}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="p-role">
          <div className="p-role__head">
            <h3>개인 프로젝트</h3>
            <p className="num">{profile.sideProject.period}</p>
          </div>
          <ul><li><h4>{profile.sideProject.name}</h4><p>{profile.sideProject.summary}</p><p className="p-small">{profile.sideProject.tech.join(', ')}</p></li></ul>
        </div>

        <h3 className="p-subhead">기술과 사용 맥락</h3>
        <dl className="p-skills">
          {profile.skills.map((skill) => (
            <div key={skill.category}><dt>{skill.category}</dt><dd><strong>{skill.items.join(', ')}</strong><p>{skill.context}</p></dd></div>
          ))}
        </dl>
        <h3 className="p-subhead">학력</h3>
        {profile.education.map((item) => <p key={item.title}><strong>{item.title}</strong> {item.subtitle} <span className="p-small num">{item.period}</span></p>)}
        <p className="p-small p-gap">경력 산정 · {careerSummary.calculation}</p>
      </section>

      {profile.projects.map((project, index) => <Chapter key={project.slug} project={project} number={pad(index)} />)}

      <section className="p-chapter">
        <h2 className="p-section-title">개인 프로젝트</h2>
        <p className="p-lead">로컬 AI 대화 품질과 웹 게임 조작감의 기준을 직접 정했습니다. K-Racing은 웹에 공개했고, CharaNest는 품질 기준을 넘지 못해 출시를 보류한 프로토타입입니다.</p>
        {profile.explorations.map((project) => <LabProject key={project.slug} project={project} />)}
        <article className="p-lab p-lab--mini">
          <div>
            <p className="p-chapter__meta">Chrome 확장 · 스토어 배포 · {profile.sideProject.period}</p>
            <h3>{profile.sideProject.name}</h3>
            <p>{profile.sideProject.summary}</p>
          </div>
          <p className="p-lab__links">{profile.sideProject.links?.map((link) => <a key={link.url} href={link.url}>{link.title}</a>)}</p>
        </article>

        <footer className="p-closing">
          <h2>읽어 주셔서 감사합니다</h2>
          <p>각 사례의 측정 조건과 한계는 본문에 적었습니다. 더 궁금한 점은 아래 연락처로 알려 주세요.</p>
          <p className="p-contact">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.github}>{bareUrl(contact.github)}</a>
            <a href={contact.blog}>{bareUrl(contact.blog)}</a>
            <a href={site}>{bareUrl(site)}</a>
          </p>
        </footer>
      </section>
    </main>
  )
}
