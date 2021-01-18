import React, { useEffect, useState } from 'react'

import Footer from './Footer'
import { FaYinYang } from 'react-icons/fa'
import useDarkMode from '../hooks/useDarkMode'

const Layout: React.FC = (props) => {
  const [theme, setTheme, toggleDarkMode] = useDarkMode()

  return (
    <>
      <div
        className='absolute right-0 mr-3 text-2xl cursor-pointer'
        onClick={toggleDarkMode}
      >
        <FaYinYang />
      </div>
      <div className='container mx-auto mb-32 '>{props.children}</div>
      <Footer />
    </>
  )
}

export default Layout
