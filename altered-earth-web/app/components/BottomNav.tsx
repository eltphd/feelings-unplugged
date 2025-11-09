'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: '🏠', label: 'Home', href: '/' },
    { icon: '✍️', label: 'Journal', href: '/journal' },
    { icon: '📊', label: 'Review', href: '/weekly-review' },
    { icon: '📚', label: 'Read', href: '/articles' },
    { icon: '🆘', label: 'Help', href: '/resources' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t-2 border-sage/30 z-50 thumb-safe shadow-2xl">
      {/* Firefly Glow Accent - Top Border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-terracotta to-transparent opacity-60"></div>

      <div className="max-w-screen-xl mx-auto px-3 py-3">
        <div className="flex items-center justify-around gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  tap-target haptic-medium
                  flex flex-col items-center justify-center
                  px-4 py-2.5 rounded-3xl
                  transition-all duration-300
                  min-w-[68px] relative overflow-hidden
                  ${
                    active
                      ? 'bg-gradient-to-br from-terracotta via-amber to-terracotta text-white scale-105 firefly-glow-sm animate-pop'
                      : 'text-gray-600 hover:text-terracotta hover:bg-cream/70 hover:scale-105'
                  }
                `}
              >
                {/* Active Indicator Pulse */}
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber to-terracotta opacity-50 animate-pulse-soft rounded-3xl"></div>
                )}

                <span className={`
                  relative z-10 text-2xl mb-1
                  transition-all duration-300
                  ${active ? 'scale-110 animate-bounce-soft' : ''}
                `}>
                  {item.icon}
                </span>
                <span className={`
                  relative z-10 text-[10px] font-sans font-extrabold tracking-wide uppercase
                  ${active ? 'text-white' : ''}
                `}>
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
