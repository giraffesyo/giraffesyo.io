import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa'
import { Link } from 'react-router'
import cx from 'classnames'

interface IFooterProps {
  outerClassNames?: string
}

export default function Footer({ outerClassNames }: IFooterProps) {
  return (
    <div
      className={cx(
        outerClassNames,
        'flex flex-row justify-between fixed bottom-0 bg-gray-900 dark:bg-gray-codelightest w-full p-2'
      )}
    >
      <ul className='text-3xl md:text-5xl flex flex-row'>
        <li className='mx-2 text-white hover:opacity-80'>
          <a href='https://github.com/giraffesyo' target='_blank' rel='noopener noreferrer'>
            <FaGithub />
            <div className='sr-only'>Michael McQuade's Github</div>
          </a>
        </li>
        <li className='mx-2 text-blue-twitter hover:opacity-80'>
          <a href='https://twitter.com/giraffesyo' target='_blank' rel='noopener noreferrer'>
            <FaTwitter />
            <div className='sr-only'>Michael McQuade's Twitter</div>
          </a>
        </li>
        <li className='mx-2 text-blue-linkedin hover:opacity-80'>
          <a href='https://www.linkedin.com/in/mcquademichael/' target='_blank' rel='noopener noreferrer'>
            <FaLinkedinIn />
            <div className='sr-only'>Michael McQuade's Linkedin</div>
          </a>
        </li>
      </ul>

      <Link
        to='/'
        className='text-white dark:text-purple-code font-light text-xl md:text-4xl block'
      >
        Michael McQuade
      </Link>
    </div>
  )
}
