import { Suspense } from 'react'
import { HiArrowLeft } from 'react-icons/hi2'
import { Link, useParams } from 'react-router'
import { absoluteUrl, SITE } from '../../site.config.mjs'
import MDXComponents from '../components/blog/mdx'
import Seo from '../components/Seo'
import { getPostBySlug, getPosts } from '../lib/blog'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className='px-6 py-24 text-center'>
        <Seo
          title='Post not found | giraffesyo.io'
          description='The requested blog post could not be found.'
          pathname={window.location.pathname}
          noIndex
        />
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
  const posts = getPosts()
  const postIndex = posts.findIndex(({ frontMatter: item }) => item.slug === frontMatter.slug)
  const newerPost = postIndex > 0 ? posts[postIndex - 1] : undefined
  const olderPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : undefined
  const relatedPosts = posts
    .filter(
      ({ frontMatter: item }) =>
        item.slug !== frontMatter.slug && item.tags?.some((tag) => frontMatter.tags?.includes(tag)),
    )
    .slice(0, 2)
  const description = frontMatter.description || frontMatter.summary || frontMatter.title
  const pathname = `/blog/${frontMatter.slug}`

  return (
    <article className='px-6 py-24'>
      <Seo
        title={`${frontMatter.title} | giraffesyo.io`}
        description={description}
        pathname={pathname}
        image={frontMatter.image}
        type='article'
        publishedTime={frontMatter.date}
        tags={frontMatter.tags}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          author: {
            '@type': 'Person',
            name: SITE.author,
            url: SITE.url,
          },
          datePublished: frontMatter.date,
          description,
          headline: frontMatter.title,
          image: absoluteUrl(frontMatter.image || SITE.image),
          keywords: frontMatter.tags?.join(', '),
          mainEntityOfPage: absoluteUrl(pathname),
        }}
      />
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
            <time
              dateTime={frontMatter.date}
              className='text-sm font-mono text-stone-400 dark:text-zinc-500'
            >
              {frontMatter.date}
            </time>
            {frontMatter.readingTime && (
              <>
                <span className='text-stone-300 dark:text-zinc-700'>&middot;</span>
                <span className='text-sm font-mono text-stone-400 dark:text-zinc-500'>
                  {frontMatter.readingTime}
                </span>
              </>
            )}
          </div>
          {frontMatter.tags && frontMatter.tags.length > 0 && (
            <div className='flex flex-wrap gap-2 mt-4'>
              {frontMatter.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className='text-xs font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-400'
                >
                  {tag}
                </Link>
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
          <Suspense
            fallback={
              <p className='text-sm text-stone-400 dark:text-zinc-500 py-12'>Loading article…</p>
            }
          >
            <Component components={MDXComponents} />
          </Suspense>
        </div>

        {(relatedPosts.length > 0 || newerPost || olderPost) && (
          <footer className='mt-16 pt-10 border-t border-stone-200 dark:border-zinc-800'>
            {relatedPosts.length > 0 && (
              <div className='mb-10'>
                <h2 className='font-display text-xl font-semibold text-stone-900 dark:text-zinc-100 mb-4'>
                  Related writing
                </h2>
                <div className='grid sm:grid-cols-2 gap-3'>
                  {relatedPosts.map(({ frontMatter: item }) => (
                    <Link key={item.slug} to={`/blog/${item.slug}`} className='card p-4'>
                      <span className='text-sm font-medium text-stone-800 dark:text-zinc-200'>
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {(newerPost || olderPost) && (
              <nav className='grid sm:grid-cols-2 gap-4' aria-label='More articles'>
                {newerPost ? (
                  <Link to={`/blog/${newerPost.frontMatter.slug}`} className='card p-5'>
                    <span className='block text-xs font-mono text-stone-400 dark:text-zinc-500'>
                      Newer
                    </span>
                    <span className='block text-sm font-medium text-stone-800 dark:text-zinc-200 mt-1'>
                      {newerPost.frontMatter.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {olderPost && (
                  <Link
                    to={`/blog/${olderPost.frontMatter.slug}`}
                    className='card p-5 sm:text-right'
                  >
                    <span className='block text-xs font-mono text-stone-400 dark:text-zinc-500'>
                      Older
                    </span>
                    <span className='block text-sm font-medium text-stone-800 dark:text-zinc-200 mt-1'>
                      {olderPost.frontMatter.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </footer>
        )}
      </div>
    </article>
  )
}
