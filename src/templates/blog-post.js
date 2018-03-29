import React from 'react'
import { BlogSecondaryNavigation } from '../components/BlogSecondaryNavigation'
import { Container, Row, Col } from 'reactstrap'
import './blog-post.css'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <BlogSecondaryNavigation />
        </Col>
      </Row>
      <Row>
        <h1>{post.frontmatter.title}</h1>
      </Row>
      <Row>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Row>
    </Container>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`