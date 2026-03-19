import type { ReactNode } from 'react'

const UL = ({ children }: { children?: ReactNode }) => (
  <ul className='list-disc ml-6 my-4 text-stone-600 dark:text-zinc-400 space-y-1'>
    {children}
  </ul>
)

const OL = ({ children }: { children?: ReactNode }) => (
  <ol className='list-decimal ml-6 my-4 text-stone-600 dark:text-zinc-400 space-y-1'>
    {children}
  </ol>
)

export default { UL, OL }
