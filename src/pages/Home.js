import React from 'react'
import 'styles/styles.css'
import { Header } from 'components/Header'

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <h1 className="light-purple-text">Hello World</h1>
      </div>
    )
  }
}

export { Home }
