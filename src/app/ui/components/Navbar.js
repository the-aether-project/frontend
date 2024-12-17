
"use client"
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Menu, X } from 'lucide-react'; // Using Lucide icons for standard mobile menu icons
import Logout from './Logout';

const Navbar = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  // Scroll effect for home page
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.7;
      setIsScrolled(window.scrollY >= heroHeight);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  // Navigation handler
  const navigateTo = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  // Determine active link style
  const getLinkStyle = (path) => `
    ${pathname === path 
      ? 'text-blue-500 font-semibold' 
      : 'text-gray-300 hover:text-white'}
    block py-2 transition-colors duration-300
  `;

  // Authenticated user navigation items
  const authNavItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Lend/Rent', path: '/mode' },
    { label: 'Profile', path: '/profile' },
    { label: 'Settings', path: '/settings' }
  ];

  // Unauthenticated user navigation items
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
        {/* Logo */}
        <button 
          onClick={() => router.push('/')} 
          className="text-white text-2xl font-bold"
        >
          Aether
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 items-center">
          {(session ? authNavItems : unAuthNavItems).map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`
                text-white 
                ${pathname === item.path 
                  ? 'border-b-2 border-blue-500' 
                  : 'hover:border-b-2 hover:border-white'}
                pb-1 transition-all duration-300
              `}
            >
              {item.label}
            </button>
          ))}
          
          {session && (
            <div className="pb-1 transition-all duration-300">
              <Logout />
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
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

      {/* Mobile Slide-Out Menu */}
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
            <div className="mt-4">
              <Logout />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
        />
      )}
    </nav>
  );
};

export default Navbar;