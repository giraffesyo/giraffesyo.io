import { createBrowserRouter } from 'react-router'
import App from './App'
import Home from './routes/Home'
import NotFound from './routes/NotFound'

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: 'blog',
        lazy: async () => ({ Component: (await import('./routes/BlogList')).default }),
      },
      {
        path: 'blog/:slug',
        lazy: async () => ({ Component: (await import('./routes/BlogPost')).default }),
      },
      {
        path: 'docs',
        lazy: async () => ({ Component: (await import('./routes/Docs')).default }),
      },
      {
        path: 'downmark',
        lazy: async () => ({ Component: (await import('./routes/DownmarkDocs')).default }),
      },
      {
        path: 'pdf',
        lazy: async () => ({ Component: (await import('./routes/PdfDocs')).default }),
      },
      {
        path: 'openapi-go-naming',
        lazy: async () => ({ Component: (await import('./routes/OpenApiGoNamingDocs')).default }),
      },
      { path: '*', Component: NotFound },
    ],
  },
])
