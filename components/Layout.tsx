import React from 'react'

import Footer from './Footer'

const Layout: React.FC = (props) => {
  return (
    <>
      <div className='container mx-auto mb-32'>{props.children}</div>
      <Footer />
    </>
  )
}

export default Layout
