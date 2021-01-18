import Image from 'next/image'

const AboutMeSection = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center w-full'>
      <div className='h-64 w-64 relative'>
        <Image
          className='rounded-full'
          // height={1293}
          // width={863}
          layout='fill'
          objectPosition='20% 20%'
          objectFit='cover'
          src='/images/michaelmcquade.jpg'
          alt='Developer Michael McQuade (giraffesyo)'
        />
      </div>
      <div className='md:w-1/2 mx-3 my-2 md:ml-8 '>
        <p className='text-2xl text-blue-code'>Hello! I'm Michael McQuade.</p>
        <p className='my-1'>
          I am a full-stack <strong>software engineer</strong> working with
          modern application development technologies such as: TypeScript,
          Node.js, React.js, Express, PostgreSQL, MySQL, and much more.
        </p>
        <p className='my-1'>
          I'm available for freelance software engineering and web development
          work, if you need help with a project, please feel free to{' '}
          <a className='text-blue-code' href='mailto:hello@giraffesyo.io'>
            contact me.
          </a>
        </p>
      </div>
    </div>
  )
}

export default AboutMeSection
