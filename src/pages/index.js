import React from 'react'
import { BlogExcerpts } from '../components/BlogExcerpts'
import { SecondaryNavigation } from '../components/SecondaryNavigation'
import { AboutMe } from '../components/AboutMe'
import Layout from '../components/Layout'
import Helmet from 'react-helmet'

import { Container, Row, Col } from 'reactstrap'

class Home extends React.PureComponent {
  render() {
    const { data } = this.props
    return (
      <Layout>
        <Container>
          <Helmet
            title="giraffesyo.io - Michael McQuade's Personal Site and blog"
            meta={[
              {
                name: 'description',
                content: `Michael McQuade's personal site: Michael is a computer science student at Oklahoma State University and has a passion for web devleopment. `
              }
            ]}
          >
            <html lang="en" />
          </Helmet>
          <Row>
            <Col xs={12}>
              <SecondaryNavigation location={this.props.location} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <AboutMe />
            </Col>
            <Col xs={12} md={4}>
              <BlogExcerpts data={data.allMarkdownRemark.edges} />
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default Home

export const blogExcerptsQuery = graphql`
  query blogExcerptsQuery {
    allMarkdownRemark(
      limit: 2
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
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
`
