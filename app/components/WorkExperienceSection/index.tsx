import { DateTime } from 'luxon'
import { useState, useEffect, type ReactNode } from 'react'
import { HiChevronDown } from 'react-icons/hi2'

interface IPosition {
  name: string
  details: ReactNode
  startDate: DateTime
  endDate?: DateTime
}

interface ICompany {
  name: string
  title: string
  location: string
  imgSrc: string
  invertLogoDark?: boolean
  positions: IPosition[] | IPosition
}

interface ProjectProps {
  name: string
  bullets: ReactNode[]
  children: ReactNode
}

const Project = ({ name, children, bullets }: ProjectProps) => (
  <div className='mt-4'>
    <h4 className='text-sm font-semibold text-stone-900 dark:text-zinc-100'>
      {name}
    </h4>
    <p className='text-sm text-stone-500 dark:text-zinc-400 mt-1'>{children}</p>
    <ul className='list-disc ml-5 mt-2 text-sm text-stone-600 dark:text-zinc-400 space-y-1'>
      {bullets}
    </ul>
  </div>
)

const ParallelWorks: ICompany = {
  name: 'Parallel Works',
  title: 'Director of Engineering',
  imgSrc: '/images/workexperience/parallelworks.svg',
  location: 'Chicago, IL (Remote)',
  positions: [
    {
      name: 'Senior Software Engineer',
      startDate: DateTime.fromISO('2021-08-02'),
      endDate: DateTime.fromISO('2022-03-14'),
      details: null,
    },
    {
      name: 'Director of Engineering',
      startDate: DateTime.fromISO('2022-03-14'),
      details: (
        <ul className='list-disc ml-5 text-sm text-stone-600 dark:text-zinc-400 space-y-1'>
          <li>
            Driving all product design and engineering for ACTIVATE, a hybrid
            multi-cloud control plane for HPC and AI workloads used by
            organizations including NOAA and the U.S. Department of Defense.
          </li>
          <li>
            ACTIVATE became the first hybrid multi-cloud solution to receive
            DoD IL-5 Authority to Operate from HPCMP (Sep 2025).
          </li>
          <li>
            Architecting and shipping every major platform capability,
            including Kubernetes integration, AI Gateway with LLM routing
            and chat/agent interfaces, workflow framework, multi-cloud
            cluster provisioning, API/SDK, and dashboard.
          </li>
          <li>
            Recruiting, onboarding, and leading engineers. Presenting
            architecture decisions to customers and facilitating partner
            discussions with AWS, Google, and Microsoft.
          </li>
        </ul>
      ),
    },
  ],
}

const ConocoPhillips: ICompany = {
  name: 'ConocoPhillips',
  title: 'Cloud Architect & HPC System Administrator',
  imgSrc: '/images/workexperience/conocophillips.svg',
  location: 'Houston, TX',
  positions: [
    {
      name: 'HPC System Administrator',
      startDate: DateTime.fromISO('2019-06-01'),
      endDate: DateTime.fromISO('2020-12-02'),
      details: (
        <div>
          <Project
            name='Cluster Information Aggregator'
            bullets={[
              <li key='1'>
                Python scripts writing system info to networked filesystem every
                3 minutes.
              </li>,
              <li key='2'>
                Node.js cache server with RESTful API and PostgreSQL backing
                database.
              </li>,
              <li key='3'>
                Hasura-powered GraphQL interface for flexible querying.
              </li>,
            ]}
          >
            Built a system to aggregate data from 5,000+ compute nodes into a
            centralized Node.js cache server.
          </Project>
          <Project
            name='Visual Cluster Interface'
            bullets={[
              <li key='4'>
                React + TypeScript app with drillable, color-coded data center
                visualization.
              </li>,
              <li key='5'>
                Live-updating via SWR polling with GraphQL backend.
              </li>,
              <li key='6'>
                LDAP authentication via Apache reverse proxy.
              </li>,
            ]}
          >
            Created a top-down visual representation of the data center with
            real-time monitoring of power, CPU, and temperature.
          </Project>
        </div>
      ),
    },
    {
      name: 'Cloud Architect',
      startDate: DateTime.fromISO('2020-12-01'),
      endDate: DateTime.fromISO('2021-07-31'),
      details: (
        <Project
          name='AWS CDK Construct Library'
          bullets={[
            <li key='7'>
              TypeScript construct library compiled to Python, JS, and C# via
              AWS JSii.
            </li>,
            <li key='8'>
              Published through Azure Artifacts for internal consumption.
            </li>,
            <li key='9'>
              Pre-built compliant constructs for EC2, S3, Lambda, RDS, and more.
            </li>,
          ]}
        >
          Built a CDK construct library to make cloud resource provisioning
          repeatable, compliant, and self-service for business units.
        </Project>
      ),
    },
  ],
}

