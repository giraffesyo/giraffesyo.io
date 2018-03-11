import React from 'react'
import { Menu } from 'semantic-ui-react'
import 'styles/styles.css'

class SecondaryNavigation extends React.PureComponent {
  state = { activeItem: 'Projects' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Menu secondary borderless >
        <Menu.Item
          name="About Me"
          active={activeItem === 'About Me'}
          onClick={this.handleItemClick}
          className="light-purple-text"
          fitted='horizontally'
      
        />
        <Menu.Item
          name="Projects"
          active={activeItem === 'Projects'}
          onClick={this.handleItemClick}
          className="light-purple-text"
          fitted='horizontally'
         
        />
        <Menu.Item
          name="Photos"
          active={activeItem === 'Photos'}
          onClick={this.handleItemClick}
          className="light-purple-text"
          fitted='horizontally'
          
        />
      </Menu>
    )
  }
}

export { SecondaryNavigation }
