

                           "use client"
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react'; 
import Logout from './Logout';
import { useSession } from './SessionProvider';

const Navbar = () => {
  const { session, status } = useSession(); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

//  session check matra gareko yo useEffect  hataye ni kei xaina
  useEffect(() => {
    if(session){
      console.log("Navbar Session",session)
      console.log("Navbar username",session.username)
      console.log("status is in navbar",status)
      
    }
    else{
      console.log("Navbar No Session",session)
      console.log("status is  not in in navbar",status)
    }
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.7;
      setIsScrolled(window.scrollY >= heroHeight);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

 
  const navigateTo = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  console.log("ststus of Navbar",status)
  const getLinkStyle = (path) => `
    ${pathname.startsWith(path)
      ? 'text-blue-500 font-semibold' 
      : 'text-gray-300 hover:text-white'}
    block py-2 transition-colors duration-300
    `;

  const authNavItems = [
    { label: 'Dashboard', path: '/dashboard' },
    
    { label: 'Profile', path: '/profile' },
    { label: 'Settings', path: '/settings' }
  ];


  const unAuthNavItems = [
    { label: 'Sign Up', path: '/signup' },
    { label: 'Login', path: '/login' }
  ];

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 
      ${isHomePage && !isScrolled 
        ? 'bg-transparent' 
        : 'bg-slate-950 shadow-md'}
      transition-all duration-300
    `}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        <button 
          onClick={() => router.push('/')} 
          className="text-white text-2xl font-bold"
        >
          Aether
        </button>

       
        <div className="hidden lg:flex space-x-6 items-center">
          {(session ? authNavItems : unAuthNavItems).map((item) => (
          // {(status==="authenticated" ? authNavItems : unAuthNavItems).map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`
                text-white 
                ${pathname.startsWith(item.path)
                  ? 'border-b-2 border-teal-500' 
                  : 'hover:border-b-2 hover:border-white'}
                pb-1 transition-all duration-300
              `}
            >
              {item.label}
            </button>
          ))}
          
          {session && (
            <div className="pb-1 transition-all duration-300 text-white">
              <Logout />
            </div>
          )}
        </div>
            {/* yo chai mobile ko lagi tyo side dropdown navbar */}
       
        <div className="lg:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white"
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      
      <div 
        className={`
          fixed top-0 right-0 w-64 h-full 
          bg-slate-900 shadow-lg 
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:hidden
        `}
      >
        <div className="p-4 flex justify-between items-center border-b border-slate-700">
          <h2 className="text-white text-xl font-bold">Menu</h2>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white"
            aria-label="Close mobile menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {(session ? authNavItems : unAuthNavItems).map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`w-full text-left ${getLinkStyle(item.path)}`}
            >
              {item.label}
            </button>
          ))}

          {session && (
            <div className="mt-4 text-white">
              <Logout />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
