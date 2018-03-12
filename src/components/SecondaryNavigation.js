import React from 'react'
import { Menu } from 'semantic-ui-react'
import 'styles/styles.css'

class SecondaryNavigation extends React.PureComponent {
 
  handleItemClick = (e, { name }) => this.state.changeActiveItem({ activeItem: name })

  render() {
    const { activeItem} = this.props
    return (
      <Menu secondary borderless >
        <Menu.Item
          name="About Me"
          active={activeItem === 'About Me'}
          onClick={this.props.callback}
          className="light-purple-text"
          fitted='horizontally'
      
        />
        <Menu.Item
          name="Projects"
          active={activeItem === 'Projects'}
          onClick={this.props.callback}
          className="light-purple-text"
          fitted='horizontally'
         
        />
        <Menu.Item
          name="Photos"
          active={activeItem === 'Photos'}
          onClick={this.props.callback}
          className="light-purple-text"
          fitted='horizontally'
          
        />
      </Menu>
    )
  }
}

export { SecondaryNavigation }
