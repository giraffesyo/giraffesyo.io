import React from 'react'

import { Header } from './Header'

class Layout extends React.PureComponent {
  render() {
    return (
      <>
        <Header />
        <div className='container'>{this.props.children}</div>
      </>
    )
  }
}

export default Layout
