import type { ReactNode } from 'react'

interface NavProps {
  detail: boolean
  backHref: string
  themeButton: ReactNode
  onOpenResume: () => void
}

const items = [
  { id: 'cases', label: '사례' },
  { id: 'experience', label: '경력' },
  { id: 'lab', label: '개인 프로젝트' },
  { id: 'contact', label: '연락처' },
]

export default function Nav({ detail, backHref, themeButton, onOpenResume }: NavProps) {
  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <a href="#profile" className="site-nav__brand">남정덕</a>
        <nav className="site-nav__links" aria-label={detail ? '프로젝트 탐색' : '주요 섹션 이동'}>
          {detail ? <a href={backHref}>포트폴리오로 돌아가기</a> : (
            <ul>
              {items.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}
            </ul>
          )}
        </nav>
        <button type="button" className="site-nav__resume" onClick={onOpenResume}>이력서</button>
        {themeButton}
      </div>
    </header>
  )
}
