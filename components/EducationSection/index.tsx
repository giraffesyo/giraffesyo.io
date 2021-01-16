import Image from 'next/image'
interface ISchool {
  name: string
  logo: string
  degree?: {
    title: string
    subtitle: string
  }
}

const schools: ISchool[] = [
  {
    name: 'University of Houston',
    logo: '/images/uh.svg',
    degree: {
      title: 'Master of Science, Computer Science',
      subtitle: 'In progress',
    },
  },
  {
    name: 'Oklahoma State University',
    logo: '/images/osu.svg',
    degree: {
      title: 'Bachelor of Science, Computer Science',
      subtitle: '3.70 GPA',
    },
  },
  {
    name: 'Monterrey Institute of Technology and Higher Education',
    logo: '/images/tec.svg',
    degree: {
      title: 'Full year international study abroad',
      subtitle: '',
    },
  },
]

const EducationSection: React.FC = () => {
  const Schools = schools.map((school) => (
    <div
      className='grid grid-cols-2 w-2/3 ml-auto mr-auto  items-center my-4'
      key={school.name}
    >
      <div className='h-32 w-64 relative justify-self-end'>
        {school.logo && (
          <Image
            quality={80}
            layout='fill'
            alt={school.name + ' logo'}
            src={school.logo}
          />
        )}
      </div>
      <div className='ml-10'>
        <div className='-semibold text-orange-code text-2xl'>{school.name}</div>
        <div className='text-blue-code'>{school.degree.title}</div>
        <div className='text-green-code'>{school.degree.subtitle}</div>
      </div>
    </div>
  ))

  return <> {Schools}</>
}

export default EducationSection
