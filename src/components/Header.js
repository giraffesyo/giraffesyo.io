import React from 'react'
import 'styles/styles.css'

class Header extends React.PureComponent {
  render() {
    return (
      <nav className="navbar bg-dark">
        <ul className="nav">
          <li class="nav-item">
            <a
              className="nav-link fa fa-github"
              href="https://github.com/giraffesyo"
              target="_blank"
            />
          </li>
          <li class="nav-item">
            <a
              className="nav-link fa fa-twitter"
              href="https://twitter.com/giraffesyo"
              target="_blank"
            />
          </li>
          <li class="nav-item">
            <a
              className="nav-link fa fa-linkedin"
              href="#"
              href="https://www.linkedin.com/in/mcquademichael/"
              target="_blank"
            />
          </li>
        </ul>
        <div className="navbar-brand light-purple-text">Michael McQuade</div>
      </nav>
    )
  }
}

export { Header }
