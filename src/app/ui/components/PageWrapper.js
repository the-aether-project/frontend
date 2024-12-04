"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

const PageWrapper = ({children}) => {
 const pathname = usePathname()
  const isLandingPage = pathname === '/'
  return (
    <div className={`${isLandingPage ? '' : 'sm:pt-[11.90vh] md:pt-[9vh] lg:pt-[8.75vh] px-4 md:px-6 lg:px-8'}`}>
      {children}
    </div>
  )
}
export default PageWrapper
// The md: lg: and sm: prefixes are used in Tailwind CSS to apply responsive styles.
// They correspond to different screen sizes:
// sm: applies to small screens (mobile devices)
// md: applies to medium screens (tablets)
// lg: applies to large screens (laptops and desktops)