// https://webpack.js.org/guides/dependency-management/#requirecontext

export interface IMeta {
  title: string
  description: string
  date: string
  excerpt: string
  imgSrc: string
}

export interface IPost {
  link: string
  module: {
    meta?: IMeta
  }
}

const importAll = (r): IPost[] => {
  return r.keys().map((fileName) => ({
    link: fileName.substr(1).replace(/\/index\.mdx$/, ''),
    module: r(fileName),
  }))
}

export const posts = importAll(
  require.context('../pages/blog/', true, /\.mdx$/)
)
