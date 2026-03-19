import { createBrowserRouter } from 'react-router'
import App from './App'
import BlogList from './routes/BlogList'
import BlogPost from './routes/BlogPost'
import Home from './routes/Home'
import NotFound from './routes/NotFound'

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'blog', Component: BlogList },
      { path: 'blog/:slug', Component: BlogPost },
      { path: '*', Component: NotFound },
    ],
  },
])
