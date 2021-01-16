import React from 'react'
import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa'
// import styled from 'styled-components'
// import { purple, darkgray } from '../colors'

// const Nav = styled.nav`
//   background-color: ${darkgray};
//   a {
//     font-size: 3rem;
//   }
// `

// const TwitterLink = styled.a`
//   &,
//   &:hover {
//     color: rgb(85, 172, 238);
//   }
//   &:hover {
//     opacity: 0.8;
//   }
// `

// const GithubLink = styled.a`
//   &,
//   &:hover {
//     color: rgb(255, 255, 255);
//   }
//   &:hover {
//     opacity: 0.8;
//   }
// `

// const LinkedinLink = styled.a`
//   &,
//   &:hover {
//     color: rgb(0, 123, 181);
//   }
//   &:hover {
//     opacity: 0.8;
//   }
// `

// const Brand = styled.h1`
//   font-weight: 300;
//   color: ${purple};
//   @media screen and (max-width: 767px){
//     font-size: 2rem;
//   }
// `

class Header extends React.PureComponent {
  render() {
    return (
      <div className='primarynav navbar'>
        <ul className='nav'>
          <li className='nav-item'>
            <div
              className='nav-link'
              href='https://github.com/giraffesyo'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaGithub />
              <div className='sr-only'>Michael McQuade's Github</div>
            </div>
          </li>
          <li className='nav-item'>
            <div
              className='nav-link'
              href='https://twitter.com/giraffesyo'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaTwitter />
              <div className='sr-only'>Michael McQuade's Twitter</div>
            </div>
          </li>
          <li className='nav-item'>
            <div
              className='nav-link'
              href='https://www.linkedin.com/in/mcquademichael/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedinIn />
              <div className='sr-only'>Michael McQuade's Linkedin</div>
            </div>
          </li>
        </ul>
        <div>Michael McQuade</div>
      </div>
    )
  }
}

export { Header }
