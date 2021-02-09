import Link from 'next/link'
interface IFrontmatter {
  title: string
  date: Date
  description: string
  readingTime: string
  words: number
  slug: string
  summary: string
}

const BlogPost: React.FC<IFrontmatter> = ({
  date,
  description,
  readingTime,
  slug,
  title,
  words,
  children,
  summary,
}) => {
  return (
    <article className='w-1/2'>
      <Link href={`/blog/${slug}`}>
        <a>
          <h2 className='text-blue-code text-3xl font-medium'>{title}</h2>
        </a>
      </Link>
      <h6 className='font-code text-green-code'>
        {'//'}
        {date}
      </h6>
      <h6 className='font-code text-orange-code'>{readingTime}</h6>
      <p>{summary}</p>
      <Link href={`/blog/${slug}`}>
        <a>
          <div className='text-orange-code'>Read more...</div>
        </a>
      </Link>
    </article>
  )
}

export default BlogPost
