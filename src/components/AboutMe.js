import React from 'react'
import { Grid, Header, Image } from 'semantic-ui-react'
import Me from 'images/MichaelMcQuadeGiraffesyo.jpg'
import 'styles/styles.css'

class AboutMe extends React.PureComponent {
  render() {
    return (
      <Grid container className="AboutMe">
        <Grid.Row>
          <Header size={'large'} className="light-purple-text">
            About Me
          </Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={5}>
            <Image src={Me} />
          </Grid.Column>
          <Grid.Column width={11}>
            <p>I'm Michael McQuade.</p>
            <p>
              I'm a Computer Science student at Oklahoma State University.
              However, I'm currently studying abroad at Monterrey Institute of
              Technology and Higher Education in Mexico City, Mexico.
            </p>
            <p>
              My experiences have been varied, from customer service to managing
              pizza places. Now, I'm finally doing what I love, learning to
              code!
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export { AboutMe }
