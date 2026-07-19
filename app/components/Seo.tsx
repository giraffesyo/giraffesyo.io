import { useEffect } from 'react'
import { absoluteUrl, SITE } from '../../site.config.mjs'

interface SeoProps {
  description: string
  image?: string
  noIndex?: boolean
  pathname: string
  publishedTime?: string
  structuredData?: object | object[]
  tags?: string[]
  title: string
  type?: 'article' | 'website'
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function defaultStructuredData(pathname: string, title: string, description: string) {
  if (pathname === '/') {
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
        image: absoluteUrl(SITE.image),
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
    '@type': pathname === '/blog' ? 'Blog' : 'WebPage',
    description,
    name: title,
    url: absoluteUrl(pathname),
  }
}

export default function Seo({
  description,
  image = SITE.image,
  noIndex = false,
  pathname,
  publishedTime,
  structuredData,
  tags = [],
  title,
  type = 'website',
}: SeoProps) {
  const canonicalUrl = absoluteUrl(pathname)
  const imageUrl = absoluteUrl(image)
  const schema = JSON.stringify(
    structuredData ?? defaultStructuredData(pathname, title, description),
  )

  useEffect(() => {
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'author', SITE.author)
    upsertMeta(
      'name',
      'robots',
      noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large',
    )
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:creator', '@giraffesyo')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    const previousPublishedTime = document.head.querySelector<HTMLMetaElement>(
      'meta[property="article:published_time"]',
    )
    if (publishedTime) {
      upsertMeta('property', 'article:published_time', publishedTime)
    } else {
      previousPublishedTime?.remove()
    }

    for (const tag of document.head.querySelectorAll('meta[property="article:tag"]')) {
      tag.remove()
    }
    for (const tag of tags) {
      const element = document.createElement('meta')
      element.setAttribute('property', 'article:tag')
      element.content = tag
      document.head.appendChild(element)
    }

    let script = document.head.querySelector<HTMLScriptElement>('#site-structured-data')
    if (!script) {
      script = document.createElement('script')
      script.id = 'site-structured-data'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = schema
  }, [canonicalUrl, description, imageUrl, noIndex, publishedTime, schema, tags, title, type])

  return null
}
