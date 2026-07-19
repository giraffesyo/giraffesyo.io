import { useCallback, useEffect } from 'react'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { HiMoon, HiSun } from 'react-icons/hi2'
import { Link, Outlet, useLocation } from 'react-router'
import { ThemeProvider, useTheme } from './hooks/useTheme'
import { pageview } from './lib/gtag'

function Nav() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const docsActive = ['/docs', '/downmark', '/pdf', '/openapi-go-naming'].some(
    (path) => location.pathname === path || location.pathname.startsWith(`${path}/`),
  )

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  return (
    <nav className='fixed top-0 w-full z-50 bg-stone-50/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-stone-200/50 dark:border-zinc-800/50'>
      <div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
        <Link
          to='/'
          className='font-mono text-sm text-accent hover:text-accent-hover transition-colors'
        >
          giraffesyo<span className='text-stone-400 dark:text-zinc-600'>.io</span>
        </Link>

        <div className='flex items-center gap-6'>
          <Link
            to='/'
            className={`nav-link hidden sm:block ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link to='/docs' className={`nav-link ${docsActive ? 'active' : ''}`}>
            Docs
          </Link>
          <Link
            to='/blog'
            className={`nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
          >
            Blog
          </Link>
          <button
            type='button'
            onClick={toggleTheme}
            className='p-2 rounded-lg text-stone-500 dark:text-zinc-500 hover:text-stone-900 dark:hover:text-zinc-100 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-all'
            aria-label='Toggle theme'
          >
            {theme === 'dark' ? <HiSun className='w-4 h-4' /> : <HiMoon className='w-4 h-4' />}
          </button>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className='border-t border-stone-200 dark:border-zinc-800 mt-32'>
      <div className='max-w-6xl mx-auto px-6 py-12'>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-6'>
          <div>
            <Link
              to='/'
              className='font-mono text-sm text-accent hover:text-accent-hover transition-colors'
            >
              giraffesyo<span className='text-stone-400 dark:text-zinc-600'>.io</span>
            </Link>
            <p className='text-xs text-stone-400 dark:text-zinc-600 mt-1'>Michael McQuade</p>
          </div>
          <div className='flex items-center gap-4'>
            <a
              href='https://github.com/giraffesyo'
              target='_blank'
              rel='noopener noreferrer'
              className='text-stone-400 dark:text-zinc-600 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors'
              aria-label='GitHub'
            >
              <FaGithub className='w-5 h-5' />
            </a>
            <a
              href='https://x.com/giraffesyo'
              target='_blank'
              rel='noopener noreferrer'
              className='text-stone-400 dark:text-zinc-600 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors'
              aria-label='X'
            >
              <FaXTwitter className='w-5 h-5' />
            </a>
            <a
              href='https://www.linkedin.com/in/mcquademichael/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-stone-400 dark:text-zinc-600 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors'
              aria-label='LinkedIn'
            >
              <FaLinkedinIn className='w-5 h-5' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function AppContent() {
  const location = useLocation()

  useEffect(() => {
    pageview(location.pathname)
  }, [location.pathname])

  return (
    <>
      <Nav />
      <div className='pt-16'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
