import React from 'react'
import 'styles/styles.css'
import { Grid, Image, Header } from 'semantic-ui-react'

import Dog from 'images/dog.png'

class Projects extends React.PureComponent {
  render() {
    const { props } = this.props
    return (
      <Grid container centered>
        <Grid.Row>
          <Header size={'large'} className="light-purple-text">Projects</Header>
        </Grid.Row>
        <Grid.Row />
        <Grid.Row>
          <Grid.Column width={4}>
         
            <Image attached className="PrairieDog" src={Dog} />
            <Header textAlign="center" inverted attached="bottom">Prairie Glade</Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <Image attached src={Dog} />
            <Header textAlign="center"  inverted  attached="bottom">Aimex</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export { Projects }
