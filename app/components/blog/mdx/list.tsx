import type { ReactNode } from 'react'

const UL = ({ children }: { children?: ReactNode }) => (
  <ul className='list-disc'>{children}</ul>
)

const OL = ({ children }: { children?: ReactNode }) => (
  <ol className='list-decimal'>{children}</ol>
)

export default { UL, OL }
