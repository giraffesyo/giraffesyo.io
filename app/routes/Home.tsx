import { useEffect } from 'react'
import AboutMeSection from '../components/AboutMeSection'
import CertificationsSection from '../components/CertificationsSection'
import EducationSection from '../components/EducationSection'
import WorkExperienceSection from '../components/WorkExperienceSection'

export default function Home() {
  useEffect(() => {
    document.title = "giraffesyo.io - Michael McQuade's Personal Site"
  }, [])

  return (
    <>
      <div className='section-header mt-2'>{'<AboutMe />'}</div>
      <AboutMeSection />
      <div className='flex flex-row flex-wrap'>
        <div className='section-header'>{'<Experience />'}</div>
        <WorkExperienceSection />
      </div>
      <div className='mb-5'>
        <div className='section-header'>{'<Education />'}</div>
        <EducationSection />
      </div>
      <div className='flex flex-row flex-wrap w-full'>
        <div className='section-header'>{'<Certifications />'}</div>
        <CertificationsSection />
      </div>
    </>
  )
}
