"use client"
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Logout from './Logout';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const router = useRouter();
  const [mode, setMode] = useState();

  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === 'lend' ? 'rent' : 'lend'));
  };

  useEffect(() => {
    const handleScroll = () => {
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
    md:fixed  sm:sticky top-0 w-full z-50 
    transition-colors duration-300 ${isHomePage && !isScrolled ? 'bg-transparent backdrop-blur-sm' : 'bg-slate-950'} 
    text-white flex flex-col md:flex-row justify-between items-center 
    pl-4 py-2 md:py-0 h-auto md:h-[8vh] space-y-2 md:space-y-0
  `;

  return (
    <nav className={navbarClasses}>
      <div className="flex justify-between items-center w-full md:w-auto">
        <button onClick={() => router.push('/')} className='font-extrabold text-xl lg:px-28 sm:px-8 md:px-12  py-2'>Aether</button>
        <button className="md:hidden text-white px-8 text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      <div className={`flex-col md:flex-row md:flex ${isMenuOpen ? 'flex' : 'hidden'} md:items-center w-full md:w-auto`}>
        {session ? (
          <div className='flex flex-col md:flex-row gap-8 ml-0 md:ml-[24vw] mr-0 pr-8'>
            {/* <button
              className={`font-medium text-xl px-4  py-2 ${pathname === '/home' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200`}
              onClick={() => { router.push('/home'); setIsMenuOpen(false); }}
            >
              Home
            </button> */}
            <button
              className={`font-medium text-xl px-4  py-2 ${pathname === '/dashboard' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200`}
              onClick={() => { router.push('/dashboard'); setIsMenuOpen(false); }}
            >
              Dashboard
            </button>
            <button
              className={`font-medium text-xl px-4   py-2 ${pathname === '/mode' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200`}
              onClick={() => { router.push('/mode'); handleModeChange(); setIsMenuOpen(false); }}
            >
              Lend/Rent
            </button>

            <button
              className={`font-medium text-xl px-4 py-2 ${pathname === `/${session?.user?.name}`
                  ? 'border-b-2 border-white'
                  : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'
                } transition-all duration-200`}
              onClick={() => {
                router.push('/profile');
                setIsMenuOpen(false);
              }}
            >
              Profile
            </button>

            <button
              className={`font-medium text-xl px-4  py-2 ${pathname === '/settings' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200`}
              onClick={() => { router.push('/settings'); setIsMenuOpen(false); }}
            >
              Settings
            </button>
            <div className={`font-medium text-xl px-4  py-3 ${mode === 'lend' ? 'text-green-500' : mode === 'rent' ? 'text-blue-500' : ''} rounded-2xl border-2 border-yellow-300`}>
              Timer
            </div>
            <div className="font-medium text-xl px-4  py-3">
              NightMode
            </div>
            <div className="Logout py-1">
              <Logout />
            </div>
          </div>
        ) : (
          <div className='flex flex-col md:flex-row gap-8 pr-8'>
            <button
              className={`font-medium text-xl px-4 py-2 ${pathname === '/signup' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200`}
              onClick={() => { router.push('/signup'); setIsMenuOpen(false); }}
            >
              SignUp
            </button>
            <button
              className={`font-medium text-xl px-4 py-2 ${pathname === '/login' ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white border-b-2 border-transparent'} transition-all duration-200`}
              onClick={() => { router.push('/login'); setIsMenuOpen(false); }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
