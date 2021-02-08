import { useTheme } from 'next-themes'
import Head from 'next/head'
import * as React from 'react'
import { useCallback } from 'react'
import { FaYinYang } from 'react-icons/fa'
import Footer from './Footer'

interface ILayoutProps {
  pageTitle: string
  description: string
}

const Layout: React.FC<ILayoutProps> = ({
  description,
  pageTitle,
  children,
}) => {
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
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <meta name='description' content={description}></meta>
        <title>{pageTitle}</title>
      </Head>
      <div className='flex justify-end w-11/12'>Test</div>
      <div
        className='fixed right-0 top-2 mr-3 text-2xl cursor-pointer'
        onClick={toggleTheme}
      >
        <FaYinYang />
      </div>
      <main className='container mx-auto mb-32 '>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
