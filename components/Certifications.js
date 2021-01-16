import React from 'react'
import { Project } from './project'

class Certifications extends React.PureComponent {
  render() {
    return (
      <>
        <div className='section-header'>Certifications</div>
        <Project
          title='AWS Certified Cloud Practitioner'
          images={['/images/AWS-CloudPractitioner.png']}
        >
          <h1>AWS Certified Cloud Practitioner</h1>
          <h3>Awarded 4/8/2020</h3>
          <p>
            <a href='https://www.youracclaim.com/badges/37a99ac7-8e80-4693-8c09-48c709d9c8f9/public_url'>
              View credential
            </a>
          </p>
        </Project>
      </>
    )
  }
}

export { Certifications }
