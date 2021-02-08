// import { HeadPost } from './HeadPost'

import Layout from '../Layout'

export default function BlogPost({ children, meta }) {
  return (
    <Layout
      description="Michael McQuade's personal blog"
      pageTitle={meta.title}
    >
      {/* <HeadPost meta={meta} isBlogPost /> */}
      <article>{children}</article>
    </Layout>
  )
}
