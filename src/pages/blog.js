import React from 'react'
import Link from 'gatsby-link'
import { BlogSecondaryNavigation } from '../components/BlogSecondaryNavigation'
import { Container, Row, Col } from 'reactstrap'

export default ({ data }) => {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <BlogSecondaryNavigation />
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
          <Link
            to={node.fields.slug}
            css={{ textDecoration: `none`, color: `inherit` }}
          >
            <Row>
              <h2>{node.frontmatter.title}</h2>
            </Row>
            <Row>
              <h6 className="green-text"> {node.frontmatter.date}</h6>
            </Row>
            <p style={{ 'margin-left': '0' }}>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </Container>
  )
}

export const query = graphql`
  query blogListQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
