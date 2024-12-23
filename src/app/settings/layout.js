
"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserCircle, Shield, Monitor, Wallet } from "lucide-react";

const navItems = [
  { href: '/settings/personal-info', label: 'Personal Information', icon: UserCircle },
  { href: '/settings/security', label: 'Security', icon: Shield },
  { href: '/settings/display', label: 'Display', icon: Monitor },
  { href: '/settings/finance', label: 'Finance', icon: Wallet }
];

const SettingsLayout = ({ children }) => {
  const pathname = usePathname();
  const isActive = (path) => pathname.startsWith(path);

  const renderNavItem = ({ href, label, icon: Icon }) => (
    <Link
      key={href}
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
        ${isActive(href) 
          ? 'bg-blue-50 text-green-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-50'}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-white ">
      <div className="w-72 bg-gray-50 border-r p-6 ">
        <h1 className="text-xl font-semibold text-gray-900 mb-6 text-center">Settings</h1>
        <nav className="space-y-1">
          {navItems.map(renderNavItem)}
        </nav>
      </div>
      
      <main className="flex-1 p-6 ">
        {children}
      </main>
    </div>
  );
};

export default SettingsLayout;