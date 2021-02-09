import { useState } from 'react'

import BlogPost from '@components/blog/BlogPost'
import { getPosts } from '@lib/mdx'
import Layout from 'layout'
import { FaSearch } from 'react-icons/fa'
import { InferGetStaticPropsType } from 'next'

export const getStaticProps = async () => {
  const posts = await getPosts()
  return { props: { posts } }
}

const BlogIndexPage: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts }) => {
  const [searchValue, setSearchValue] = useState('')

  const filteredBlogPosts = posts.filter(({ frontMatter }) =>
    frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  )
  return (
    <Layout
      pageTitle='Blog - giraffesyo.io'
      description='Software engineering blog - Technical posts about programming by Michael McQuade'
    >
      <h1 className='section-header'>
        {'<'}
        blog
        {'>'}
      </h1>
      <div className='flex flex-col justify-center items-start max-w-4xl mx-auto mb-16'>
        <p className='text-gray-600 dark:text-gray-400 mb-4'>
          I started writing about software engineering problems in 2021. I want
          to keep being a nerd for the rest of my career, so I hope to litter
          this page with lots of helpful findings! So far, the site has{' '}
          {posts.length} articles. Use the search below to filter by title.
        </p>
        <div className='relative w-full mb-4'>
          <input
            aria-label='Search articles'
            type='text'
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Search articles'
            className='px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          />
          <FaSearch className='absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300' />
        </div>

        <h3 className='font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white'>
          All Posts
        </h3>
        {!filteredBlogPosts.length && (
          <p className='text-gray-600 dark:text-gray-400 mb-4'>
            No posts found.
          </p>
        )}
        {filteredBlogPosts.map(({ frontMatter }) => (
          <BlogPost key={frontMatter.title} {...frontMatter} />
        ))}
      </div>
    </Layout>
  )
}

export default BlogIndexPage
