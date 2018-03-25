import React from 'react'

class BlogExcerpts extends React.PureComponent {
  render() {
    return (
      <div className="blog">
        <h2 className="dark-blue-text code-font">&lt;blog&gt;</h2>
        <div>
          <h4 className="light-blue-text code-font">A Study in Pink</h4>
          <h6 className="green-text code-font">{'//'}February 7th</h6>
          <p className="white-text">
            I've blacked out a few names and places because of legal matters
            but, other than that, this is what happened on the night I moved in
            with Sherlock Holmes. When I first met Sherlock, he told me my life
            story . . . 
          </p>
          <h6 className="orange-text">Read more</h6>
        </div>
        <div>
          <h4 className="light-blue-text code-font">The Blind Banker</h4>
          <h6 className="green-text code-font">{'//'}March 28th</h6>
          <p className="white-text">
            It all began with Sherlock and I visiting the bank. We'd been called
            in by an old school friend of his. The man was a banker and pretty
            much what you'd expect. Someone had broken into their offices and
            sprayed . . .
          </p>
          <h6 className="orange-text">Read more</h6>
        </div>
      </div>
    )
  }
}
export { BlogExcerpts }
