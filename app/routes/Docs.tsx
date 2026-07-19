import { FaGithub } from 'react-icons/fa6'
import { HiArrowRight, HiCodeBracket, HiDocumentText, HiTag } from 'react-icons/hi2'
import { Link } from 'react-router'
import { ROUTE_METADATA } from '../../site.config.mjs'
import FadeIn from '../components/FadeIn'
import Seo from '../components/Seo'

const projects = [
  {
    name: 'downmark',
    description:
      'Convert PDF, Word, Excel, PowerPoint, HTML, CSV, ZIP, and plain-text documents into clean Markdown.',
    to: '/downmark',
    github: 'https://github.com/giraffesyo/downmark',
    icon: HiDocumentText,
    details: ['CLI + Go library', 'Format-selective linking', 'Pure Go'],
  },
  {
    name: 'pdf',
    description:
      'Extract readable text and positioned glyphs from real-world PDF files with a zero-dependency Go package.',
    to: '/pdf',
    github: 'https://github.com/giraffesyo/pdf',
    icon: HiCodeBracket,
    details: ['Positioned glyphs', 'Zero dependencies', 'Hostile-file budgets'],
  },
  {
    name: 'openapi-go-naming',
    description:
      'Convert OpenAPI identifiers into idiomatic, deterministic, and collision-safe Go names.',
    to: '/openapi-go-naming',
    github: 'https://github.com/giraffesyo/openapi-go-naming',
    icon: HiTag,
    details: ['Valid Go identifiers', 'Collision-safe', 'Zero dependencies'],
  },
]

export default function Docs() {
  return (
    <div className='px-6 py-20 sm:py-24'>
      <Seo pathname='/docs' {...ROUTE_METADATA['/docs']} />
      <div className='max-w-6xl mx-auto'>
        <FadeIn>
          <div className='section-label max-w-3xl'>
            <span>Open source</span>
          </div>
          <h1 className='font-display text-4xl sm:text-6xl font-bold tracking-tight text-stone-900 dark:text-zinc-50 max-w-3xl'>
            Project documentation
          </h1>
          <p className='mt-5 text-lg sm:text-xl leading-relaxed text-stone-500 dark:text-zinc-400 max-w-2xl'>
            Guides and API notes for Go tools built around document conversion and extraction.
          </p>
        </FadeIn>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14'>
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <FadeIn key={project.name} delay={0.1 * (index + 1)}>
                <article className='card group relative h-full p-7 sm:p-8 flex flex-col focus-within:ring-2 focus-within:ring-accent/40'>
                  <Link
                    to={project.to}
                    className='absolute inset-0 rounded-xl'
                    aria-label={`Read the ${project.name} documentation`}
                  />
                  <div className='w-11 h-11 rounded-xl bg-accent-muted text-accent flex items-center justify-center mb-6'>
                    <Icon className='w-5 h-5' />
                  </div>
                  <h2 className='font-display text-2xl font-semibold text-stone-900 dark:text-zinc-50'>
                    {project.name}
                  </h2>
                  <p className='text-stone-500 dark:text-zinc-400 leading-relaxed mt-3'>
                    {project.description}
                  </p>
                  <div className='flex flex-wrap gap-2 mt-5'>
                    {project.details.map((detail) => (
                      <span
                        key={detail}
                        className='font-mono text-xs px-2.5 py-1 rounded-full bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-400'
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                  <div className='flex items-center gap-5 mt-8 pt-6 border-t border-stone-200 dark:border-zinc-800'>
                    <span className='inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:text-accent-hover transition-colors'>
                      Read the docs
                      <HiArrowRight className='w-4 h-4' />
                    </span>
                    <a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='relative z-10 inline-flex items-center gap-2 text-sm text-stone-400 dark:text-zinc-500 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors'
                    >
                      <FaGithub className='w-4 h-4' />
                      Source
                    </a>
                  </div>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </div>
  )
}
