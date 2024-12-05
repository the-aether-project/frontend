"use client"
import React from 'react'
import useSessionData from '@/hooks/useSessionData'
const page = () => {
  const { session } = useSessionData();
  return (

    <div>HEllo this is Home page of <span className='font-bold '>{session?.user?.email}</span></div>
  )
}

export default page