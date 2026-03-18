import type { ReactNode } from 'react'

interface BlogLayoutProps {
  pageTitle: string
  image?: string
  children: ReactNode
}

export default function BlogLayout({
  children,
  pageTitle,
  image,
}: BlogLayoutProps) {
  return (
    <>
      <div className='mx-auto w-1/3'>
        <div className='text-4xl text-center text-blue-code'>{pageTitle}</div>
        {image && <img src={image} alt={pageTitle} />}
      </div>
      {children}
    </>
  )
}
