import React from 'react'
import { navigateTo } from 'gatsby-link'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap'
import styles from './SecondaryNavigation.module.css'

class BlogSecondaryNavigation extends React.PureComponent {
  render() {
    return (
      <Navbar expand="xs">
        <Nav className="ml-auto" navbar>
          <NavItem className={`light-purple-text ${styles.large}`}>
            <NavLink
              className={styles.button}
              onClick={() =>
                navigateTo({ pathname: '/', activeItem: 'About Me' })
              }
            >
              About
            </NavLink>
          </NavItem>
          <NavItem className={`light-purple-text ${styles.large}`}>
            <NavLink
              className={styles.button}
              active
              onClick={() => navigateTo({ pathname: '/blog' })}
            >
              Blog
            </NavLink>
          </NavItem>
          <NavItem className={`light-purple-text ${styles.large}`}>
            <NavLink
              className={styles.button}
              onClick={() =>
                navigateTo({ pathname: '/', activeItem: 'Projects' })
              }
            >
              Projects
            </NavLink>
          </NavItem>
          <NavItem className={`light-purple-text ${styles.large}`}>
            <NavLink
              className={styles.button}
              onClick={() =>
                navigateTo({ pathname: '/', activeItem: 'Photos' })
              }
            >
              Photos
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export { BlogSecondaryNavigation }
