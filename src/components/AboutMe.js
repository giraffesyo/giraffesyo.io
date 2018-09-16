import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Me from '../images/MichaelMcQuadeGiraffesyo.jpg'

class AboutMe extends React.PureComponent {
  render() {
    return (
      <Container className="AboutMe">
        <Row noGutters>
          <Col>
            <h1 className="light-purple-text">About Me</h1>
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ size: 11, offset: 1 }}
            sm={{ size: 12, offset: 0 }}
            md={{ size: 3, offset: 0 }}
          >
            <img className='img-fluid' src={Me} alt="Michael Giraffesyo McQuade and a giraffe, taken at bioparque in the State of Mexico, Mexico" />
          </Col>
          <Col>
            <p>I'm Michael McQuade.</p>
            <p>
              I'm a Computer Science student at Oklahoma State University. I
              spent the last year studying my major abroad in Mexico City,
              Mexico. The experience helped me broaden my horizons as a denizen
              of the world while learning Computer Science from the most
              prestigious school in Mexico.
            </p>
            <p>
              My experiences have been varied, from customer service to managing
              a pizza place. Now, I'm finally doing what I love, learning to
              code!  I'm currently working as a Junior
              Developer at Foundation Software in Strongsville, Ohio, and will
              return to finish my senior year this August. I expect to graduate May 2019.
            </p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export { AboutMe }
