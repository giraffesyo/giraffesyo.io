import React from 'react'
import styles from './SecondaryNavigation.module.css'
import Link from 'next/link'
// import styled from 'styled-components'

// const NavLink = styled.div`
//   padding: 1rem;
//   cursor: pointer;
//   box-sizing: border-box;
//   border-bottom: ${(props) => (props.active ? '1px solid white' : 'none')};
// `

class SecondaryNavigation extends React.PureComponent {
  location = { pathname: '/' }

  // handleItemClick = (e, { name }) =>
  //   this.state.changeActiveItem({ activeItem: name })

  render() {
    //FIXME: Harcoded this in transition to Next.js

    const location = this.location
    let activeItem
    if (location.pathname === '/') {
      activeItem = 'About Me'
    } else {
      //TODO: dont make Blog the catch all
      activeItem = 'Blog'
    }
    return (
      <div>
        <div className='ml-auto'>
          <div className={`light-purple-text ${styles.large}`}>
            <div
              className={styles.button}
              // name='About Me'
              // active={activeItem === 'About Me'}
            >
              <Link href='/'>
                <a>About</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { SecondaryNavigation }
