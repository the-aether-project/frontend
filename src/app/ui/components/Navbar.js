"use client"
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Logout from './Logout';
import Link from 'next/link';
const Navbar = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const router = useRouter();
const[mode,setMode]=useState()

  
  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === 'lend' ? 'rent' : 'lend'));
  };
  useEffect(() => {
    const handleScroll = () => {
      // Calculate when we've scrolled past 70vh (hero section height)
      const heroHeight = window.innerHeight * 0.7;
      setIsScrolled(window.scrollY >= heroHeight);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  const navbarClasses = `
    fixed top-0 w-full z-50 
    transition-colors duration-300 
    ${isHomePage && !isScrolled ? 'bg-transparent backdrop-blur-sm' : 'bg-slate-950'} 
    text-white flex flex-col md:flex-row justify-between items-center 
    pl-4 py-2  ml-0 md:py-0 h-auto md:h-[8vh] space-y-2 md:space-y-0
  `;

  return (
    
    <nav className={navbarClasses}>
      <div className="pl-24  items-center  ">
       
        <button onClick={() => router.push('/')} className='font-extrabold text-xl px-4 py-2'>Aether</button>
        </div>
        
      {session ? (
        <div className='flex gap-6 ml-[24vw] mr-0 pr-8' >
          <div className='home'>
        <button
          className={`font-medium text-xl px-4 py-2 ${pathname === '/home' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200`}
          onClick={() => router.push('/home')}
        >
          Home
        </button>
        </div>
        <div className='lend/rent'>
        <button
          className={`font-medium text-xl px-4 py-2 ${pathname === '/mode' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200 `}
          onClick={() => {router.push('/mode');handleModeChange()}}
        >
          Lend/Rent
        </button>
        </div>
        <div className='dashboard'>
        <button
          className={`font-medium text-xl px-4 py-2 ${pathname === '/dashboard' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200`}
          onClick={() => router.push('/dashboard')}
        >
          Dashboard
        </button>
        </div>
        <div className="profile">
        <button
          className={`font-medium text-xl px-4 py-2 ${pathname === '/profile' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200`}
          onClick={() => router.push('/profile')}
        >
        Profile
        </button>
        </div>
        <div className="settings">
        <button
          className={`font-medium text-xl px-4 py-2 ${pathname === '/settings' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200`}
          onClick={() => router.push('/settings')}
        >
          Settings
        </button>
        </div>
        <div className={`font-medium text-xl px-6 py-3 ${mode === 'lend' ? 'text-green-500' : mode === 'rent' ? 'text-blue-500' : ''} rounded-2xl border-2 border-yellow-300`}>
          Timer
        </div>
        <div className="font-medium text-xl px-4 py-2 ">
          NighMode 
        </div>
        <div className="Logout">
          <Logout />
        </div>
        </div>
      ) : (
        <div className='flex gap-8 pr-8'>
         
          <button
            className={`font-medium text-xl px-4 py-2 ${pathname === '/signup' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200`}
            onClick={() => router.push('/signup')}
          >
            SignUp
          </button>
          <button
            className={`font-medium text-xl px-4 py-2 ${pathname === '/login' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200`}
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </div>
      )}
    
    </nav>
  );
}

export default Navbar;
