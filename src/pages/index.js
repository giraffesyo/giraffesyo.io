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
    const { activeItem } = this.state
    return (
      <div>
        <Container>
          <Row>
            <Col
              xs="12"
              md={{ offset: 5, size: 7 }}
              lg={{ offset: 8, size: 4 }}
            >
              <SecondaryNavigation
                callback={this.changeActiveItem}
                activeItem={activeItem}
              />
            </Col>
          </Row>
          <Row>
            <Col width={11}>
              {activeItem === 'Projects' ? (
                <Projects />
              ) : activeItem === 'About Me' ? (
                <AboutMe />
              ) : (
                <Photos />
              )}
            </Col>
            <Container width={5}>
              <BlogExcerpts />
            </Container>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Home