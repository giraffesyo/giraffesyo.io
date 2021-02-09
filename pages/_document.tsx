import Document, { Head, Html, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '@lib/gtag'
class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />

        <body className='dark:bg-gray-codedark dark:text-white'>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script dangerouslySetInnerHTML={{ __html: '0' }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
