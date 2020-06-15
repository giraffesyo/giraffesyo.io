import React from 'react'
import Layout from '../components/Layout'
import Helmet from 'react-helmet'

import Image from 'gatsby-image'

import tecLogo from '../images/tec.svg'
import osuLogo from '../images/osu.svg'
import 'typeface-raleway'

import { SectionHeader } from '../blocks/SectionHeader'
import { Education } from '../components/Education'
import { Experience } from '../components/Experience'
import { SecondaryNavigation } from '../components/SecondaryNavigation'
import { Certifications } from '../components/Certifications'

const education = {
  schools: [
    { name: 'Oklahoma State University', logo: osuLogo },
    {
      name: 'Monterrey Institute of Technology and Higher Education',
      logo: tecLogo,
    },
  ],
  degree: {
    title: 'Bachelor of Science, Computer Science',
    subtitle: '3.70 GPA',
  },
}

class Home extends React.PureComponent {
  render() {
    const {
      props: {
        data: {
          file: {
            childImageSharp: { sizes: MyPhoto },
          },
        },
        location,
      },
    } = this
    return (
      <Layout>
        <Helmet
          title="giraffesyo.io - Michael McQuade's Personal Site"
          meta={[
            {
              name: 'description',
              content: `Michael McQuade's personal site: Michael is a full-stack software engineer with a passion for web and augmented reality devleopment located in Houston, TX.`,
            },
          ]}>
          <html lang='en' />
        </Helmet>
        <SecondaryNavigation location={location} />
        <SectionHeader>About Me</SectionHeader>
        <div className='row'>
          <div className='col-12 col-md-4'>
            <Image
              sizes={MyPhoto}
              alt='Developer Michael McQuade (giraffesyo) with a live giraffe in Mexico'
            />
          </div>
          <div className='col-12 col-md-8 mt-4 mt-md-0'>
            <p>Hello! I'm Michael McQuade.</p>
            <p>
              I am a full-stack software engineer working with modern
              application development technologies such as: TypeScript, Node.js,
              React.js, Express, PostgreSQL, MySQL, and much more.
            </p>
            <p>
              I'm available for freelance software engineering and web
              development work, if you need help with a project, please feel
              free to
              <a href='mailto:hello@giraffesyo.io'>contact me.</a>
            </p>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Education schools={education.schools} degree={education.degree} />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Experience />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Certifications />
          </div>
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query AboutMeQuery {
    file(relativePath: { eq: "michaelmcquade.jpg" }) {
      childImageSharp {
        sizes {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`

export default Home
