import { IFrontMatter } from '@lib/mdx'
import Link from 'next/link'
import Image from 'next/image'
import cx from 'classnames'
const PostPreview: React.FC<IFrontMatter> = ({
  date,
  readingTime,
  slug,
  title,
  summary,
  tags,
  image,
}) => {
  console.log(tags)
  return (
    <article className='flex items-center relative w-full'>
      {image && (
        <div className='w-1/3 mr-4'>
          <img src={image} />
        </div>
      )}
      <div className={cx(image ? 'w-2/3' : 'w-full')}>
        <Link href={`/blog/${slug}`}>
          <a>
            <h2 className='text-blue-code text-3xl font-medium'>{title}</h2>
          </a>
        </Link>
        <h6 className='font-code text-green-code'>
          {'// '}
          Published {date}, {readingTime.text}
          <br />
          {tags ? `// tags: ${tags.join(', ')}` : ''}
        </h6>

        <p>{summary}</p>
        <Link href={`/blog/${slug}`}>
          <a>
            <div className='text-orange-code'>Read more...</div>
          </a>
        </Link>
      </div>
    </article>
  )
}

export default PostPreview
