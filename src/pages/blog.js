import React from 'react'
import Link from 'gatsby-link'
import { SecondaryNavigation } from '../components/SecondaryNavigation'
import { Container, Row, Col } from 'reactstrap'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'

export default props => {
  const { data } = props
  return (
    <Layout>
      <Container>
        <Helmet
          title="Blog - giraffesyo.io"
          meta={[
            {
              name: 'description',
              content: `Michael McQuade's personal blog: Generally non-technical blog posts from Michael's life.`
            }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Row>
          <Col xs={12}>
            <SecondaryNavigation location={props.location} />
          </Col>
        </Row>
        <Row>
          <h1 className="dark-blue-text">
            {'<'}blog{'>'}
          </h1>
        </Row>
        <Row>
          <h4 className="green-text">
            {'//'}
            {data.allMarkdownRemark.totalCount} Posts
          </h4>
        </Row>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Row style={{ clear: 'both' }}>
              <Link
                to={node.frontmatter.path}
                style={{ textDecoration: `none`, color: `inherit` }}
              >
                <h2 className='light-blue-text'>{node.frontmatter.title}</h2>
              </Link>
            </Row>
            <Row>
              <h6 className="code-font green-text">
                {'//'}{node.frontmatter.date}
              </h6>
            </Row>
            <Row>
              <h6 className="orange-text code-font">
                Read time: {node.timeToRead}{' '}
                {node.timeToRead > 1 ? 'minutes' : 'minute'}
              </h6>
            </Row>
            <Row>
              <p style={{ marginLeft: 0 }}>{node.excerpt}</p>
            </Row>
            <Link
              to={node.frontmatter.path}
              style={{ textDecoration: `none`, color: `inherit` }}
            >
              <Row style={{ float: 'right' }} className="orange-text">
                Read more...
              </Row>
            </Link>
          </div>
        ))}
      </Container>
    </Layout>
  )
}
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
          timeToRead
        }
      }
    }
  }
`
