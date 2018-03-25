import React from 'react'
import { Projects } from '../components/Projects'
import { BlogExcerpts } from '../components/BlogExcerpts'
import { SecondaryNavigation } from '../components/SecondaryNavigation'
import { AboutMe } from '../components/AboutMe'
import { Photos } from '../components/Photos'

import { Container, Row, Col} from 'reactstrap'

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.changeActiveItem = this.changeActiveItem.bind(this)

    this.state = { activeItem: 'About Me' }
  }
  changeActiveItem(e, { name }) {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Container>
          <Row>
            <Col width={11} />
            <Col width={5}>
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
