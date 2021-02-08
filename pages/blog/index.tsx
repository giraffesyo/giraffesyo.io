// import Layout from '../../components/Layout'
// import Link from 'next/link'
// import { getAllPosts } from '../../lib/blogapi'
// import Head from 'next/head'

// export async function getStaticProps() {
//   const allPosts = getAllPosts([
//     'title',
//     'date',
//     'slug',
//     'author',
//     'coverImage',
//     'excerpt',
//     'hidden',
//   ])

//   return {
//     props: { allPosts },
//   }
// }

// export const BlogPostsIndexPage = ({ allPosts }) => {
//   return (
//     <Layout>
//       <Head>
//         <title>Blog - giraffesyo.io</title>
//         <meta
//           key='description'
//           name='description'
//           content='Software engineering blog - Technical posts about programming by Michael McQuade'
//         />
//       </Head>

//       <div className='flex flex-row flex-wrap w-full '>
//         <h1 className='section-header'>
//           {'<'}
//           blog
//           {'>'}
//         </h1>
//         <div className='flex flex-row flex-wrap justify-center'>
//           {allPosts
//             .filter((post) => !post.hidden)
//             .map(({ slug, title, date, author, excerpt, timeToReadString }) => (
//               <Post
//                 timeToReadString={timeToReadString}
//                 author={author}
//                 date={date}
//                 excerpt={excerpt}
//                 slug={slug}
//                 title={title}
//               />
//             ))}
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default BlogPostsIndexPage

import { Post } from '../../components/Blog/Post'
import Layout from '../../components/Layout'
import { posts } from '../../lib/getAllPosts'

export default function IndexPage() {
  return (
    <Layout
      pageTitle='Blog - giraffesyo.io'
      description='Software engineering blog - Technical posts about programming by Michael McQuade'
    >
      <h1 className='section-header'>
        {'<'}
        blog
        {'>'}
      </h1>
      <div className='flex flex-col md:flex-row items-center justify-center w-full '>
        {posts.map((post) => (
          <Post key={post.link} post={post} />
        ))}
        {posts.map((post) => (
          <Post key={post.link} post={post} />
        ))}
      </div>
    </Layout>
  )
}
