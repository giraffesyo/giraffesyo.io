import React from 'react'
import { Nav, NavItem } from 'reactstrap'

class SecondaryNavigation extends React.PureComponent {
  handleItemClick = (e, { name }) =>
    this.state.changeActiveItem({ activeItem: name })

  render() {
    const { activeItem } = this.props
    return (
      <Nav>
        <NavItem
          active={activeItem === 'About Me'}
          onClick={this.props.callback}
          className="light-purple-text"
        >
          About Me
        </NavItem>
        <NavItem
          active={activeItem === 'Projects'}
          onClick={this.props.callback}
          className="light-purple-text"
        >
          Projects
        </NavItem>
        <NavItem
          active={activeItem === 'Photos'}
          onClick={this.props.callback}
          className="light-purple-text"
        >
          Photos
        </NavItem>
      </Nav>
    )
  }
}

export { SecondaryNavigation }
