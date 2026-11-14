import type { ProjectFlow } from '../assets/data/types'
import { keepMiddleDot } from '../utils/text'

export default function ProjectDiagram({ flow }: { flow: ProjectFlow }) {
  return (
    <figure className="project-flow">
      <figcaption>{flow.summary}</figcaption>
      <ol className="flow-nodes">
        {flow.nodes.map((node) => (
          <li className="flow-node" key={node.title}>
            <div className="flow-node__context"><h3>{keepMiddleDot(node.title)}</h3><p>{keepMiddleDot(node.description)}</p></div>
            {node.contribution && <p className="flow-node__contribution"><span className="sr-only">개인 기여: </span>{keepMiddleDot(node.contribution)}</p>}
          </li>
        ))}
      </ol>
      <p className="flow-environment"><strong>환경</strong>{flow.environment}</p>
    </figure>
  )
}
