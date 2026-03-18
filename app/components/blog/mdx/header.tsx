import type { ReactNode } from 'react'
import { FaLink } from 'react-icons/fa'

interface IPermalinkProps {
  href: string
}

const Permalink = ({ href }: IPermalinkProps) => {
  return (
    <a
      aria-hidden={true}
      className='absolute left-1  top-2 text-base hover:opacity-50'
      href={href}
    >
      <FaLink />
    </a>
  )
}

interface IHeaderProps {
  className?: string
  id?: string
  children?: ReactNode
}

const H1 = ({ children, ...props }: IHeaderProps) => (
  <h1 className='text-2xl relative text-blue-code unhidechild' {...props}>
    <Permalink href={'#' + (props.id || '')} />
    {children}
  </h1>
)
const H2 = ({ children, ...props }: IHeaderProps) => (
  <h2 className='text-2xl relative unhidechild' {...props}>
    <Permalink href={'#' + (props.id || '')} />
    {children}
  </h2>
)
const H3 = ({ children, ...props }: IHeaderProps) => (
  <h3 className='text-2xl relative unhidechild' {...props}>
    <Permalink href={'#' + (props.id || '')} />
    {children}
  </h3>
)
const H4 = ({ children, ...props }: IHeaderProps) => (
  <h4 className='text-2xl relative unhidechild' {...props}>
    <Permalink href={'#' + (props.id || '')} />
    {children}
  </h4>
)
const H5 = ({ children, ...props }: IHeaderProps) => (
  <h5 className='text-2xl relative unhidechild' {...props}>
    <Permalink href={'#' + (props.id || '')} />
    {children}
  </h5>
)
const H6 = ({ children, ...props }: IHeaderProps) => (
  <h6 className='text-2xl relative unhidechild' {...props}>
    <Permalink href={'#' + (props.id || '')} />
    {children}
  </h6>
)

export default { H1, H2, H3, H4, H5, H6 }
