import Head from 'next/head'
import AboutMeSection from '../components/AboutMeSection'
import { Certifications } from '../components/Certifications'
import EducationSection from '../components/EducationSection'
import WorkExperienceSection from '../components/WorkExperienceSection'
import Layout from '../components/Layout'
// import { SecondaryNavigation } from '../components/SecondaryNavigation'

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
      {/* <SecondaryNavigation /> */}
      <div className='section-header mt-2'>{'<AboutMe />'}</div>
      <AboutMeSection />
      <div className='mb-5'>
        <div className='section-header'>{'<Education />'}</div>
        <EducationSection />
      </div>
      <div className='flex flex-row flex-wrap'>
        <div className='section-header w-full'>{'<Experience />'}</div>
        <WorkExperienceSection />
      </div>
      <div className='flex flex-row'>
        <div className='section-header'>{'<Certifications />'}</div>
        <Certifications />
      </div>
    </Layout>
  )
}

export default IndexPage
