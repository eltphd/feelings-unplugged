'use client'

import { useState } from 'react'

export default function DataBackup() {
  const [showBackup, setShowBackup] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const exportData = () => {
    try {
      // Gather all data from localStorage
      const data = {
        journal: localStorage.getItem('alteredEarthJournal'),
        playlists: localStorage.getItem('alteredEarthPlaylists'),
        weeklyReview: localStorage.getItem('alteredEarthWeeklyReview'),
        exportDate: new Date().toISOString(),
        version: '1.0'
      }

      // Convert to JSON
      const jsonString = JSON.stringify(data, null, 2)

      // Create blob and download
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `feelings-unplugged-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setMessage({ type: 'success', text: 'Backup downloaded! Keep this file safe.' })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export data. Please try again.' })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)

        // Validate data structure
        if (!data.version) {
          throw new Error('Invalid backup file')
        }

        // Restore data to localStorage
        if (data.journal) localStorage.setItem('alteredEarthJournal', data.journal)
        if (data.playlists) localStorage.setItem('alteredEarthPlaylists', data.playlists)
        if (data.weeklyReview) localStorage.setItem('alteredEarthWeeklyReview', data.weeklyReview)

        setMessage({ type: 'success', text: 'Data restored! Refresh the page to see your entries.' })

        // Auto-refresh after 2 seconds
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } catch (error) {
        setMessage({ type: 'error', text: 'Invalid backup file. Please check the file and try again.' })
        setTimeout(() => setMessage(null), 5000)
      }
    }
    reader.readAsText(file)
  }

  const clearAllData = () => {
    if (confirm('⚠️ Are you sure you want to delete ALL your data? This cannot be undone. Make sure you have a backup first!')) {
      if (confirm('⚠️ Last chance! This will permanently delete all journal entries, playlists, and weekly reviews.')) {
        localStorage.removeItem('alteredEarthJournal')
        localStorage.removeItem('alteredEarthPlaylists')
        localStorage.removeItem('alteredEarthWeeklyReview')
        setMessage({ type: 'success', text: 'All data cleared. Refresh the page.' })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    }
  }

  const getDataSize = () => {
    const journal = localStorage.getItem('alteredEarthJournal')
    const playlists = localStorage.getItem('alteredEarthPlaylists')
    const weeklyReview = localStorage.getItem('alteredEarthWeeklyReview')

    const totalBytes = (journal?.length || 0) + (playlists?.length || 0) + (weeklyReview?.length || 0)
    const totalKB = (totalBytes / 1024).toFixed(2)

    return {
      hasData: totalBytes > 0,
      size: totalKB
    }
  }

  const dataInfo = getDataSize()

  if (!showBackup) {
    return (
      <button
        onClick={() => setShowBackup(true)}
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-full hover-lift shadow-lg text-sm font-sans font-bold text-forest dark:text-sage flex items-center gap-2"
      >
        <span>💾</span>
        <span>Backup Data</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full p-8 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-sans font-bold gradient-text">Data Backup & Privacy</h2>
          <button
            onClick={() => setShowBackup(false)}
            className="text-3xl text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-2xl ${
            message.type === 'success'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
          }`}>
            <p className="font-sans font-bold">{message.text}</p>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="mb-8 p-6 bg-amber/10 dark:bg-amber/20 border-2 border-amber/30 rounded-2xl">
          <h3 className="text-xl font-sans font-bold text-forest dark:text-sage mb-3 flex items-center gap-2">
            <span>⚠️</span>
            <span>Important: How Your Data Works</span>
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 font-serif">
            <li>✅ Your data is stored <strong>only on this device</strong> in your browser</li>
            <li>✅ No one else can see it (not even us!)</li>
            <li>❌ Data will be <strong>lost</strong> if you clear browser data or use a different device</li>
            <li>❌ Data will be <strong>lost</strong> if you uninstall your browser</li>
            <li>💾 <strong>Export backups regularly</strong> to keep your entries safe!</li>
          </ul>
        </div>

        {/* Data Info */}
        {dataInfo.hasData && (
          <div className="mb-6 p-4 bg-sage/10 dark:bg-sage/20 border border-sage/30 rounded-2xl">
            <p className="text-sm font-sans text-gray-700 dark:text-gray-300">
              📊 You have <strong>{dataInfo.size} KB</strong> of data stored
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          {/* Export */}
          <div className="card-glass p-6 rounded-2xl border-2 border-forest/20">
            <h3 className="text-xl font-sans font-bold text-forest dark:text-sage mb-2 flex items-center gap-2">
              <span>📥</span>
              <span>Export (Download) Your Data</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-serif mb-4">
              Download all your journal entries, playlists, and weekly reviews as a backup file.
            </p>
            <button
              onClick={exportData}
              className="btn-primary w-full"
            >
              Download Backup File
            </button>
          </div>

          {/* Import */}
          <div className="card-glass p-6 rounded-2xl border-2 border-terracotta/20">
            <h3 className="text-xl font-sans font-bold text-forest dark:text-sage mb-2 flex items-center gap-2">
              <span>📤</span>
              <span>Import (Restore) Your Data</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-serif mb-4">
              Restore your data from a previously downloaded backup file.
            </p>
            <label className="btn-secondary w-full cursor-pointer inline-block text-center">
              Choose Backup File to Restore
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
          </div>

          {/* Clear All Data */}
          <div className="card-glass p-6 rounded-2xl border-2 border-red-200 dark:border-red-800">
            <h3 className="text-xl font-sans font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
              <span>🗑️</span>
              <span>Delete All Data</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-serif mb-4">
              Permanently delete all your data. This cannot be undone!
            </p>
            <button
              onClick={clearAllData}
              className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-sans font-bold rounded-full transition-all"
            >
              Delete Everything
            </button>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 p-6 bg-cream/50 dark:bg-gray-700/50 rounded-2xl">
          <h3 className="text-lg font-sans font-bold text-forest dark:text-sage mb-3">💡 Recommendations</h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 font-serif">
            <li>• <strong>Export weekly</strong> to keep your data safe</li>
            <li>• Store backup files in a safe place (cloud drive, USB, etc.)</li>
            <li>• Keep backup files private - they contain your personal reflections</li>
            <li>• If switching devices, export on old device and import on new device</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
