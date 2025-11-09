'use client';

import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserPreferences } from '@/types';

const DEFAULT_PREFERENCES: UserPreferences = {
  localStorageOnly: true,
  cloudBackupEnabled: false,
  shareAnonymousData: false,
  notificationsEnabled: false,
  streakReminders: false,
};

export default function PrivacySettings() {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'user-preferences',
    DEFAULT_PREFERENCES
  );
  const [lastExport, setLastExport] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('fu-last-export');
      setLastExport(stored ? stored : null);
    }
  }, []);

  const handleToggle = (key: keyof UserPreferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handleExportData = () => {
    const entries = localStorage.getItem('journal-entries');
    const data = {
      entries: entries ? JSON.parse(entries) : [],
      preferences,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feelings-unplugged-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const timestamp = new Date().toISOString();
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('fu-last-export', timestamp);
    }
    setLastExport(timestamp);
  };

  const handleDeleteAll = () => {
    if (confirm('Are you absolutely sure? This will permanently delete all your journal entries. This cannot be undone.')) {
      localStorage.removeItem('journal-entries');
      localStorage.removeItem('user-preferences');
      window.location.reload();
    }
  };

  return (
    <div className="card glass-card max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Your Data, Your Control</h2>
        
        <div className="space-y-4">
          {/* Local Storage Only */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input 
                type="checkbox" 
                className="toggle toggle-primary" 
                checked={preferences.localStorageOnly}
                onChange={() => handleToggle('localStorageOnly')}
              />
              <div>
                <span className="label-text font-semibold block">Store journals locally only</span>
                <p className="text-xs opacity-60">
                  Your entries never leave your device unless you choose to back them up
                </p>
              </div>
            </label>
          </div>

          <div className="divider"></div>

          {/* Cloud Backup */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input 
                type="checkbox" 
                className="toggle toggle-secondary" 
                checked={preferences.cloudBackupEnabled}
                onChange={() => handleToggle('cloudBackupEnabled')}
                disabled={preferences.localStorageOnly}
              />
              <div>
                <span className="label-text font-semibold block">Optional cloud backup (encrypted)</span>
                <p className="text-xs opacity-60">
                  End-to-end encrypted sync across devices
                </p>
              </div>
            </label>
          </div>

          {/* Anonymous Data Sharing */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input 
                type="checkbox" 
                className="toggle toggle-accent" 
                checked={preferences.shareAnonymousData}
                onChange={() => handleToggle('shareAnonymousData')}
              />
              <div>
                <span className="label-text font-semibold block">Share anonymous emotional trends</span>
                <p className="text-xs opacity-60">
                  Helps us understand youth mental health — never tied to your identity
                </p>
              </div>
            </label>
          </div>

          <div className="divider"></div>

          {/* Notifications */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input 
                type="checkbox" 
                className="toggle toggle-info" 
                checked={preferences.notificationsEnabled}
                onChange={() => handleToggle('notificationsEnabled')}
              />
              <div>
                <span className="label-text font-semibold block">Enable notifications</span>
              </div>
            </label>
          </div>

          {/* Streak Reminders */}
          {preferences.notificationsEnabled && (
            <div className="form-control ml-6">
              <label className="label cursor-pointer justify-start gap-4">
                <input 
                  type="checkbox" 
                  className="toggle toggle-info toggle-sm" 
                  checked={preferences.streakReminders}
                  onChange={() => handleToggle('streakReminders')}
                />
                <div>
                  <span className="label-text text-sm">Gentle streak reminders</span>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Data Management Actions */}
        <div className="card-actions justify-end mt-6 gap-2">
          <button 
            className="btn btn-outline btn-sm gap-2"
            onClick={handleExportData}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export My Data
          </button>
          <button 
            className="btn btn-error btn-outline btn-sm"
            onClick={handleDeleteAll}
          >
            Delete Everything
          </button>
        </div>
        <div className="mt-4 text-xs opacity-70 space-y-1">
          <p>Last export: {lastExport ? new Date(lastExport).toLocaleString() : 'Never'}</p>
          <p>We never transmit your entries. Exports are stored wherever you download them.</p>
        </div>
      </div>
    </div>
  );
}

