import { Link } from 'react-router'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <div className='px-6 min-h-[80vh] flex flex-col items-center justify-center text-center'>
      <Seo
        title='404 | giraffesyo.io'
        description='The requested page could not be found.'
        pathname={window.location.pathname}
        noIndex
      />
      <p className='font-mono text-accent text-sm mb-4'>404</p>
      <h1 className='font-display text-4xl sm:text-5xl font-bold text-stone-900 dark:text-zinc-50 mb-4'>
        Page not found
      </h1>
      <p className='text-stone-500 dark:text-zinc-400 mb-8 max-w-md'>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to='/' className='btn-primary'>
        &larr; Back home
      </Link>
    </div>
  )
}
