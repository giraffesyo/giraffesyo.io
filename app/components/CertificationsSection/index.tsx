interface ICertification {
  name: string
  shortName: string
  imgSrc: string
  awardDate: string
  href: string
}

const certifications: ICertification[] = [
  {
    shortName: 'Solutions Architect',
    name: 'AWS Certified Solutions Architect - Associate',
    href: 'https://www.credly.com/badges/2d3f5010-6db0-49eb-8309-4390ed370952/public_url',
    imgSrc: '/images/certifications/aws_solutions_architect_badge.png',
    awardDate: 'Jun 2021',
  },
  {
    shortName: 'Developer Associate',
    name: 'AWS Certified Developer - Associate',
    href: 'https://www.youracclaim.com/badges/6068be6e-ec80-483b-9782-d54875c8485d/public_url',
    imgSrc: '/images/certifications/aws_developer_associate_badge.png',
    awardDate: 'Dec 2020',
  },
  {
    shortName: 'Cloud Practitioner',
    name: 'AWS Certified Cloud Practitioner',
    href: 'https://www.youracclaim.com/badges/37a99ac7-8e80-4693-8c09-48c709d9c8f9/public_url',
    imgSrc: '/images/certifications/aws_cloud_practitioner_badge.png',
    awardDate: 'Apr 2020',
  },
]

export default function CertificationsSection() {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {certifications.map((cert) => (
        <a
          key={cert.name}
          href={cert.href}
          target='_blank'
          rel='noopener noreferrer'
          className='card p-6 flex flex-col items-center text-center group'
        >
          <img
            className='w-24 h-24 object-contain mb-4 group-hover:scale-105 transition-transform duration-300'
            src={cert.imgSrc}
            alt={cert.name}
            loading='lazy'
          />
          <h3 className='font-display text-sm font-semibold text-stone-900 dark:text-zinc-100'>
            {cert.shortName}
          </h3>
          <p className='text-xs text-stone-400 dark:text-zinc-500 mt-1'>
            {cert.awardDate}
          </p>
          <p className='text-xs text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity'>
            View credential &rarr;
          </p>
        </a>
      ))}
    </div>
  )
}
