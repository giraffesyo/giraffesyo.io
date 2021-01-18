import Image from 'next/image'
import styles from './workexperiencesection.module.css'
import cx from 'classnames'
import { DateTime, Interval } from 'luxon'
import { useEffect, useState } from 'react'
// const okchihuahuas = [
//   '/images/projects/okchihuahuas1.jpeg',
//   '/images/projects/okchihuahuas2.jpeg',
//   '/images/projects/okchihuahuas3.jpeg',
// ]

interface IPosition {
  name: string
  details: JSX.Element
  startDate: DateTime
  endDate?: DateTime
}

interface ICompany {
  name: string
  location: string
  imgSrc: string
  positions: IPosition[] | IPosition
}

const ConocoPhillips: ICompany = {
  name: 'ConocoPhillips',
  imgSrc: '/images/workexperience/conocophillips.svg',
  location: 'Houston, TX',
  positions: [
    {
      name: 'High Performance Computing',
      details: (
        <p>
          System administrator for Linux high performance computing cluster with
          over 5000 compute nodes. About 20% of my time is spent maintaining and
          supporting the existing infrastructure within our HPC environment. The
          rest of my time is spent working on PoCs, creating and improving
          processes, and designing, developing, and implementing internal
          software. Technologies used include: CentOS, Ubuntu, Node.js,
          PostgreSQL, MySQL, Git, GitLab, Python, Anaconda (python notebooks),
          Zeppelin, Docker, Singularity, Bash, Cobbler, oVirt, Next.js,
          React.js, Gradle, Maven, Jenkins, Artifactory, Cisco, AWS,
          bestpractical request-tracker, ServiceNow, GLPI, OCS
        </p>
      ),
      startDate: DateTime.fromISO('2019-06-01T08:00:00-06:00'),
      endDate: DateTime.fromISO('2020-11-30T17:00:00-06:00'),
    },
    {
      name: 'Cloud Architect',
      details: <p>Cloud architect at big company</p>,
      startDate: DateTime.fromISO('2020-12-01T08:00:00-06:00'),
    },
  ],
}

const FoundationSoftware: ICompany = {
  name: 'Foundation Software',
  imgSrc: '/images/workexperience/foundation.svg',
  location: 'Strongsville, OH',
  positions: {
    startDate: DateTime.fromISO('2018-05-15T08:00:00-06:00'),
    endDate: DateTime.fromISO('2018-08-21T05:00:00-06:00'),
    name: 'Software Engineering Intern',
    details: (
      <p>
        Completed an 8-week summer internshp at Foundation Software. During my
        time there I created an internal label printer application using
        create-react-app, Microsoft SQL Server, Windows Integrated Security
        (Windows Auth), and Express.js. I also created a proof-of-concept
        rewrite of their marketing website, foundationsoft.com using Gatsby.js.
        This POC demonstrated an improvement of load times from 6.2 seconds to
        800ms over the current site.
      </p>
    ),
  },
}

const getDurationStringFromDateTimes = (
  earlierDT: DateTime,
  laterDT: DateTime
): string => {
  const lengthOfTime = laterDT.diff(earlierDT, ['years', 'months'])

  const years = lengthOfTime.years
  const months = Math.floor(lengthOfTime.months)

  const yearsStr =
    years !== 0 ? `${years} ${years > 1 ? 'years' : 'year'} ` : ''
  const monthStr =
    months !== 0 ? `${months} ${months > 1 ? 'months' : 'month'}` : ''
  let durationStr = `${yearsStr}${monthStr}`
  if (!durationStr) durationStr = 'Just started!'
  return durationStr
}

const getIntervalStringFromDateTimes = (
  earlierDT: DateTime,
  laterDT?: DateTime
) => {
  return `${earlierDT.monthLong} ${earlierDT.year} - ${
    laterDT ? laterDT.monthLong + ' ' + laterDT.year : 'Present'
  }`
}

interface ITimelineProps {
  company: ICompany
}

const Timeline: React.FC<ITimelineProps> = ({ company }) => {
  const [now, setNow] = useState(DateTime.local())
  useEffect(() => {
    setNow(DateTime.local())
  }, [])

  const positions = Array.isArray(company.positions)
    ? company.positions
    : [company.positions]

  const lastPosition = positions[positions.length - 1]

  const companyStartDate = positions[0].startDate
  const companyEndDate = lastPosition.endDate

  const companyDateStr = getIntervalStringFromDateTimes(
    companyStartDate,
    companyEndDate
  )

  const timeAtCompanyStr = getDurationStringFromDateTimes(
    companyStartDate,
    companyEndDate ?? now
  )
  return (
    <div className='flex flex-row my-3 w-2/3 dark'>
      <img
        width='100'
        height='100'
        src={company.imgSrc}
        alt={company.name + ' logo'}
      />

      <div className='flex flex-col'>
        <span className='text-3xl w-full mr-2 '>{company.name}</span>
        <div className='text-blue-code'>
          <span>{companyDateStr}</span>
          <span className='bullet-item italic'>{timeAtCompanyStr}</span>
        </div>
        {[...positions]
          .reverse()
          .map(({ name, details, startDate, endDate }) => {
            const timeInPositionStr = getIntervalStringFromDateTimes(
              startDate,
              endDate
            )
            const durationStr = getDurationStringFromDateTimes(
              startDate,
              endDate ?? now
            )
            return (
              <div
                key={company.name + name}
                className='flex flex-row items-center relative'
              >
                <div className={cx(styles.timelinenode)}></div>
                <div className={cx(styles.timelineitem, 'w-full')}>
                  <span className='text-xl text-red-500'>{name}</span>
                  <div>
                    <span>{timeInPositionStr}</span>
                    <span className='bullet-item'>{durationStr}</span>
                  </div>
                  {details}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

const WorkExperienceSection: React.FC = () => {
  return (
    <div className='flex flex-col w-full items-center'>
      <Timeline company={ConocoPhillips} />
      <Timeline company={FoundationSoftware} />
    </div>
  )
}

{
  /* <Project images={okchihuahuas} title='Prairie Glade Chihuahuas Web App'>
        <p>
          Developed a web app for an Oklahoma Chihuahua Kennel. The web app uses{' '}
          <a href='https://github.com/facebook/create-react-app'>
            create-react-app
          </a>{' '}
          and has an express.js backend, utilizing a PostgresQL database. The
          database and server are hosted on Heroku. The application allows the
          client to add new dogs to their site without any programming
          knowledge. In addition, it was important that the site was responsive,
          allowing the client to add dogs from their mobile device.
        </p>
      </Project> */
}

export default WorkExperienceSection
