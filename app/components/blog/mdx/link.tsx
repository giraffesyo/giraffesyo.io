import { Link } from 'react-router'

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href
  const isInternal = href?.startsWith('/')

  if (isInternal) {
    return (
      <Link
        to={href!}
        className='text-accent hover:text-accent-hover underline underline-offset-2 transition-colors'
        {...props}
      />
    )
  }

  return (
    <a
      className='text-accent hover:text-accent-hover underline underline-offset-2 transition-colors'
      target='_blank'
      rel='noopener noreferrer'
      {...props}
    />
  )
}

export default CustomLink
