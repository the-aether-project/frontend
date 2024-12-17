
"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

const PageWrapper = ({children}) => {
 const pathname = usePathname()
 const isLandingPage = pathname === '/'
 return (
   <div className={`${isLandingPage ? '' : 'pb-[1.45vh] pt-[1.25vh]   lg:pt-[9vh] px-4 md:px-6 lg:px-8 '} `}>
     {children}
   </div>
 )
}
export default PageWrapper
