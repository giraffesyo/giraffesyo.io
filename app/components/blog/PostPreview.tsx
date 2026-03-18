import { Link } from 'react-router'
import cx from 'classnames'
import type { IFrontMatter } from '../../lib/blog'

export default function PostPreview({
  date,
  readingTime,
  slug,
  title,
  summary,
  tags,
  image,
}: IFrontMatter) {
  return (
    <article className='flex items-center relative w-full'>
      {image && (
        <div className='w-1/3 mr-4'>
          <img src={image} alt={title} />
        </div>
      )}
      <div className={cx(image ? 'w-2/3' : 'w-full')}>
        <Link to={`/blog/${slug}`}>
          <h2 className='text-blue-code text-3xl font-medium'>{title}</h2>
        </Link>
        <h6 className='font-code text-green-code'>
          {'// '}
          Published {date}
          {readingTime && `, ${readingTime}`}
          <br />
          {tags ? `// tags: ${tags.join(', ')}` : ''}
        </h6>

        <p>{summary}</p>
        <Link to={`/blog/${slug}`}>
          <div className='text-orange-code'>Read more...</div>
        </Link>
      </div>
    </article>
  )
}
