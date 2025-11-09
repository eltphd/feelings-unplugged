'use client'

import { useState, useEffect } from 'react'

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', String(newMode))

    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700 hover-lift shadow-lg"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-6 h-6">
        <span
          className={`absolute inset-0 transition-all duration-300 ${
            darkMode ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
          }`}
        >
          🌙
        </span>
        <span
          className={`absolute inset-0 transition-all duration-300 ${
            darkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
          }`}
        >
          ☀️
        </span>
      </div>
    </button>
  )
}
