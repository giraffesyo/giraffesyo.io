import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { absoluteUrl, ROUTE_METADATA, SITE } from '../site.config.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const blogDirectory = path.join(root, 'data/blog')
const generatedDirectory = path.join(root, 'app/generated')
const publicDirectory = path.join(root, 'public')

function parseValue(rawValue) {
  const value = rawValue.trim()
  if (value === 'true') return true
  if (value === 'false') return false

  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }

  return value.replace(/^['"]|['"]$/g, '')
}

function parseFrontMatter(source, filename) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) throw new Error(`Missing front matter in ${filename}`)

  const frontMatter = {}
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue
    const separator = line.indexOf(':')
    if (separator === -1) continue
    const key = line.slice(0, separator).trim()
    frontMatter[key] = parseValue(line.slice(separator + 1))
  }

  for (const required of ['title', 'description', 'date', 'slug']) {
    if (!frontMatter[required]) throw new Error(`Missing ${required} in ${filename}`)
  }

  return frontMatter
}

async function readPosts() {
  const filenames = (await readdir(blogDirectory)).filter((filename) => filename.endsWith('.mdx'))
  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const source = await readFile(path.join(blogDirectory, filename), 'utf8')
      return {
        frontMatter: parseFrontMatter(source, filename),
        modulePath: `../../data/blog/${filename}`,
      }
    }),
  )

  return posts
    .filter(({ frontMatter }) => frontMatter.published !== false)
    .sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime())
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function escapeHtml(value) {
  return escapeXml(value)
}

function imageUrl(image) {
  return absoluteUrl(image || SITE.image)
}

function blogPostMetadata(frontMatter) {
  const pathname = `/blog/${frontMatter.slug}`
  return {
    description: frontMatter.description || frontMatter.summary,
    image: frontMatter.image || SITE.image,
    pathname,
    publishedTime: frontMatter.date,
    tags: frontMatter.tags || [],
    title: `${frontMatter.title} | giraffesyo.io`,
    type: 'article',
  }
}

function structuredData(metadata) {
  if (metadata.type === 'article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      author: {
        '@type': 'Person',
        name: SITE.author,
        url: SITE.url,
      },
      datePublished: metadata.publishedTime,
      description: metadata.description,
      headline: metadata.title.replace(/ \| giraffesyo\.io$/, ''),
      image: imageUrl(metadata.image),
      keywords: metadata.tags.join(', '),
      mainEntityOfPage: absoluteUrl(metadata.pathname),
    }
  }

  if (metadata.pathname === '/') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        description: SITE.description,
        name: SITE.name,
        url: SITE.url,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        email: `mailto:${SITE.email}`,
        image: imageUrl(SITE.image),
        jobTitle: 'Director of Engineering',
        name: SITE.author,
        sameAs: [
          'https://github.com/giraffesyo',
          'https://x.com/giraffesyo',
          'https://www.linkedin.com/in/mcquademichael/',
        ],
        url: SITE.url,
      },
    ]
  }

  return {
    '@context': 'https://schema.org',
    '@type': metadata.pathname === '/blog' ? 'Blog' : 'WebPage',
    description: metadata.description,
    name: metadata.title,
    url: absoluteUrl(metadata.pathname),
  }
}

function metadataMarkup(metadata) {
  const url = absoluteUrl(metadata.pathname)
  const image = imageUrl(metadata.image)
  const schema = JSON.stringify(structuredData(metadata)).replaceAll('<', '\\u003c')
  const articleTags = (metadata.tags || [])
    .map((tag) => `    <meta property="article:tag" content="${escapeHtml(tag)}" />`)
    .join('\n')

  return `    <title>${escapeHtml(metadata.title)}</title>
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <meta name="author" content="${escapeHtml(SITE.author)}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <link rel="alternate" type="application/rss+xml" title="giraffesyo.io RSS feed" href="${absoluteUrl('/rss.xml')}" />
    <meta property="og:site_name" content="${escapeHtml(SITE.name)}" />
    <meta property="og:type" content="${metadata.type || 'website'}" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@giraffesyo" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
${metadata.publishedTime ? `    <meta property="article:published_time" content="${escapeHtml(metadata.publishedTime)}" />\n` : ''}${articleTags ? `${articleTags}\n` : ''}    <script id="site-structured-data" type="application/ld+json">${schema}</script>`
}

function rssXml(posts) {
  const items = posts
    .map(({ frontMatter }) => {
      const url = absoluteUrl(`/blog/${frontMatter.slug}`)
      const categories = (frontMatter.tags || [])
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n')
      return `    <item>
      <title>${escapeXml(frontMatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${frontMatter.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(frontMatter.summary || frontMatter.description)}</description>
${categories}
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)}</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>${SITE.language}</language>
    <atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
}

function sitemapXml(posts) {
  const routes = Object.keys(ROUTE_METADATA).map((pathname) => ({ pathname }))
  routes.push(
    ...posts.map(({ frontMatter }) => ({
      lastModified: frontMatter.date,
      pathname: `/blog/${frontMatter.slug}`,
    })),
  )

  const urls = routes
    .map(
      ({ pathname, lastModified }) => `  <url>
    <loc>${absoluteUrl(pathname)}</loc>${lastModified ? `\n    <lastmod>${lastModified}</lastmod>` : ''}
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

async function generateSourceArtifacts(posts) {
  await mkdir(generatedDirectory, { recursive: true })
  const manifest = `${JSON.stringify(posts, null, 2)}\n`
  await writeFile(path.join(generatedDirectory, 'blog-manifest.json'), manifest)
  await writeFile(path.join(publicDirectory, 'rss.xml'), rssXml(posts))
  await writeFile(path.join(publicDirectory, 'sitemap.xml'), sitemapXml(posts))
  await writeFile(
    path.join(publicDirectory, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`,
  )
}

async function generateRouteHtml(posts) {
  const distDirectory = path.join(root, 'dist')
  const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8')
  const startMarker = '    <!-- site:seo -->'
  const endMarker = '    <!-- /site:seo -->'

  if (!template.includes(startMarker) || !template.includes(endMarker)) {
    throw new Error('SEO markers are missing from dist/index.html')
  }

  const pages = Object.entries(ROUTE_METADATA).map(([pathname, metadata]) => ({
    ...metadata,
    pathname,
  }))
  pages.push(...posts.map(({ frontMatter }) => blogPostMetadata(frontMatter)))

  for (const metadata of pages) {
    const html = template.replace(
      new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`),
      `${startMarker}\n${metadataMarkup(metadata)}\n${endMarker}`,
    )
    if (metadata.pathname === '/') {
      await writeFile(path.join(distDirectory, 'index.html'), html)
      continue
    }

    const relativePath = metadata.pathname.replace(/^\//, '')
    const cleanUrlPath = path.join(distDirectory, `${relativePath}.html`)
    await mkdir(path.dirname(cleanUrlPath), { recursive: true })
    await writeFile(cleanUrlPath, html)

    const outputDirectory = path.join(distDirectory, relativePath)
    await mkdir(outputDirectory, { recursive: true })
    await writeFile(path.join(outputDirectory, 'index.html'), html)
  }
}

const posts = await readPosts()
await generateSourceArtifacts(posts)

if (process.argv.includes('--postbuild')) {
  await generateRouteHtml(posts)
}
