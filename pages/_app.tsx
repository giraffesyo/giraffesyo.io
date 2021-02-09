import 'tailwindcss/tailwind.css'
import '../styles/tailwind.css'
import 'typeface-raleway'
import '../styles/index.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class'>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
