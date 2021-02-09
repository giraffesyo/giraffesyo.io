import Layout, { ILayoutProps } from './index'

interface IBlogLayoutProps extends ILayoutProps {
  image: string
}

const BlogLayout: React.FC<IBlogLayoutProps> = ({
  children,
  description,
  pageTitle,
  image,
}) => {
  return (
    <Layout pageTitle={pageTitle} description={description}>
      <div className='mx-auto w-1/3'>
        <div className='text-4xl text-center text-blue-code'>{pageTitle}</div>
        <img src={image} alt={pageTitle} />
      </div>
      {children}
    </Layout>
  )
}

export default BlogLayout
