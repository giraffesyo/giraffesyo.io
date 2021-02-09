import hydrate from 'next-mdx-remote/hydrate'

import { getFiles, getFileBySlug, getSlugFromPath } from '@lib/mdx'
import BlogLayout from '../../layout'
const type = 'blog'
// import MDXComponents from '@components/MDXComponents'

export default function Blog({ mdxSource, frontMatter }) {
  // console.log(frontMatter)
  const content = hydrate(mdxSource, {
    // components: MDXComponents,
  })

  return (
    <BlogLayout
      pageTitle='test'
      description='test'
      // frontMatter={frontMatter}
    >
      {content}
    </BlogLayout>
  )
}

export async function getStaticPaths() {
  const posts = await getFiles(type)
  console.log(getSlugFromPath(posts[1], type))
  return {
    paths: posts.map((p) => ({
      params: {
        slug: getSlugFromPath(p, type),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  try {
    const post = await getFileBySlug(type, params.slug)
    return { props: post }
  } catch (e) {
    const post = await getFileBySlug(type, params.slug + '/index')
    return { props: post }
  }
}
