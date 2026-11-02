import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  intro?: string
  children: ReactNode
}

export default function Section({ id, title, intro, children }: SectionProps) {
  return (
    <section id={id} tabIndex={-1} className="section" aria-labelledby={`${id}-title`}>
      <header className="section__header">
        <h2 id={`${id}-title`} className="section__title">{title}</h2>
        {intro && <p className="section__intro">{intro}</p>}
      </header>
      {children}
    </section>
  )
}
