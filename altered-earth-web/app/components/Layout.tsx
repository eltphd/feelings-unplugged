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
    { href: '/', label: 'Home', icon: '📚' },
    { href: '/emotions', label: 'Check In', icon: '💜' },
    { href: '/timeline', label: 'Timeline', icon: '🧭' },
    { href: '/prompts-feelings', label: 'Prompts', icon: '✨' },
    { href: '/settings', label: 'Settings', icon: '🔐' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-base-200 bg-base-100 text-2xl shadow-sm">
              📖
            </span>
            <div className="hidden sm:block">
              <p className="font-serif text-xl leading-tight text-neutral">Feelings Unplugged</p>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Scholar Studio</p>
            </div>
          </Link>
          <nav className="nav-pill hidden lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-pill__link${active ? ' nav-pill__link--active' : ''}`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/mockups"
            className="hidden rounded-full border border-secondary/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary transition-colors hover:bg-secondary/10 sm:flex"
          >
            Concepts
          </Link>
        </div>
      </header>

      <main className="relative mx-auto flex max-w-6xl flex-col px-6 pb-28 pt-10">
        {children}
      </main>

      <nav className="bottom-dock lg:hidden">
        <div className="bottom-dock__items">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`bottom-dock__item${active ? ' bottom-dock__item--active' : ''}`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

