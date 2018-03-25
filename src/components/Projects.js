import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import Dog from '../images/dog.png'

class Projects extends React.PureComponent {
  render() {
    return (
      <Container>
        <Row>
          <h1 className="light-purple-text">
            Projects
          </h1>
        </Row>
        <Row />
        <Row>
          <Col>Test</Col>
          <Col>Test 2</Col>
        </Row>
      </Container>
    )
  }
}

export { Projects }
