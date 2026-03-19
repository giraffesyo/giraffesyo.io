export default function AboutMeSection() {
  return (
    <div className='flex flex-col md:flex-row items-center gap-10 md:gap-16'>
      <div className='w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden ring-1 ring-stone-200 dark:ring-zinc-800'>
        <img
          className='w-full h-full object-cover'
          style={{ objectPosition: '20% 20%' }}
          src='/images/michaelmcquade.jpg'
          alt='Michael McQuade'
          loading='lazy'
        />
      </div>
      <div>
        <h2 className='font-display text-3xl font-bold text-stone-900 dark:text-zinc-50 mb-4'>
          About me
        </h2>
        <p className='text-stone-600 dark:text-zinc-400 leading-relaxed mb-3'>
          I'm a software engineer and engineering leader focused on
          cloud-native infrastructure, high-performance computing, and AI
          tooling. As Director of Engineering at Parallel Works, I lead all
          product design and development for ACTIVATE, the first hybrid
          multi-cloud HPC platform to receive DoD IL-5 Authority to Operate.
        </p>
        <p className='text-stone-600 dark:text-zinc-400 leading-relaxed mb-3'>
          I work primarily with Go, TypeScript, and Kubernetes across AWS, GCP,
          and Azure. I'm passionate about building developer tools, distributed
          systems, and infrastructure that makes HPC and AI accessible to more
          people.
        </p>
      </div>
    </div>
  )
}
