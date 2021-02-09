import fs from 'fs'
import matter from 'gray-matter'
import mdxprism from 'mdx-prism'
import path from 'path'
import readingTime from 'reading-time'
import renderToString from 'next-mdx-remote/render-to-string'
import globby from 'globby'
import MDXComponents from '@components/blog/mdx'
import { MdxRemote } from 'next-mdx-remote/types'

const rootDir = process.cwd()
const blogPath = rootDir + '/data/blog/'
const blogGlob = blogPath + '**/*.mdx'

async function getFiles() {
  const directory = await globby(blogGlob)
  return directory
}

export interface IFrontMatter {
  title: string
  description: string
  summary?: string
  readingTime: ReturnType<typeof readingTime>
  wordCount: number
  slug: string
  date: string
}
export interface IBlogPost {
  mdxSource: MdxRemote.Source
  frontMatter: IFrontMatter
}

export const getPosts = async (): Promise<IBlogPost[]> => {
  const postFiles = await getFiles()
  const postsPromises = postFiles.map((fileName) => {
    return getPost(fileName)
  })
  const postPromises = await Promise.all(postsPromises)
  return postPromises.sort((a, b) =>
    a.frontMatter.date.localCompare(b.frontMatter.date)
  )
}

const getPost = async (fileName) => {
  const source = fs.readFileSync(fileName, 'utf8')

  const { data, content } = matter(source)
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
      ],
      rehypePlugins: [mdxprism],
    },
  })
  const { title, description, date, slug } = data
  if (!title) {
    throw new Error(`No title in frontmatter for ${fileName}  `)
  }
  if (!description) {
    throw new Error(`No description in frontmatter for ${fileName}  `)
  }
  if (!date) {
    throw new Error(`No date in frontmatter for ${fileName}`)
  }
  const post = {
    mdxSource,
    frontMatter: {
      title,
      description,
      date,
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug,
    },
  }

  return post
}
