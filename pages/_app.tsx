import 'tailwindcss/tailwind.css'
import '../styles/tailwind.css'
import 'typeface-raleway'
import '../styles/index.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { MDXProvider } from '@mdx-js/react'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class'>
      <MDXProvider>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  )
}

export default App
