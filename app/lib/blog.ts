import { type ComponentType, type LazyExoticComponent, lazy } from 'react'
import blogManifest from '../generated/blog-manifest.json'

interface MDXModule {
  default: ComponentType<any>
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
  Component: LazyExoticComponent<ComponentType<any>>
}

const modules = import.meta.glob('../../data/blog/*.mdx') as Record<
  string,
  () => Promise<MDXModule>
>

function buildPosts(): IBlogPost[] {
  return blogManifest.map(({ frontMatter, modulePath }) => {
    const loadModule = modules[modulePath]
    if (!loadModule) throw new Error(`No MDX module found for ${modulePath}`)

    return {
      Component: lazy(loadModule),
      frontMatter: frontMatter as IFrontMatter,
    }
  })
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
