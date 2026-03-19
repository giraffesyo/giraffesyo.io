import { useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { HiArrowLeft } from 'react-icons/hi2'
import { getPostBySlug } from '../lib/blog'
import MDXComponents from '../components/blog/mdx'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  useEffect(() => {
    if (post) {
      document.title = `${post.frontMatter.title} | giraffesyo.io`
    }
  }, [post])

  if (!post) {
    return (
      <div className='px-6 py-24 text-center'>
        <h1 className='font-display text-3xl font-bold text-stone-900 dark:text-zinc-50'>
          Post not found
        </h1>
        <p className='text-stone-500 dark:text-zinc-400 mt-4'>
          The blog post you're looking for doesn't exist.
        </p>
        <Link to='/blog' className='btn-primary mt-8 inline-flex'>
          &larr; Back to blog
        </Link>
      </div>
    )
  }

  const { Component, frontMatter } = post

  return (
    <article className='px-6 py-24'>
      <div className='max-w-3xl mx-auto'>
        <Link
          to='/blog'
          className='inline-flex items-center gap-2 text-sm text-stone-400 dark:text-zinc-500 hover:text-accent transition-colors mb-8'
        >
          <HiArrowLeft className='w-3 h-3' />
          Back to blog
        </Link>

        <header className='mb-12'>
          <h1 className='font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-zinc-50 leading-tight'>
            {frontMatter.title}
          </h1>
          <div className='flex items-center gap-3 mt-4'>
            <time className='text-sm font-mono text-stone-400 dark:text-zinc-500'>
              {frontMatter.date}
            </time>
            {frontMatter.readingTime && (
              <>
                <span className='text-stone-300 dark:text-zinc-700'>
                  &middot;
                </span>
                <span className='text-sm font-mono text-stone-400 dark:text-zinc-500'>
                  {frontMatter.readingTime}
                </span>
              </>
            )}
          </div>
          {frontMatter.tags && frontMatter.tags.length > 0 && (
            <div className='flex flex-wrap gap-2 mt-4'>
              {frontMatter.tags.map((tag) => (
                <span
                  key={tag}
                  className='text-xs font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-400'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {frontMatter.image && (
            <img
              src={frontMatter.image}
              alt={frontMatter.title}
              className='w-full rounded-xl mt-8 border border-stone-200 dark:border-zinc-800'
            />
          )}
        </header>

        <div className='prose-custom'>
          <Component components={MDXComponents} />
        </div>
      </div>
    </article>
  )
}
