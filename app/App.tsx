import { Outlet, useLocation } from 'react-router'
import { useCallback, useEffect } from 'react'
import { FaYinYang } from 'react-icons/fa'
import { ThemeProvider, useTheme } from './hooks/useTheme'
import Footer from './components/Footer'
import { pageview } from './lib/gtag'

function AppContent() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    pageview(location.pathname)
  }, [location.pathname])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  return (
    <>
      <div
        className='fixed right-0 top-2 mr-3 text-2xl cursor-pointer z-10'
        onClick={toggleTheme}
      >
        <FaYinYang />
      </div>
      <main className='container mx-auto mb-32'>
        <Outlet />
      </main>
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
