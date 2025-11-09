'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/emotions', label: 'Check In', icon: '💜' },
    { href: '/timeline', label: 'Timeline', icon: '📖' },
    { href: '/prompts-feelings', label: 'Prompts', icon: '✨' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Header */}
      <header className="navbar bg-base-200 shadow-lg sticky top-0 z-50">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            <span className="text-2xl mr-2">🔥</span>
            Feelings Unplugged
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 hidden md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={pathname === item.href ? 'active' : ''}
                >
                  <span className="text-lg mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="btm-nav md:hidden bg-base-200 border-t border-base-300">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            className={pathname === item.href ? 'active' : ''}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="btm-nav-label text-xs">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

