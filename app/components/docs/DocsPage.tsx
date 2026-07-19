import { type ReactNode, useEffect, useState } from 'react'
import { FaGithub } from 'react-icons/fa6'
import { HiCheck, HiClipboardDocument, HiOutlineBookOpen } from 'react-icons/hi2'
import { Link, useLocation } from 'react-router'

export interface DocsSectionLink {
  id: string
  label: string
}

interface DocsPageProps {
  children: ReactNode
  description: string
  githubUrl: string
  highlights: string[]
  name: string
  pkgGoDevUrl: string
  sections: DocsSectionLink[]
}

const projects = [
  { to: '/downmark', name: 'downmark', summary: 'Documents to Markdown' },
  { to: '/pdf', name: 'pdf', summary: 'PDF text extraction' },
  {
    to: '/openapi-go-naming',
    name: 'openapi-go-naming',
    summary: 'OpenAPI names for Go',
  },
]

function usePageMetadata(name: string, description: string) {
  useEffect(() => {
    document.title = `${name} documentation | giraffesyo.io`

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const created = !meta
    const previous = meta?.content
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description

    return () => {
      if (created) {
        meta?.remove()
      } else if (meta && previous !== undefined) {
        meta.content = previous
      }
    }
  }, [description, name])
}

export default function DocsPage({
  children,
  description,
  githubUrl,
  highlights,
  name,
  pkgGoDevUrl,
  sections,
}: DocsPageProps) {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '')
  usePageMetadata(name, description)

  useEffect(() => {
    const updateActiveSection = () => {
      const headerOffset = 140
      let current = sections[0]?.id ?? ''

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (!element || element.getBoundingClientRect().top > headerOffset) break
        current = section.id
      }

      const atPageBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      if (atPageBottom && sections.length > 0) {
        current = sections[sections.length - 1].id
      }

      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [sections])

  return (
    <div className='px-6 py-16 sm:py-20'>
      <div className='max-w-6xl mx-auto'>
        <header className='pb-12 border-b border-stone-200 dark:border-zinc-800'>
          <div className='flex items-center gap-2 font-mono text-xs text-stone-400 dark:text-zinc-500 mb-6'>
            <Link to='/docs' className='hover:text-accent transition-colors'>
              docs
            </Link>
            <span>/</span>
            <span className='text-accent'>{name}</span>
          </div>

          <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8'>
            <div className='max-w-3xl'>
              <h1 className='font-display text-4xl sm:text-6xl font-bold tracking-tight text-stone-900 dark:text-zinc-50'>
                {name}
              </h1>
              <p className='mt-5 text-lg sm:text-xl leading-relaxed text-stone-500 dark:text-zinc-400'>
                {description}
              </p>
              <div className='flex flex-wrap gap-2 mt-6'>
                {highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className='px-3 py-1 rounded-full font-mono text-xs border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-stone-500 dark:text-zinc-400'
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className='flex flex-wrap gap-3 shrink-0'>
              <a
                href={githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='btn-secondary'
              >
                <FaGithub className='w-4 h-4' />
                GitHub
              </a>
              <a
                href={pkgGoDevUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='btn-primary'
              >
                <HiOutlineBookOpen className='w-4 h-4' />
                Go reference
              </a>
            </div>
          </div>
        </header>

        <nav className='lg:hidden flex gap-2 py-6 overflow-x-auto' aria-label='Documentation'>
          {projects.map((project) => (
            <Link
              key={project.to}
              to={project.to}
              className={`shrink-0 px-4 py-2 rounded-lg border font-mono text-sm transition-colors ${
                location.pathname === project.to
                  ? 'border-accent bg-accent-muted text-accent'
                  : 'border-stone-200 dark:border-zinc-800 text-stone-500 dark:text-zinc-400'
              }`}
            >
              {project.name}
            </Link>
          ))}
        </nav>

        <div className='grid lg:grid-cols-[220px_minmax(0,1fr)] gap-12 lg:gap-16 pt-10'>
          <aside className='hidden lg:block'>
            <div className='sticky top-24 space-y-8'>
              <nav aria-label='Documentation projects'>
                <p className='font-mono text-xs tracking-widest uppercase text-stone-400 dark:text-zinc-600 mb-3'>
                  Projects
                </p>
                <div className='space-y-1'>
                  {projects.map((project) => {
                    const active = location.pathname === project.to
                    return (
                      <Link
                        key={project.to}
                        to={project.to}
                        className={`block rounded-lg px-3 py-2.5 transition-colors ${
                          active
                            ? 'bg-accent-muted text-accent'
                            : 'text-stone-500 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-900'
                        }`}
                      >
                        <span className='block font-mono text-sm'>{project.name}</span>
                        <span className='block text-xs mt-0.5 opacity-70'>{project.summary}</span>
                      </Link>
                    )
                  })}
                </div>
              </nav>

              <nav aria-label='On this page'>
                <p className='font-mono text-xs tracking-widest uppercase text-stone-400 dark:text-zinc-600 mb-3'>
                  On this page
                </p>
                <div className='border-l border-stone-200 dark:border-zinc-800 space-y-1'>
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      aria-current={activeSection === section.id ? 'location' : undefined}
                      onClick={() => setActiveSection(section.id)}
                      className={`block -ml-px pl-4 py-1.5 border-l text-sm transition-colors ${
                        activeSection === section.id
                          ? 'border-accent text-accent font-medium'
                          : 'border-transparent text-stone-500 dark:text-zinc-500 hover:border-accent hover:text-accent'
                      }`}
                    >
                      {section.label}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </aside>

          <main className='min-w-0 max-w-3xl'>{children}</main>
        </div>
      </div>
    </div>
  )
}

interface DocSectionProps {
  children: ReactNode
  id: string
  title: string
}

export function DocSection({ children, id, title }: DocSectionProps) {
  return (
    <section id={id} className='scroll-mt-28 mb-16'>
      <h2 className='font-display text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-zinc-50 mb-5'>
        {title}
      </h2>
      <div className='docs-content'>{children}</div>
    </section>
  )
}

export function DocSubsection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className='mt-10'>
      <h3 className='font-display text-xl font-semibold text-stone-900 dark:text-zinc-100 mb-3'>
        {title}
      </h3>
      {children}
    </section>
  )
}

export function CodeBlock({ children, label }: { children: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className='relative my-6 group'>
      {label && (
        <div className='remark-code-title flex items-center justify-between'>
          <span>{label}</span>
        </div>
      )}
      <pre className={label ? 'mt-0 rounded-t-none pr-14' : 'pr-14'}>
        <code>{children}</code>
      </pre>
      <button
        type='button'
        onClick={copy}
        className={`absolute right-3 ${label ? 'top-10' : 'top-3'} p-2 rounded-md border border-stone-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-800/90 text-stone-400 dark:text-zinc-400 hover:text-accent hover:border-accent transition-colors`}
        aria-label='Copy code'
      >
        {copied ? (
          <HiCheck className='w-4 h-4 text-green-500' />
        ) : (
          <HiClipboardDocument className='w-4 h-4' />
        )}
      </button>
    </div>
  )
}

export function Callout({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <aside className='my-6 rounded-xl border border-accent/20 bg-accent-muted px-5 py-4 text-stone-600 dark:text-zinc-300'>
      {title && <p className='font-mono text-sm font-medium text-accent mb-1'>{title}</p>}
      <div className='text-sm leading-relaxed'>{children}</div>
    </aside>
  )
}

export function DocsTable({ children, headers }: { children: ReactNode; headers: string[] }) {
  return (
    <div className='overflow-x-auto my-6 rounded-xl border border-stone-200 dark:border-zinc-800'>
      <table className='w-full text-left text-sm'>
        <thead className='bg-stone-100/80 dark:bg-zinc-900 text-stone-700 dark:text-zinc-300'>
          <tr>
            {headers.map((header) => (
              <th key={header} className='px-4 py-3 font-mono text-xs font-medium'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-stone-200 dark:divide-zinc-800'>{children}</tbody>
      </table>
    </div>
  )
}

export function TableCell({ children, code = false }: { children: ReactNode; code?: boolean }) {
  return (
    <td className='px-4 py-3 align-top text-stone-600 dark:text-zinc-400 leading-relaxed'>
      {code ? <code>{children}</code> : children}
    </td>
  )
}
