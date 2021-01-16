import 'tailwindcss/tailwind.css'
import '../styles/tailwind.css'
import 'typeface-raleway'
import '../styles/index.css'

import type { AppProps} from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App