import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body className='dark:bg-gray-codedark dark:text-white'>
          <script dangerouslySetInnerHTML={{ __html: '0' }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
