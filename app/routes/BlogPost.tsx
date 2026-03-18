import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getPostBySlug } from '../lib/blog'
import BlogLayout from '../layout/blog'
import MDXComponents from '../components/blog/mdx'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  useEffect(() => {
    if (post) {
      document.title = `${post.frontMatter.title} - giraffesyo.io`
    }
  }, [post])

  if (!post) {
    return (
      <div style={{ textAlign: 'center', marginTop: '10%' }}>
        <h1>Post not found</h1>
        <p>The blog post you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    )
  }

  const { Component, frontMatter } = post

  return (
    <BlogLayout pageTitle={frontMatter.title} image={frontMatter.image}>
      <Component components={MDXComponents} />
    </BlogLayout>
  )
}
