import React from 'react'
import {navigateTo} from 'gatsby-link'

const SecondPage = () => (
  <div style={{color: "white"}}>
    <p>Pandas are really sweet.</p>
    <br />
    <p>Here's a video of a panda eating sweets.</p>
    <br />
    <div onClick={ () => navigateTo({pathname: '/', activeItem: 'Blog'})}>Home</div>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/4n0xNbfJLR8"
      frameborder="0"
      allowfullscreen
    />
  </div>
)

export default SecondPage
