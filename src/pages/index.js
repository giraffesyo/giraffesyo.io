import React from 'react'
import { Projects } from '../components/Projects'
import { BlogExcerpts } from '../components/BlogExcerpts'
import { SecondaryNavigation } from '../components/SecondaryNavigation'
import { AboutMe } from '../components/AboutMe'
import { Photos } from '../components/Photos'

import { Container, Row, Col } from 'reactstrap'

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.changeActiveItem = this.changeActiveItem.bind(this)

    this.state = { activeItem: 'About Me' }
  }
  changeActiveItem(e) {
    this.setState({ activeItem: e.target.name })
  }

  render() {
    const { data } = this.props
    const { activeItem } = this.state
    return (
      <Container>
        <Row>
          <Col xs={12} >
            <SecondaryNavigation
              callback={this.changeActiveItem}
              activeItem={activeItem}
            />
          </Col>
        </Row>

        {activeItem === 'Projects' ? (
          <Row>
            <Col xs={12}>
              <Projects />
            </Col>
          </Row>
        ) : activeItem === 'About Me' ? (
          <Row>
            <Col xs={12} md={8}>
              <AboutMe />
            </Col>
            <Col xs={12} md={4}>
              <BlogExcerpts data={data.allMarkdownRemark.edges} />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col xs={12}>
              <Photos />
            </Col>
          </Row>
        )}
      </Container>
    )
  }
}

export default Home

export const blogExcerptsQuery = graphql`
  query blogExcerptsQuery {
    allMarkdownRemark(limit: 2, sort: { order: DESC, fields: [frontmatter___date] }) {
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
