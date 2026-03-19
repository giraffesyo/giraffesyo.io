import { useEffect, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import PostPreview from '../components/blog/PostPreview'
import FadeIn from '../components/FadeIn'
import { getPosts } from '../lib/blog'

export default function BlogList() {
  const [searchValue, setSearchValue] = useState('')
  const posts = getPosts()

  useEffect(() => {
    document.title = 'Blog | giraffesyo.io'
  }, [])

  const filtered = posts.filter(({ frontMatter }) =>
    frontMatter.title.toLowerCase().includes(searchValue.toLowerCase()),
  )

  return (
    <div className='px-6 py-24'>
      <div className='max-w-3xl mx-auto'>
        <FadeIn>
          <div className='section-label'>
            <span>Blog</span>
          </div>
          <h1 className='font-display text-4xl sm:text-5xl font-bold text-stone-900 dark:text-zinc-50 mb-4'>
            Writing
          </h1>
          <p className='text-stone-500 dark:text-zinc-400 leading-relaxed mb-8'>
            Thoughts on software engineering, cloud infrastructure, and augmented reality.{' '}
            <span className='font-mono text-sm text-stone-400 dark:text-zinc-500'>
              {posts.length} article{posts.length !== 1 ? 's' : ''}
            </span>
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className='relative mb-12'>
            <HiMagnifyingGlass className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-zinc-500' />
            <input
              aria-label='Search articles'
              type='text'
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search articles...'
              className='w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-stone-900 dark:text-zinc-100 placeholder:text-stone-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm'
            />
          </div>
        </FadeIn>

        <div className='grid gap-4'>
          {filtered.length === 0 && (
            <p className='text-stone-400 dark:text-zinc-500 text-center py-12'>No posts found.</p>
          )}
          {filtered.map(({ frontMatter }, i) => (
            <FadeIn key={frontMatter.slug} delay={0.05 * (i + 1)}>
              <PostPreview {...frontMatter} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}
