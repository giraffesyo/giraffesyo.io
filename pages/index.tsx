import Layout from '../components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import EducationSection from '../components/EducationSection'
import AboutMeSection from '../components/AboutMeSection'
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
      <div className='section-header'>{'<AboutMe />'}</div>
      <AboutMeSection />
      <div className='mb-5'>
        <div className='section-header'>{'<Education />'}</div>
        <EducationSection />
      </div>
      <div className='flex flex-row flex-wrap'>
        <div className='section-header w-full'>{'<Experience />'}</div>
        <Experience />
      </div>
      <div className='flex flex-row'>
        <div className='section-header'>{'<Certifications />'}</div>
        <Certifications />
      </div>
    </Layout>
  )
}

export default IndexPage
