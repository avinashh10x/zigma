"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Designs', href: '/designs' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-5 z-50 w-full bg-transparent flex items-center justify-center ">
      <div className="max-w-7xl mx-auto  h-16 flex items-center justify-center bg-background px-16 rounded-full">
        {/* Logo */}
       

        {/* Navigation */}
        <nav className="flex items-center gap-8 ">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative text-md font-medium transition-colors hover:text-primary
                ${isActive(item.href) ? 'text-primary ' : 'text-muted-foreground'}
              `}
            >
              {item.name}
            </Link>
          ))}
        </nav>

      
      </div>
    </header>
  );
}