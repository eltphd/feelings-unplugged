'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const quickActions = [
    { icon: '✍️', label: 'Quick Journal', href: '/journal', gradient: 'from-terracotta to-amber' },
    { icon: '📊', label: 'Weekly Review', href: '/weekly-review', gradient: 'from-sage to-forest' },
    { icon: '🆘', label: 'Get Help', href: '/resources', gradient: 'from-red-400 to-red-600' },
  ]

  return (
    <div className="fixed bottom-20 md:bottom-24 right-4 md:right-6 z-40">
      {/* Quick Action Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-3 animate-slide-up">
          {quickActions.map((action, index) => (
            <Link
              key={action.href}
              href={action.href}
              className={`flex items-center gap-3 bg-gradient-to-r ${action.gradient} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-xl">{action.icon}</span>
              <span className="font-sans font-bold text-sm">{action.label}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fab bg-gradient-to-br from-terracotta to-amber text-white transition-all ${
          isOpen ? 'rotate-45' : ''
        }`}
        aria-label="Quick actions"
      >
        <span className="text-2xl">+</span>
      </button>
    </div>
  )
}
