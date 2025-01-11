"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserCircle, Shield, Monitor, Wallet } from "lucide-react";

const navItems = [
  { href: "/settings/personal-info", label: "Personal Information", icon: UserCircle },
  { href: "/settings/security", label: "Security", icon: Shield },
  { href: "/settings/display", label: "Display", icon: Monitor },
  { href: "/settings/finance", label: "Finance", icon: Wallet },
];

const SettingsLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path) => pathname.startsWith(path);

  useEffect(() => {
    if (pathname === "/settings") {
      router.push("/settings/personal-info");
    }
  }, [pathname, router]);

  const renderNavItem = ({ href, label, icon: Icon }) => (
    <Link
      key={href}
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
        ${isActive(href) 
          ? "bg-gray-200 text-gray-900 font-medium dark:bg-gray-700 dark:text-gray-100" 
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <div className="w-72 border-r p-6 dark:border-gray-800">
          <h1 className="text-xl font-semibold text-gray-900 mb-6 pl-6 dark:text-gray-100">Settings</h1>
          <nav className="space-y-1">
            {navItems.map(renderNavItem)}
          </nav>
        </div>
        <main className="flex-1 p-6 dark:text-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default SettingsLayout;