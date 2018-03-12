import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

class AboutMe extends React.PureComponent {
  render() {
    return (
      <Grid container columns="equal">
        <Grid.Row>
          <Header size={'large'} className="light-purple-text">
            About Me
          </Header>
        </Grid.Row>
      </Grid>
    )
  }
}

export { AboutMe }
