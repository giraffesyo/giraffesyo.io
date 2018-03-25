import React from 'react'
import { Container, Row} from 'reactstrap'

class Photos extends React.PureComponent {
  render() {
    return (
      <Container columns="equal">
        <Row>
          <h1 className="light-purple-text">
            Photos
          </h1>
        </Row>
      </Container>
    )
  }
}

export { Photos }
