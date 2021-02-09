import fs from 'fs'
import matter from 'gray-matter'
import mdxprism from 'mdx-prism'
import path from 'path'
import readingTime from 'reading-time'
import renderToString from 'next-mdx-remote/render-to-string'
import globby from 'globby'
// import MDXComponents from '@/components/MDXComponents'

const root = process.cwd()

export async function getFiles(type) {
  const directory = await globby(root + '/data/' + type + '/**/*.mdx')
  return directory
}

export async function getFileBySlug(type, slug) {
  const source = slug
    ? fs.readFileSync(path.join(root, 'data', type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(root, 'data', `${type}.mdx`), 'utf8')

  const { data, content } = matter(source)
  const mdxSource = await renderToString(content, {
    // components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles'),
      ],
      rehypePlugins: [mdxprism],
    },
  })

  const post = {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
  }

  return post
}

export const getSlugFromPath = (path: string, type: string) => {
  return path
    .split('/data/' + type)[1]
    .replace('/index.mdx', '')
    .replace('.mdx', '')
    .split('/')[1]
}

export async function getAllFilesFrontMatter(type) {
  const files = await getFiles(type)
  return files.reduce((allPosts, postPath) => {
    const source = fs.readFileSync(path.join(postPath), 'utf8')
    const { data } = matter(source)
    return [
      {
        ...data,
        slug: getSlugFromPath(postPath, type),
      },
      ...allPosts,
    ]
  }, [])
}
