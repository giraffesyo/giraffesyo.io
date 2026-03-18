import type { ComponentType } from 'react'

interface MDXModule {
  default: ComponentType<any>
  frontmatter: {
    title: string
    description: string
    slug: string
    date: Date | string
    summary?: string
    tags?: string[]
    image?: string
    published?: boolean
    readingTime?: string
  }
}

export interface IFrontMatter {
  title: string
  description: string
  summary?: string
  readingTime?: string
  slug: string
  date: string
  tags?: string[]
  image?: string
  published?: boolean
}

export interface IBlogPost {
  frontMatter: IFrontMatter
  Component: ComponentType<any>
}

const modules = import.meta.glob('../../data/blog/*.mdx', {
  eager: true,
}) as Record<string, MDXModule>

function buildPosts(): IBlogPost[] {
  return Object.values(modules)
    .map((mod) => ({
      frontMatter: {
        ...mod.frontmatter,
        date:
          mod.frontmatter.date instanceof Date
            ? mod.frontmatter.date.toISOString().split('T')[0]
            : String(mod.frontmatter.date),
      },
      Component: mod.default,
    }))
    .filter((p) => p.frontMatter.published !== false)
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date).getTime() -
        new Date(a.frontMatter.date).getTime()
    )
}

let postsCache: IBlogPost[] | null = null

export function getPosts(): IBlogPost[] {
  if (!postsCache) {
    postsCache = buildPosts()
  }
  return postsCache
}

export function getPostBySlug(slug: string): IBlogPost | undefined {
  return getPosts().find((p) => p.frontMatter.slug === slug)
}
