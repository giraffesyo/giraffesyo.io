import React from 'react'
import Link from 'gatsby-link'

class BlogExcerpts extends React.PureComponent {
  render() {
    const { data } = this.props
    const excerpts = data.map(({ node }) => (
      <div key={node.id}>
        <h4 className="light-blue-text code-font">{node.frontmatter.title}</h4>
        <h6 className="green-text code-font">
          {'//'}
          {node.frontmatter.date}
        </h6>

        <p className="white-text">{node.excerpt}</p>
        <h6>
          <Link style={{float: 'right'}} className="orange-text" to={node.frontmatter.path}>Read more</Link>
        </h6>
      </div>
    ))

    return (
      <div className="blog">
        <h2 className="dark-blue-text code-font">
          {'<'}blog{'>'}
        </h2>
        {excerpts}
      </div>
    )
  }
}

export { BlogExcerpts }
