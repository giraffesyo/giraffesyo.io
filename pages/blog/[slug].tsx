import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Header from '../../components/vercel/header'
import PostBody from '../../components/vercel/post-body'
import PostHeader from '../../components/vercel/post-header'
import PostTitle from '../../components/vercel/post-title'
import { getAllPosts, getPostBySlug } from '../../lib/blogapi'
import markdownToHtml from '../../lib/markdownToHtml'

const BlogPostPage = ({ post, morePosts, preview }) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Header />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className='mb-32'>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])

  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default BlogPostPage
