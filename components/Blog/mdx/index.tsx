import Link from 'next/link'
import Image from 'next/image'

const CustomLink = (props) => {
  const href = props.href
  return (
    <Link href={href}>
      <a {...props} />
    </Link>
  )
}

const MDXComponents = {
  Image,
  a: CustomLink,
}

export default MDXComponents
