import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import Dog from '../images/dog.png'

class Projects extends React.PureComponent {
  render() {
    return (
      <Container container columns="equal">
        <Row>
          <Header size={'large'} className="light-purple-text">
            Projects
          </Header>
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
