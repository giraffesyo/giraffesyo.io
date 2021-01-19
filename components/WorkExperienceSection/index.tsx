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

interface IProjectProps {
  name: string
  bullets: JSX.Element[]
}

const Project: React.FC<IProjectProps> = ({ name, children, bullets }) => {
  return (
    <div>
      <h3 className='font-semibold dark:text-purple-code'>{name}</h3>
      <div className='ml-5'>
        <strong className='font-medium dark:text-blue-code'>
          Background:{' '}
        </strong>
        {children}
      </div>
      <ul className='list-disc ml-10'>{bullets}</ul>
    </div>
  )
}

const ConocoPhillips: ICompany = {
  name: 'ConocoPhillips',
  imgSrc: '/images/workexperience/conocophillips.svg',
  location: 'Houston, TX',
  positions: [
    {
      name: 'High Performance Computing',
      details: (
        <div>
          <Project
            name='Cluster information aggregrator'
            bullets={[
              <li>
                Created Python script which runs and writes relevant system
                information (cpu usage, temperatures, power consumption, etc.)
                to networked filesystem every 3 minutes
              </li>,
              <li>
                Created a Node.js server which monitors mounted filesystem,
                updating cache of cluster information. Server written in
                TypeScript.
              </li>,
              <li>
                Created RESTful api using Express.js which served information
                directly from the Node.js cache server
              </li>,
              <li>
                Created "point-in-time" PostgresQL database which has a co py of
                all information in the cache server, allowing for alternative
                querying
              </li>,
              <li>
                Setup an instance of Hasura using Docker, which allowed for
                GraphQL access to the PostgresQL database
              </li>,
            ]}
          >
            During my time in this position, the HPC had over 5,000 compute
            nodes. With such a large amount of computers, and a small team, it
            can be hard to keep track of everything. In order to remediate this,
            I created a software which aggregated data from all 5,000+ machines
            into a single Node.js cache server and backing database.
          </Project>
          <Project
            name='Visual cluster information interface'
            bullets={[
              <li>
                Created React.js application which has drillable, color-coded
                view of entire HPC cluster
              </li>,
              <li>
                Utilizes SWR to poll server for updated information, providing a
                live updating experience for users
              </li>,
              <li>
                Secured access to the server using an Apache reverse proxy with
                LDAP authentication against remote company AD server.
              </li>,
              <li>
                Created Ansible script to update certificates used for secure
                access to the domain controller
              </li>,
              <li>
                Application connects using GraphQL to the backend Node.js
                caching server
              </li>,
              <li>Entire application written in TypeScript</li>,
              <li>
                Since both frontend and backend were written in Typescript,
                types were shared between backend and frontend using yarn
                workspaces
              </li>,
              <li>
                Created extensive documentation explaining design decisions, how
                to access data, how to develop the application, and how to
                update configuration
              </li>,
            ]}
          >
            While the data in the information aggregator I created was easier to
            access than previously, it still required access it via API, SQL, or
            GraphQL. It would be easier if there was some visual way to
            interpret the information. Because of this, I created a React.js
            application which was a visual representation of our data center, as
            if you were looking at it from a top-down view. You can drill down
            into individual racks, and then into servers, and see real time
            information about those servers. The views of the servers are color
            coded by either power usage, CPU usage, or temperature, so you can
            easily identify racks or nodes with outliers.
          </Project>
        </div>
      ),
      startDate: DateTime.fromISO('2019-06-01T08:00:00-06:00'),
      endDate: DateTime.fromISO('2020-12-01T08:00:00-06:00'),
    },
    {
      name: 'Cloud Architect',
      details: <p></p>,
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
      <div>
        <Project
          name='Marketing website rewrite'
          bullets={[
            <li>
              Utilized Gatsby.js to improve page load speeds from 6.2 seconds on
              Wordpress down to 800 ms
            </li>,
            <li>Transitioned site to Netlify CDN</li>,
            <li>
              Setup instance of Netlify CMS, an open source CMS which is powered
              by Git. This allowed managing pages with the Microsoft TFS.
            </li>,
            <li>
              Rewrote 40 pages into React.js components and containers, fixing
              UI bugs along the way
            </li>,
          ]}
        >
          Their marketing website was hosted on WordPress and had been hacked
          repeatedly, creating a negative image for the company. They asked if I
          had any ideas and I proposed switching the site to use Gatsby.js, as
          statically generated sites are inherently more secure.
        </Project>
        <Project
          name='UPS Label Printer'
          bullets={[
            <li>
              Created internal label printer application which interfaces with a
              UPS label printer.
            </li>,
            <li>
              ETL existing labels from thousands of word documents into a new MS
              SQL database using PowerShell.
            </li>,
            <li>
              Bootstrapped CentOS 7 server to host Node.js/Express app to serve
              the React frontend
            </li>,
            <li>
              Created Electron version which could access the MSSQL database
              using Windows Integrated Security (active directory SSO on
              Windows).
            </li>,
          ]}
        >
          As part of their business, Foundation Software mails paychecks to
          thousands of customers per week. The process of printing the labels
          for this was done with Microsoft Word and folders. This project
          replaced that process with an automated system.
        </Project>
      </div>
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
    <div className='flex flex-col md:flex-row my-3 w-5/6 md:w-2/3'>
      <img
        width='100'
        height='100'
        src={company.imgSrc}
        alt={company.name + ' logo'}
      />

      <div className='flex flex-col'>
        <span className='text-3xl w-full mr-2 '>{company.name}</span>
        <div>
          <span className='text-blue-700 font-normal dark:text-blue-code'>
            {companyDateStr}
          </span>
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
                    <span className=' text-blue-700 font-normal dark:text-green-code'>
                      {timeInPositionStr}
                    </span>
                    <span className='italic bullet-item'>{durationStr}</span>
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
    <div className='flex flex-col w-full items-center mb-10'>
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
