import type { ReactNode } from 'react'
import { FaLink } from 'react-icons/fa'

const Permalink = ({ href }: { href: string }) => (
  <a
    aria-hidden={true}
    className='absolute -left-6 top-1/2 -translate-y-1/2 text-xs text-stone-300 dark:text-zinc-700 hover:text-accent transition-colors'
    href={href}
  >
    <FaLink />
  </a>
)

interface HeaderProps {
  className?: string
  id?: string
  children?: ReactNode
}

const H1 = ({ children, ...props }: HeaderProps) => (
  <h1
    className='font-display text-3xl font-bold text-stone-900 dark:text-zinc-50 mt-10 mb-4 relative group'
    {...props}
  >
    {props.id && (
      <span className='opacity-0 group-hover:opacity-100 transition-opacity'>
        <Permalink href={'#' + props.id} />
      </span>
    )}
    {children}
  </h1>
)

const H2 = ({ children, ...props }: HeaderProps) => (
  <h2
    className='font-display text-2xl font-semibold text-stone-900 dark:text-zinc-50 mt-8 mb-3 relative group'
    {...props}
  >
    {props.id && (
      <span className='opacity-0 group-hover:opacity-100 transition-opacity'>
        <Permalink href={'#' + props.id} />
      </span>
    )}
    {children}
  </h2>
)

const H3 = ({ children, ...props }: HeaderProps) => (
  <h3
    className='font-display text-xl font-semibold text-stone-900 dark:text-zinc-100 mt-6 mb-2 relative group'
    {...props}
  >
    {props.id && (
      <span className='opacity-0 group-hover:opacity-100 transition-opacity'>
        <Permalink href={'#' + props.id} />
      </span>
    )}
    {children}
  </h3>
)

const H4 = ({ children, ...props }: HeaderProps) => (
  <h4
    className='font-display text-lg font-semibold text-stone-900 dark:text-zinc-100 mt-4 mb-2 relative group'
    {...props}
  >
    {children}
  </h4>
)

const H5 = ({ children, ...props }: HeaderProps) => (
  <h5
    className='font-display text-base font-semibold text-stone-900 dark:text-zinc-100 mt-4 mb-1 relative'
    {...props}
  >
    {children}
  </h5>
)

const H6 = ({ children, ...props }: HeaderProps) => (
  <h6
    className='font-display text-sm font-semibold text-stone-900 dark:text-zinc-100 mt-4 mb-1 relative'
    {...props}
  >
    {children}
  </h6>
)

export default { H1, H2, H3, H4, H5, H6 }
