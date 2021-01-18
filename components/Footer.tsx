import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import cx from 'classnames'
interface IFooterProps {
  outerClassNames?: string
}

const Footer: React.FC<IFooterProps> = ({ outerClassNames }) => {
  return (
    <div
      className={cx(
        outerClassNames,
        'flex flex-row justify-between fixed bottom-0 bg-gray-codelightest w-full p-2'
      )}
    >
      <ul className='text-3xl md:text-5xl flex flex-row'>
        <li className='mx-2 text-white hover:opacity-80'>
          <Link href='https://github.com/giraffesyo'>
            <a target='_blank' rel='noopener'>
              <FaGithub />
              <div className='sr-only'>Michael McQuade's Github</div>
            </a>
          </Link>
        </li>
        <li className='mx-2 text-blue-twitter hover:opacity-80'>
          <Link href='https://twitter.com/giraffesyo'>
            <a target='_blank' rel='noopener'>
              <FaTwitter />
              <div className='sr-only'>Michael McQuade's Twitter</div>
            </a>
          </Link>
        </li>
        <li className='mx-2 text-blue-linkedin hover:opacity-80'>
          <Link href='https://www.linkedin.com/in/mcquademichael/'>
            <a target='_blank' rel='noopener'>
              <FaLinkedinIn />
              <div className='sr-only'>Michael McQuade's Linkedin</div>
            </a>
          </Link>
        </li>
      </ul>

      <div className='text-purple-code font-light text-xl md:text-4xl'>
        Michael McQuade
      </div>
    </div>
  )
}

export default Footer
