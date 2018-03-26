import React from 'react'

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
        <h6 className="orange-text">Read more</h6>
      </div>
    ))

    return <div>{excerpts}</div>
  }
}

export { BlogExcerpts }
