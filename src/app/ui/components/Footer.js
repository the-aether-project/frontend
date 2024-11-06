import React from 'react'

const Footer = () => {
  const currentYear=new Date().getFullYear();
  return (
    <div className='bg-slate-950 text-white  px-4 h-[8vh] flex items-center justify-center'>
      <p className=' text-center'>Copyright &copy; {currentYear} Aether- All rights reserved</p>
    </div>
  )
}

export default Footer