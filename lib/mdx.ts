import MDXComponents from '@components/blog/mdx'
import fs from 'fs'
import globby from 'globby'
import matter from 'gray-matter'
import mdxprism from 'mdx-prism'
import renderToString from 'next-mdx-remote/render-to-string'
import { MdxRemote } from 'next-mdx-remote/types'
import readingTime from 'reading-time'

const rootDir = process.cwd()
const blogPath = rootDir + '/data/blog/'
const blogGlob = blogPath + '**/*.mdx'

// get a list of all the files in the blog directory
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
  date: string // comes in as Date from YAML but can't be serialized as such
  tags?: string[]
  image?: string
  published?: boolean
}
export interface IBlogPost {
  mdxSource: MdxRemote.Source
  frontMatter: IFrontMatter
}

// get all the posts from fs (uses getPost)
export const getPosts = async (): Promise<IBlogPost[]> => {
  const postFiles = await getFiles()
  const postsPromises = postFiles.map((fileName) => {
    return getPost(fileName)
  })
  const postPromises = await Promise.all(postsPromises)

  return postPromises.sort((a, b) =>
    new Date(a.frontMatter.date) < new Date(b.frontMatter.date) ? 1 : -1
  )
}

// get a single post from the filesystem and prepare it for use
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

  // check for "required" frontmatter, so that we can crash the build if something is missing that shouldn't be missing
  if (!data.slug) {
    throw new Error(`No slug in frontmatter for ${fileName}`)
  }
  if (!data.title) {
    throw new Error(`No title in frontmatter for ${fileName}  `)
  }
  if (!data.description) {
    throw new Error(`No description in frontmatter for ${fileName}  `)
  }
  if (!data.date) {
    throw new Error(`No date in frontmatter for ${fileName}`)
  }
  if (!data.summary) {
    throw new Error(`No summary in frontmatter for ${fileName}`)
  }

  // all the frontmatter parsed from the file is in data
  // in order to recognize new fronmatter, we need to add it here
  const frontMatter: IFrontMatter = {
    published: data.published,
    image: data.image || null,
    tags: data.tags,
    title: data.title,
    description: data.description,
    summary: data.summary,
    date: data.date.toJSON(), // serialize the date as string
    wordCount: content.split(/\s+/gu).length,
    readingTime: readingTime(content),
    slug: data.slug,
  }

  // data exposed in this object will be available in the post and on the post listings
  const post: IBlogPost = {
    mdxSource,
    frontMatter,
  }

  return post
}
