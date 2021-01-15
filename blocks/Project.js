import React from 'react'
import { ProjectSlider } from './ProjectSlider'
import styled from 'styled-components'

const ProjectWrapper = styled.div`
  margin-bottom: 2rem;
`

class Project extends React.PureComponent {
  render() {
    const {
      props: { title, images, children },
    } = this
    return (
      <ProjectWrapper className='row'>
        <div className='col-12 col-md-4'>
          {images && <ProjectSlider images={images} alt={title} />}
          {!images && <div className='text-center h1'>{title}</div>}
        </div>
        <div className='col-12 col-md-8 mt-4 mt-md-0'>{children}</div>
      </ProjectWrapper>
    )
  }
}

export { Project }