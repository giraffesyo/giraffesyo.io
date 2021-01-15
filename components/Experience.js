import React from 'react'

import { SectionHeader } from '../blocks/SectionHeader'
import { Project } from '../blocks/Project'

//TODO: move the imports of images into index and pass down as prop,
//TODO: import the images using graphql so we lazy load
const okchihuahuas = [
  '/images/projects/okchihuahuas1.jpeg',
  '/images/projects/okchihuahuas2.jpeg',
  '/images/projects/okchihuahuas3.jpeg',
]

class Experience extends React.PureComponent {
  render() {
    return (
      <>
        <SectionHeader>Experience</SectionHeader>
        <Project title='ConocoPhillips'>
          <p>
            System administrator for Linux high performance computing cluster
            with over 5000 compute nodes. About 20% of my time is spent
            maintaining and supporting the existing infrastructure within our
            HPC environment. The rest of my time is spent working on PoCs,
            creating and improving processes, and designing, developing, and
            implementing internal software. Technologies used include: CentOS,
            Ubuntu, Node.js, PostgreSQL, MySQL, Git, GitLab, Python, Anaconda
            (python notebooks), Zeppelin, Docker, Singularity, Bash, Cobbler,
            oVirt, Next.js, React.js, Gradle, Maven, Jenkins, Artifactory,
            Cisco, AWS, bestpractical request-tracker, ServiceNow, GLPI, OCS
          </p>
        </Project>
        <Project
          title='Foundation Software'
          images={'/images/projects/foundation.png'}
        >
          <p>
            Completed an 8-week summer internshp at Foundation Software. During
            my time there I created an internal label printer application using
            create-react-app, Microsoft SQL Server, Windows Integrated Security
            (Windows Auth), and Express.js. I also created a proof-of-concept
            rewrite of their marketing website, foundationsoft.com using
            Gatsby.js. This POC demonstrated an improvement of load times from
            6.2 seconds to 800ms over the current site.
          </p>
        </Project>
        <Project images={okchihuahuas} title='Prairie Glade Chihuahuas Web App'>
          {' '}
          <p>
            Developed a web app for an Oklahoma Chihuahua Kennel. The web app
            uses{' '}
            <a href='https://github.com/facebook/create-react-app'>
              create-react-app
            </a>{' '}
            and has an express.js backend, utilizing a PostgresQL database. The
            database and server are hosted on Heroku. The application allows the
            client to add new dogs to their site without any programming
            knowledge. In addition, it was important that the site was
            responsive, allowing the client to add dogs from their mobile
            device.
          </p>
          <p>
            Project is live at{' '}
            <a href='https://okchihuahuas.com'>https://okchihuahuas.com</a>
          </p>{' '}
        </Project>
      </>
    )
  }
}

export { Experience }
