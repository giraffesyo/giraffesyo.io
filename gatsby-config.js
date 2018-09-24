module.exports = {
  siteMetadata: {
    title: 'giraffesyo.io - Michael McQuade'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`, // In your gatsby-config.js
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-44000145-5',
        // Puts tracking script in the head instead of the body
        head: false,
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
              showCaptions: true,
              backgroundColor: 'rgb(30,30,30)'
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogimages`,
        path: `${__dirname}/src/blog/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: 'rootimages'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/blog/posts`
      }
    },
    {
      resolve: `@debiki/gatsby-plugin-talkyard`,
      options: {
        talkyardServerUrl: 'https://comments-for-giraffesyo-io.talkyard.net'
      }
    }
  ]
}
