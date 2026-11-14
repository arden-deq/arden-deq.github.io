import { createElement, type ReactNode } from 'react'

// 가운뎃점이 줄 맨 앞에 오지 않도록 앞 공백을 줄바꿈 없는 공백으로 바꾸고,
// 붙여 쓴 가운뎃점("개발·운영")이 든 어절은 줄이 갈라지지 않게 묶습니다.
// 보이지 않는 문자를 넣지 않으므로 페이지 내 검색과 복사에 영향이 없습니다.
export const keepMiddleDot = (text: string): ReactNode =>
  text.replace(/ · /g, '\u00A0· ').split(/(\S*·\S+)/).map((part, index) => (
    index % 2 ? createElement('span', { key: index, className: 'nowrap' }, part) : part
  ))

// "약 4년 3개월"처럼 수량이 줄 끝에서 갈라지지 않게 묶습니다.
export const keepDuration = (text: string) => text.replace(/(\d+년) (\d+개월)/g, '$1\u00A0$2').replace(/약 (\d)/g, '약\u00A0$1')
