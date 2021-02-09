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

// export const getPosts =  async () => {

// }

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
  // List Posts
  // const postsDirectory = path.resolve(process.cwd(), 'data', 'blog')
  const postFiles = await getFiles()
  // Prepare posts off file system
  const postsPromises = postFiles.map((fileName) => {
    return getPost(fileName)
  })
  const postPromises = await Promise.all(postsPromises)
  return postPromises.sort(
    (a, b) =>
      Number(new Date(b.frontMatter.date)) -
      Number(new Date(a.frontMatter.date))
  )
}

const getPost = async (fileName) => {
  // const source = fs.readFileSync(path.join(blogPath, `${slug}.mdx`), 'utf8')
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
  const { title, description, date } = data
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
      slug: getSlugFromPath(fileName) || null,
    },
  }

  return post
}

const getSlugFromPath = (path: string) => {
  const slug = path.split(blogPath)[1].replace('.mdx', '')
  return slug
}

// export async function getAllFilesFrontMatter(type) {
//   const files = await getFiles(type)
//   return files.reduce((allPosts, postPath) => {
//     const source = fs.readFileSync(path.join(postPath), 'utf8')
//     const { data } = matter(source)
//     return [
//       {
//         ...data,
//         slug: getSlugFromPath(postPath, type),
//       },
//       ...allPosts,
//     ]
//   }, [])
// }

// import fs from 'fs'
// import matter from 'gray-matter'
// import path from 'path'

// export type BlogPost = {
//   slug: string
//   title: string
//   date: string
//   content: string
// }
