import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Terminal from './Terminal'

export default function HeroSection() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className='relative min-h-[90vh] flex flex-col justify-center px-6'>
      {/* Ambient animated blobs */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='hero-blob hero-blob-1' />
        <div className='hero-blob hero-blob-2' />
      </div>

      {/* Grid pattern */}
      <div
        className='absolute inset-0 opacity-[0.025] dark:opacity-[0.035]'
        style={{
          backgroundImage:
            'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className='max-w-6xl mx-auto w-full relative z-10'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16'>
          {/* Left — text */}
          <div className='flex-1'>
            <p
              className={`font-mono text-sm text-accent transition-all duration-700 ${
                isReady
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '0.1s' }}
            >
              Hello, I'm
            </p>

            <h1
              className={`font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-stone-900 dark:text-zinc-50 mt-3 transition-all duration-1000 ${
                isReady
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '0.2s',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Michael
              <br />
              McQuade
            </h1>

            <p
              className={`text-lg sm:text-xl text-stone-500 dark:text-zinc-400 mt-6 max-w-xl leading-relaxed transition-all duration-700 ${
                isReady
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '0.45s' }}
            >
              Director of Engineering at Parallel Works, leading all product
              design and engineering for the ACTIVATE hybrid multi-cloud
              platform for HPC and AI workloads.
            </p>

            <div
              className={`flex flex-wrap gap-4 mt-8 transition-all duration-700 ${
                isReady
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '0.6s' }}
            >
              <a
                href='mailto:michael@giraffesyo.io'
                className='btn-primary'
              >
                Get in touch
                <span aria-hidden='true'>&rarr;</span>
              </a>
              <Link to='/blog' className='btn-secondary'>
                Read my blog
              </Link>
            </div>
          </div>

          {/* Right — terminal */}
          <div
            className={`lg:flex-shrink-0 transition-all duration-1000 ${
              isReady
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: '0.5s',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <Terminal />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1.5s' }}
      >
        <div className='w-5 h-8 rounded-full border-2 border-stone-300 dark:border-zinc-700 flex justify-center'>
          <div className='w-1 h-2 bg-stone-400 dark:bg-zinc-500 rounded-full mt-1.5 animate-bounce' />
        </div>
      </div>
    </section>
  )
}
