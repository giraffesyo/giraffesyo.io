import React from 'react'
import { Grid, Header} from 'semantic-ui-react'

class Photos extends React.PureComponent {
  render() {
    return (
      <Grid container columns="equal">
        <Grid.Row>
          <Header size={'large'} className="light-purple-text">
            Photos
          </Header>
        </Grid.Row>
      </Grid>
    )
  }
}

export { Photos }
