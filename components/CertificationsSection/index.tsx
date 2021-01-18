import { Project } from '../project'

interface ICertificationProps {
  name: string
  imgSrc: string
  awardDate: string
  href: string
}

const Certification: React.FC<ICertificationProps> = ({
  imgSrc,
  name,
  awardDate,
  href,
}) => {
  return (
    <div className='flex flex-row'>
      <img src={imgSrc} alt={name} width={200} height={200} />
      <div className='flex flex-col items-center justify-center'>
        <span className='font-semibold'>{name}</span>
        <span className='text-green-code'>Awarded {awardDate}</span>
        <a className='text-blue-code' href={href}>
          View credential
        </a>
      </div>
    </div>
  )
}

const CertificationsSection: React.FC = () => {
  return (
    <div className='w-full flex flex-col md:flex-row justify-center text-center'>
      <Certification
        href='https://www.youracclaim.com/badges/37a99ac7-8e80-4693-8c09-48c709d9c8f9/public_url'
        imgSrc='/images/certifications/aws_cloud_practitioner_badge.png'
        name='AWS Certified Cloud Practitioner'
        awardDate='4/8/2020'
      ></Certification>
      <Certification
        href='https://www.youracclaim.com/badges/6068be6e-ec80-483b-9782-d54875c8485d/public_url'
        imgSrc='/images/certifications/aws_developer_associate_badge.png'
        name='AWS Certified Developer - Associate'
        awardDate='12/11/2020'
      ></Certification>
    </div>
  )
}

export default CertificationsSection
