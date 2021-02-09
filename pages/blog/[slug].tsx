import hydrate from 'next-mdx-remote/hydrate'

import { getPosts } from '@lib/mdx'
import Layout from '../../layout'

import MDXComponents from '@components/blog/mdx'

const BlogPage = ({ post: { mdxSource, frontMatter } }) => {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  })

  return (
    <Layout pageTitle={frontMatter.title} description={frontMatter.description}>
      {content}
    </Layout>
  )
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.frontMatter.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const posts = await getPosts()
  const props = { post: posts.find((p) => p.frontMatter.slug === params.slug) }
  return { props }
}

export default BlogPage
