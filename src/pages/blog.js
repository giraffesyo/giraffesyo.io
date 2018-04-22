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
            to={node.frontmatter.path}
            style={{ textDecoration: `none`, color: `inherit` }}
          >
            <Row>
              <h2>{node.frontmatter.title}</h2>
            </Row>
            <Row>
              <h6 className="green-text"> {node.frontmatter.date}</h6>
            </Row>
            <p style={{ marginLeft: 0 }}>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </Container>
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
        }
      }
    }
  }
`;
