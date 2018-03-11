import React from 'react'
import 'styles/styles.css'

class SecondaryNavigation extends React.PureComponent {
  render() {
    return (
      <ul className="nav">
        <li className="nav-item">
          <h2>
            <a href="#" className="nav-link light-purple-text">
              About Me
            </a>
          </h2>
        </li>
        <li className="nav-item">
          <h2>
            <a href="#" className="nav-link light-purple-text">
              Projects
            </a>
          </h2>
        </li>
        <li>
          <h2>
            <a href="#" className="nav-link light-purple-text">
              Photos
            </a>
          </h2>
        </li>
      </ul>
    )
  }
}

export { SecondaryNavigation }
