import Image from 'next/image'
import Link from './link'
import Headers from './header'
import List from './list'

const MDXComponents = {
  Image,
  a: Link,
  h1: Headers.H1,
  h2: Headers.H2,
  h3: Headers.H3,
  h4: Headers.H4,
  h5: Headers.H5,
  h6: Headers.H6,
  ul: List.UL,
  ol: List.OL,
}

export default MDXComponents
