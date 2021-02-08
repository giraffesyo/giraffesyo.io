import Link from 'next/link'
// import { HeadPost } from './HeadPost'
import type { IPost } from '../../lib/getAllPosts'

export const Post: React.FC<{ post: IPost }> = ({ post }) => {
  const {
    link,
    module: { meta },
  } = post
  return (
    <div className='w-1/2'>
      <Link href={`/blog${link}`}>
        <a>
          <h2 className='text-blue-code text-3xl font-medium'>{meta.title}</h2>
        </a>
      </Link>
      <h6 className='font-code text-green-code'>
        {'//'}
        {meta.date}
      </h6>
      <h6 className='font-code text-orange-code'>{meta.timeToRead}</h6>
      <p>{meta.excerpt}</p>
      <Link href={`/blog${link}`}>
        <a>
          <div className='text-orange-code'>Read more...</div>
        </a>
      </Link>
    </div>
  )
}
