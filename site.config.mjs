export const SITE = {
  author: 'Michael McQuade',
  description:
    'Michael McQuade is a software engineering leader building cloud-native infrastructure, high-performance computing platforms, and AI tooling.',
  email: 'michael@giraffesyo.io',
  image: '/images/michaelmcquade.jpg',
  language: 'en-US',
  name: 'giraffesyo.io',
  title: 'Michael McQuade | Software Engineering Leader',
  url: 'https://giraffesyo.io',
}

export const ROUTE_METADATA = {
  '/': {
    description: SITE.description,
    title: SITE.title,
  },
  '/blog': {
    description:
      'Writing by Michael McQuade about software engineering, cloud infrastructure, high-performance computing, AI, and augmented reality.',
    title: 'Writing | giraffesyo.io',
  },
  '/docs': {
    description: 'Guides and API documentation for open-source Go tools built by Michael McQuade.',
    title: 'Open-source project documentation | giraffesyo.io',
  },
  '/downmark': {
    description:
      'Turn documents into clean, LLM-friendly Markdown with a single Go binary or a format-selective library.',
    title: 'downmark documentation | giraffesyo.io',
  },
  '/pdf': {
    description:
      'Extract readable text and positioned glyphs from real-world PDF files with a hardened, zero-dependency Go package.',
    title: 'pdf documentation | giraffesyo.io',
  },
  '/openapi-go-naming': {
    description:
      'Convert OpenAPI identifiers into idiomatic, deterministic, and collision-safe Go names.',
    title: 'openapi-go-naming documentation | giraffesyo.io',
  },
}

export function absoluteUrl(path = '/') {
  return new URL(path, SITE.url).toString()
}
