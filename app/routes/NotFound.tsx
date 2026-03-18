import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - giraffesyo.io'
  }, [])

  return (
    <div
      style={{ textAlign: 'center', marginTop: '10%', position: 'relative' }}
    >
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&apos;t exist... the sadness.</p>
    </div>
  )
}
