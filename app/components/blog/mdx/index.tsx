import Headers from './header'
import CustomLink from './link'
import List from './list'

const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    {...props}
    loading='lazy'
    className='rounded-lg border border-stone-200 dark:border-zinc-800 my-6'
  />
)

const MDXComponents = {
  Image,
  img: Image,
  a: CustomLink,
  h1: Headers.H1,
  h2: Headers.H2,
  h3: Headers.H3,
  h4: Headers.H4,
  h5: Headers.H5,
  h6: Headers.H6,
  ul: List.UL,
  ol: List.OL,
  p: ({ children, ...props }: { children?: React.ReactNode }) => (
    <p className='text-stone-600 dark:text-zinc-400 leading-relaxed my-4' {...props}>
      {children}
    </p>
  ),
}

export default MDXComponents
