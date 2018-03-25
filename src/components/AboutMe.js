import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Me from '../images/MichaelMcQuadeGiraffesyo.jpg'

class AboutMe extends React.PureComponent {
  render() {
    return (
      <Container className="AboutMe">
        <Row>
          <Col>
            <h1 className="light-purple-text">
              About Me
            </h1>
          </Col>
        </Row>
        <Row>
          <Col width={5}>
            <img src={Me} />
          </Col>
          <Col width={11}>
            <p>I'm Michael McQuade.</p>
            <p>
              I'm a Computer Science student at Oklahoma State University.
              However, I'm currently studying abroad at Monterrey Institute of
              Technology and Higher Education in Mexico City, Mexico.
            </p>
            <p>
              My experiences have been varied, from customer service to managing
              a pizza place. Now, I'm finally doing what I love, learning to
              code!
            </p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export { AboutMe }
