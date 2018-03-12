import React from 'react'
import 'styles/styles.css'
import { Grid } from 'semantic-ui-react'
import { Header } from 'components/Header'
import { Projects } from 'components/Projects'
import { BlogExcerpts } from 'components/BlogExcerpts'
import { SecondaryNavigation } from 'components/SecondaryNavigation'

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.changeActiveItem = this.changeActiveItem.bind(this)

    this.state = { activeItem: 'Projects' }
  }
  changeActiveItem(e, {name}) {
    this.setState({activeItem: name})
  }

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Header />
        <Grid container stackable>
          <Grid.Row>
            <Grid.Column width={11} />
            <Grid.Column width={5}>
              <SecondaryNavigation
                callback={this.changeActiveItem}
                activeItem={activeItem}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={11}>
              <Projects />
            </Grid.Column>
            <Grid.Column width={5}>
              <BlogExcerpts />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export { Home }
