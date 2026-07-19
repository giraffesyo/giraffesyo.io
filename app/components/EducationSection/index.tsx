import { useTheme } from '../../hooks/useTheme'

interface ISchool {
  name: string
  logo: string
  darklogo?: string
  degree: {
    type: string
    major?: string
  }
}

const schools: ISchool[] = [
  {
    name: 'University of Houston',
    logo: '/images/education/uh.svg',
    darklogo: '/images/education/uh_dark.svg',
    degree: {
      type: 'Master of Science',
      major: 'Computer Science',
    },
  },
  {
    name: 'Oklahoma State University',
    logo: '/images/education/osu.svg',
    degree: {
      type: 'Bachelor of Science',
      major: 'Computer Science',
    },
  },
  {
    name: 'Monterrey Institute of Technology',
    logo: '/images/education/tec.svg',
    darklogo: '/images/education/tec_dark.svg',
    degree: {
      type: 'International Study Abroad',
    },
  },
]

export default function EducationSection() {
  const { resolvedTheme } = useTheme()

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {schools.map((school) => (
        <div key={school.name} className='card p-6 flex flex-col items-center text-center'>
          <div className='w-full h-20 flex items-center justify-center mb-4'>
            <img
              className='max-h-full max-w-[160px] object-contain'
              alt={`${school.name} logo`}
              src={resolvedTheme === 'dark' && school.darklogo ? school.darklogo : school.logo}
              loading='lazy'
            />
          </div>
          <h3 className='font-display text-sm font-semibold text-stone-900 dark:text-zinc-100 leading-tight'>
            {school.name}
          </h3>
          <p className='text-sm text-accent mt-1'>
            {school.degree.type}
            {school.degree.major && ` in ${school.degree.major}`}
          </p>
        </div>
      ))}
    </div>
  )
}
