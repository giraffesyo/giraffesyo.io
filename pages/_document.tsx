import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.querySelector('html').classList.add('dark')
              } else {
                  document.querySelector('html').classList.remove('dark')
              }`,
            }}
          ></script>
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: '0' }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
