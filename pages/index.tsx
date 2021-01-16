import Layout from '../components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import EducationSection from '../components/EducationSection'
import { Experience } from '../components/Experience'
import { SecondaryNavigation } from '../components/SecondaryNavigation'
import { Certifications } from '../components/Certifications'

const IndexPage = () => {
  return (
    <Layout>
      <Head>
        <title>giraffesyo.io - Michael McQuade's Personal Site</title>

        <meta
          name='description'
          content={`Michael McQuade's personal site: Michael is a full-stack software engineer with a passion for web and augmented reality devleopment located in Houston, TX.`}
        />
        <html lang='en' />
      </Head>
      <SecondaryNavigation />
      <div className='section-header'>About Me</div>
      <div className='row'>
        <div className='col-12 col-md-4'>
          <Image
            height={3024}
            width={4032}
            src='/images/michaelmcquade.jpg'
            alt='Developer Michael McQuade (giraffesyo) with a live giraffe in Mexico'
          />
        </div>
        <div className='col-12 col-md-8 mt-4 mt-md-0'>
          <p>Hello! I'm Michael McQuade.</p>
          <p>
            I am a full-stack software engineer working with modern application
            development technologies such as: TypeScript, Node.js, React.js,
            Express, PostgreSQL, MySQL, and much more.
          </p>
          <p>
            I'm available for freelance software engineering and web development
            work, if you need help with a project, please feel free to
            <a href='mailto:hello@giraffesyo.io'>contact me.</a>
          </p>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <EducationSection />
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

export default IndexPage