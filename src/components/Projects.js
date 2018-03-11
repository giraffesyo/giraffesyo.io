import React from 'react'
import 'styles/styles.css'
import { Grid, Image, Header, Item } from 'semantic-ui-react'

import Dog from 'images/dog.png'

class Projects extends React.PureComponent {
  render() {
    return (
      <Grid container columns='equal'>
        <Grid.Row>
          <Header size={'large'} className="light-purple-text">
            Projects
          </Header>
        </Grid.Row>
        <Grid.Row />
        <Grid.Row>
          <Grid.Column>
            <Item>
              <Image
              centered
                size="small"
                
                className="PrairieDog"
                src={Dog}
              />
              <Header textAlign="center" inverted attached="bottom">
                Prairie Glade Chihuahuas
              </Header>
            </Item>
          </Grid.Column>
          <Grid.Column>
            <Item>
              <Image centered size="small" src={Dog} />
              <Header textAlign="center" inverted attached="bottom">
                Aimex
              </Header>
            </Item>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export { Projects }
