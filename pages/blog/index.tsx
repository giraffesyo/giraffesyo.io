import Layout from '../../components/Layout'
import Link from 'next/link'
import { getAllPosts } from '../../lib/blogapi'
import Head from 'next/head'

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'hidden',
  ])

  return {
    props: { allPosts },
  }
}

interface IPost {
  slug: string
  title: string
  date: string
  author?: string
  excerpt?: string
  wordCount?: number
  minutesToRead?: number
  timeToReadString?: string
}

export const Post: React.FC<IPost> = ({
  author,
  date,
  excerpt,
  slug,
  title,
  timeToReadString,
}) => {
  return (
    <div className='w-3/4'>
      <Link as={`/blog/${slug}`} href='/blog/[slug]'>
        <a>
          <h2 className='text-blue-code text-3xl font-medium'>{title}</h2>
        </a>
      </Link>
      <h6 className='font-code text-green-code'>
        {'//'}
        {date}
      </h6>
      <h6 className='font-code text-orange-code'>{timeToReadString}</h6>
      <p>{excerpt}</p>
      <Link as={`/blog/${slug}`} href='/blog/[slug]'>
        <a>
          <div className='text-orange-code'>Read more...</div>
        </a>
      </Link>
    </div>
  )
}

export const BlogPostsIndexPage = ({ allPosts }) => {
  // console.log(allPosts)
  return (
    <Layout>
      <Head>
        <title>Blog - giraffesyo.io</title>
        <meta
          key='description'
          name='description'
          content='Software engineering blog - Technical posts about programming by Michael McQuade'
        />
      </Head>

      <div className='flex flex-row flex-wrap w-full '>
        <h1 className='section-header'>
          {'<'}
          blog
          {'>'}
        </h1>
        <div className='flex flex-row flex-wrap justify-center'>
          {allPosts
            .filter((post) => !post.hidden)
            .map(({ slug, title, date, author, excerpt, timeToReadString }) => (
              <Post
                timeToReadString={timeToReadString}
                author={author}
                date={date}
                excerpt={excerpt}
                slug={slug}
                title={title}
              />
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostsIndexPage
