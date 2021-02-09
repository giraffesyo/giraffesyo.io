import { FaLink } from 'react-icons/fa'

interface IPermalinkProps {
  href: string
}

const Permalink: React.FC<IPermalinkProps> = ({ href }) => {
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
  className: string
  id: string
}

const H1: React.FC<IHeaderProps> = ({ children, ...props }) => (
  <h1 className='text-2xl relative unhidechild' {...props}>
    <Permalink href={'#' + props.id} />
    {children}
  </h1>
)
const H2: React.FC<IHeaderProps> = ({ children, ...props }) => (
  <h2 className='text-2xl relative unhidechild' {...props}>
    <Permalink href={'#' + props.id} />

    {children}
  </h2>
)
const H3: React.FC<IHeaderProps> = ({ children, ...props }) => (
  <h3 className='text-2xl relative unhidechild' {...props}>
    <Permalink href={'#' + props.id} />

    {children}
  </h3>
)
const H4: React.FC<IHeaderProps> = ({ children, ...props }) => (
  <h4 className='text-2xl relative unhidechild' {...props}>
    <Permalink href={'#' + props.id} />

    {children}
  </h4>
)
const H5: React.FC<IHeaderProps> = ({ children, ...props }) => (
  <h5 className='text-2xl relative unhidechild' {...props}>
    <Permalink href={'#' + props.id} />

    {children}
  </h5>
)
const H6: React.FC<IHeaderProps> = ({ children, ...props }) => (
  <h6 className='text-2xl relative unhidechild' {...props}>
    <Permalink href={'#' + props.id} />

    {children}
  </h6>
)

export default { H1, H2, H3, H4, H5, H6 }
