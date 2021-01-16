import React from 'react'
// import styled from 'styled-components'
// import { darkblue, commentgreen } from '../colors'

// const Title = styled.h1`
//   text-align: center;
//   font-weight: 400;
//   color: ${darkblue};
// `

// const Subtitle = styled.h5`
//   text-align: center;
//   color: ${commentgreen};
// `

const Degree = (props) => (
  <>
    <h1 className={props.className}>{props.title}</h1>
    <h5 className={props.className}>{props.subtitle}</h5>
  </>
)

export { Degree }
