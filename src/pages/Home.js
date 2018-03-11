import React from 'react'
import 'styles/styles.css'
import { Grid } from 'semantic-ui-react'
import { Header } from 'components/Header'
import { Projects } from 'components/Projects'
import { BlogExcerpts } from 'components/BlogExcerpts'
import { SecondaryNavigation } from 'components/SecondaryNavigation'

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Grid columns={3} stackable>
          <Grid.Row>
            <Grid.Column floated="right">
              <SecondaryNavigation />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
              <Projects />
            </Grid.Column>
            <Grid.Column floated="right">
              <BlogExcerpts />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export { Home }
