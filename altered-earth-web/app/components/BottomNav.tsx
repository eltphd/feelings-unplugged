'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: '🏠', label: 'Home', href: '/' },
    { icon: '✍️', label: 'Journal', href: '/journal' },
    { icon: '📚', label: 'Read', href: '/articles' },
    { icon: '🎵', label: 'Music', href: '/playlists' },
    { icon: '🆘', label: 'Help', href: '/resources' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-sage/20 z-50 safe-area-bottom shadow-2xl">
      <div className="max-w-screen-xl mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-2xl transition-all duration-300 min-w-[60px] ${
                  active
                    ? 'bg-gradient-to-br from-terracotta to-amber text-white scale-105 shadow-lg'
                    : 'text-gray-600 hover:text-terracotta hover:bg-cream/50'
                }`}
              >
                <span className={`text-2xl mb-1 transition-transform ${active ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
                <span className={`text-xs font-sans font-bold ${active ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
