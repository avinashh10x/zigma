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
    <header className="sticky top-0 z-50 w-full  bg-background ">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
       

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative text-sm font-medium transition-colors hover:text-primary
                ${isActive(item.href) ? 'text-primary' : 'text-muted-foreground'}
              `}
            >
              {item.name}
              {isActive(item.href) && (
                <span className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

      
      </div>
    </header>
  );
}