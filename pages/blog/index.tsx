// import React from 'react'
// import { SecondaryNavigation } from '../../components/SecondaryNavigation'
// import { Row } from 'reactstrap'
// import Helmet from 'react-helmet'
// import Layout from '../../components/Layout'

// export default (props) => {
//   const { data } = props
//   return (
//     <Layout>
//       <Helmet
//         title='Blog - giraffesyo.io'
//         meta={[
//           {
//             name: 'description',
//             content: `Michael McQuade's personal blog: Generally non-technical blog posts from Michael's life.`,
//           },
//         ]}
//       >
//         <html lang='en' />
//       </Helmet>
//       <SecondaryNavigation location={props.location} />

//       <Row>
//         <h1 className='dark-blue-text'>
//           {'<'}
//           blog
//           {'>'}
//         </h1>
//       </Row>
//       <Row>
//         <h4 className='green-text'>
//           {'//'}
//           {data.allMarkdownRemark.totalCount} Posts
//         </h4>
//       </Row>
//       {data.allMarkdownRemark.edges.map(({ node }) => (
//         <div key={node.id}>
//           <Row style={{ clear: 'both' }}>
//             <Link
//               to={node.frontmatter.path}
//               style={{ textDecoration: `none`, color: `inherit` }}
//             >
//               <h2 className='light-blue-text'>{node.frontmatter.title}</h2>
//             </Link>
//           </Row>
//           <Row>
//             <h6 className='code-font green-text'>
//               {'//'}
//               {node.frontmatter.date}
//             </h6>
//           </Row>
//           <Row>
//             <h6 className='orange-text code-font'>
//               Read time: {node.timeToRead}{' '}
//               {node.timeToRead > 1 ? 'minutes' : 'minute'}
//             </h6>
//           </Row>
//           <Row>
//             <p style={{ marginLeft: 0 }}>{node.excerpt}</p>
//           </Row>
//           <Link
//             to={node.frontmatter.path}
//             style={{ textDecoration: `none`, color: `inherit` }}
//           >
//             <Row style={{ float: 'right' }} className='orange-text'>
//               Read more...
//             </Row>
//           </Link>
//         </div>
//       ))}
//     </Layout>
//   )
// }
// export const pageQuery = graphql`
//   query IndexQuery {
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] }
//       filter: { frontmatter: { hidden: { eq: false } } }
//     ) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 250)
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             path
//             title
//             hidden
//           }
//           timeToRead
//         }
//       }
//     }
//   }
// `

import HeroPost from '../../components/vercel/hero-post'
import Layout from '../../components/Layout'
import MoreStories from '../../components/vercel/more-stories'
import { getAllPosts } from '../../lib/blogapi'
import Head from 'next/head'

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}

export const BlogPostsIndexPage = ({ allPosts }) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <Layout>
      <Head>
        <title>Blog - giraffesyo.io</title>
        <meta
          key='description'
          name='description'
          content='Software engineering blog - Technical posts about programming by Michael McQuade'
        />
      </Head>
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={{ name: 'Michael McQuade' }}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </Layout>
  )
}

export default BlogPostsIndexPage
