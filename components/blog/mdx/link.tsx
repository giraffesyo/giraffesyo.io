import Link from 'next/link'

const CustomLink = (props) => {
  const href = props.href
  return (
    <Link href={href}>
      <a className='text-blue-code' {...props} />
    </Link>
  )
}
export default CustomLink
