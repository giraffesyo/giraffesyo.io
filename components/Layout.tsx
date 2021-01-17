import React from 'react'

import Footer from './Footer'
import { FaYinYang } from 'react-icons/fa'

const toggleTheme = (theme) => {
  if (theme === 'dark') {
    localStorage.theme = 'light'
    document.querySelector('html').classList.remove('dark')
  } else {
    localStorage.theme = 'dark'
    document.querySelector('html').classList.add('dark')
  }
}

const ToggleDarkMode = () => {
  // find out if they have a darkmode setting already
  if ('theme' in localStorage) {
    // reverse whatever it is
    const theme = localStorage.theme
    toggleTheme(theme)
  } else {
    // get their current system settings
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    toggleTheme(theme)
  }
}

const Layout: React.FC = (props) => {
  return (
    <>
      <div
        className='absolute right-0 mr-3 text-2xl cursor-pointer'
        onClick={ToggleDarkMode}
      >
        <FaYinYang />
      </div>
      <div className='container mx-auto mb-32 '>{props.children}</div>
      <Footer />
    </>
  )
}

export default Layout
