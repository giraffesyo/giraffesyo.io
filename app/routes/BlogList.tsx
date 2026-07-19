import { useMemo } from 'react'
import { HiMagnifyingGlass, HiRss, HiXMark } from 'react-icons/hi2'
import { useSearchParams } from 'react-router'
import { ROUTE_METADATA } from '../../site.config.mjs'
import PostPreview from '../components/blog/PostPreview'
import FadeIn from '../components/FadeIn'
import Seo from '../components/Seo'
import { getPosts } from '../lib/blog'

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const posts = getPosts()
  const searchValue = searchParams.get('q') ?? ''
  const activeTag = searchParams.get('tag') ?? ''

  const tags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const { frontMatter } of posts) {
      for (const tag of frontMatter.tags ?? []) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }
    return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [posts])

  const normalizedSearch = searchValue.trim().toLowerCase()
  const filtered = posts.filter(({ frontMatter }) => {
    const matchesTag = !activeTag || frontMatter.tags?.includes(activeTag)
    const searchable = [
      frontMatter.title,
      frontMatter.description,
      frontMatter.summary,
      ...(frontMatter.tags ?? []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return matchesTag && (!normalizedSearch || searchable.includes(normalizedSearch))
  })

  const updateFilter = (key: 'q' | 'tag', value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next, { replace: true })
  }

  const clearFilters = () => setSearchParams({}, { replace: true })

  return (
    <div className='px-6 py-24'>
      <Seo pathname='/blog' {...ROUTE_METADATA['/blog']} />
      <div className='max-w-3xl mx-auto'>
        <FadeIn>
          <div className='section-label'>
            <span>Blog</span>
          </div>
          <div className='flex items-center justify-between gap-4 mb-4'>
            <h1 className='font-display text-4xl sm:text-5xl font-bold text-stone-900 dark:text-zinc-50'>
              Writing
            </h1>
            <a
              href='/rss.xml'
              className='btn-secondary !px-4 !py-2.5'
              aria-label='Subscribe to the RSS feed'
            >
              <HiRss className='w-4 h-4' />
              <span className='hidden sm:inline'>RSS</span>
            </a>
          </div>
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
              value={searchValue}
              onChange={(event) => updateFilter('q', event.target.value)}
              placeholder='Search titles, summaries, and tags...'
              className='w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-stone-900 dark:text-zinc-100 placeholder:text-stone-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm'
            />
          </div>

          {tags.length > 0 && (
            <fieldset className='flex flex-wrap items-center gap-2 -mt-7 mb-12'>
              <legend className='sr-only'>Filter by tag</legend>
              <button
                type='button'
                onClick={() => updateFilter('tag', '')}
                className={`tag-filter ${activeTag ? '' : 'active'}`}
              >
                All <span>{posts.length}</span>
              </button>
              {tags.map(([tag, count]) => (
                <button
                  key={tag}
                  type='button'
                  onClick={() => updateFilter('tag', activeTag === tag ? '' : tag)}
                  className={`tag-filter ${activeTag === tag ? 'active' : ''}`}
                  aria-pressed={activeTag === tag}
                >
                  {tag} <span>{count}</span>
                </button>
              ))}
            </fieldset>
          )}
        </FadeIn>

        <div className='grid gap-4'>
          {filtered.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-stone-400 dark:text-zinc-500'>No posts found.</p>
              <button
                type='button'
                onClick={clearFilters}
                className='inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover mt-3'
              >
                <HiXMark className='w-4 h-4' />
                Clear filters
              </button>
            </div>
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
