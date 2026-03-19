import { Link } from 'react-router'
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
    <Link to={`/blog/${slug}`} className='card overflow-hidden block group'>
      {image && (
        <img
          src={image}
          alt={title}
          className='w-full h-48 object-contain bg-stone-100 dark:bg-zinc-800'
          loading='lazy'
        />
      )}
      <div className='p-6'>
        <div className='flex items-center gap-3 mb-3'>
          <time className='text-xs font-mono text-stone-400 dark:text-zinc-500'>{date}</time>
          {readingTime && (
            <>
              <span className='text-stone-300 dark:text-zinc-700'>&middot;</span>
              <span className='text-xs font-mono text-stone-400 dark:text-zinc-500'>
                {readingTime}
              </span>
            </>
          )}
        </div>
        <h3 className='font-display text-xl font-semibold text-stone-900 dark:text-zinc-50 group-hover:text-accent transition-colors'>
          {title}
        </h3>
        {summary && (
          <p className='text-sm text-stone-500 dark:text-zinc-400 mt-2 leading-relaxed line-clamp-2'>
            {summary}
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-3'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='text-xs font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-400'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
