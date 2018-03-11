import React from 'react'
import 'styles/styles.css'

class Header extends React.PureComponent {
  render() {
    return (
      <nav className="navbar bg-dark">
        <ul className="nav">
          <li className="nav-item">
            <a
              className="nav-link fa fa-github"
              href="https://github.com/giraffesyo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="sr-only">Michael McQuade's Github</div>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link fa fa-twitter"
              href="https://twitter.com/giraffesyo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="sr-only">Michael McQuade's Twitter</div>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link fa fa-linkedin"
              href="https://www.linkedin.com/in/mcquademichael/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="sr-only">Michael McQuade's Linkedin</div>
            </a>
          </li>
        </ul>
        <div className="navbar-brand light-purple-text">Michael McQuade</div>
      </nav>
    )
  }
}

export { Header }
