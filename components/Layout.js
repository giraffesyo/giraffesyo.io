import React from 'react'

import Footer from './Footer'

class Layout extends React.PureComponent {
  render() {
    return (
      <>
        <div className='container'>{this.props.children}</div>
        <Footer />
      </>
    )
  }
}

export default Layout
