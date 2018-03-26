import React from 'react'
import { navigateTo } from 'gatsby-link'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap'
import styles from './SecondaryNavigation.module.css'

class SecondaryNavigation extends React.PureComponent {
  handleItemClick = (e, { name }) =>
    this.state.changeActiveItem({ activeItem: name })

  render() {
    const { activeItem } = this.props
    return (
      <Navbar expand="xs">
        <Nav className="ml-auto" navbar>
          <NavItem className={`light-purple-text ${styles.large}`}>
            <NavLink
              className={styles.button}
              name="About Me"
              onClick={this.props.callback}
              active={activeItem === 'About Me'}
            >
              About
            </NavLink>
          </NavItem>
          <NavItem className={`light-purple-text ${styles.large}`}>
            <NavLink
              className={styles.button}
              onClick={() => navigateTo({ pathname: '/blog' })}
            >
              Blog
            </NavLink>
          </NavItem>
          <NavItem
            onClick={this.props.callback}
            className={`light-purple-text ${styles.large}`}
          >
            <NavLink
              className={styles.button}
              name="Projects"
              active={activeItem === 'Projects'}
            >
              Projects
            </NavLink>
          </NavItem>
          <NavItem className={`light-purple-text ${styles.large}`}>
            <NavLink
              className={styles.button}
              name="Photos"
              onClick={this.props.callback}
              active={activeItem === 'Photos'}
            >
              Photos
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export { SecondaryNavigation }
