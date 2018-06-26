import React from 'react'
import { Projects } from '../components/Projects'
import { BlogExcerpts } from '../components/BlogExcerpts'
import { SecondaryNavigation } from '../components/SecondaryNavigation'
import { AboutMe } from '../components/AboutMe'
import { Photos } from '../components/Photos'
import Helmet from 'react-helmet'

import { Container, Row, Col } from 'reactstrap'

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.changeActiveItem = this.changeActiveItem.bind(this)
    const activeItem = this.props.location.activeItem
      ? this.props.location.activeItem
      : 'About Me'
    this.state = { activeItem }
  }
  changeActiveItem(e) {
    this.setState({ activeItem: e.target.name })
  }

  render() {
    const { data } = this.props
    const { activeItem } = this.state
    return (
      <Container>
        <Helmet title="giraffesyo.io - Michael McQuade's Personal Site and blog" meta={[{name: 'description', content: `Michael McQuade's personal site: Michael is a computer science student at Oklahoma State University and has a passion for web devleopment. `}]}>
          <html lang="en" />
        </Helmet>
        <Row>
          <Col xs={12}>
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
        ) : activeItem === 'Photos' ? (
          <Row>
            <Col xs={12}>
              <Photos />
            </Col>
          </Row>
        ) : (
          <div>You broke it...</div>
        )}
      </Container>
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
