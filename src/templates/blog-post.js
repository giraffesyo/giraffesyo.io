import React from 'react'
import { BlogSecondaryNavigation } from '../components/BlogSecondaryNavigation'
import { Container, Row, Col } from 'reactstrap'
import './blog-post.css'

export default ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, wordCount, timeToRead } = markdownRemark
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <BlogSecondaryNavigation />
        </Col>
      </Row>
      <Row>
        <h1>{frontmatter.title}</h1>
      </Row>
      <Row className="date">
        <h6 className="green-text code-font">//{frontmatter.date}</h6>
      </Row>
      <Row className="bottom">
        <h6 className="light-blue-text code-font">
          <span className="dark-blue-text">Read time:</span> {timeToRead}{' '}
          {timeToRead > 1 ? 'minutes' : 'minute'}{' '}
          <span className="orange-text">{'&&'}</span>{' '}
          <span className="dark-blue-text">Word Count:</span> {wordCount.words}
        </h6>
      </Row>
      <Row className="content">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Row>
    </Container>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
      timeToRead
      wordCount {
        words
      }
    }
  }
`
