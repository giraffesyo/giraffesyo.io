import { Link } from 'react-router'

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href
  const isInternal = href?.startsWith('/')

  if (isInternal) {
    return <Link to={href!} className='text-blue-code' {...props} />
  }

  return <a className='text-blue-code' {...props} />
}

export default CustomLink
