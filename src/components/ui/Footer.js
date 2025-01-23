import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-slate-950 shadow-md transition-all duration-300 text-white mb-0 w-full h-[5vh] flex items-center justify-center'>
      <p className='text-center'>Copyright &copy; {currentYear} Aether- All rights reserved</p>
    </footer>
  )
}

export default Footer