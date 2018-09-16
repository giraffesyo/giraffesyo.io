import React from 'react'
import { navigate } from 'gatsby-link'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap'
import styles from './SecondaryNavigation.module.css'

class SecondaryNavigation extends React.PureComponent {
  handleItemClick = (e, { name }) =>
    this.state.changeActiveItem({ activeItem: name })

  render() {
    const { location } = this.props
    let activeItem
    if (location.pathname === '/') {
      activeItem = 'About Me'
    } else {
      //TODO: dont make Blog the catch all
      activeItem = 'Blog'
    }
    return (
      <Navbar expand="xs">
        <Nav className="ml-auto" navbar>
          <NavItem className={`light-purple-text ${styles.large}`}>
            <NavLink
              className={styles.button}
              name="About Me"
              onClick={() => navigate('/')}
              active={activeItem === 'About Me'}
            >
              About
            </NavLink>
          </NavItem>
          <NavItem className={`light-purple-text ${styles.large}`}>
            <NavLink
              className={styles.button}
              onClick={() => navigate('/blog')}
              active={activeItem === 'Blog'}
            >
              Blog
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export { SecondaryNavigation }
