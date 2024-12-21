
"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

const PageWrapper = ({children}) => {
 const pathname = usePathname()
 const isLandingPage = pathname === '/'
 return (
  <div className={`${isLandingPage ? '' : 'mt-[7vh] mb-[1vh] pb-[1.45vh] pt-[1vh] lg:pt-[1vh] px-4 md:px-6 lg:px-8'} `}>
    {children}
  </div>
 )
}
export default PageWrapper
