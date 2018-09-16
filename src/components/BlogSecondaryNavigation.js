import React from 'react'
import { navigate } from 'gatsby-link'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap'
import styles from './SecondaryNavigation.module.css'

class BlogSecondaryNavigation extends React.PureComponent {
  //todo: just use this one navigation component instead of both (this one should work for both since it passes the active items)
  render() {
    return (
      <Navbar expand="xs">
        <Nav className="ml-auto" navbar>
          <NavItem className={`light-purple-text ${styles.large}`}>
            <NavLink
              className={styles.button}
              onClick={() =>
                navigate({ pathname: '/', activeItem: 'About Me' })
              }
            >
              About
            </NavLink>
          </NavItem>
          <NavItem className={`light-purple-text ${styles.large}`}>
            <NavLink
              className={styles.button}
              active
              onClick={() => navigate({ pathname: '/blog' })}
            >
              Blog
            </NavLink>
          </NavItem>
          <NavItem className={`light-purple-text ${styles.large}`}>
            <NavLink
              hidden
              className={styles.button}
              onClick={() =>
                navigate({ pathname: '/', activeItem: 'Projects' })
              }
            >
              Projects
            </NavLink>
          </NavItem>
          <NavItem hidden className={`light-purple-text ${styles.large}`}>
            <NavLink
              className={styles.button}
              onClick={() =>
                navigate({ pathname: '/', activeItem: 'Photos' })
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