const FoundationSoftware: ICompany = {
  name: 'Foundation Software',
  title: 'Software Engineering Intern',
  imgSrc: '/images/workexperience/foundation.svg',
  location: 'Strongsville, OH',
  positions: {
    startDate: DateTime.fromISO('2018-05-15'),
    endDate: DateTime.fromISO('2018-08-21'),
    name: 'Software Engineering Intern',
    details: (
      <div>
        <Project
          name='Marketing Website Rewrite'
          bullets={[
            <li key='1'>
              Gatsby.js rewrite cut page load from 6.2s to 800ms.
            </li>,
            <li key='2'>
              Migrated to Netlify CDN with Git-powered CMS.
            </li>,
            <li key='3'>
              Rewrote 40 pages as React components.
            </li>,
          ]}
        >
          Replaced a repeatedly hacked WordPress site with a statically
          generated Gatsby.js build.
        </Project>
        <Project
          name='UPS Label Printer'
          bullets={[
            <li key='4'>
              Internal label printing app with Node.js/Express backend.
            </li>,
            <li key='5'>
              ETL of thousands of Word documents into MSSQL database.
            </li>,
            <li key='6'>
              Electron app with Windows Active Directory SSO.
            </li>,
          ]}
        >
          Automated the weekly paycheck mailing process, replacing a manual
          Microsoft Word workflow.
        </Project>
      </div>
    ),
  },
}

const Apple: ICompany = {
  name: 'Apple',
  title: 'Senior Advisor',
  imgSrc: '/images/workexperience/apple.svg',
  invertLogoDark: true,
  location: 'Tulsa, OK',
  positions: {
    name: 'Senior Advisor',
    startDate: DateTime.fromISO('2012-09-01'),
    endDate: DateTime.fromISO('2015-08-01'),
    details: null,
  },
}

const Companies: ICompany[] = [ParallelWorks, ConocoPhillips, FoundationSoftware, Apple]

function getDuration(start: DateTime, end: DateTime): string {
  const d = end.diff(start, ['years', 'months'])
  const y = d.years
  const m = Math.floor(d.months)
  const yStr = y ? `${y} yr${y > 1 ? 's' : ''} ` : ''
  const mStr = m ? `${m} mo${m > 1 ? 's' : ''}` : ''
  return `${yStr}${mStr}`.trim() || 'Just started'
}

function formatDate(dt: DateTime): string {
  return `${dt.monthShort} ${dt.year}`
}

function CompanyCard({ company }: { company: ICompany }) {
  const [expanded, setExpanded] = useState(false)
  const [now, setNow] = useState(DateTime.local())
  useEffect(() => setNow(DateTime.local()), [])

  const positions = Array.isArray(company.positions)
    ? company.positions
    : [company.positions]

  const start = positions[0].startDate
  const end = positions[positions.length - 1].endDate
  const hasDetails = positions.some((p) => p.details)

  return (
    <div className='card p-6'>
      <div
        className={`flex items-start gap-4 ${hasDetails ? 'cursor-pointer' : ''}`}
        onClick={() => hasDetails && setExpanded(!expanded)}
      >
        <img
          src={company.imgSrc}
          alt={company.name}
          className={`w-10 h-10 object-contain shrink-0 mt-1 ${company.invertLogoDark ? 'dark:invert' : ''}`}
          loading='lazy'
        />
        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between gap-2'>
            <div>
              <h3 className='font-display text-lg font-semibold text-stone-900 dark:text-zinc-50'>
                {company.name}
              </h3>
              <p className='text-sm text-accent font-medium'>{company.title}</p>
              <p className='text-xs text-stone-400 dark:text-zinc-500 mt-0.5'>
                {company.location}
              </p>
            </div>
            <div className='text-right shrink-0'>
              <p className='text-xs text-stone-500 dark:text-zinc-400 font-mono'>
                {formatDate(start)} · {end ? formatDate(end) : 'Present'}
              </p>
              <p className='text-xs text-stone-400 dark:text-zinc-600'>
                {getDuration(start, end ?? now)}
              </p>
            </div>
          </div>
        </div>
        {hasDetails && (
          <HiChevronDown
            className={`w-5 h-5 text-stone-400 dark:text-zinc-600 shrink-0 transition-transform duration-300 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        )}
      </div>

      {hasDetails && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            expanded ? 'max-h-[3000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='border-t border-stone-200 dark:border-zinc-800 pt-6 space-y-6'>
            {[...positions].reverse().map((pos) => (
              <div key={company.name + pos.name}>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-2 h-2 rounded-full bg-accent' />
                  <span className='text-sm font-medium text-stone-900 dark:text-zinc-100'>
                    {pos.name}
                  </span>
                  <span className='text-xs text-stone-400 dark:text-zinc-600 font-mono'>
                    {formatDate(pos.startDate)} ·{' '}
                    {pos.endDate ? formatDate(pos.endDate) : 'Present'}
                  </span>
                </div>
                {pos.details && <div className='ml-4'>{pos.details}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function WorkExperienceSection() {
  return (
    <div className='space-y-4'>
      {Companies.map((company) => (
        <CompanyCard key={company.name} company={company} />
      ))}
    </div>
  )
}
