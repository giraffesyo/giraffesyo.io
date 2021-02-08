import { useTheme } from 'next-themes'
import * as React from 'react'
import { useCallback } from 'react'
import { FaYinYang } from 'react-icons/fa'
import Footer from './Footer'

const Layout: React.FC = (props) => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('light')
    }
  }, [theme])

  return (
    <>
      <div
        className='fixed right-0 top-2 mr-3 text-2xl cursor-pointer'
        onClick={toggleTheme}
      >
        <FaYinYang />
      </div>
      <div className='container mx-auto mb-32 '>{props.children}</div>
      <Footer />
    </>
  )
}

export default Layout
